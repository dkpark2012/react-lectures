import { useEffect, useState } from 'react'
import axios from 'axios'

interface Status {
  isOnline: boolean
  serverTime: string
  users: number
}

function Lecture5() {
  const [status, setStatus] = useState<Status | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    axios.get<Status>(`${APP_BASE_URL}/api/status`)
      .then(response => {
        setStatus(response.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // 🔍 패턴 1: Early Return (조기 리턴)
  if (loading) {
    return (
      <div style={centerStyle}>
        <div style={spinnerStyle}></div>
        <p>로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ ...centerStyle, color: '#d32f2f' }}>
        <h2>❌ 에러 발생</h2>
        <p>{error}</p>
        <p style={{ fontSize: '14px', marginTop: '20px', color: '#666' }}>
          💡 Backend 서버가 실행 중인지 확인하세요
        </p>
      </div>
    )
  }

  if (!status) {
    return <div style={centerStyle}>데이터 없음</div>
  }

  return (
    <div>
      <h1>📚 Lecture 5: 조건부 렌더링</h1>

      <div style={sectionStyle}>
        <h2>학습 목표</h2>
        <ul>
          <li>다양한 조건부 렌더링 패턴 마스터</li>
          <li>Early Return으로 중첩 줄이기</li>
          <li>&& 연산자와 삼항 연산자의 적절한 사용</li>
          <li>falsy 값 처리 시 주의사항</li>
        </ul>
      </div>

      {/* 패턴 2: && 연산자 */}
      <div style={sectionStyle}>
        <h3>패턴 2: && 연산자</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          조건이 true일 때만 렌더링합니다. 간단한 show/hide에 적합합니다.
        </p>
        {status.isOnline && (
          <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px' }}>
            ✅ 서버 온라인
          </div>
        )}
        {!status.isOnline && (
          <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
            ❌ 서버 오프라인
          </div>
        )}
        <pre style={codeStyle}>
{`{status.isOnline && <div>서버 온라인</div>}
{!status.isOnline && <div>서버 오프라인</div>}`}
        </pre>
      </div>

      {/* 패턴 3: 삼항 연산자 */}
      <div style={sectionStyle}>
        <h3>패턴 3: 삼항 연산자 (Ternary)</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          A 또는 B 중 하나를 선택할 때 사용합니다.
        </p>
        <div style={{
          padding: '15px',
          backgroundColor: status.isOnline ? '#d4edda' : '#f8d7da',
          color: status.isOnline ? '#155724' : '#721c24',
          borderRadius: '4px'
        }}>
          서버 상태: {status.isOnline ? '정상 ✅' : '오류 ❌'}
        </div>
        <pre style={codeStyle}>
{`<div style={{
  backgroundColor: status.isOnline ? 'green' : 'red'
}}>
  상태: {status.isOnline ? '정상' : '오류'}
</div>`}
        </pre>
      </div>

      {/* 패턴 4: 변수에 JSX 저장 */}
      <div style={sectionStyle}>
        <h3>패턴 4: 변수에 JSX 저장</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          복잡한 조건 로직은 변수로 분리하면 가독성이 좋습니다.
        </p>
        {(() => {
          let badge
          let description
          if (status.users > 50) {
            badge = <span style={{ ...badgeStyle, backgroundColor: '#f44336' }}>혼잡</span>
            description = '서버 부하가 높습니다'
          } else if (status.users > 20) {
            badge = <span style={{ ...badgeStyle, backgroundColor: '#ff9800' }}>보통</span>
            description = '정상 운영 중입니다'
          } else {
            badge = <span style={{ ...badgeStyle, backgroundColor: '#4caf50' }}>여유</span>
            description = '서버가 원활합니다'
          }
          return (
            <div>
              <div>현재 사용자: <strong>{status.users}명</strong> {badge}</div>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>{description}</p>
            </div>
          )
        })()}
        <pre style={codeStyle}>
{`let badge
if (users > 50) {
  badge = <span>혼잡</span>
} else if (users > 20) {
  badge = <span>보통</span>
} else {
  badge = <span>여유</span>
}
return <div>{badge}</div>`}
        </pre>
      </div>

      {/* 패턴 5: 토글 가능한 컨텐츠 */}
      <div style={sectionStyle}>
        <h3>패턴 5: 토글 (Show/Hide)</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          사용자 액션에 따라 컨텐츠를 표시/숨김합니다.
        </p>
        <button onClick={() => setShowDetails(!showDetails)} style={buttonStyle}>
          {showDetails ? '숨기기 ▲' : '상세보기 ▼'}
        </button>
        
        {showDetails && (
          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <p><strong>서버 시간:</strong> {status.serverTime}</p>
            <p><strong>연결 사용자:</strong> {status.users}명</p>
            <p><strong>상태:</strong> {status.isOnline ? 'Online' : 'Offline'}</p>
          </div>
        )}
        <pre style={codeStyle}>
{`{showDetails && (
  <div>상세 정보...</div>
)}`}
        </pre>
      </div>

      {/* 패턴 6: 옵셔널 체이닝 */}
      <div style={sectionStyle}>
        <h3>패턴 6: null/undefined 안전하게 처리</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          ?. 와 ?? 연산자로 안전하게 값을 표시합니다.
        </p>
        <p>서버 시간: <strong>{status?.serverTime ?? '알 수 없음'}</strong></p>
        <pre style={codeStyle}>
{`// 옵셔널 체이닝: 객체가 null이면 undefined 반환
{status?.serverTime}

// Nullish coalescing: null/undefined일 때 기본값
{status?.serverTime ?? '알 수 없음'}`}
        </pre>
      </div>

      {/* 주의사항 */}
      <div style={{ ...sectionStyle, backgroundColor: '#fff3cd' }}>
        <h3>⚠️ 주의사항: 0과 빈 문자열</h3>
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', marginTop: '10px' }}>
          <p style={{ marginBottom: '10px' }}><strong>❌ 잘못된 예:</strong></p>
          <pre style={{ ...codeStyle, backgroundColor: '#ffebee' }}>
{`{status.users && <p>사용자: {status.users}</p>}
// 문제: users가 0이면 화면에 "0"이 표시됨!`}
          </pre>

          <p style={{ marginTop: '15px', marginBottom: '10px' }}><strong>✅ 올바른 예:</strong></p>
          <pre style={{ ...codeStyle, backgroundColor: '#e8f5e9' }}>
{`{status.users > 0 && <p>사용자: {status.users}</p>}
// 또는
{status.users ? <p>사용자: {status.users}</p> : <p>사용자 없음</p>}`}
          </pre>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
            <p><strong>💡 Why?</strong></p>
            <p style={{ fontSize: '14px' }}>
              JavaScript에서 0, "", null, undefined, false는 모두 falsy 값입니다.<br/>
              하지만 React는 0과 ""을 화면에 그대로 렌더링합니다!
            </p>
          </div>
        </div>
      </div>

      {/* 패턴 비교표 */}
      <div style={sectionStyle}>
        <h3>📊 패턴 비교</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>패턴</th>
              <th style={thStyle}>사용 시나리오</th>
              <th style={thStyle}>장점</th>
              <th style={thStyle}>단점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><strong>Early Return</strong></td>
              <td style={tdStyle}>로딩, 에러 상태</td>
              <td style={tdStyle}>중첩 감소</td>
              <td style={tdStyle}>여러 곳에 사용 불가</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>&& 연산자</strong></td>
              <td style={tdStyle}>단순 show/hide</td>
              <td style={tdStyle}>간결함</td>
              <td style={tdStyle}>falsy 값 주의</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>삼항 연산자</strong></td>
              <td style={tdStyle}>A or B 선택</td>
              <td style={tdStyle}>명확함</td>
              <td style={tdStyle}>중첩 시 가독성 저하</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>변수 저장</strong></td>
              <td style={tdStyle}>복잡한 조건</td>
              <td style={tdStyle}>가독성 높음</td>
              <td style={tdStyle}>코드 길어짐</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 실습 과제 */}
      <div style={{ ...sectionStyle, backgroundColor: '#e8f5e9' }}>
        <h3>🔬 실습 과제</h3>
        <ol>
          <li>Backend 서버를 중단시켜 에러 상태 확인</li>
          <li>status.users 값을 0으로 만들어 주의사항 확인</li>
          <li>각 패턴을 다른 패턴으로 변경해보기</li>
          <li>새로운 조건 추가 (예: serverTime이 특정 시간대일 때 메시지 표시)</li>
        </ol>
      </div>

      {/* 핵심 개념 */}
      <div style={{ ...sectionStyle, backgroundColor: '#e3f2fd' }}>
        <h3>💡 핵심 개념</h3>
        <ul>
          <li><strong>Early Return</strong>: 조기 리턴으로 중첩 줄이기</li>
          <li><strong>&& 연산자</strong>: 간단한 조건부 렌더링</li>
          <li><strong>삼항 연산자</strong>: A or B 선택</li>
          <li><strong>변수 저장</strong>: 복잡한 조건 로직 분리</li>
          <li><strong>falsy 값 주의</strong>: 0, "", null, undefined 구분</li>
        </ul>
      </div>
    </div>
  )
}

const centerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh'
}

const spinnerStyle: React.CSSProperties = {
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #1976d2',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 1s linear infinite'
}

const sectionStyle: React.CSSProperties = {
  border: '2px solid #e0e0e0',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  backgroundColor: 'white'
}

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '14px',
  cursor: 'pointer',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
}

const badgeStyle: React.CSSProperties = {
  padding: '4px 12px',
  color: 'white',
  borderRadius: '12px',
  fontSize: '12px',
  marginLeft: '8px',
  fontWeight: 'bold'
}

const codeStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  padding: '12px',
  borderRadius: '4px',
  fontSize: '13px',
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

export default Lecture5
