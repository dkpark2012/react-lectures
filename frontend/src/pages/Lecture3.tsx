import { useState } from 'react';

/**
 * [Step-3] JSX 문법의 규칙과 자바스크립트와의 차이
 * 💡 핵심 포인트:
 * 1. Data Binding (데이터 바인딩): 자바스크립트 변수와 UI 요소를 연결하는 기술입니다.
 * 2. Two-way Binding Simulation (양방향 바인딩 시뮬레이션): 입력값에 따라 상태를 업데이트하고, 그 상태가 다시 화면에 반영되는 과정입니다.
 */

export default function Lecture3() {
  const [userName, setUserName] = useState<string>('리액트 학습자');
  const [isBlue, setIsBlue] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // setUserName을 활용한 이벤트 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUserName(newName);
    addLog(`[Update] 이름이 '${newName}'으로 변경됨`);
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-3: JSX 문법의 규칙과 JS와의 차이</h1>

      <section className="lecture-section">
        <h2>1. JSX 안에서의 자바스크립트 활용</h2>
        <p>
          JSX 내에서 자바스크립트 변수를 출력하거나 조작할 때는 <strong>Curly Braces(중괄호, { })</strong>를 사용합니다. 
          이는 리액트가 해당 부분을 텍스트가 아닌 '실행 가능한 코드'로 인식하게 만듭니다.
        </p>
      </section>

      <div className="demo-grid">
        {/* 수정된 카드: setUserName 실습 */}
        <div className="lecture-card">
          <h3>✅ 실습: 실시간 데이터 반영</h3>
          <p>Input에 이름을 입력하면 <strong>setUserName</strong> 함수가 상태를 업데이트합니다.</p>
          
          <input 
            type="text" 
            value={userName} 
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
            style={{ 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd', 
              width: '100%',
              marginBottom: '10px'
            }}
          />
          
          <div className="display-box">
            안녕하세요, {userName}님!
          </div>
        </div>

        {/* 규칙 2: 속성과 스타일 */}
        <div className="lecture-card">
          <h3>✅ 규칙 2: 스타일 객체 활용</h3>
          <p>JSX에서 style 속성은 문자열이 아닌 <strong>Object(객체)</strong>로 전달해야 하며, 속성명은 카멜 케이스를 따릅니다.</p>
          
          <button 
            className="btn btn-success" 
            onClick={() => {
              setIsBlue(!isBlue);
              addLog(`[Style] 색상 모드 토글: ${!isBlue ? 'Blue' : 'Mint'}`);
            }}
          >
            색상 변경하기
          </button>
          
          <div className="display-box" style={{ color: isBlue ? '#0984e3' : '#00cec9', transition: '0.3s' }}>
            {isBlue ? '현재 스타일: Blue' : '현재 스타일: Mint'}
          </div>
        </div>
      </div>

      

      <section className="log-section">
        <h3>📊 Event & State Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 입력을 시작하거나 버튼을 눌러보세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>핵심 요약:</strong> JSX 내부에서 <code>onChange</code> 같은 <strong>Event Handler(이벤트 핸들러, 특정 사건이 발생했을 때 실행되는 함수)</strong>를 연결할 때도 중괄호를 사용함을 잊지 마세요!
        </p>
      </footer>
    </div>
  );
}