import { useState } from 'react';

export function lecture1() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleRealDOMUpdate = () => {
    const startTime = performance.now();
    const displayEl = document.getElementById('real-dom-display');
    for (let i = 0; i < 1000; i++) {
      if (displayEl) displayEl.innerText = `Direct Access: ${i}`;
    }
    const endTime = performance.now();
    addLog(`[Real DOM] 1000회 조작: ${(endTime - startTime).toFixed(4)}ms`);
  };

  const handleVirtualDOMUpdate = () => {
    const startTime = performance.now();
    setCount(prev => prev + 1);
    const endTime = performance.now();
    addLog(`[Virtual DOM] 상태 갱신: ${(endTime - startTime).toFixed(4)}ms`);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    // 🚨 [Technical Term] Box Model Reset (박스 모델 초기화)
    // padding 상단을 0으로 잡고 margin-top을 죽여서 천장에 딱 붙였습니다!
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: margin-top: 0으로 상단 여백 박살! */}
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
          🚀 Step-1: Virtual DOM의 원리
        </h1>
      </header>
      
      {/* 개념 카드: 간격 더 타이트하게 조정 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          리액트는 메모리에 <strong>Virtual DOM</strong>을 유지하며, 바뀐 부분만 골라 실제 화면을 바꿉니다.
        </p>
      </section>

      {/* 데모 그리드: 여백 최적화 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>✅ React (Virtual DOM)</h3>
          <button onClick={handleVirtualDOMUpdate} style={{ width: '100%', padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Count: {count}
          </button>
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center' }}>
            State: <strong>{count}</strong>
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 8px 0' }}>❌ Vanilla JS (Real DOM)</h3>
          <button onClick={handleRealDOMUpdate} style={{ width: '100%', padding: '8px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Direct DOM
          </button>
          <div id="real-dom-display" style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center', color: '#ff4757' }}>
            Ready...
          </div>
        </div>
      </div>

      {/* 로그 구역: 콤팩트하게 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Performance Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Performance logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 Virtual DOM enables efficient UI updates.
        </p>
      </footer>
    </div>
  );
}