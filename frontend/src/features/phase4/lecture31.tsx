import { useState, Profiler, ProfilerOnRenderCallback, useCallback } from 'react';

/**
 * 1️⃣ [Technical Term] Expensive Component
 * 의도적으로 렌더링 부하를 일으켜 성능 측정의 대상을 만듭니다.
 */
function ExpensiveView({ count }: { count: number }) {
  const start = performance.now();
  // 100ms 동안 CPU 연산을 점유하여 지연을 시뮬레이션합니다.
  while (performance.now() - start < 100) {} 

  return (
    <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginTop: '10px', border: '1px solid #dee2e6' }}>
      <p style={{ fontSize: '13px', color: '#212529' }}>
        ⚙️ Performance Test Value: <strong style={{ color: '#d63384' }}>{count * 999}</strong>
      </p>
      <p style={{ fontSize: '11px', color: '#6c757d' }}>이 컴포넌트는 약 100ms의 렌더링 지연이 발생하도록 설계되었습니다.</p>
    </div>
  );
}

export function lecture31() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 2️⃣ [Technical Term] Asynchronous State Update
  // 렌더링 사이클 도중 발생하는 상태 업데이트로 인한 무한 루프를 방지합니다.
  const addLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newEntry = `[${timestamp}] ${msg}`;
    
    // requestAnimationFrame을 사용하여 다음 브라우저 페인팅 시점에 상태를 업데이트합니다.
    requestAnimationFrame(() => {
      setLogs(prev => [newEntry, ...prev].slice(0, 5));
    });
  }, []);

  // 3️⃣ [Technical Term] Profiler Callback
  const onRender: ProfilerOnRenderCallback = (
    id, 
    phase, 
    actualDuration, 
    baseDuration, 
    _startTime, // 미사용 인자 접두사 처리
    _commitTime  // 미사용 인자 접두사 처리
  ) => {
    const report = `${id}(${phase}): ${actualDuration.toFixed(2)}ms (Base: ${baseDuration.toFixed(2)}ms)`;
    addLog(report);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 31: 렌더링 파이프라인과 Profiler 분석
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#0d6efd', margin: '0 0 12px 0' }}>⚡ Runtime Profiling</h3>
          
          <button 
            onClick={() => setCount(prev => prev + 1)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            컴포넌트 강제 리렌더링 (Count: {count})
          </button>

          {/* Profiler는 하위 트리의 모든 컴포넌트 성능 지표를 캡처합니다. */}
          <Profiler id="ExpensiveView" onRender={onRender}>
            <ExpensiveView count={count} />
          </Profiler>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#198754', margin: '0 0 8px 0' }}>🏗️ Rendering Cycle Review</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Mount vs Update</strong>: 컴포넌트가 처음 생성될 때와 데이터 변경으로 갱신될 때의 차이<br/>
            - <strong>[Technical Term] Fiber Architecture</strong>: 리액트의 증분 렌더링을 가능하게 하는 핵심 알고리즘<br/>
            - <strong>[Technical Term] Duration Analysis</strong>: 실제 소요 시간(Actual)을 분석하여 최적화 포인트 도출
          </div>
        </div>
      </div>

      

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Analysis Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#212529', color: '#20c997', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '120px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#6c757d' }}>- No profiling data collected yet.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #20c997', paddingLeft: '8px' }}>{log}</div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}