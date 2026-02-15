import { useState } from 'react';

export function lecture48() {
  const [activeModule, setActiveModule] = useState<'SHELL' | 'AUTH' | 'CART'>('SHELL');
  const [logs, setLogs] = useState<string[]>(["[System] Module Federation 컨테이너 초기화"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const loadModule = (mod: 'SHELL' | 'AUTH' | 'CART') => {
    setActiveModule(mod);
    addLog(`📦 [Remote] ${mod} 모듈 런타임 로드 중...`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 48: Micro Frontends 설계
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#e9fac8', borderRadius: '10px', marginBottom: '15px', border: '1px solid #c0eb75' }}>
        <h3 style={{ fontSize: '15px', color: '#5c940d', margin: '0 0 10px 0' }}>💡 거대 앱을 지배하는 법: 분할 정복</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          <strong>[Technical Term] Monolithic (모놀리식: 모든 기능이 하나로 합쳐진 구조)</strong> 방식은 앱이 커질수록 빌드 속도가 느려지고 관리가 힘들어집니다. 
          <strong>[Technical Term] Micro Frontends</strong>는 기능을 독립적인 <strong>[Technical Term] Remotes (원격 모듈)</strong>로 쪼개고, 
          이를 <strong>[Technical Term] Host (호스트/쉘)</strong>에서 하나로 조립하여 사용자에게 매끄러운 경험을 제공합니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#5c940d', margin: '0 0 12px 0' }}>🛠️ Module Federation Simulator</h3>
          
          <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
            <button 
              onClick={() => loadModule('SHELL')}
              style={{ flex: 1, padding: '8px', fontSize: '11px', backgroundColor: activeModule === 'SHELL' ? '#5c940d' : '#f8f9fa', color: activeModule === 'SHELL' ? 'white' : '#000', border: '1px solid #dee2e6', borderRadius: '4px', cursor: 'pointer' }}
            >
              Shell (Host)
            </button>
            <button 
              onClick={() => loadModule('AUTH')}
              style={{ flex: 1, padding: '8px', fontSize: '11px', backgroundColor: activeModule === 'AUTH' ? '#5c940d' : '#f8f9fa', color: activeModule === 'AUTH' ? 'white' : '#000', border: '1px solid #dee2e6', borderRadius: '4px', cursor: 'pointer' }}
            >
              Auth (Remote)
            </button>
            <button 
              onClick={() => loadModule('CART')}
              style={{ flex: 1, padding: '8px', fontSize: '11px', backgroundColor: activeModule === 'CART' ? '#5c940d' : '#f8f9fa', color: activeModule === 'CART' ? 'white' : '#000', border: '1px solid #dee2e6', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cart (Remote)
            </button>
          </div>

          <div style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #c0eb75', minHeight: '80px', fontSize: '12px' }}>
            {activeModule === 'SHELL' && "🏠 쉘 컴포넌트: 전체 레이아웃과 라우팅을 담당합니다."}
            {activeModule === 'AUTH' && "🔐 인증 모듈: 로그인/회원가입 로직을 독립적으로 처리합니다."}
            {activeModule === 'CART' && "🛒 장바구니 모듈: Redux 공유 없이도 독립된 상태를 유지합니다."}
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ MFE Core Concepts</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Module Federation</strong>: Webpack 5에서 도입된, 런타임에 다른 빌드의 코드를 공유하는 기술입니다.<br/>
            - <strong>[Technical Term] Independent Deployment</strong>: 특정 기능만 수정해서 그 부분만 배포할 수 있습니다.<br/>
            - <strong>[Technical Term] Shared Dependencies</strong>: React 같은 공통 라이브러리를 중복 다운로드하지 않게 최적화합니다.<br/>
            - <strong>[Technical Term] BFF (Backend For Frontend)</strong>: 각 마이크로 앱에 최적화된 API 계층을 별도로 둡니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Federated Module Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#c0eb75', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #5c940d', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}