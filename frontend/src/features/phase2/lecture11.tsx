import { useState, useMemo, useCallback } from 'react';

/**
 * [Step-11] useMemo & useCallback (메모이제이션의 정석)
 */
export function lecture11() {
  const [count, setCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 1. [useMemo] 비용이 큰 연산 시뮬레이션
  // [Technical Term] Referential Equality (참조 동일성): inputValue가 변할 때만 결과 객체를 새로 생성함
  const expensiveCalculation = useMemo(() => {
    addLog(`[useMemo] 무거운 연산 실행... (Input: ${inputValue || 'Empty'})`);
    let result = 0;
    for (let i = 0; i < 1000000; i++) { result += i; }
    return `${inputValue} (연산 완료)`;
  }, [inputValue]);

  // 2. [useCallback] 함수 재생성 방지
  const handleCountUp = useCallback(() => {
    setCount(prev => prev + 1);
    addLog('[useCallback] 메모이제이션된 함수 호출');
  }, []); // 빈 배열: 최초 마운트 시에만 함수 생성

  return (
    // 🚨 Box Model Reset: 상단 여백 제거 및 레이아웃 통일
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 상속 */}
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
          🚀 Step-11: useMemo & useCallback 최적화
        </h1>
      </header>
      
      {/* 개념 카드 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>useMemo</strong>는 연산 결과값을, <strong>useCallback</strong>은 함수 자체를 메모리에 저장합니다. 
          불필요한 <strong>Re-rendering (리렌더링)</strong>을 막아 성능 병목을 해결하는 핵심 도구입니다.
        </p>
      </section>

      {/* 데모 그리드: 2컬럼 레이아웃 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* useMemo 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>💎 useMemo (Value)</h3>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="입력 시에만 연산 발생"
            style={{ 
              width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px', 
              fontSize: '12px', marginBottom: '10px', outline: 'none'
            }}
          />
          <div style={{ padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '11px', color: '#57606f', wordBreak: 'break-all' }}>
            <strong>Result:</strong> {expensiveCalculation}
          </div>
        </div>

        {/* useCallback 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>⚙️ useCallback (Fn)</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' 
          }}>
            {count}
          </div>
          <button 
            onClick={handleCountUp} 
            style={{ width: '100%', padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            Memoized Count Up
          </button>
        </div>
      </div>

      {/* 로그 구역: Memoization Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Memoization Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Watching optimization effects...</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Premature Optimization (조기 최적화):</strong> 모든 곳에 메모이제이션을 쓰는 것은 메모리 낭비일 수 있습니다. 성능 병목이 확인될 때 사용하세요.
        </p>
      </footer>
    </div>
  );
}