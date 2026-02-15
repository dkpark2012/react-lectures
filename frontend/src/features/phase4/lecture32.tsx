import { useState, lazy, Suspense } from 'react';

// 1️⃣ [Technical Term] Lazy Loading Definition
// 컴포넌트를 필요한 시점에 비동기적으로 로드합니다.
// 별도의 파일로 분리되어 초기 번들 크기를 줄여줍니다.
const RemoteChartComponent = lazy(() => {
  // 실제 네트워크 지연을 시뮬레이션하기 위한 프로미스 래퍼 💋
  return new Promise<{ default: React.ComponentType<any> }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #2196f3', textAlign: 'center' }}>
            <h4 style={{ color: '#1976d2', margin: '0 0 10px 0' }}>📊 외부 분석 차트 데이터</h4>
            <p style={{ fontSize: '12px' }}>이 컴포넌트는 메인 번들에 포함되지 않고 나중에 로드되었습니다.</p>
          </div>
        )
      });
    }, 1500); // 1.5초 지연
  });
});

export function lecture32() {
  const [showChart, setShowChart] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleToggle = () => {
    if (!showChart) addLog("📡 요청 발생: 가상 번들 파일 로드 시작");
    setShowChart(prev => !prev);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 32: Code Splitting과 Lazy Loading
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        {/* 인터랙션 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#1976d2', margin: '0 0 12px 0' }}>⚡ On-Demand Loading</h3>
          
          <button 
            onClick={handleToggle}
            style={{ width: '100%', padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
          >
            {showChart ? '컴포넌트 제거' : '무거운 컴포넌트 불러오기'}
          </button>

          {/* 2️⃣ [Technical Term] Suspense boundary */}
          {/* 지연 로딩되는 컴포넌트가 준비될 동안 fallback UI를 보여줍니다. */}
          {showChart && (
            <Suspense fallback={
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ced4da', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#6c757d' }}>📡 청크(Chunk) 파일 수신 중...</p>
              </div>
            }>
              <RemoteChartComponent />
            </Suspense>
          )}
        </div>

        {/* 아키텍처 설명 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#388e3c', margin: '0 0 8px 0' }}>🏗️ Optimization Strategy</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Route-based Splitting</strong>: 페이지 단위로 코드를 나누어 필요한 페이지의 JS만 로드<br/>
            - <strong>[Technical Term] Bundle Chunking</strong>: 하나의 거대한 JS를 여러 개의 작은 조각(Chunk)으로 분리<br/>
            - <strong>[Technical Term] TTI (Time to Interactive)</strong>: 사용자가 페이지를 조작할 수 있게 되는 시간을 단축<br/>
            - <strong>Fallback UI</strong>: 사용자에게 로딩 상태를 명확히 인지시켜 UX 향상
          </div>
        </div>
      </div>

      

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Network Activity Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#212529', color: '#0dcaf0', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '100px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#6c757d' }}>- No network requests detected.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #0dcaf0', paddingLeft: '8px' }}>{log}</div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}