import { useState } from 'react'; // 🚨 Fix: 사용하지 않는 useEffect 제거

export function lecture45() {
  const [phase, setPhase] = useState<'SERVER' | 'HYDRATING' | 'INTERACTIVE'>('SERVER');
  const [logs, setLogs] = useState<string[]>(["[System] 서버 렌더링 엔진 가동..."]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const runHydrationSim = () => {
    setPhase('SERVER');
    addLog("🌐 [Server] HTML 생성 및 브라우저 전송");

    setTimeout(() => {
      setPhase('HYDRATING');
      addLog("💊 [Client] JS 번들 다운로드 및 하이드레이션 시작");
      
      setTimeout(() => {
        setPhase('INTERACTIVE');
        addLog("✨ [Client] 하이드레이션 완료: 이제 클릭 가능!");
      }, 1500);
    }, 1500);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 45: SSR과 하이드레이션
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 (🚨 Fix: strong 태그 닫기 완료) */}
      <div style={{ padding: '15px', backgroundColor: '#fff0f6', borderRadius: '10px', marginBottom: '15px', border: '1px solid #ffdeeb' }}>
        <h3 style={{ fontSize: '15px', color: '#d6336c', margin: '0 0 10px 0' }}>💡 마법의 결합: HTML + JS</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          SSR은 사용자에게 "빠른 첫 화면"을 제공하지만, 자바스크립트가 연결되기 전까지는 버튼을 눌러도 아무 반응이 없습니다. 
          <strong>[Technical Term] Hydration</strong>은 서버에서 보낸 정적인 돔(DOM) 위에 리액트의 이벤트 리스너를 다시 "수분 보충"하듯 결합하는 과정입니다. 
          이 과정이 끝나야 비로소 앱은 <strong>[Technical Term] Interactive</strong> 상태가 됩니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#d6336c', margin: '0 0 12px 0' }}>🧪 Hydration Simulator</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #ffdeeb', marginBottom: '15px' }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>
              {phase === 'SERVER' && "📄 (정적 HTML)"}
              {phase === 'HYDRATING' && "⚙️ (연결 중...)"}
              {phase === 'INTERACTIVE' && "🎮 (상호작용 가능!)"}
            </div>
            
            <button 
              onClick={() => phase === 'INTERACTIVE' && alert('클릭 성공!')}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: phase === 'INTERACTIVE' ? '#d6336c' : '#ced4da', 
                color: 'white', border: 'none', borderRadius: '5px', 
                cursor: phase === 'INTERACTIVE' ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              버튼 클릭 테스트
            </button>
          </div>
          
          <button 
            onClick={runHydrationSim}
            disabled={phase === 'HYDRATING'}
            style={{ width: '100%', padding: '10px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            시뮬레이션 다시 시작
          </button>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Key Concepts</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] TTI</strong>: 페이지가 완전히 상호작용 가능한 상태가 된 시점입니다.<br/>
            - <strong>[Technical Term] SEO</strong>: 검색 로봇이 완성된 HTML을 읽을 수 있어 최적화에 유리합니다.<br/>
            - <strong>[Technical Term] Pre-rendering</strong>: 서버에서 미리 UI를 그리는 모든 과정을 통칭합니다.<br/>
            - <strong>[Technical Term] Event Delegation</strong>: 하이드레이션 시 리액트가 이벤트를 효율적으로 부착하는 방식입니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Rendering Metrics Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#ffdeeb', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #d6336c', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}