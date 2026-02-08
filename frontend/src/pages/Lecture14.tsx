import { useState, useEffect } from 'react';

/**
 * [Step-14] Custom Hooks - 로직의 추상화와 재사용
 * 💡 핵심 포인트:
 * 1. Custom Hook (커스텀 훅): 리액트의 내장 훅들을 조합하여 만든 나만의 고유한 훅입니다. 이름은 반드시 'use'로 시작해야 합니다.
 * 2. Abstraction (추상화): 복잡한 내부 동작 로직은 숨기고, 사용자에게는 꼭 필요한 인터페이스만 노출하는 과정입니다.
 * 3. Logic Reuse (로직 재사용): 컴포넌트에서 UI(HTML)와 로직(JS)을 분리하여, 동일한 기능을 여러 곳에서 중복 없이 쓸 수 있게 합니다.
 */

// --- 🛠 커스텀 훅: 마우스 위치 추적 로직 ---
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position; // 필요한 데이터만 반환
}

// --- 🛠 커스텀 훅: 윈도우 창 크기 추적 로직 ---
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default function Lecture14() {
  const [logs, setLogs] = useState<string[]>([]);
  
  // 커스텀 훅 호출 (UI와 로직의 완벽한 분리)
  const mouse = useMousePosition();
  const screen = useWindowSize();

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-14: Custom Hooks (로직의 재사용)</h1>

      <section className="lecture-section">
        <h2>1. 커스텀 훅이 필요한 이유</h2>
        <p>
          컴포넌트 안에 <code>useEffect</code>와 <code>useState</code>가 너무 많아지면 코드를 읽기 힘들어집니다. 
          이때 공통된 로직을 <strong>Custom Hook</strong>으로 따로 빼내면, 비즈니스 로직은 간결해지고 
          <strong>Maintainability (유지보수성)</strong>은 비약적으로 향상됩니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 마우스 추적 카드 */}
        <div className="lecture-card">
          <h3>📍 Mouse Tracker (Custom Hook)</h3>
          <p><code>useMousePosition</code> 훅을 사용하여 좌표를 실시간으로 받아옵니다.</p>
          <div className="display-box" style={{ flexDirection: 'column', gap: '5px' }}>
            <div>X 좌표: <span style={{ color: '#00cec9' }}>{mouse.x}px</span></div>
            <div>Y 좌표: <span style={{ color: '#00cec9' }}>{mouse.y}px</span></div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={() => addLog(`[Mouse] 현재 좌표: ${mouse.x}, ${mouse.y}`)}>
            현재 위치 기록
          </button>
        </div>

        {/* 창 크기 추적 카드 */}
        <div className="lecture-card">
          <h3>📏 Window Resizer (Custom Hook)</h3>
          <p><code>useWindowSize</code> 훅을 사용하여 브라우저 크기를 감지합니다.</p>
          <div className="display-box" style={{ flexDirection: 'column', gap: '5px', backgroundColor: '#2d3436' }}>
            <div>Width: <span style={{ color: '#fdcb6e' }}>{screen.width}px</span></div>
            <div>Height: <span style={{ color: '#fdcb6e' }}>{screen.height}px</span></div>
          </div>
          <p style={{ fontSize: '11px', marginTop: '10px', color: '#636e72' }}>브라우저 창 크기를 조절해 보세요!</p>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Hook Execution Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 로직의 재사용성을 테스트해 보세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 커스텀 훅 내부에서 상태(State)가 바뀌면, 해당 훅을 사용하는 <strong>모든 컴포넌트가 리렌더링</strong>됩니다. 
          따라서 훅을 설계할 때는 성능에 무리가 가지 않도록 필요한 데이터만 <strong>Return (반환)</strong>하는 것이 기술입니다.
        </p>
      </footer>
    </div>
  );
}