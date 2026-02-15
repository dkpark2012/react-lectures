import { useState, useRef, FormEvent } from 'react';

export function lecture28() {
  const [logs, setLogs] = useState<string[]>([]);
  
  // 1️⃣ [Technical Term] Controlled Component State
  // 입력값이 바뀔 때마다 리액트 상태가 업데이트됩니다.
  const [controlledValue, setControlledValue] = useState('');

  // 2️⃣ [Technical Term] Uncontrolled Component Ref
  // DOM 노드에 직접 접근하여 필요할 때만 값을 가져옵니다.
  const uncontrolledRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const uncontrolledValue = uncontrolledRef.current?.value || '';
    
    addLog(`Controlled: ${controlledValue} | Uncontrolled: ${uncontrolledValue}`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 28: 제어 컴포넌트 vs 비제어 컴포넌트
        </h1>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        {/* 제어 컴포넌트 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6c5ce7', margin: '0 0 10px 0' }}>🎮 Controlled Component</h3>
          <input 
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Real-time validation 가능"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: '11px', color: '#747d8c', marginTop: '8px' }}>
            입력값: {controlledValue || '(비어 있음)'}
          </p>
        </div>

        {/* 비제어 컴포넌트 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#00b894', margin: '0 0 10px 0' }}>🏗️ Uncontrolled Component</h3>
          <input 
            type="text"
            ref={uncontrolledRef}
            placeholder="필요할 때만 값 참조"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: '11px', color: '#747d8c', marginTop: '8px' }}>
            Ref를 사용하여 DOM에서 직접 값을 추출합니다.
          </p>
        </div>

        <button 
          type="submit" 
          style={{ gridColumn: 'span 2', padding: '10px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          데이터 비교 및 제출
        </button>
      </form>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture Review</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            - <strong>Controlled</strong>: 실시간 유효성 검사, 조건부 활성화 등에 유리하지만 리렌더링이 잦음<br/>
            - <strong>Uncontrolled</strong>: **[Technical Term] Single Source of Truth (데이터의 단일 원천)** 원칙에 따라 DOM이 데이터를 관리하며, 성능상 이점이 있을 수 있음<br/>
            - <strong>[Technical Term] useRef Hook</strong>: 비제어 방식에서 DOM 노드에 접근하기 위한 핵심 도구
          </div>
        </div>
      </div>

      <section style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📋 Activity Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- No logs available.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '8px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}