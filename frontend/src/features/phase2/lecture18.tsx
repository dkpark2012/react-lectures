import { useState } from 'react';

/**
 * [Step-18] 비동기 프로그래밍 (async/await)과 로딩 처리
 */

// 가상 API 함수 (서버 통신 시뮬레이션)
const fakeApiFetch = (isSuccess: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) resolve("✅ 데이터 수신 성공!");
      else reject(new Error("❌ 네트워크 연결 실패 (404)"));
    }, 2000); // 2초의 지연 (Latency) 발생
  });
};

export function lecture18() {
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  /**
   * 🧱 [Technical Term] Error Boundary Handling (에러 경계 처리):
   * try-catch-finally를 사용하여 비동기 작업의 생명주기를 완벽하게 제어합니다.
   */
  const handleDataRequest = async (shouldSucceed: boolean) => {
    setIsLoading(true);
    setError(null);
    setData('');
    addLog(`[Async] Request Init... (2s Latency)`);

    try {
      // [Technical Term] Await (어웨이트): Promise가 해결될 때까지 비동기적으로 대기
      const result = await fakeApiFetch(shouldSucceed);
      setData(result);
      addLog(`[Success] Payload Received`);
    } catch (err: any) {
      setError(err.message);
      addLog(`[Error] Exception: ${err.message}`);
    } finally {
      // 성공/실패 여부와 관계없이 로딩은 꺼줘야 해! (Finally의 존재 이유)
      setIsLoading(false);
      addLog(`[Async] Process Terminated`);
    }
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step-18: 비동기 제어와 로딩 UX
        </h1>
      </header>
      
      <section style={{ backgroundColor: '#f8faff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e1e8f0' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>Async/Await</strong>는 복잡한 비동기 코드를 동기 코드처럼 읽기 쉽게 만들어주는 <strong>Syntactic Sugar (문법적 설탕)</strong>입니다. 
          비동기 작업 중에는 반드시 <strong>Loading Indicator</strong>를 보여주어야 합니다.
        </p>
      </section>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 비동기 실행 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🚀 Async Execution</h3>
          <p style={{ fontSize: '11px', color: '#636e72', marginBottom: '12px' }}>상태에 따른 비동기 흐름을 테스트하세요.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => handleDataRequest(true)} 
              disabled={isLoading}
              style={{ flex: 1, padding: '10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
            >
              성공 요청
            </button>
            <button 
              onClick={() => handleDataRequest(false)} 
              disabled={isLoading}
              style={{ flex: 1, padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
            >
              실패 요청
            </button>
          </div>
        </div>

        {/* 로딩 및 결과 UI 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#9b59b6', margin: '0 0 8px 0' }}>🖼 UX View</h3>
          <div style={{ 
            height: '85px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '13px', textAlign: 'center'
          }}>
            {isLoading ? (
              <div style={{ color: '#f39c12', fontWeight: 'bold' }}>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span> Fetching...
              </div>
            ) : (
              <div>
                {data && <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{data}</span>}
                {error && <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{error}</span>}
                {!data && !error && "결과가 여기에 표시됩니다."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 로그 구역 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Async Lifecycle Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '60px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>[Technical Term] Latency (지연 시간):</strong> 데이터가 서버에서 클라이언트까지 도달하는 데 걸리는 시간입니다.
        </p>
      </footer>

      {/* 간단한 스피너 애니메이션 (인라인 스타일용) */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}