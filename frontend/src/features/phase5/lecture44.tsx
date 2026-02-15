import { useState } from 'react';

export function lecture44() {
  const [currentView, setCurrentView] = useState<'LAYOUT' | 'PAGE' | 'LOADING'>('LAYOUT');
  const [logs, setLogs] = useState<string[]>(["[System] Next.js App 디렉토리 스캔 중..."]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleRouteSim = (view: 'LAYOUT' | 'PAGE' | 'LOADING') => {
    setCurrentView(view);
    addLog(`🧭 Route: app/dashboard/${view.toLowerCase()}.tsx 탐색 중`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 44: Next.js App Router 기초
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px', marginBottom: '15px', border: '1px solid #dee2e6' }}>
        <h3 style={{ fontSize: '15px', color: '#000', margin: '0 0 10px 0' }}>💡 App Router의 철학: 폴더가 곧 경로다</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          기존의 <code>pages</code> 방식과 달리, <strong>[Technical Term] App Router</strong>는 폴더를 통해 주소를 구분합니다. 
          폴더 안에 <code>page.tsx</code>가 있으면 실제 주소가 되고, <code>layout.tsx</code>가 있으면 해당 경로와 그 하위 경로에 
          <strong>[Technical Term] Persistence (영속성: 페이지가 바뀌어도 상태나 구조가 유지되는 특징)</strong>을 부여합니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#000', margin: '0 0 12px 0' }}>📁 File System Simulator</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
            <button 
              onClick={() => handleRouteSim('LAYOUT')}
              style={{ padding: '8px', textAlign: 'left', backgroundColor: currentView === 'LAYOUT' ? '#000' : '#f8f9fa', color: currentView === 'LAYOUT' ? '#fff' : '#000', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              📄 layout.tsx (공통 네비게이션)
            </button>
            <button 
              onClick={() => handleRouteSim('PAGE')}
              style={{ padding: '8px', textAlign: 'left', backgroundColor: currentView === 'PAGE' ? '#000' : '#f8f9fa', color: currentView === 'PAGE' ? '#fff' : '#000', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              📄 page.tsx (메인 콘텐츠)
            </button>
            <button 
              onClick={() => handleRouteSim('LOADING')}
              style={{ padding: '8px', textAlign: 'left', backgroundColor: currentView === 'LOADING' ? '#000' : '#f8f9fa', color: currentView === 'LOADING' ? '#fff' : '#000', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              📄 loading.tsx (자동 Suspense)
            </button>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#333', color: '#00ff00', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}>
            {currentView === 'LAYOUT' && "// 레이아웃: 페이지 전환 시 리렌더링되지 않음"}
            {currentView === 'PAGE' && "// 페이지: 해당 경로의 고유 UI"}
            {currentView === 'LOADING' && "// 로딩: 데이터를 불러올 때 자동으로 표시됨"}
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ App Router Key Files</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] page.js</strong>: 경로에 대응하는 유니크한 UI를 정의합니다.<br/>
            - <strong>[Technical Term] layout.js</strong>: 여러 페이지 간에 공유되는 UI를 정의합니다.<br/>
            - <strong>[Technical Term] template.js</strong>: 레이아웃과 비슷하지만 페이지 전환 시 항상 새로 마운트됩니다.<br/>
            - <strong>[Technical Term] error.js</strong>: 해당 세그먼트에서 발생한 런타임 에러를 포착하는 <strong>[Technical Term] Error Boundary</strong>입니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Routing Lifecycle Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#f1f2f6', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #fff', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}