import { useState } from 'react';

/**
 * [Step-9] 조건부 렌더링 (&&, 삼항 연산자 패턴)
 * 💡 핵심 포인트:
 * 1. Conditional Rendering (조건부 렌더링): 특정 조건(True/False)에 따라 다른 UI를 화면에 그리는 기술입니다.
 * 2. Ternary Operator (삼항 연산자): '조건 ? 참일때 : 거짓일때' 형식으로 두 가지 상태 중 하나를 선택할 때 유용합니다.
 * 3. Logical AND (&& 연산자): '조건 && UI' 형식으로 조건이 참일 때만 화면을 보여주고 싶을 때 사용합니다.
 * 4. Early Return (조기 리턴): 특정 조건이 맞지 않으면 컴포넌트 전체의 렌더링을 미리 종료(null 반환)하는 패턴입니다.
 */

export default function Lecture9() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    addLog(`[Auth] 로그인 상태 변경: ${!isLoggedIn ? '로그인됨' : '로그아웃됨'}`);
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-9: 조건부 렌더링 패턴</h1>

      <section className="lecture-section">
        <h2>1. UI의 흐름 제어하기</h2>
        <p>
          리액트에서는 자바스크립트의 논리 연산자를 사용하여 HTML 구조를 동적으로 결정합니다. 
          <strong>Ternary (삼항 연산자)</strong>는 'A 또는 B'를 보여줄 때, <strong>Logical AND (&&)</strong>는 'A를 보여주거나 말거나' 할 때 주로 쓰입니다.
        </p>
      </section>

      <div className="demo-grid">
        {/* 삼항 연산자 실습 카드 */}
        <div className="lecture-card">
          <h3>⚖️ Ternary Operator (A or B)</h3>
          <p>로그인 여부에 따라 버튼의 텍스트와 UI가 완전히 바뀝니다.</p>
          
          <div className="display-box" style={{ marginBottom: '10px' }}>
            {/* 삼항 연산자 패턴 */}
            {isLoggedIn ? '✅ 환영합니다, 회원님!' : '🔒 로그인이 필요합니다.'}
          </div>

          <button 
            className={`btn ${isLoggedIn ? 'btn-danger' : 'btn-primary'}`} 
            onClick={toggleLogin}
            style={{ width: '100%' }}
          >
            {isLoggedIn ? '로그아웃' : '로그인하기'}
          </button>
        </div>

        {/* && 연산자 실습 카드 */}
        <div className="lecture-card">
          <h3>🔗 Logical AND (Show or Hide)</h3>
          <p>조건이 <strong>True</strong>일 때만 우측의 요소가 렌더링됩니다.</p>
          
          <button className="btn btn-success" onClick={() => setShowDetails(!showDetails)} style={{ width: '100%', marginBottom: '10px' }}>
            상세 정보 {showDetails ? '닫기' : '보기'}
          </button>

          {/* && 연산자 패턴 */}
          {showDetails && (
            <div className="display-box" style={{ backgroundColor: '#f1f2f6', color: '#2f3542' }}>
              📍 리액트 마스터 클래스 수강 중 <br />
              🚀 현재 단계: Step 9
            </div>
          )}

          <div style={{ marginTop: '15px' }}>
            <button className="btn" onClick={() => setUnreadMessages(prev => prev + 1)}>메시지 받기</button>
            {/* 알림 배지 등에 자주 쓰이는 패턴 */}
            {unreadMessages > 0 && (
              <span style={{ marginLeft: '10px', color: '#e74c3c', fontWeight: 'bold' }}>
                📩 새로운 메시지 {unreadMessages}개
              </span>
            )}
          </div>
        </div>
      </div>

      

      <section className="log-section">
        <h3>📊 Rendering Logic Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 조건부 UI를 조작하여 로그를 확인하세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> <code>&&</code> 연산자 사용 시 주의할 점! 
          숫자 <code>0</code>은 자바스크립트에서 <strong>Falsy (거짓 같은 값)</strong>이지만, 리액트는 화면에 <code>0</code>을 그대로 출력합니다. 
          따라서 리스트 길이를 체크할 때는 <code>list.length &gt; 0 && ...</code> 처럼 명확한 비교 연산자를 쓰는 것이 안전합니다.
        </p>
      </footer>
    </div>
  );
}