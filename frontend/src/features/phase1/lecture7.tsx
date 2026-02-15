import React, { useState } from 'react';

/**
 * [Step-7] 이벤트 핸들링과 합성 이벤트 (Synthetic Event)
 */
export function lecture7() {
  const [inputValue, setInputValue] = useState<string>('');
  const [eventType, setEventType] = useState<string>('없음');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 1. 클릭 이벤트 핸들러 (SyntheticEvent 활용)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEventType(e.type);
    addLog(`[Click] 좌표: X(${e.clientX}), Y(${e.clientY})`);
  };

  // 2. 변경 이벤트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setEventType(e.type);
  };

  // 3. 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addLog(`[Keydown] 엔터 감지! 입력: ${inputValue}`);
      setInputValue('');
    }
  };

  return (
    // 🚨 Box Model Reset: 상단 여백 제거 및 중앙 정렬
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 */}
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
          🚀 Step-7: 이벤트 핸들링과 합성 이벤트
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
          리액트는 브라우저 이벤트를 감싼 <strong>Synthetic Event (합성 이벤트)</strong>를 사용하여 교차 브라우징을 지원합니다. 
          또한 <strong>Event Delegation (이벤트 위임)</strong>을 통해 메모리를 최적화합니다.
        </p>
      </section>

      {/* 데모 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 마우스 이벤트 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🖱 Mouse Event</h3>
          <button 
            onClick={handleClick} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
          >
            클릭 좌표 확인
          </button>
          <div style={{ padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center', color: '#57606f' }}>
            최근 이벤트: <strong>{eventType}</strong>
          </div>
        </div>

        {/* 입력 이벤트 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>⌨ Keyboard & Input</h3>
          <input 
            type="text" 
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="입력 후 엔터..."
            style={{ 
              width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', 
              fontSize: '12px', marginBottom: '10px', outline: 'none'
            }}
          />
          <div style={{ fontSize: '11px', color: '#a4b0be', textAlign: 'center' }}>
            실시간: {inputValue || '대기 중...'}
          </div>
        </div>
      </div>

      {/* 로그 구역 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Event Analysis Log</h3>
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
          💡 <strong>CamelCase:</strong> 리액트 이벤트는 <code>onClick</code>처럼 카멜 케이스로 작성해야 합니다.
        </p>
      </footer>
    </div>
  );
}