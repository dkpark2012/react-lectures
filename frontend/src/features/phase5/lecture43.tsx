import { useState } from 'react';

export function lecture43() {
  const [activeTab, setActiveTab] = useState<'SERVER' | 'CLIENT'>('SERVER');
  const [logs, setLogs] = useState<string[]>(["[System] RSC 환경 분석 완료"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleTabChange = (tab: 'SERVER' | 'CLIENT') => {
    setActiveTab(tab);
    addLog(`🔄 ${tab} 컴포넌트 렌더링 방식 분석 중...`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 43: RSC 서버 컴포넌트의 원리
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#fff4e6', borderRadius: '10px', marginBottom: '15px', border: '1px solid #ffd8a8' }}>
        <h3 style={{ fontSize: '15px', color: '#d9480f', margin: '0 0 10px 0' }}>💡 Client vs Server Components</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          모든 컴포넌트를 브라우저에서 실행할 필요는 없습니다. <strong>[Technical Term] RSC</strong>를 사용하면 데이터베이스에 직접 접근하거나 무거운 라이브러리를 사용하는 로직을 서버에서 처리하고, 그 결과물인 <strong>[Technical Term] Payload (페이로드: 데이터 전송 시 포함되는 실제 데이터 내용)</strong>만 클라이언트에 보냅니다. 이는 보안과 성능이라는 두 마리 토끼를 동시에 잡는 혁신입니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e67e22', margin: '0 0 12px 0' }}>🛰️ Component Architecture Simulator</h3>
          
          <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
            <button 
              onClick={() => handleTabChange('SERVER')}
              style={{ flex: 1, padding: '10px', backgroundColor: activeTab === 'SERVER' ? '#e67e22' : '#f8f9fa', color: activeTab === 'SERVER' ? 'white' : '#495057', border: '1px solid #dee2e6', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Server Comp
            </button>
            <button 
              onClick={() => handleTabChange('CLIENT')}
              style={{ flex: 1, padding: '10px', backgroundColor: activeTab === 'CLIENT' ? '#3498db' : '#f8f9fa', color: activeTab === 'CLIENT' ? 'white' : '#495057', border: '1px solid #dee2e6', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Client Comp
            </button>
          </div>

          <div style={{ padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #e67e22', fontSize: '13px' }}>
            {activeTab === 'SERVER' ? (
              <div>
                <span style={{ color: '#e67e22', fontWeight: 'bold' }}>[Server Side]</span>
                <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                  <li>직접 DB Query 실행 가능</li>
                  <li>JS 번들 포함 안됨 (0 bytes)</li>
                  <li>상태 관리(useState) 불가</li>
                </ul>
              </div>
            ) : (
              <div>
                <span style={{ color: '#3498db', fontWeight: 'bold' }}>[Client Side]</span>
                <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                  <li>브라우저 API (DOM) 접근 가능</li>
                  <li>상태 관리 및 효과 처리 가능</li>
                  <li>JS 번들 전송 및 파싱 필요</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ RSC Key Concepts</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Serialization</strong>: 컴포넌트 트리를 JSON과 유사한 형태로 변환하여 클라이언트에 전달합니다.<br/>
            - <strong>[Technical Term] Hydration</strong>: 서버에서 받은 정적 HTML에 클라이언트 JS를 입혀 상호작용을 가능하게 합니다.<br/>
            - <strong>[Technical Term] Server Action</strong>: 클라이언트에서 서버 함수를 마치 로컬 함수처럼 직접 호출하는 기술입니다.<br/>
            - <strong>[Technical Term] Streaming</strong>: 서버 렌더링이 완료될 때까지 기다리지 않고 조각(Chunk) 단위로 브라우저에 전송합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Rendering Life-cycle Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#ff922b', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #ff922b', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}