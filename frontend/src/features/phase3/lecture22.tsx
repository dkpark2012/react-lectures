import { useState } from 'react';
import { create } from 'zustand';

// 1️⃣ [Technical Term] Store Definition (스토어 정의)
// 중앙 집중식 상태 관리를 위한 인터페이스와 스토어를 정의합니다.
interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const useStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

/**
 * 🚀 Step-22: Zustand 중앙 집중 상태 관리
 * 전역 상태를 정의하고 컴포넌트 어디서든 호출하는 패턴을 학습합니다.
 */
export function lecture22() {
  const { count, increase, decrease } = useStore();
  const [logs, setLogs] = useState<string[]>([]);

  // 비즈니스 로직에 따른 로그 시스템
  const handleUpdate = (type: 'INC' | 'DEC') => {
    const startTime = performance.now();
    
    if (type === 'INC') increase();
    else decrease();

    const endTime = performance.now();
    addLog(`[System] ${type} operation completed: ${(endTime - startTime).toFixed(4)}ms`);
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: 기업용 대시보드 스타일 */}
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
          🚀 Step-22: Zustand 중앙 집중 상태 관리
        </h1>
      </header>
      
      {/* 아키텍처 가이드 카드 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 Architecture Insight</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          Zustand는 <strong>[Technical Term] Hook-based API</strong>를 제공하여 Redux의 복잡한 <strong>[Technical Term] Action/Reducer</strong> 없이도 효율적인 전역 상태 관리가 가능합니다.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>🐻 Zustand State Control</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => handleUpdate('INC')} style={{ flex: 1, padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Increase
            </button>
            <button onClick={() => handleUpdate('DEC')} style={{ flex: 1, padding: '8px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Decrease
            </button>
          </div>
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center' }}>
            Current Global Count: <strong>{count}</strong>
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Advantage</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            1. <strong>[Technical Term] Zero-Boilerplate</strong>: 환경 설정 코드의 간소화<br/>
            2. <strong>Direct Store Access</strong>: Provider 없이 상태에 직접 접근<br/>
            3. <strong>Fine-grained Subscription</strong>: 필요한 상태 변경만 감지하여 성능 향상<br/>
            4. <strong>Middleware Support</strong>: Redux DevTools 및 Persist 지원
          </div>
        </div>
      </div>

      

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 State Performance Monitor</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '80px'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- Monitoring state changes...</div>
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