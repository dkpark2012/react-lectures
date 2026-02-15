import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1️⃣ [Technical Term] Query Instance Creation
// 서버 데이터의 캐시와 상태를 관리할 클라이언트를 생성합니다.
const queryClient = new QueryClient();

/**
 * [Technical Term] Asynchronous Data Fetching
 * 비동기 API 통신을 시뮬레이션하는 함수입니다.
 */
const fetchUserStatus = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { status: "Active", accessLevel: "Admin", performance: "Optimal" };
};

function StatusDisplay({ addLog }: { addLog: (msg: string) => void }) {
  // 2️⃣ [Technical Term] useQuery Hook
  // Query Key를 기반으로 데이터를 관리하며, 로딩 및 에러 상태를 선언적으로 처리합니다.
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['userStatus'],
    queryFn: fetchUserStatus,
  });

  if (isLoading) return <div style={{ color: '#6c5ce7', fontSize: '13px' }}>📡 Fetching data from server...</div>;

  return (
    <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #6c5ce7' }}>
      <p style={{ fontSize: '13px', margin: '5px 0' }}>Network Status: <strong>{data?.status}</strong></p>
      <p style={{ fontSize: '13px', margin: '5px 0' }}>Access Level: <strong>{data?.accessLevel}</strong></p>
      <button 
        onClick={() => {
          refetch();
          addLog("Manual cache invalidation and refetch triggered.");
        }}
        style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#6c5ce7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
      >
        데이터 갱신
      </button>
    </div>
  );
}

export function lecture23() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
            🚀 Step 23: React Query 서버 페칭
          </h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
          <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '14px', color: '#6c5ce7', margin: '0 0 10px 0' }}>🔑 Data Fetching Demo</h3>
            <StatusDisplay addLog={addLog} />
            <p style={{ fontSize: '11px', color: '#747d8c', marginTop: '10px' }}>
              * 로딩 상태와 데이터 캐싱이 프레임워크 수준에서 관리됩니다.
            </p>
          </div>

          <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture</h3>
            <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
              - <strong>[Technical Term] Stale-While-Revalidate</strong>: 백그라운드에서 데이터를 최신화하는 동안 캐시된 데이터를 제공<br/>
              - <strong>[Technical Term] Query Key</strong>: 캐시 엔트리를 식별하기 위한 고유 종속성 배열<br/>
              - <strong>[Technical Term] Automatic Invalidation</strong>: 윈도우 포커스 시 자동으로 데이터 신선도 체크
            </div>
          </div>
        </div>

        

        <section>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Fetching Activity Log</h3>
          <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#747d8c' }}>- Waiting for network requests...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '8px' }}>{log}</div>
              ))
            )}
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
}