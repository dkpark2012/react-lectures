import { useState, useEffect } from 'react';

/**
 * [Step-10] 생명주기 (LifeCycle)와 useEffect 기초
 * 💡 핵심 포인트:
 * 1. LifeCycle (생명주기): 컴포넌트가 브라우저에 나타나고, 업데이트되고, 사라지는 전체 과정을 말합니다.
 * 2. Mount (마운트): 컴포넌트가 처음으로 DOM에 삽입되어 화면에 보이는 단계입니다.
 * 3. Update (업데이트): Props나 State가 변경되어 컴포넌트가 다시 그려지는 단계입니다.
 * 4. Unmount (언마운트): 컴포넌트가 화면에서 완전히 제거되는 단계입니다.
 * 5. Dependency Array (의존성 배열): useEffect의 두 번째 인자로, 이 배열 안의 값이 변할 때만 효과를 재실행합니다.
 */

export default function Lecture10() {
  const [count, setCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 패턴 1: Mount 시에만 실행 (빈 배열 [])
  useEffect(() => {
    addLog('[Lifecycle] 🌱 컴포넌트가 마운트되었습니다! (최초 1회)');
    
    // Cleanup Function (클린업 함수): 언마운트 시 실행됨
    return () => {
      console.log('컴포넌트가 소멸합니다.');
    };
  }, []);

  // 패턴 2: 특정 상태가 변경될 때마다 실행 ([count])
  useEffect(() => {
    if (count > 0) {
      addLog(`[Update] 🔄 카운트가 ${count}로 업데이트되었습니다.`);
    }
  }, [count]);

  // 패턴 3: 타이머 시뮬레이션 (Side Effect 처리)
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      addLog('[Side Effect] ⏱ 타이머 시작');
      timer = window.setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (isRunning) {
        addLog('[Cleanup] 🧹 타이머 정지 및 정리');
      }
      clearInterval(timer);
    };
  }, [isRunning]);

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-10: 생명주기 및 useEffect 기초</h1>

      <section className="lecture-section">
        <h2>1. Side Effect (부작용/부수 효과) 관리</h2>
        <p>
          <strong>useEffect</strong>는 렌더링과 직접적인 관계가 없는 작업들을 처리할 때 사용합니다. 
          데이터 페칭(API 호출), 타이머 설정, 수동 DOM 조작 등이 대표적인 <strong>Side Effect</strong>입니다.
        </p>
      </section>

      <div className="demo-grid">
        {/* 마운트/업데이트 제어 */}
        <div className="lecture-card">
          <h3>⚡ State Update Control</h3>
          <p>카운트를 직접 올리며 업데이트 효과를 확인하세요.</p>
          <div className="display-box" style={{ justifyContent: 'center', fontSize: '24px' }}>
            {count}
          </div>
          <button className="btn btn-primary" onClick={() => setCount(count + 1)} style={{ width: '100%', marginTop: '10px' }}>
            Manually Count Up
          </button>
        </div>

        {/* 타이머(Side Effect) 실습 */}
        <div className="lecture-card">
          <h3>⏱ Side Effect Simulation</h3>
          <p>타이머를 켜면 <strong>setInterval</strong>이라는 외부 API를 제어합니다.</p>
          <div className={`display-box ${isRunning ? 'active' : ''}`} style={{ justifyContent: 'center', backgroundColor: isRunning ? '#e67e22' : '#2d3436', color: 'white' }}>
            {isRunning ? 'RUNNING...' : 'STOPPED'}
          </div>
          <button 
            className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`} 
            onClick={() => setIsRunning(!isRunning)} 
            style={{ width: '100%', marginTop: '10px' }}
          >
            {isRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Lifecycle Event Log</h3>
        <div className="log-container">
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> useEffect 내부에서 반환하는 함수는 <strong>Cleanup Function (정리 함수)</strong>입니다. 
          컴포넌트가 사라지거나 효과가 재실행되기 직전에 실행되어, 메모리 누수(Memory Leak)를 방지하는 중요한 역할을 합니다.
        </p>
      </footer>
    </div>
  );
}