import { useState } from 'react';
import { useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function OptimisticDemo({ addLog }: { addLog: (msg: string) => void }) {
  const queryClient = useQueryClient();
  const [likes, setLikes] = useState(100);

  // 1️⃣ [Technical Term] Mutation (데이터 변경 요청)
  // 서버의 데이터를 변경(Update/Delete/Create)할 때 사용하는 훅입니다.
  const mutation = useMutation({
    mutationFn: async (newLikes: number) => {
      // API 통신 시뮬레이션 (성공 확률 90%)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.1 ? resolve(true) : reject(new Error('Server communication failed'));
        }, 2000);
      });
      return newLikes;
    },
    
    // 2️⃣ [Technical Term] onMutate (낙관적 업데이트 실행)
    // 서버 응답이 오기 전, mutate 함수가 호출되는 즉시 실행됩니다.
    onMutate: async (newLikes: number) => {
      const timestamp = new Date().toLocaleTimeString();
      addLog(`[${timestamp}] UI 선반영 시작: ${newLikes}`);
      
      // 진행 중인 쿼리가 있다면 취소하여 충돌 방지
      await queryClient.cancelQueries({ queryKey: ['likes'] });
      
      // 이전 상태 저장 (에러 발생 시 롤백용)
      const previousLikes = likes;
      
      // 상태 즉각 업데이트
      setLikes(newLikes); 

      return { previousLikes };
    },
    
    // 에러 발생 시 [Technical Term] Rollback (복구) 수행
    onError: (err, _variables, context) => {
      const timestamp = new Date().toLocaleTimeString();
      addLog(`[${timestamp}] Error: ${err.message}. 이전 상태로 복구합니다.`);
      if (context) setLikes(context.previousLikes);
    },
    
    // 성공/실패 여부와 상관없이 프로세스 종료 시 실행
    onSettled: () => {
      const timestamp = new Date().toLocaleTimeString();
      addLog(`[${timestamp}] Sync process finalized.`);
    },
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
      <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '14px', color: '#e91e63', margin: '0 0 8px 0' }}>📊 Interaction Demo</h3>
        <button 
          onClick={() => mutation.mutate(likes + 1)}
          disabled={mutation.isPending}
          style={{ width: '100%', padding: '10px', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          좋아요 (현재: {likes})
        </button>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#fff0f3', borderRadius: '5px', fontSize: '12px', textAlign: 'center', color: '#e91e63' }}>
          {mutation.isPending ? '⏳ Background Syncing...' : '✅ Data Synchronized'}
        </div>
      </div>

      <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Implementation Logic</h3>
        <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
          1. <strong>onMutate</strong>: UI를 낙관적으로 선행 업데이트<br/>
          2. <strong>Context</strong>: 실패를 대비해 이전 데이터 백업<br/>
          3. <strong>Error Handling</strong>: 에러 시 저장된 컨텍스트로 롤백<br/>
          4. <strong>[Technical Term] Invalidation</strong>: 최종 데이터를 서버와 동기화
        </div>
      </div>
    </div>
  );
}

export function lecture24() {
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
            🚀 Step-24: 낙관적 업데이트 (Optimistic UI)
          </h1>
        </header>
        
        <section style={{ backgroundColor: '#f8faff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e1e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
          <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
            서버 응답 대기 시간을 UI 수준에서 제거하여 <strong>[Technical Term] Zero-latency (지연 시간 없음)</strong> 경험을 제공합니다.
          </p>
        </section>

        

        <OptimisticDemo addLog={addLog} />

        <section>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 System Monitoring Log</h3>
          <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#747d8c' }}>- No transaction history.</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '8px' }}>{log}</div>
              ))
            )}
          </div>
        </section>

        <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
            💡 Optimized for <strong>[Technical Term] Mobile-first</strong> environments with unstable networks.
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}