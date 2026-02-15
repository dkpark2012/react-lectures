import { useState } from 'react';

/**
 * [Step-3] JSX 문법의 규칙과 자바스크립트와의 차이
 */
export function lecture3() {
  const [userName, setUserName] = useState<string>('리액트 학습자');
  const [isBlue, setIsBlue] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUserName(newName);
    addLog(`[Update] 이름 변경: ${newName}`);
  };

  return (
    // 🚨 [Technical Term] Box Model Reset: 상단 여백 0으로 천장에 밀착!
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1과 완벽 일치 */}
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
          🚀 Step-3: JSX 문법과 데이터 바인딩
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
          JSX 내부에서 자바스크립트 변수를 쓸 때는 <strong>Curly Braces (중괄호, { })</strong>를 사용합니다. 
          스타일은 문자열이 아닌 <strong>CamelCase (카멜 케이스: 단어 첫 글자를 대문자로 표기)</strong> 객체로 전달해야 합니다.
        </p>
      </section>

      {/* 데모 그리드: lecture1 스타일 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 실시간 데이터 반영 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>✅ Data Binding</h3>
          <input 
            type="text" 
            value={userName} 
            onChange={handleNameChange}
            style={{ 
              width: '100%', padding: '8px', marginBottom: '10px',
              borderRadius: '5px', border: '1px solid #ddd', fontSize: '13px'
            }}
          />
          <div style={{ padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center' }}>
            안녕, <strong>{userName}</strong>님!
          </div>
        </div>

        {/* 스타일 객체 활용 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 8px 0' }}>✅ Style Object</h3>
          <button 
            onClick={() => {
              setIsBlue(!isBlue);
              addLog(`[Style] 색상 변경: ${!isBlue ? 'Blue' : 'Mint'}`);
            }} 
            style={{ width: '100%', padding: '8px', backgroundColor: isBlue ? '#0984e3' : '#00cec9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
          >
            색상 변경하기
          </button>
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center', color: isBlue ? '#0984e3' : '#00cec9', fontWeight: 'bold' }}>
            {isBlue ? 'Active: Blue' : 'Active: Mint'}
          </div>
        </div>
      </div>

      {/* 로그 구역: 콤팩트하게 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Event & State Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Event logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 JSX follows <strong>XML-like Syntax (XML 스타일 문법)</strong> for describing UI structure.
        </p>
      </footer>
    </div>
  );
}