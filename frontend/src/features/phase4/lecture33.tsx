import { useState } from 'react';

// [Technical Term] Shared Layer - 공용 UI 컴포넌트 시뮬레이션
const SharedButton = ({ label, onClick, variant = 'primary' }: any) => (
  <button 
    onClick={onClick} 
    style={{ 
      padding: '8px 16px', 
      borderRadius: '5px', 
      border: 'none', 
      cursor: 'pointer',
      backgroundColor: variant === 'primary' ? '#4a90e2' : '#f1f2f6',
      color: variant === 'primary' ? 'white' : '#2d3436',
      fontWeight: 'bold'
    }}
  >
    {label}
  </button>
);

// [Technical Term] Entities Layer - 데이터 도메인 시뮬레이션
interface UserProfile {
  id: string;
  name: string;
  role: string;
}

// [Technical Term] Features Layer - 비즈니스 액션 로직
function UserRoleUpdateFeature({ user, onUpdate }: { user: UserProfile, onUpdate: (newRole: string) => void }) {
  return (
    <div style={{ padding: '10px', backgroundColor: '#f8faff', borderRadius: '8px' }}>
      <p style={{ fontSize: '12px', margin: '0 0 8px 0' }}>권한 변경: <strong>{user.name}</strong></p>
      <div style={{ display: 'flex', gap: '5px' }}>
        <SharedButton label="Admin" onClick={() => onUpdate('Admin')} variant="secondary" />
        <SharedButton label="User" onClick={() => onUpdate('User')} variant="secondary" />
      </div>
    </div>
  );
}

// [Technical Term] Widgets/Pages Layer - 컴포넌트 조립
export function lecture33() {
  const [user, setUser] = useState<UserProfile>({ id: '1', name: 'Zayoung', role: 'Developer' });
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleRoleChange = (newRole: string) => {
    setUser(prev => ({ ...prev, role: newRole }));
    addLog(`[Feature] User role changed to ${newRole}`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 33: FSD (Feature-Sliced Design) 아키텍처
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        {/* 아키텍처 데모 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 12px 0' }}>🏗️ Architecture Implementation</h3>
          <div style={{ padding: '15px', border: '1px solid #e1e8f0', borderRadius: '8px', marginBottom: '10px' }}>
            <p style={{ fontSize: '13px' }}>User: <strong>{user.name}</strong></p>
            <p style={{ fontSize: '13px' }}>Current Role: <span style={{ color: '#e67e22' }}>{user.role}</span></p>
          </div>
          
          {/* Features 계층의 컴포넌트 활용 */}
          <UserRoleUpdateFeature user={user} onUpdate={handleRoleChange} />
        </div>

        {/* 이론 설명 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#388e3c', margin: '0 0 8px 0' }}>💡 FSD Key Principles</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Public API (index.ts)</strong>: 각 슬라이스는 외부로 노출할 요소만 `index.ts`를 통해 내보냅니다.<br/>
            - <strong>[Technical Term] Unidirectional Data Flow</strong>: 계층은 위에서 아래로만 참조 가능하며, 같은 계층끼리는 참조가 금지됩니다.<br/>
            - <strong>Isolation</strong>: 각 기능이 독립적이므로 수정 시 영향 범위를 최소화합니다.<br/>
            - <strong>Predictability</strong>: 폴더 구조만 봐도 어떤 코드가 어디에 있을지 예측 가능합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Architecture Logic Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#212529', color: '#61dafb', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '100px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#6c757d' }}>- Interaction log will be displayed here.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #61dafb', paddingLeft: '8px' }}>{log}</div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}