import { useState } from 'react';

/**
 * [Step-6] State (상태) - 컴포넌트의 기억 장치
 * 💡 핵심 포인트:
 * 1. State (상태): 컴포넌트 내부에서 변할 수 있는 동적인 데이터입니다.
 * 2. useState Hook (훅): 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 리액트의 내장 함수입니다.
 * 3. Immutable (불변성): 리액트의 상태는 직접 수정하면 안 되며, 반드시 'set' 함수를 통해 새 값을 전달해야 합니다.
 * 4. Re-rendering (리렌더링): 상태가 변경되면 리액트는 해당 컴포넌트를 다시 그려 UI를 최신화합니다.
 */

export default function Lecture6() {
  // 1. 상태 선언: [현재값, 변경함수] = useState(초기값)
  const [count, setCount] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 비즈니스 로직: 카운트 증가
  const handleIncrement = () => {
    setCount(prev => prev + 1); // prev: 이전 상태값을 안전하게 참조하는 함수형 업데이트
    addLog(`[State] 카운트 증가: ${count + 1}`);
  };

  // 비즈니스 로직: 토글 스위치
  const handleToggle = () => {
    setIsToggled(!isToggled);
    addLog(`[State] 토글 변경: ${!isToggled ? 'ON' : 'OFF'}`);
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-6: State (상태) - 컴포넌트의 기억 장치</h1>

      <section className="lecture-section">
        <h2>1. State는 왜 필요한가?</h2>
        <p>
          일반 자바스크립트 변수는 값이 변해도 화면이 바뀌지 않습니다. 하지만 <strong>State (상태)</strong>는 값이 바뀌는 순간 리액트에게 
          "데이터가 변했으니 화면을 다시 그려줘!"라고 신호를 보냅니다. 이를 통해 인터랙티브한 UI를 구현할 수 있습니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 카운터 실습 카드 */}
        <div className="lecture-card">
          <h3>🔢 Counter (숫자 기억)</h3>
          <p>버튼을 누를 때마다 <code>count</code> 상태가 1씩 증가합니다.</p>
          <div className="display-box" style={{ justifyContent: 'center', fontSize: '24px' }}>
            {count}
          </div>
          <button className="btn btn-primary" onClick={handleIncrement} style={{ width: '100%', marginTop: '10px' }}>
            Count Up!
          </button>
        </div>

        {/* 토글 실습 카드 */}
        <div className="lecture-card">
          <h3>🔘 Toggle (불리언 기억)</h3>
          <p>상태를 이용해 <strong>Conditional Rendering (조건부 렌더링)</strong>을 구현합니다.</p>
          <div className={`display-box ${isToggled ? 'active' : ''}`} 
               style={{ 
                 backgroundColor: isToggled ? '#2ecc71' : '#2d3436', 
                 color: 'white',
                 justifyContent: 'center'
               }}>
            현재 모드: {isToggled ? 'LIGHT ON' : 'DARK OFF'}
          </div>
          <button className="btn btn-success" onClick={handleToggle} style={{ width: '100%', marginTop: '10px' }}>
            Switch Toggle
          </button>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 State Change History</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 컴포넌트의 기억을 조작해보세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 리액트 상태 업데이트는 <strong>Asynchronous (비동기, 작업이 순차적으로 완료되지 않고 예약되는 것)</strong>로 동작합니다. 
          따라서 연속적으로 상태를 바꿀 때는 <code>setCount(count + 1)</code> 대신 <code>setCount(prev =&gt; prev + 1)</code> 처럼 함수형 업데이트를 사용하는 것이 안전합니다.
        </p>
      </footer>
    </div>
  );
}