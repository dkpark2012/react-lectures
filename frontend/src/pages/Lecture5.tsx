import { useState } from 'react';

/**
 * [Step-5] Props를 이용한 데이터 흐름 제어
 * 💡 핵심 포인트:
 * 1. Props (프롭스): Properties의 약자로, 부모가 자식에게 전달하는 '읽기 전용(Read-only)' 데이터입니다.
 * 2. One-way Data Flow (단방향 데이터 흐름): 데이터는 항상 부모에서 자식으로만 흐른다는 리액트의 핵심 원칙입니다.
 * 3. Prop Drilling (프롭 드릴링): 데이터를 하위 컴포넌트로 전달하기 위해 중간 컴포넌트들이 단순히 프롭스를 넘겨주기만 하는 현상입니다.
 * 4. Destructuring (구조 분해 할당): 객체 내부의 속성을 꺼내어 개별 변수로 선언하는 자바스크립트 문법입니다.
 */

// 1. 자식 컴포넌트: 부모로부터 받은 데이터를 화면에 그리기만 함 (Presentational Component)
interface UserCardProps {
  name: string;
  role: string;
  themeColor: string;
  onHello: (name: string) => void; // 부모로부터 받은 함수
}

const UserCard = ({ name, role, themeColor, onHello }: UserCardProps) => {
  return (
    <div className="lecture-card" style={{ borderLeft: `5px solid ${themeColor}` }}>
      <h3>{name}</h3>
      <p>역할: <strong>{role}</strong></p>
      <button 
        className="btn" 
        style={{ backgroundColor: themeColor }}
        onClick={() => onHello(name)}
      >
        인사하기
      </button>
    </div>
  );
};

export default function Lecture5() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState({
    name: '김리액트',
    role: 'Frontend Developer',
    color: '#3498db'
  });

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 부모에서 정의한 함수를 자식에게 Props로 전달함
  const handleHello = (targetName: string) => {
    addLog(`[Event] ${targetName}님에게 Props를 통해 전달된 함수가 실행되었습니다!`);
  };

  const changeUser = () => {
    setCurrentUser({
      name: '이비트',
      role: 'System Architect',
      color: '#2ecc71'
    });
    addLog('[Update] 부모의 State가 변경되어 자식의 Props가 갱신됩니다.');
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-5: Props를 이용한 데이터 흐름 제어</h1>

      <section className="lecture-section">
        <h2>1. 단방향 데이터 흐름의 이해</h2>
        <p>
          리액트에서 데이터는 <strong>Parent (부모)</strong>에서 <strong>Child (자식)</strong>로만 흐릅니다. 
          자식은 전달받은 <strong>Props (프롭스, 속성)</strong>를 직접 수정할 수 없으며, 오직 부모가 새로운 값을 내려줄 때만 UI를 변경할 수 있습니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 부모 컨트롤러 영역 */}
        <div className="lecture-card">
          <h3>🏢 Parent Component (부모)</h3>
          <p>부모는 데이터를 소유(State)하고 있으며, 이를 자식에게 전달합니다.</p>
          <button className="btn btn-primary" onClick={changeUser} style={{ width: '100%' }}>
            사용자 정보 변경 (Update State)
          </button>
          
          <div className="display-box" style={{ marginTop: '10px', fontSize: '13px' }}>
            전달 중인 데이터: {JSON.stringify(currentUser)}
          </div>
        </div>

        {/* 자식 출력 영역 */}
        <div className="lecture-card">
          <h3>👤 Child Component (자식)</h3>
          <p>자식은 받은 데이터를 보여주거나 부모의 함수를 실행합니다.</p>
          
          <UserCard 
            name={currentUser.name}
            role={currentUser.role}
            themeColor={currentUser.color}
            onHello={handleHello}
          />
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Data Flow Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 상단 버튼을 눌러 데이터의 이동을 확인하세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 자식이 부모의 상태를 바꾸고 싶을 때는 어떻게 할까요? 
          부모가 <strong>Callback Function (콜백 함수, 나중에 실행해달라고 맡기는 함수)</strong>을 프롭스로 넘겨주고, 자식이 이를 호출하면 됩니다. 이를 '상태 끌어올리기'라고 합니다.
        </p>
      </footer>
    </div>
  );
}