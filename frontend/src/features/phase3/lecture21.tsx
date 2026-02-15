import { useState } from 'react';

/**
 * 🚀 Step-21: Flux 패턴과 상태 관리
 * [Technical Term] Flux Architecture (플럭스 아키텍처)의 핵심 흐름인
 * Action -> Dispatcher -> Store -> View를 시뮬레이션합니다.
 */
export function lecture21() {
  const [store, setStore] = useState<{ count: number }>({ count: 0 });
  const [logs, setLogs] = useState<string[]>([]);

  // 1️⃣ [Technical Term] Flux Dispatch (플럭스 디스패치)
  // 액션을 발생시켜 스토어의 상태를 변경하는 단방향 흐름의 핵심입니다.
  const handleDispatch = (type: 'INCREMENT' | 'DECREMENT') => {
    const startTime = performance.now();
    
    // Dispatcher 로직 시뮬레이션
    setStore(prev => {
      const nextCount = type === 'INCREMENT' ? prev.count + 1 : prev.count - 1;
      return { count: nextCount };
    });

    const endTime = performance.now();
    addLog(`[Flux Action] ${type} 요청: ${(endTime - startTime).toFixed(4)}ms`);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    // 🚨 [Technical Term] Box Model Reset (박스 모델 초기화)
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: margin-top: 0으로 상단 여백 박살! */}
      <header style={{ 
        paddingTop: '10px', 
        marginBottom: '15px', 
        borderBottom: '2px solid #f1f2f6' 
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: '800', 
          color: '#2d3436', 
          margin: '0', 
          padding: '5px 0' 
        }}>
          🚀 Step-21: Flux 패턴과 상태 관리
        </h1>
      </header>
      
      {/* 개념 카드: lecture1 스타일 완벽 계승 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>Flux</strong>는 데이터가 한 방향으로만 흐르게 하여 상태 변화를 예측 가능하게 만드는 <strong>[Technical Term] Design Pattern (디자인 패턴)</strong>입니다.
        </p>
      </section>

      {/* 데모 그리드: 여백 최적화 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6366f1', margin: '0 0 8px 0' }}>📤 Action Dispatch</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => handleDispatch('INCREMENT')} style={{ flex: 1, padding: '8px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              INC
            </button>
            <button onClick={() => handleDispatch('DECREMENT')} style={{ flex: 1, padding: '8px', backgroundColor: '#475569', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              DEC
            </button>
          </div>
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center' }}>
            Store State: <strong>{store.count}</strong>
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            1. <strong>Action</strong>: 상태 변경 메시지<br/>
            2. <strong>Dispatcher</strong>: Store로 전달<br/>
            3. <strong>Store</strong>: 상태 저장 및 업데이트<br/>
            4. <strong>View</strong>: 화면에 반영 (React)
          </div>
        </div>
      </div>

      {/* 로그 구역: 콤팩트하게 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Flux Performance Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Dispatch actions to see logs.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 Flux ensures <strong>[Technical Term] Predictability (예측 가능성)</strong> in state management.
        </p>
      </footer>
    </div>
  );
}