import { useState } from 'react';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function InfiniteScrollDemo({ addLog }: { addLog: (msg: string) => void }) {
  // 1️⃣ [Technical Term] Infinite Query: 무한 데이터를 가져오는 훅
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['infinite-list'],
    queryFn: async ({ pageParam = 1 }) => {
      addLog(`[Fetch] ${pageParam}페이지 데이터 요청 중...`);
      // 서버 지연 시뮬레이션 (0.8초)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 가짜 데이터 생성 (페이지당 5개씩)
      return {
        items: Array.from({ length: 5 }, (_, i) => ({
          id: (pageParam - 1) * 5 + i + 1,
          content: `📜 ${pageParam}단계 데이터 - ${i + 1}번째 항목`
        })),
        nextPage: pageParam < 5 ? pageParam + 1 : undefined, // 최대 5페이지까지
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // 2️⃣ [Technical Term] Intersection Observer 시뮬레이션
  // 실제로는 라이브러리를 쓰지만, 여기선 버튼 클릭으로 흐름을 익혀보자!
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#fff', 
        borderRadius: '10px', 
        border: '1px solid #eee', 
        maxHeight: '250px', 
        overflowY: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
      }}>
        <h3 style={{ fontSize: '14px', color: '#8e44ad', margin: '0 0 8px 0' }}>📦 Infinite List View</h3>
        
        {status === 'pending' ? (
          <div style={{ fontSize: '12px', textAlign: 'center', padding: '20px' }}>Loading...</div>
        ) : (
          <>
            {data?.pages.map((page, i) => (
              <div key={i}>
                {page.items.map(item => (
                  <div key={item.id} style={{ 
                    padding: '8px', 
                    borderBottom: '1px solid #f1f2f6', 
                    fontSize: '13px', 
                    color: '#2d3436' 
                  }}>
                    {item.content}
                  </div>
                ))}
              </div>
            ))}
            
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <button 
                onClick={handleLoadMore}
                disabled={!hasNextPage || isFetchingNextPage}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  backgroundColor: isFetchingNextPage ? '#dfe6e9' : '#8e44ad', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                {isFetchingNextPage ? '⏳ 불러오는 중...' : hasNextPage ? '🔽 더 보기 (Next Page)' : '✅ 마지막 데이터입니다'}
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture</h3>
        <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
          - <strong>[Technical Term] Cursor-based Pagination</strong>: 다음 데이터의 시작점을 가리킴<br/>
          - <strong>Flattening</strong>: 여러 페이지의 배열을 하나의 리스트로 병합<br/>
          - <strong>Lazy Loading</strong>: 필요한 시점에만 데이터를 로드하여 성능 최적화
        </div>
      </div>
    </div>
  );
}

export function lecture25() {
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
            🚀 Step-25: 무한 스크롤과 가상 리스트
          </h1>
        </header>
        
        <section style={{ backgroundColor: '#f8faff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e1e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
          <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
            대량의 데이터를 효율적으로 보여주기 위해 <strong>[Technical Term] Windowing (윈도잉: 화면에 보이는 부분만 렌더링)</strong> 기법과 무한 스크롤을 조합합니다.
          </p>
        </section>

        <InfiniteScrollDemo addLog={addLog} />

        <section>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Data Stream Log</h3>
          <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '60px' }}>
            {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Load more data to see query lifecycle.</div>}
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
            💡 Seamless experience with <strong>[Technical Term] Page Fetching</strong>.
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}