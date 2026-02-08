import { useEffect, useState } from 'react'

function Lecture2() {
  const [count, setCount] = useState<number>(0)
  const [query, setQuery] = useState<string>('')
  
  console.log('🎨 Lecture2 렌더링!')

  useEffect(() => {
    console.log('1️⃣ 의존성 없음: 매번 실행됨')
  })

  useEffect(() => {
    console.log('2️⃣ 빈 배열 []: 최초 1회만 실행')
    
    return () => {
      console.log('2️⃣ cleanup: 컴포넌트 언마운트 시')
    }
  }, [])

  useEffect(() => {
    console.log('3️⃣ count 변경됨:', count)
  }, [count])

  useEffect(() => {
    console.log('4️⃣ 검색어 변경:', query)
    
    const timer = setTimeout(() => {
      console.log('4️⃣ API 호출 시뮬레이션:', query)
    }, 500)

    return () => {
      console.log('4️⃣ cleanup: 이전 타이머 취소')
      clearTimeout(timer)
    }
  }, [query])

  return (
    <div>
      <h1>📚 Lecture 2: useEffect 의존성 배열</h1>
      
      <div style={sectionStyle}>
        <h2>학습 목표</h2>
        <ul>
          <li>useEffect의 실행 타이밍 이해</li>
          <li>의존성 배열의 역할 완벽히 파악</li>
          <li>cleanup 함수의 용도 이해</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h3>실험: State 변경</h3>
        <p>Count: <strong style={{ fontSize: '24px', color: '#1976d2' }}>{count}</strong></p>
        <button onClick={() => setCount(count + 1)} style={buttonStyle}>
          Count 증가
        </button>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>검색어: </label>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="입력해보세요..."
            style={{ padding: '10px', fontSize: '14px', marginLeft: '10px', width: '300px' }}
          />
          <p style={{ marginTop: '10px' }}>입력값: <strong>{query}</strong></p>
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#e3f2fd' }}>
        <h3>📝 관찰 포인트</h3>
        <ol>
          <li>페이지 로드 시 어떤 effect가 실행되는가?</li>
          <li>Count 증가 버튼 클릭 시 어떤 effect가 실행되는가?</li>
          <li>검색어 입력 시 cleanup이 언제 실행되는가?</li>
          <li>검색어를 빠르게 입력하면 디바운싱이 작동하는가?</li>
        </ol>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#fff3cd' }}>
        <h3>💡 핵심 개념</h3>
        <ul>
          <li><strong>의존성 배열 없음</strong>: 매 렌더링마다 실행 (비권장)</li>
          <li><strong>빈 배열 []</strong>: 마운트 시 1회만 (componentDidMount)</li>
          <li><strong>[dep]</strong>: dep 변경 시마다 실행</li>
          <li><strong>cleanup</strong>: 다음 effect 실행 전 또는 언마운트 시 실행</li>
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

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '14px',
  cursor: 'pointer',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
}

export default Lecture2