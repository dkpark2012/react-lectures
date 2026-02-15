import { useState, ReactNode } from 'react';

// 1️⃣ [Technical Term] Composition Container
// 범용적인 Card 컴포넌트를 정의하여 다양한 레이아웃에 재사용합니다.
interface CardProps {
  title: string;
  children: ReactNode;
  borderColor?: string;
}

function Card({ title, children, borderColor = '#eee' }: CardProps) {
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#fff', 
      borderRadius: '10px', 
      border: `2px solid ${borderColor}`, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)', 
      marginBottom: '10px' 
    }}>
      <h3 style={{ 
        fontSize: '14px', 
        color: borderColor === '#eee' ? '#6c5ce7' : borderColor, 
        margin: '0 0 10px 0' 
      }}>{title}</h3>
      {children}
    </div>
  );
}

export function lecture27() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 27: 컴포넌트 합성 (Composition)
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        {/* Case 1: Form Composition */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Card title="🔐 User Authentication" borderColor="#6c5ce7">
            <input 
              placeholder="Username" 
              style={{ width: '100%', marginBottom: '8px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
            />
            <button 
              onClick={() => addLog("Authentication process initiated.")}
              style={{ width: '100%', padding: '10px', backgroundColor: '#6c5ce7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login
            </button>
          </Card>

          <Card title="💡 System Info" borderColor="#e17055">
            <p style={{ fontSize: '12px', margin: 0, color: '#666', lineHeight: '1.5' }}>
              Component Composition allows developers to build complex UIs from simple, manageable building blocks.
            </p>
          </Card>
        </div>

        {/* Case 2: Technical Summary */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture Review</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Implicit Composition</strong>: 'children' prop을 통한 유연한 구조 설계<br/>
            - <strong>[Technical Term] Specialization</strong>: 범용 컴포넌트를 특정 목적에 맞게 구체화<br/>
            - <strong>[Technical Term] Containment</strong>: 컴포넌트가 하위 요소를 포함하는 방식의 재사용성 확보
          </div>
        </div>
      </div>

      {/* 실무형 로그 섹션 */}
      <section style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📋 Activity Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {/* 1️⃣ 조건부 렌더링 최적화: 빈 배열일 때의 처리 */}
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- No activities recorded.</div>
          ) : (
            /* 2️⃣ 리스트 렌더링: logs 배열을 순회하며 출력 */
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