import { useState } from 'react';

export function lecture36() {
  // 1️⃣ [Technical Term] State Management
  // 초기값을 명확히 할당하여 렌더링 시 '0'만 보이는 현상을 방어합니다.
  const [price, setPrice] = useState<number>(15000);
  const [qty, setQty] = useState<number>(1);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(["[System] 테스트 준비 완료"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 2️⃣ [Technical Term] Pure Business Logic (Internal)
  const handleRunTest = () => {
    const base = price * qty;
    const discount = isVip ? 0.2 : 0;
    const result = Math.floor(base * (1 - discount));
    
    addLog(`💰 연산 결과: 최종 ${result.toLocaleString()}원 (할인율: ${discount * 100}%)`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 36: Vitest 비즈니스 로직 테스트
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 섹션 */}
      <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px', marginBottom: '15px', border: '1px solid #e9ecef' }}>
        <h3 style={{ fontSize: '15px', color: '#2ecc71', margin: '0 0 10px 0' }}>💡 관심사의 분리 (Separation of Concerns)</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          리액트 컴포넌트 내부의 복잡한 연산은 별도의 함수로 분리해야 합니다. 
          이렇게 분리된 로직은 <strong>[Technical Term] Vitest</strong> 환경에서 브라우저 없이도 
          즉각적인 <strong>[Technical Term] Unit Testing</strong>이 가능해지며, 코드의 유지보수성을 극대화합니다.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 12px 0' }}>🧪 Unit Test Simulator</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', color: '#636e72' }}>단가 (Price)</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', color: '#636e72' }}>수량 (Quantity)</label>
            <input 
              type="number" 
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 0)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>

          <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" checked={isVip} onChange={(e) => setIsVip(e.target.checked)} style={{ marginRight: '8px' }} />
            VIP 회원 20% 할인 적용
          </label>

          <button 
            onClick={handleRunTest}
            style={{ width: '100%', padding: '10px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            비즈니스 로직 테스트 실행
          </button>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Test Architecture</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Pure Function</strong>: 부수 효과가 없는 함수로 테스트 신뢰성을 높입니다.<br/>
            - <strong>[Technical Term] Assertion</strong>: 기대하는 결과와 실제 값이 일치하는지 단언합니다.<br/>
            - <strong>[Technical Term] Mocking</strong>: 복잡한 의존성을 가짜 객체로 대체하여 로직만 검증합니다.<br/>
            - <strong>[Technical Term] Code Coverage</strong>: 테스트 코드가 전체 로직의 얼마나 검증하는지 측정합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Unit Test Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#2ecc71', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #2ecc71', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}