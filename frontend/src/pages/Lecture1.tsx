import { useState } from 'react'

function Lecture1() {
  const [count, setCount] = useState<number>(0)
  
  console.log('🎨 Lecture1 렌더링!', new Date().toLocaleTimeString())

  let normalVariable = 0
  
  const incrementNormal = () => {
    normalVariable++
    console.log('일반 변수:', normalVariable)
  }

  const incrementState = () => {
    setCount(prevCount => {
      console.log('이전 count:', prevCount)
      return prevCount + 1
    })
  }

  const incrementMultiple = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }

  return (
    <div>
      <h1>📚 Lecture 1: State와 리렌더링</h1>
      
      <div style={sectionStyle}>
        <h2>학습 목표</h2>
        <ul>
          <li>useState가 리렌더링을 유발하는 원리 이해</li>
          <li>일반 변수와 State의 차이점 체감</li>
          <li>함수형 업데이트의 필요성 이해</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h3>실험 1: 일반 변수 vs State</h3>
        <p>일반 변수: {normalVariable}</p>
        <p>State 변수: <strong style={{ fontSize: '24px', color: '#1976d2' }}>{count}</strong></p>
        <button onClick={incrementNormal} style={buttonStyle}>
          일반 변수 증가 (화면 변경 없음)
        </button>
        <button onClick={incrementState} style={{ ...buttonStyle, backgroundColor: '#4caf50' }}>
          State 증가 (리렌더링!)
        </button>
      </div>

      <div style={sectionStyle}>
        <h3>실험 2: 연속 setState</h3>
        <p>Count: <strong style={{ fontSize: '24px', color: '#1976d2' }}>{count}</strong></p>
        <button onClick={incrementMultiple} style={{ ...buttonStyle, backgroundColor: '#ff9800' }}>
          3씩 증가 (함수형 업데이트)
        </button>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#fff3cd' }}>
        <h3>💡 핵심 개념</h3>
        <ul>
          <li><strong>일반 변수</strong>: 값이 변해도 화면 갱신 안 됨</li>
          <li><strong>State</strong>: 값 변경 시 자동 리렌더링</li>
          <li><strong>함수형 업데이트</strong>: <code>prev =&gt; prev + 1</code> 형태로 최신 값 보장</li>
        </ul>
        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
          💻 Console을 열어서 렌더링 로그를 확인하세요!
        </p>
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
  margin: '5px',
  padding: '12px 24px',
  fontSize: '14px',
  cursor: 'pointer',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
}

export default Lecture1