import { useState } from 'react';

export function lecture42() {
  const [fetchStatus, setFetchStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');
  const [logs, setLogs] = useState<string[]>(["[System] Suspense 컨텍스트 준비 완료"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] Suspense Simulation (서스펜스 시뮬레이션)
  const simulateFetching = () => {
    setFetchStatus('LOADING');
    addLog("📡 Fetching 시작: API 엔드포인트 호출 중...");
    
    // 실제 비동기 데이터 로딩을 흉내냅니다.
    setTimeout(() => {
      addLog("📦 [Technical Term] Hydration: 데이터 수신 및 결합 완료");
      setFetchStatus('SUCCESS');
      addLog("✅ Suspense 해제: 메인 콘텐츠 렌더링");
    }, 2000);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 42: Suspense와 Data Fetching
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 섹션 */}
      <div style={{ padding: '15px', backgroundColor: '#e7f5ff', borderRadius: '10px', marginBottom: '15px', border: '1px solid #339af0' }}>
        <h3 style={{ fontSize: '15px', color: '#1864ab', margin: '0 0 10px 0' }}>💡 선언적 로딩 처리의 장점</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          기존의 로딩 처리는 <code>if (isLoading) return &lt;Loading /&gt;</code> 처럼 명령형으로 작성해야 했습니다. 
          하지만 <strong>[Technical Term] Suspense</strong>를 사용하면 데이터 로딩의 복잡성을 외부로 격리하고, 
          컴포넌트는 오직 데이터가 <strong>존재할 때의 모습</strong>만 정의하면 되어 가독성이 비약적으로 향상됩니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#339af0', margin: '0 0 12px 0' }}>📡 Data Fetching Simulator</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #339af0', marginBottom: '15px', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {fetchStatus === 'LOADING' ? (
              <div>
                <div style={{ width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #339af0', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                <p style={{ fontSize: '14px', color: '#339af0', marginTop: '10px' }}>[Fallback UI] 로딩 중...</p>
              </div>
            ) : fetchStatus === 'SUCCESS' ? (
              <div>
                <h4 style={{ margin: '0', color: '#2b8a3e' }}>✨ Data Loaded!</h4>
                <p style={{ fontSize: '12px', color: '#868e96' }}>사용자 프로필 데이터를 성공적으로 가져왔습니다.</p>
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: '#adb5bd' }}>버튼을 눌러 페칭을 시작하세요.</p>
            )}
          </div>
          
          <button 
            onClick={simulateFetching}
            disabled={fetchStatus === 'LOADING'}
            style={{ 
              width: '100%', padding: '12px', 
              backgroundColor: fetchStatus === 'LOADING' ? '#dee2e6' : '#339af0', 
              color: 'white', border: 'none', borderRadius: '5px', 
              cursor: fetchStatus === 'LOADING' ? 'not-allowed' : 'pointer', 
              fontWeight: 'bold' 
            }}
          >
            Fetch Data (Suspense Test)
          </button>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Fetching Vocabulary</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Error Boundary</strong>: 데이터 페칭 실패 시 에러 화면을 포착하여 보여줍니다.<br/>
            - <strong>[Technical Term] Streaming SSR</strong>: 서버에서 데이터를 나누어 전송하여 초기 로딩 속도를 높입니다.<br/>
            - <strong>[Technical Term] Waterfall</strong>: 상위 데이터가 와야 하위 호출이 되는 비효율적 호출 구조를 말합니다.<br/>
            - <strong>[Technical Term] Parallel Fetching</strong>: 여러 데이터를 동시에 호출하여 사용자 대기 시간을 최소화합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Data Network Traffic Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#339af0', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #339af0', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}