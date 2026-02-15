import { useState } from 'react';

/**
 * [Step-5] Props를 이용한 데이터 흐름 제어
 */

// 1. 자식 컴포넌트: 부모로부터 받은 데이터를 화면에 그리기만 함
interface UserCardProps {
  name: string;
  role: string;
  themeColor: string;
  onHello: (name: string) => void;
}

const UserCard = ({ name, role, themeColor, onHello }: UserCardProps) => {
  return (
    <div style={{ 
      padding: '12px', 
      backgroundColor: '#f8faff', 
      borderRadius: '8px', 
      borderLeft: `5px solid ${themeColor}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ fontSize: '15px', margin: '0 0 5px 0', color: '#2d3436' }}>{name}</h3>
      <p style={{ fontSize: '12px', color: '#636e72', margin: '0 0 10px 0' }}>역할: <strong>{role}</strong></p>
      <button 
        onClick={() => onHello(name)}
        style={{ 
          width: '100%', padding: '6px', backgroundColor: themeColor, 
          color: 'white', border: 'none', borderRadius: '4px', 
          cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' 
        }}
      >
        인사하기
      </button>
    </div>
  );
};

export function lecture5() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState({
    name: '김리액트',
    role: 'Frontend Developer',
    color: '#3498db'
  });

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleHello = (targetName: string) => {
    addLog(`[Event] ${targetName}님에게 Props 함수 실행!`);
  };

  const changeUser = () => {
    setCurrentUser({
      name: '이비트',
      role: 'System Architect',
      color: '#2ecc71'
    });
    addLog('[Update] 부모 State 변경 -> 자식 Props 갱신');
  };

  return (
    // 🚨 [Technical Term] Box Model Reset: 상단 여백 0
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1과 동일 수치 */}
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
          🚀 Step-5: Props와 단방향 데이터 흐름
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
          리액트에서 데이터는 <strong>Parent(부모)</strong>에서 <strong>Child(자식)</strong>로만 흐릅니다. 
          자식은 전달받은 <strong>Props(프롭스: 읽기 전용 데이터)</strong>를 직접 수정할 수 없습니다.
        </p>
      </section>

      {/* 데모 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 부모 컨트롤러 영역 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>🏢 Parent (부모)</h3>
          <button 
            onClick={changeUser} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            사용자 정보 변경
          </button>
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '11px', color: '#57606f', wordBreak: 'break-all', fontFamily: 'monospace' }}>
            State: {JSON.stringify(currentUser)}
          </div>
        </div>

        {/* 자식 출력 영역 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 8px 0' }}>👤 Child (자식)</h3>
          <UserCard 
            name={currentUser.name}
            role={currentUser.role}
            themeColor={currentUser.color}
            onHello={handleHello}
          />
        </div>
      </div>

      {/* 로그 구역 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Data Flow Log</h3>
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
          💡 <strong>One-way Data Flow (단방향 데이터 흐름):</strong> 데이터는 위에서 아래로 흐를 뿐입니다.
        </p>
      </footer>
    </div>
  );
}