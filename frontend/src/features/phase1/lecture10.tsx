import { useState, useEffect } from 'react';

/**
 * [Step-10] 생명주기 (LifeCycle)와 useEffect 기초
 */
export function lecture10() {
  const [count, setCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 1. Mount 시에만 실행 (빈 배열 [])
  useEffect(() => {
    addLog('[Lifecycle] 🌱 컴포넌트 마운트 완료! (최초 1회)');
    
    return () => {
      // [Technical Term] Cleanup Function: 컴포넌트 소멸 시 실행
      console.log('컴포넌트가 소멸합니다.');
    };
  }, []);

  // 2. 특정 상태 변경 시 실행 ([count])
  useEffect(() => {
    if (count > 0) {
      addLog(`[Update] 🔄 카운트 업데이트: ${count}`);
    }
  }, [count]);

  // 3. 타이머 시뮬레이션 (Side Effect 처리)
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      addLog('[Side Effect] ⏱ 타이머 작동 시작');
      timer = window.setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (isRunning) {
        addLog('[Cleanup] 🧹 타이머 리소스 해제');
      }
      clearInterval(timer);
    };
  }, [isRunning]);

  return (
    // 🚨 Box Model Reset: 상단 여백 0, 레이아웃 일관성 유지
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
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
          🚀 Step-10: 생명주기 및 useEffect 기초
        </h1>
      </header>
      
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>useEffect</strong>는 렌더링 외의 작업인 <strong>Side Effect (부수 효과)</strong>를 관리합니다. 
          데이터 요청, 타이머, 구독 등의 작업 후에는 반드시 <strong>Cleanup (정리)</strong> 과정을 거쳐야 합니다.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 마운트/업데이트 제어 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>⚡ State Update</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' 
          }}>
            {count}
          </div>
          <button 
            onClick={() => setCount(count + 1)} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            Manually Count Up
          </button>
        </div>

        {/* 타이머 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e67e22', margin: '0 0 8px 0' }}>⏱ Side Effect</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: isRunning ? '#e67e22' : '#2d3436', color: 'white', 
            borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', transition: '0.3s'
          }}>
            {isRunning ? 'RUNNING...' : 'STOPPED'}
          </div>
          <button 
            onClick={() => setIsRunning(!isRunning)} 
            style={{ width: '100%', padding: '8px', backgroundColor: isRunning ? '#e74c3c' : '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            {isRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Lifecycle Event Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Monitoring lifecycle events...</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Dependency Array (의존성 배열):</strong> 배열에 넣은 값이 변할 때만 효과가 재실행됩니다.
        </p>
      </footer>
    </div>
  );
}