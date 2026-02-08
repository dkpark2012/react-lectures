import { useState } from 'react';

/**
 * [Step-16] React Router - SPA (싱글 페이지 애플리케이션) 라우팅
 * 💡 핵심 포인트:
 * 1. SPA (Single Page Application): 최초 한 번만 페이지를 로드하고, 이후에는 데이터만 주고받으며 브라우저의 내용을 동적으로 바꾸는 애플리케이션입니다.
 * 2. Routing (라우팅): 사용자가 요청한 URL 주소에 따라 알맞은 컴포넌트를 보여주는 프로세스입니다.
 * 3. CSR (Client Side Rendering): 서버가 아닌 브라우저(클라이언트)에서 자바스크립트를 이용해 화면을 그리는 방식입니다.
 * 4. Link & Navigate: 새로고침 없이 URL만 변경하여 SPA의 사용자 경험을 유지하는 도구입니다.
 */

export default function Lecture16() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 가상 라우팅 핸들러
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    addLog(`[Route] 주소 변경: ${path} (새로고침 없이 컴포넌트 교체)`);
  };

  // 현재 경로에 따라 보여줄 컴포넌트 결정 (가상 라우터 로직)
  const renderContent = () => {
    switch (currentPath) {
      case '/profile':
        return <div className="display-box" style={{ backgroundColor: '#3498db' }}>👤 프로필 페이지 컴포넌트 렌더링됨</div>;
      case '/settings':
        return <div className="display-box" style={{ backgroundColor: '#e67e22' }}>⚙️ 설정 페이지 컴포넌트 렌더링됨</div>;
      default:
        return <div className="display-box" style={{ backgroundColor: '#2ecc71' }}>🏠 홈 메인 페이지 컴포넌트 렌더링됨</div>;
    }
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-16: SPA 라우팅의 원리</h1>

      <section className="lecture-section">
        <h2>1. 다중 페이지처럼 보이는 마법</h2>
        <p>
          전통적인 방식은 메뉴를 클릭하면 서버에서 새 HTML을 받아오느라 화면이 '깜빡'입니다. 
          반면 리액트는 <strong>Browser History API (브라우저 히스토리 API, URL을 조작하는 브라우저 기능)</strong>를 사용하여 
          화면 전환 없이 컴포넌트만 갈아 끼웁니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 네비게이션 가상 시뮬레이터 */}
        <div className="lecture-card">
          <h3>🧭 Virtual Navigator</h3>
          <p>아래 메뉴를 클릭해도 브라우저는 새로고침되지 않습니다.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button className="btn btn-primary" onClick={() => handleNavigate('/')}>Home</button>
            <button className="btn btn-primary" onClick={() => handleNavigate('/profile')}>Profile</button>
            <button className="btn btn-primary" onClick={() => handleNavigate('/settings')}>Settings</button>
          </div>
          <div style={{ marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #ddd' }}>
            <strong style={{ color: '#333' }}>현재 주소창: </strong>
            <code style={{ color: '#1a73e8' }}>https://my-app.com{currentPath}</code>
          </div>
        </div>

        {/* 라우팅 결과물 */}
        <div className="lecture-card">
          <h3>🖼 Rendered View</h3>
          <p>URL(상태)에 따라 다른 컴포넌트가 나타납니다.</p>
          <div style={{ marginTop: '15px' }}>
            {renderContent()}
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Navigation History Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 메뉴를 클릭하여 라우팅을 체험하세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 실제 프로젝트에서는 <code>react-router-dom</code> 라이브러리를 사용합니다. 
          <code>&lt;BrowserRouter&gt;</code>로 앱을 감싸고 <code>&lt;Routes&gt;</code>와 <code>&lt;Route&gt;</code>를 사용하여 경로를 설정하며, 
          <code>&lt;a&gt;</code> 태그 대신 <code>&lt;Link&gt;</code> 컴포넌트를 사용해야 새로고침을 방지할 수 있습니다.
        </p>
      </footer>
    </div>
  );
}