import { useState, FormEvent, ChangeEvent, useRef } from 'react'
import axios from 'axios'

interface UserForm {
  name: string
  email: string
  age: string
}

function Lecture6() {
  // 🔍 방법 1: 제어 컴포넌트 (Controlled Component)
  const [formData, setFormData] = useState<UserForm>({
    name: '',
    email: '',
    age: ''
  })

  // 🔍 방법 2: 비제어 컴포넌트 (Uncontrolled Component)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)

  const [submittedData, setSubmittedData] = useState<any>(null)
  const [errors, setErrors] = useState<Partial<UserForm>>({})
  const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // 제어 컴포넌트: 개별 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 실시간 검증: 에러 초기화
    if (errors[name as keyof UserForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // 제어 컴포넌트: 검증
  const validate = (): boolean => {
    const newErrors: Partial<UserForm> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력하세요'
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 2글자 이상이어야 합니다'
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = '올바른 이메일을 입력하세요'
    }
    
    const age = parseInt(formData.age)
    if (isNaN(age) || age < 1 || age > 120) {
      newErrors.age = '올바른 나이를 입력하세요 (1-120)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 제어 컴포넌트: 제출
  const handleControlledSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      console.log('검증 실패:', errors)
      return
    }

    console.log('제어 컴포넌트 제출:', formData)
    
    axios.post(`${APP_BASE_URL}/api/users`, {
      ...formData,
      age: parseInt(formData.age)
    })
      .then(response => {
        setSubmittedData(response.data)
        setFormData({ name: '', email: '', age: '' }) // 초기화
        console.log('서버 응답:', response.data)
      })
      .catch(error => console.error('제출 에러:', error))
  }

  // 비제어 컴포넌트: 제출
  const handleUncontrolledSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      age: ageRef.current?.value || ''
    }
    
    console.log('비제어 컴포넌트 제출:', data)
    setSubmittedData(data)
  }

  return (
    <div>
      <h1>📚 Lecture 6: 폼과 양방향 바인딩</h1>

      <div style={sectionStyle}>
        <h2>학습 목표</h2>
        <ul>
          <li>제어 컴포넌트와 비제어 컴포넌트의 차이 이해</li>
          <li>양방향 데이터 바인딩 (value + onChange)</li>
          <li>실시간 폼 검증 구현</li>
          <li>useRef를 사용한 DOM 직접 접근</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 제어 컴포넌트 */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#388e3c' }}>✅ 제어 컴포넌트 (Controlled)</h2>
          <div style={{ ...infoBoxStyle, backgroundColor: '#e8f5e9' }}>
            <p><strong>특징:</strong> React state로 input 값 관리</p>
            <p><strong>장점:</strong> 실시간 검증, 조건부 렌더링 가능</p>
            <p><strong>사용:</strong> 대부분의 경우 (권장)</p>
          </div>

          <form onSubmit={handleControlledSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>이름:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="홍길동"
              />
              {errors.name && <span style={errorStyle}>⚠️ {errors.name}</span>}
              <small style={{ color: '#666', marginTop: '5px' }}>
                현재 값: "{formData.name}" (길이: {formData.name.length})
              </small>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>이메일:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="example@email.com"
              />
              {errors.email && <span style={errorStyle}>⚠️ {errors.email}</span>}
              <small style={{ color: '#666', marginTop: '5px' }}>
                @ 포함 여부: {formData.email.includes('@') ? '✅' : '❌'}
              </small>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>나이:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                style={inputStyle}
                placeholder="25"
              />
              {errors.age && <span style={errorStyle}>⚠️ {errors.age}</span>}
            </div>

            <button type="submit" style={{ ...buttonStyle, backgroundColor: '#4caf50' }}>
              제출 (검증 포함)
            </button>
          </form>

          <div style={{ ...codeBoxStyle, marginTop: '15px' }}>
            <strong>📝 코드 패턴:</strong>
            <pre style={codeStyle}>
{`// State로 값 관리
const [formData, setFormData] = useState({
  name: '', email: '', age: ''
})

// Input에 value와 onChange 바인딩
<input
  value={formData.name}
  onChange={(e) => setFormData({
    ...formData,
    name: e.target.value
  })}
/>`}
            </pre>
          </div>
        </div>

        {/* 비제어 컴포넌트 */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#1976d2' }}>📌 비제어 컴포넌트 (Uncontrolled)</h2>
          <div style={{ ...infoBoxStyle, backgroundColor: '#e3f2fd' }}>
            <p><strong>특징:</strong> DOM이 직접 값 관리</p>
            <p><strong>장점:</strong> 입력마다 리렌더링 없음</p>
            <p><strong>사용:</strong> 파일 업로드, 레거시 통합</p>
          </div>

          <form onSubmit={handleUncontrolledSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>이름:</label>
              <input
                type="text"
                ref={nameRef}
                style={inputStyle}
                placeholder="홍길동"
                defaultValue="김철수"
              />
              <small style={{ color: '#666', marginTop: '5px' }}>
                ref로 DOM 직접 접근
              </small>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>이메일:</label>
              <input
                type="text"
                ref={emailRef}
                style={inputStyle}
                placeholder="example@email.com"
              />
              <small style={{ color: '#666', marginTop: '5px' }}>
                실시간 검증 불가
              </small>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>나이:</label>
              <input
                type="number"
                ref={ageRef}
                style={inputStyle}
                placeholder="25"
              />
            </div>

            <button type="submit" style={{ ...buttonStyle, backgroundColor: '#2196f3' }}>
              제출 (검증 없음)
            </button>
          </form>

          <div style={{ ...codeBoxStyle, marginTop: '15px' }}>
            <strong>📝 코드 패턴:</strong>
            <pre style={codeStyle}>
{`// useRef로 DOM 참조
const nameRef = useRef<HTMLInputElement>(null)

// Input에 ref 연결
<input ref={nameRef} />

// 제출 시 값 읽기
const value = nameRef.current?.value`}
            </pre>
          </div>
        </div>
      </div>

      {/* 제출 결과 */}
      {submittedData && (
        <div style={{ ...sectionStyle, backgroundColor: '#d4edda', marginTop: '20px' }}>
          <h3>✅ 제출된 데이터</h3>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto' 
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <button 
            onClick={() => setSubmittedData(null)} 
            style={{ ...buttonStyle, backgroundColor: '#6c757d', marginTop: '10px' }}
          >
            초기화
          </button>
        </div>
      )}

      {/* 비교표 */}
      <div style={{ ...sectionStyle, marginTop: '20px' }}>
        <h3>📊 제어 vs 비제어 컴포넌트 비교</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>구분</th>
              <th style={thStyle}>제어 컴포넌트</th>
              <th style={thStyle}>비제어 컴포넌트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><strong>상태 관리</strong></td>
              <td style={tdStyle}>React state로 관리</td>
              <td style={tdStyle}>DOM이 직접 관리</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>값 접근</strong></td>
              <td style={tdStyle}>언제든지 state로 접근</td>
              <td style={tdStyle}>ref.current.value로 접근</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>실시간 검증</strong></td>
              <td style={tdStyle}>✅ 가능 (onChange에서)</td>
              <td style={tdStyle}>❌ 어려움</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>리렌더링</strong></td>
              <td style={tdStyle}>입력마다 발생</td>
              <td style={tdStyle}>발생 안 함</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>초기값</strong></td>
              <td style={tdStyle}>value prop</td>
              <td style={tdStyle}>defaultValue prop</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>사용 시나리오</strong></td>
              <td style={tdStyle}>대부분의 경우 (권장)</td>
              <td style={tdStyle}>파일 업로드, 레거시 통합</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 실습 과제 */}
      <div style={{ ...sectionStyle, backgroundColor: '#e8f5e9' }}>
        <h3>🔬 실습 과제</h3>
        <ol>
          <li>제어 컴포넌트에서 입력하며 실시간 검증 확인</li>
          <li>비제어 컴포넌트에서 ref로 값 접근 확인</li>
          <li>Console을 열고 입력할 때 리렌더링 확인 (제어만 리렌더링)</li>
          <li>새로운 필드 추가해보기 (예: 전화번호, 주소)</li>
          <li>커스텀 검증 규칙 추가 (예: 비밀번호 강도 체크)</li>
        </ol>
      </div>

      {/* 핵심 개념 */}
      <div style={{ ...sectionStyle, backgroundColor: '#e3f2fd' }}>
        <h3>💡 핵심 개념</h3>
        <ul>
          <li><strong>제어 컴포넌트</strong>: value + onChange로 React가 제어</li>
          <li><strong>비제어 컴포넌트</strong>: useRef로 DOM 직접 접근</li>
          <li><strong>양방향 바인딩</strong>: state ↔ input 동기화</li>
          <li><strong>e.preventDefault()</strong>: 폼 기본 제출 동작 방지</li>
          <li><strong>검증 패턴</strong>: 실시간(onChange) + 제출 시(onSubmit)</li>
        </ul>
      </div>

      {/* 추가 팁 */}
      <div style={{ ...sectionStyle, backgroundColor: '#fff3cd' }}>
        <h3>💡 실무 팁</h3>
        <ul>
          <li><strong>99%는 제어 컴포넌트 사용</strong>: 더 많은 제어권과 유연성</li>
          <li><strong>성능 걱정은 나중에</strong>: 수백 개 input이 아니면 문제없음</li>
          <li><strong>라이브러리 고려</strong>: React Hook Form, Formik 등</li>
          <li><strong>파일 업로드만 비제어</strong>: &lt;input type="file"&gt;은 보안상 제어 불가</li>
        </ul>
      </div>
    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  border: '2px solid #e0e0e0',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  backgroundColor: 'white'
}

const formStyle: React.CSSProperties = {
  border: '2px solid #ddd',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fafafa'
}

const fieldStyle: React.CSSProperties = {
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column'
}

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#333'
}

const inputStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '14px',
  border: '2px solid #ddd',
  borderRadius: '4px',
  marginTop: '5px'
}

const errorStyle: React.CSSProperties = {
  color: '#f44336',
  fontSize: '12px',
  marginTop: '5px',
  fontWeight: 'bold'
}

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '16px',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  marginTop: '10px'
}

const infoBoxStyle: React.CSSProperties = {
  padding: '15px',
  borderRadius: '4px',
  marginBottom: '15px',
  fontSize: '14px'
}

const codeBoxStyle: React.CSSProperties = {
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  border: '1px solid #ddd'
}

const codeStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '10px',
  borderRadius: '4px',
  fontSize: '12px',
  fontFamily: 'monospace',
  marginTop: '10px',
  overflow: 'auto'
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '15px'
}

const thStyle: React.CSSProperties = {
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold'
}

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
}

export default Lecture6
