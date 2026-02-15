import { useState, useTransition } from 'react';

export function lecture41() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>(["[System] Concurrent Mode 활성화"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] Concurrent Rendering Simulation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // [Technical Term] startTransition: 긴급하지 않은 상태 업데이트를 뒤로 미룹니다.
    startTransition(() => {
      const newList = Array.from({ length: 5000 }, (_, i) => `${value} 데이터 #${i}`);
      setList(newList);
      addLog(`⚡ Transition 실행: ${value} (5,000개 데이터 처리 중)`);
    });
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 41: React 18/19 동시성 모드
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#f3f0ff', borderRadius: '10px', marginBottom: '15px', border: '1px solid #b197fc' }}>
        <h3 style={{ fontSize: '15px', color: '#6741d9', margin: '0 0 10px 0' }}>💡 동시성(Concurrency)이란 무엇인가?</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          전통적인 리액트는 한 번 렌더링을 시작하면 멈출 수 없었습니다. 하지만 <strong>[Technical Term] Concurrent Mode</strong>는 
          렌더링을 쪼개서 수행하며, 사용자 입력과 같은 우선순위가 높은 작업을 먼저 처리합니다. 
          <strong>[Technical Term] useTransition</strong>을 활용하면 대량의 리스트를 그리면서도 텍스트 입력이 버벅이지 않는 마법을 경험할 수 있습니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6741d9', margin: '0 0 12px 0' }}>⚡ Concurrency Simulator</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '11px', color: '#636e72' }}>검색어 입력 (무거운 연산 트리거)</label>
            <input 
              type="text" 
              value={input}
              onChange={handleChange}
              placeholder="아무거나 입력해보세요..."
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '2px solid #b197fc', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </div>

          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            {isPending ? (
              <p style={{ color: '#6741d9', fontWeight: 'bold', fontSize: '14px' }}>⏳ [Technical Term] Transitioning...</p>
            ) : (
              <p style={{ color: '#adb5bd', fontSize: '14px' }}>UI가 최신 상태입니다.</p>
            )}
            <p style={{ fontSize: '11px', color: '#868e96' }}>현재 생성된 리스트 아이템: {list.length}개</p>
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ React 18/19 Key Features</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Automatic Batching</strong>: 여러 상태 업데이트를 하나로 묶어 리렌더링을 최소화합니다.<br/>
            - <strong>[Technical Term] useDeferredValue</strong>: 급하지 않은 값의 업데이트를 늦춰 성능을 최적화합니다.<br/>
            - <strong>[Technical Term] Suspense</strong>: 데이터 로딩 중 대체 UI를 보여주는 선언적 프로그래밍을 지원합니다.<br/>
            - <strong>[Technical Term] Actions (v19)</strong>: 비동기 로직과 UI 상태 변화를 더 직관적으로 연결합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Performance Monitor Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#b197fc', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #b197fc', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}