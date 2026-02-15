import { useState } from 'react';

/**
 * [Step-16] React Router - SPA (싱글 페이지 애플리케이션) 라우팅 원리
 */
export function lecture16() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 가상 라우팅 핸들러
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    addLog(`[Route] 주소 변경: ${path} (No Refresh)`);
  };

  /**
   * 🧱 [Technical Term] Conditional Rendering (조건부 렌더링):
   * 현재 경로(state)에 따라 어떤 UI를 보여줄지 결정하는 라우터의 심장부입니다!
   */
  const renderContent = () => {
    const boxStyle = { 
      padding: '15px', 
      borderRadius: '8px', 
      color: 'white', 
      fontWeight: 'bold' as const,
      fontSize: '13px',
      textAlign: 'center' as const
    };

    switch (currentPath) {
      case '/profile':
        return <div style={{ ...boxStyle, backgroundColor: '#3498db' }}>👤 Profile Component Active</div>;
      case '/settings':
        return <div style={{ ...boxStyle, backgroundColor: '#e67e22' }}>⚙️ Settings Component Active</div>;
      case '/':
      default:
        return <div style={{ ...boxStyle, backgroundColor: '#2ecc71' }}>🏠 Home Component Active</div>;
    }
  };

  return (
    // 🚨 Box Model Reset: 상단 여백 제거 및 레이아웃 통일
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
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
          🚀 Step-16: SPA 라우팅의 원리 (Final)
        </h1>
      </header>
      
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>SPA</strong>는 최초 로드 후 페이지 이동 시 <strong>Refresh (새로고침)</strong> 없이 컴포넌트만 교체합니다. 
          브라우저의 <strong>History API</strong>를 사용하여 사용자에게 매끄러운 경험을 제공하는 것이 핵심입니다.
        </p>
      </section>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 네비게이션 가상 시뮬레이터 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🧭 Virtual Navigator</h3>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
            <button onClick={() => handleNavigate('/')} style={{ flex: 1, padding: '8px', backgroundColor: '#f1f2f6', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Home</button>
            <button onClick={() => handleNavigate('/profile')} style={{ flex: 1, padding: '8px', backgroundColor: '#f1f2f6', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Profile</button>
            <button onClick={() => handleNavigate('/settings')} style={{ flex: 1, padding: '8px', backgroundColor: '#f1f2f6', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Settings</button>
          </div>
          <div style={{ padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '11px' }}>
            <span style={{ color: '#636e72' }}>📍 URL: </span>
            <code style={{ color: '#1a73e8', fontWeight: 'bold' }}>https://my-app.com{currentPath}</code>
          </div>
        </div>

        {/* 라우팅 결과물 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>🖼 Rendered View</h3>
          <div style={{ marginTop: '5px' }}>
            {renderContent()}
          </div>
          <p style={{ fontSize: '10px', color: '#a4b0be', marginTop: '10px', textAlign: 'center' }}>
            상태(Path)에 따라 다른 컴포넌트가 마운트됩니다.
          </p>
        </div>
      </div>

      {/* 로그 구역: Navigation History Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Navigation History Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Navigate to see the magic...</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>CSR (Client Side Rendering):</strong> 서버가 아닌 브라우저에서 JS로 화면을 그리기 때문에 초기 로딩 후 전환 속도가 압도적으로 빠릅니다.
        </p>
      </footer>
    </div>
  );
}