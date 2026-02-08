import { useState, useRef } from 'react';

/**
 * [Step-12] useRef - DOM 직접 제어와 값 보존
 * 💡 핵심 포인트:
 * 1. useRef: 리렌더링 사이에서도 값을 유지하지만, 값이 변해도 화면을 다시 그리지 않는 '상자' 같은 훅입니다.
 * 2. Reference (참조): .current 속성을 통해 실제 DOM 노드나 특정 값에 접근합니다.
 * 3. Focus Management (포커스 관리): 특정 입력창에 커서를 두는 등 명령형(Imperative) 작업이 필요할 때 주로 사용합니다.
 * 4. State vs Ref: State는 변경 시 화면을 갱신(UI Update)하지만, Ref는 조용히 데이터만 유지합니다.
 */

export default function Lecture12() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 1. DOM 접근을 위한 Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. 값 보존을 위한 Ref (리렌더링을 유발하지 않음)
  const renderCountRef = useRef<number>(0);
  renderCountRef.current += 1; // 컴포넌트가 그려질 때마다 1씩 증가

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleFocus = () => {
    // inputRef.current를 통해 실제 input 엘리먼트에 직접 접근
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#fff9db';
      addLog('[DOM] input 요소에 강제 포커스를 주었습니다.');
    }
  };

  const checkInternalValue = () => {
    addLog(`[Ref] 현재까지의 총 리렌더링 횟수: ${renderCountRef.current}`);
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-12: useRef (DOM 접근 및 값 유지)</h1>

      <section className="lecture-section">
        <h2>1. 언제 useRef를 사용할까요?</h2>
        <p>
          리액트는 기본적으로 선언적이지만, <strong>Focus (포커스 제어)</strong>, <strong>Scroll (스크롤 위치 측정)</strong>, 
          <strong>Animation (외부 라이브러리 연동)</strong>처럼 실제 DOM을 건드려야 할 때 <code>useRef</code>를 사용합니다. 
          또한, 리렌더링을 원치 않는 <strong>Variable (변수)</strong>를 관리할 때도 매우 유용합니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* DOM 제어 실습 카드 */}
        <div className="lecture-card">
          <h3>🎯 DOM Focus Control</h3>
          <p>버튼을 누르면 아래 Input에 <strong>Direct Access (직접 접근)</strong> 합니다.</p>
          <input 
            ref={inputRef}
            type="text" 
            className="display-box" 
            style={{ width: '100%', border: '1px solid #ddd', color: '#fff' }}
            placeholder="여기에 포커스가 잡힙니다."
          />
          <button className="btn btn-primary" onClick={handleFocus} style={{ width: '100%', marginTop: '10px' }}>
            입력창으로 포커스 이동
          </button>
        </div>

        {/* 값 보존 실습 카드 */}
        <div className="lecture-card">
          <h3>📦 Value Persistence</h3>
          <p>State가 변해도 <code>renderCountRef</code>는 초기화되지 않고 유지됩니다.</p>
          <div className="display-box" style={{ justifyContent: 'center', fontSize: '20px' }}>
            State Count: {count}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button className="btn btn-success" onClick={() => setCount(count + 1)} style={{ flex: 1 }}>
              State 변경 (Re-render)
            </button>
            <button className="btn btn-danger" onClick={checkInternalValue} style={{ flex: 1 }}>
              Ref 값 확인 (No Render)
            </button>
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Reference Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- Ref의 동작을 확인해보세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> Ref의 <code>.current</code> 값을 변경하는 것은 리액트의 <strong>Lifecycle (생명주기)</strong>에 아무런 영향을 주지 않습니다. 
          화면에 즉시 보여줘야 하는 값은 <strong>State</strong>로, 로직 내부에서만 쓰이는 값은 <strong>Ref</strong>로 관리하는 것이 정석입니다.
        </p>
      </footer>
    </div>
  );
}