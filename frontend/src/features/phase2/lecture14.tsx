import { useState, useEffect } from 'react';

/**
 * [Step-14] Custom Hooks - 로직의 추상화와 재사용
 */

// --- 🛠 커스텀 훅: 마우스 위치 추적 ---
// [Technical Term] Encapsulation (캡슐화): 내부 상태 관리 로직을 숨기고 데이터만 제공
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}

// --- 🛠 커스텀 훅: 윈도우 창 크기 추적 ---
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

export function lecture14() {
  const [logs, setLogs] = useState<string[]>([]);
  
  // 커스텀 훅 호출 (UI와 로직의 완벽한 분리)
  const mouse = useMousePosition();
  const screen = useWindowSize();

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    // 🚨 Box Model Reset: 상단 여백 0, 중앙 정렬 최적화
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 그대로 복사 */}
      <header style={{ 
        paddingTop: '10px', 
        marginBottom: '15px', 
        borderBottom: '2px solid #f1f2f6' 
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: '800', 
          color: '#2d3436', 
          margin: '0', 
          padding: '5px 0' 
        }}>
          🚀 Step-14: Custom Hooks (로직의 재사용)
        </h1>
      </header>
      
      {/* 개념 카드 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>Custom Hook</strong>은 반복되는 <strong>Logic (로직)</strong>을 떼어내어 재사용 가능하게 만듭니다. 
          UI와 비즈니스 로직을 분리하여 <strong>Maintainability (유지보수성)</strong>를 극대화할 수 있습니다.
        </p>
      </section>

      {/* 데모 그리드: 2컬럼 레이아웃 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 마우스 추적 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#00cec9', margin: '0 0 8px 0' }}>📍 Mouse Tracker</h3>
          <div style={{ 
            padding: '10px', backgroundColor: '#f5f6fa', borderRadius: '5px', 
            fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' 
          }}>
            <div>X: <span style={{ fontWeight: 'bold', color: '#00cec9' }}>{mouse.x}px</span></div>
            <div>Y: <span style={{ fontWeight: 'bold', color: '#00cec9' }}>{mouse.y}px</span></div>
          </div>
          <button 
            onClick={() => addLog(`[Mouse] 위치 기록: ${mouse.x}, ${mouse.y}`)}
            style={{ width: '100%', marginTop: '10px', padding: '8px', backgroundColor: '#00cec9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
          >
            현재 위치 기록
          </button>
        </div>

        {/* 창 크기 추적 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#fdcb6e', margin: '0 0 8px 0' }}>📏 Window Resizer</h3>
          <div style={{ 
            padding: '10px', backgroundColor: '#2d3436', color: '#fff', borderRadius: '5px', 
            fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' 
          }}>
            <div>W: <span style={{ fontWeight: 'bold', color: '#fdcb6e' }}>{screen.width}px</span></div>
            <div>H: <span style={{ fontWeight: 'bold', color: '#fdcb6e' }}>{screen.height}px</span></div>
          </div>
          <p style={{ fontSize: '10px', marginTop: '8px', color: '#a4b0be', textAlign: 'center' }}>
            창 크기를 조절해 보세요!
          </p>
        </div>
      </div>

      {/* 로그 구역: Hook Execution Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Hook Execution Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Watching hook activities...</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Abstraction (추상화):</strong> 복잡한 <code>addEventListener</code> 로직을 훅 내부로 숨겨 코드가 훨씬 간결해졌습니다.
        </p>
      </footer>
    </div>
  );
}