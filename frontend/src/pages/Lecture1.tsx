import { useState } from 'react';

/**
 * [Step-1] React의 역사와 Virtual DOM (가상 돔)의 원리
 * 💡 핵심 포인트:
 * 1. Real DOM (실제 돔): 브라우저가 화면을 그리는 실제 구조물입니다. 수정 시 비용이 많이 듭니다.
 * 2. Virtual DOM (가상 돔): 리액트가 메모리에 유지하는 가벼운 복사본입니다.
 * 3. Diffing (비교): 리액트가 '바뀐 부분'만 찾아내는 과정입니다.
 * 4. Reconciliation (재조정): 비교 결과를 실제 화면에 효율적으로 반영하는 알고리즘입니다.
 */

export default function Lecture1() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 1. 실제 DOM 조작 (직접 접근하는 비효율적 방식)
  const handleRealDOMUpdate = () => {
    const startTime = performance.now();
    const displayEl = document.getElementById('real-dom-display');
    
    // 강제로 1000번의 DOM 접근 발생
    for (let i = 0; i < 1000; i++) {
      if (displayEl) displayEl.innerText = `Real DOM 직접 조작 중: ${i}`;
    }

    const endTime = performance.now();
    addLog(`[Real DOM] 1000번 조작 완료 (${(endTime - startTime).toFixed(4)}ms)`);
  };

  // 2. 가상 DOM 방식 (리액트 상태 관리 방식)
  const handleVirtualDOMUpdate = () => {
    const startTime = performance.now();
    
    // 리액트에게 상태가 바뀌었음을 알립니다 (가상 돔 업데이트 예약)
    setCount(prev => prev + 1);
    
    const endTime = performance.now();
    addLog(`[Virtual DOM] 상태 변경 완료 (${(endTime - startTime).toFixed(4)}ms)`);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-1: React의 역사와 Virtual DOM</h1>
      
      <section className="lecture-section">
        <h2>1. 개념 이해</h2>
        <p>
          리액트는 화면 전체를 매번 다시 그리는 대신, 메모리에 <strong>가상 돔(Virtual DOM)</strong>이라는 가짜 설계도를 먼저 그립니다. 
          데이터가 바뀌면 이전 설계도와 새 설계도를 비교(Diffing)하여, <strong>바뀐 부분만</strong> 실제 브라우저 화면에 업데이트합니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 가상 돔 시뮬레이터 */}
        <div className="lecture-card">
          <h3>✅ React (Virtual DOM)</h3>
          <p>리액트는 상태(State)만 관리하고 최적화는 엔진에 맡깁니다.</p>
          <button onClick={handleVirtualDOMUpdate} className="btn btn-success">
            상태 변경 (Count: {count})
          </button>
          
          <div className="display-box">
            현재 상태값: {count}
          </div>
        </div>

        {/* 실제 DOM 시뮬레이터 */}
        <div className="lecture-card">
          <h3>❌ Vanilla JS (Real DOM)</h3>
          <p>브라우저 요소에 직접 접근하여 매번 강제로 다시 그립니다.</p>
          <button onClick={handleRealDOMUpdate} className="btn btn-danger">
            DOM 직접 조작 (1000번)
          </button>
          
          <div id="real-dom-display" className="display-box" style={{ color: '#ff7675' }}>
            대기 중...
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Rendering Performance Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 상단 버튼을 눌러 성능 차이를 확인하세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 리액트의 가상 돔은 <strong>Batch Update(일괄 업데이트, 여러 변경사항을 모아서 한 번에 처리하는 것)</strong>를 통해 불필요한 렌더링을 획기적으로 줄여줍니다.
        </p>
      </footer>
    </div>
  );
}