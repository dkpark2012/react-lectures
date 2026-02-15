import { useState, useRef } from 'react';

/**
 * [Step-12] useRef - DOM 직접 제어와 값 보존
 */
export function lecture12() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 1. DOM 접근을 위한 Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. 값 보존을 위한 Ref (리렌더링을 유발하지 않음)
  const renderCountRef = useRef<number>(0);
  renderCountRef.current += 1; // [Technical Term] Side Effect: 렌더링마다 값 누적

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleFocus = () => {
    // [Technical Term] Imperative API (명령형 API): DOM에 직접 접근하여 focus 명령 수행
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
    // 🚨 Box Model Reset: 상단 여백 제거 및 레이아웃 통일
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 상속 */}
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
          🚀 Step-12: useRef (DOM 접근 및 값 유지)
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
          <strong>useRef</strong>는 값이 변해도 <strong>Re-rendering (리렌더링)</strong>을 유발하지 않는 비밀 상자입니다. 
          주로 <strong>Focus (포커스)</strong> 제어나, 렌더링 횟수 측정처럼 UI와 무관한 데이터를 보관할 때 사용합니다.
        </p>
      </section>

      {/* 데모 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* DOM 제어 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🎯 DOM Focus</h3>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="포커스 테스트..."
            style={{ 
              width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', 
              fontSize: '12px', marginBottom: '10px', outline: 'none', transition: '0.3s'
            }}
          />
          <button 
            onClick={handleFocus} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            Direct Focus
          </button>
        </div>

        {/* 값 보존 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 8px 0' }}>📦 Value Persistence</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' 
          }}>
            State: {count}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              onClick={() => setCount(count + 1)} 
              style={{ flex: 1, padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
            >
              Re-render
            </button>
            <button 
              onClick={checkInternalValue} 
              style={{ flex: 1, padding: '8px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
            >
              Check Ref
            </button>
          </div>
        </div>
      </div>

      {/* 로그 구역: Reference Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Reference Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Interaction logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Mutable Object (가변 객체):</strong> <code>.current</code> 속성은 자유롭게 수정 가능하지만 UI를 업데이트하진 않습니다.
        </p>
      </footer>
    </div>
  );
}