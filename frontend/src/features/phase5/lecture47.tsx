import { useState } from 'react';

export function lecture47() {
  const [cacheStatus, setCacheStatus] = useState<'MISS' | 'HIT' | 'REVALIDATING'>('MISS');
  const [logs, setLogs] = useState<string[]>(["[System] Edge Runtime 노드 감지됨"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] Caching Lifecycle Simulation
  const simulateCache = () => {
    if (cacheStatus === 'HIT') {
      addLog("⚡ [Edge] Memory Cache Hit! (0ms)");
      return;
    }

    setCacheStatus('REVALIDATING');
    addLog("🌐 [Origin] Cache Miss: 서버에서 원본 데이터 호출 중...");

    setTimeout(() => {
      setCacheStatus('HIT');
      addLog("✅ [Edge] 데이터 캐싱 완료 (Next Layer)");
    }, 1500);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 47: 캐싱 전략과 Edge Runtime
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#fff5f5', borderRadius: '10px', marginBottom: '15px', border: '1px solid #ffc9c9' }}>
        <h3 style={{ fontSize: '15px', color: '#c92a2a', margin: '0 0 10px 0' }}>💡 데이터 캐싱과 지리적 이점</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          <strong>[Technical Term] Data Caching</strong>은 동일한 데이터 요청에 대해 매번 DB를 조회하지 않고 저장된 값을 반환합니다. 
          여기에 <strong>[Technical Term] Edge Runtime</strong>을 사용하면, 미국 서버까지 갈 필요 없이 사용자와 가장 가까운 
          <strong>[Technical Term] PoP (Point of Presence: 전 세계에 분산된 서버 거점)</strong>에서 즉시 응답을 줍니다. 
          이는 <strong>[Technical Term] Latency (지연 시간)</strong>를 극적으로 줄여줍니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#c92a2a', margin: '0 0 12px 0' }}>🛰️ Edge Cache Simulator</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #ffc9c9', marginBottom: '15px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: cacheStatus === 'HIT' ? '#c92a2a' : '#adb5bd' }}>
              {cacheStatus === 'MISS' && "⚪ CACHE MISS"}
              {cacheStatus === 'REVALIDATING' && "⚙️ REVALIDATING..."}
              {cacheStatus === 'HIT' && "🔥 CACHE HIT!"}
            </div>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>
              {cacheStatus === 'HIT' ? "데이터를 엣지에서 즉시 가져옵니다." : "원본 서버에 요청을 보내는 중입니다."}
            </p>
          </div>

          <button 
            onClick={simulateCache}
            disabled={cacheStatus === 'REVALIDATING'}
            style={{ 
              width: '100%', padding: '12px', 
              backgroundColor: '#2d3436', color: 'white', border: 'none', 
              borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            데이터 요청 시뮬레이션
          </button>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Caching Terminology</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] ISR (Incremental Static Regeneration)</strong>: 빌드 후에도 주기적으로 페이지를 백그라운드에서 재생성합니다.<br/>
            - <strong>[Technical Term] Full Route Cache</strong>: 서버에서 렌더링된 HTML과 RSC 페이로드를 저장합니다.<br/>
            - <strong>[Technical Term] Request Memoization</strong>: 한 번의 렌더링 사이클 동안 중복된 fetch 요청을 하나로 합칩니다.<br/>
            - <strong>[Technical Term] Cold Start</strong>: 오랫동안 사용되지 않은 함수가 다시 실행될 때 발생하는 초기 지연 시간입니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Cache Performance Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#ff8787', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #c92a2a', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}