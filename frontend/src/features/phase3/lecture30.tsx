import { useState } from 'react';

/**
 * 1️⃣ [Technical Term] Mock Definition (모킹 정의)
 * 실무에서는 'src/mocks/handlers.ts'에 따로 정의하지만, 
 * 학습을 위해 여기서는 시뮬레이션 로직으로 대체합니다.
 */
const mockApiHandler = async () => {
  // 실제 네트워크 요청인 것처럼 0.8초 지연을 줍니다.
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // MSW가 반환할 가짜 데이터 규격 (Mock Data)
  return {
    id: "USER_001",
    projectName: "NextGen Dashboard",
    status: "In Progress",
    tasks: ["Setup MSW", "Define Handlers", "Test Mocking"]
  };
};

export function lecture30() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const fetchData = async () => {
    setIsLoading(true);
    addLog("🌐 Requesting to MSW Worker...");
    
    try {
      const result = await mockApiHandler();
      setData(result);
      addLog("✅ Intercepted & Mock Data received.");
    } catch (error) {
      addLog("❌ API Simulation Failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 30: MSW를 이용한 독립 개발
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        {/* 모킹 컨트롤러 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6c5ce7', margin: '0 0 12px 0' }}>📡 API Interception Demo</h3>
          
          <button 
            onClick={fetchData} 
            disabled={isLoading}
            style={{ width: '100%', padding: '10px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '12px' }}
          >
            {isLoading ? '가로채기 중...' : 'API 요청 시뮬레이션'}
          </button>

          {data && (
            <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px', fontSize: '12px' }}>
              <p style={{ margin: '0 0 5px 0' }}>📂 Project: <strong>{data.projectName}</strong></p>
              <p style={{ margin: '0 0 5px 0' }}>📊 Status: <span style={{ color: '#2ecc71' }}>{data.status}</span></p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {data.tasks.map((task: string, i: number) => <li key={i}>{task}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* 아키텍처 설명 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture Review</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Service Worker</strong>: 브라우저 레벨에서 네트워크 요청을 감시<br/>
            - <strong>[Technical Term] REST API Mocking</strong>: 실제 엔드포인트와 동일한 경로로 가짜 응답 생성<br/>
            - <strong>Development Velocity</strong>: 서버 개발 완료 전 UI 및 로직 구현 가능<br/>
            - <strong>Seamless Switch</strong>: 실 서버 연결 시 가로채기만 끄면 즉시 적용
          </div>
        </div>
      </div>

      

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Network Interception Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- Network is idle.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '8px' }}>{log}</div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}