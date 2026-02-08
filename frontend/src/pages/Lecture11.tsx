import { useState, useMemo, useCallback } from 'react';

/**
 * [Step-11] useMemo & useCallback (메모이제이션의 정석)
 * 💡 핵심 포인트:
 * 1. Memoization (메모이제이션): 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 실행 속도를 높이는 기술입니다.
 * 2. useMemo: 연산의 '결과값'을 기억합니다. 주로 비용이 큰 계산(복잡한 루프 등)을 최적화할 때 사용합니다.
 * 3. useCallback: 생성된 '함수 자체'를 기억합니다. 컴포넌트가 리렌더링될 때마다 함수가 새로 만들어지는 것을 방지합니다.
 * 4. Referential Equality (참조 동일성): 객체나 함수가 메모리 상에서 같은 주소를 가리키는지 확인하는 성질입니다.
 */

export default function Lecture11() {
  const [count, setCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 1. [useMemo] 비용이 큰 연산 시뮬레이션
  // inputValue가 바뀔 때만 실행되며, count가 바뀔 때는 재계산하지 않고 저장된 값을 사용합니다.
  const expensiveCalculation = useMemo(() => {
    addLog(`[useMemo] 복잡한 연산 수행 중... (입력값: ${inputValue})`);
    // 아주 무거운 루프를 가정한 연산
    let result = 0;
    for (let i = 0; i < 1000000; i++) { result += i; }
    return `${inputValue} (연산 완료)`;
  }, [inputValue]);

  // 2. [useCallback] 함수 재생성 방지
  // count가 바뀔 때마다 함수가 새로 생성되지 않도록 메모이제이션합니다.
  const handleCountUp = useCallback(() => {
    setCount(prev => prev + 1);
    addLog('[useCallback] 카운트 업 함수 호출');
  }, []); // 의존성 배열이 비어있으므로 최초 마운트 시에만 생성됨

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-11: useMemo & useCallback 최적화</h1>

      <section className="lecture-section">
        <h2>1. 언제 최적화가 필요한가?</h2>
        <p>
          리액트는 부모가 리렌더링되면 자식도 기본적으로 다시 그려집니다. 이때 <strong>Heavy Computing (무거운 연산)</strong>이 포함되어 있다면 앱이 버벅거릴 수 있습니다. 
          메모이제이션 훅을 사용하여 <strong>성능 병목 현상(Bottleneck)</strong>을 해결할 수 있습니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* useMemo 실습 카드 */}
        <div className="lecture-card">
          <h3>💎 useMemo (Value 저장)</h3>
          <p>텍스트를 입력할 때만 무거운 연산이 실행됩니다.</p>
          <input 
            type="text" 
            className="display-box" 
            style={{ width: '100%', border: '1px solid #ddd', color: '#fff' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="입력 시에만 연산 발생"
          />
          <div style={{ marginTop: '10px', fontSize: '13px' }}>
            <strong>결과:</strong> {expensiveCalculation}
          </div>
        </div>

        {/* useCallback 실습 카드 */}
        <div className="lecture-card">
          <h3>정적 함수 (useCallback)</h3>
          <p>버튼을 눌러도 함수 객체는 새로 생성되지 않고 재사용됩니다.</p>
          <div className="display-box" style={{ justifyContent: 'center', fontSize: '24px' }}>
            {count}
          </div>
          <button className="btn btn-primary" onClick={handleCountUp} style={{ width: '100%', marginTop: '10px' }}>
            Memoized Count Up
          </button>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Memoization Log</h3>
        <div className="log-container">
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 모든 곳에 <code>useMemo</code>를 쓰는 것은 오히려 독이 될 수 있습니다! 
          메모이제이션 자체도 메모리를 사용하는 비용이 들기 때문입니다. <strong>Premature Optimization (조기 최적화)</strong>를 경계하고, 실제 성능 이슈가 느껴질 때 적용하는 것이 좋습니다.
        </p>
      </footer>
    </div>
  );
}