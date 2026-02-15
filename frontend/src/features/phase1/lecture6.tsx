import { useState } from 'react';

/**
 * [Step-6] State (상태) - 컴포넌트의 기억 장치
 */
export function lecture6() {
  // 1. 상태 선언: [현재값, 변경함수] = useState(초기값)
  const [count, setCount] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleIncrement = () => {
    setCount(prev => prev + 1); // [Technical Term] Functional Update: 이전 상태를 안전하게 참조
    addLog(`[State] 카운트 증가: ${count + 1}`);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    addLog(`[State] 토글 변경: ${!isToggled ? 'ON' : 'OFF'}`);
  };

  return (
    // 🚨 Box Model Reset: 상단 여백 0, 중앙 정렬
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 스타일 규격 */}
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
          🚀 Step-6: State (상태) - 컴포넌트의 기억 장치
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
          <strong>State (상태)</strong>는 값이 바뀌면 리액트에게 <strong>Re-rendering (리렌더링: 화면을 다시 그림)</strong> 신호를 보냅니다. 
          상태는 반드시 <strong>Immutable (불변성: 원본을 직접 수정하지 않음)</strong>을 지켜야 합니다.
        </p>
      </section>

      {/* 데모 그리드: 2컬럼 레이아웃 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 카운터 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🔢 Counter</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' 
          }}>
            {count}
          </div>
          <button 
            onClick={handleIncrement} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Count Up!
          </button>
        </div>

        {/* 토글 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>🔘 Toggle</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: isToggled ? '#2ecc71' : '#2d3436', color: 'white', 
            borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', transition: '0.3s'
          }}>
            {isToggled ? 'LIGHT ON' : 'DARK OFF'}
          </div>
          <button 
            onClick={handleToggle} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Switch Toggle
          </button>
        </div>
      </div>

      {/* 로그 구역: 콤팩트 다크 모드 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 State Change History</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Waiting for state changes...</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Asynchronous (비동기):</strong> 상태 업데이트는 예약제로 동작하므로 함수형 업데이트가 권장됩니다.
        </p>
      </footer>
    </div>
  );
}