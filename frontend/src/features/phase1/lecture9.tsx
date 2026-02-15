import { useState } from 'react';

/**
 * [Step-9] 조건부 렌더링 (&&, 삼항 연산자 패턴)
 */
export function lecture9() {
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
    // 🚨 Box Model Reset: 상단 여백 0, 중앙 정렬 최적화
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 그대로 복사 */}
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
          🚀 Step-9: 조건부 렌더링 패턴
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
          <strong>Conditional Rendering (조건부 렌더링)</strong>은 상태에 따라 UI를 동적으로 결정합니다. 
          주로 <strong>Ternary (삼항 연산자)</strong>와 <strong>Logical AND (&&)</strong> 연산자를 사용합니다.
        </p>
      </section>

      {/* 데모 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 삼항 연산자 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>⚖️ Ternary (A or B)</h3>
          <div style={{ 
            height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '13px', fontWeight: 'bold', marginBottom: '10px',
            color: isLoggedIn ? '#2ecc71' : '#e74c3c'
          }}>
            {isLoggedIn ? '✅ 환영합니다!' : '🔒 로그인 필요'}
          </div>
          <button 
            onClick={toggleLogin}
            style={{ 
              width: '100%', padding: '8px', 
              backgroundColor: isLoggedIn ? '#e74c3c' : '#3498db', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' 
            }}
          >
            {isLoggedIn ? '로그아웃' : '로그인하기'}
          </button>
        </div>

        {/* && 연산자 실습 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>🔗 Logical AND (Show/Hide)</h3>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            style={{ width: '100%', padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', marginBottom: '10px' }}
          >
            상세 정보 {showDetails ? '닫기' : '보기'}
          </button>

          {/* [Technical Term] Logical AND 패턴 */}
          {showDetails && (
            <div style={{ padding: '8px', backgroundColor: '#f1f2f6', borderRadius: '5px', fontSize: '11px', color: '#2f3542', lineHeight: '1.5' }}>
              📍 리액트 마스터 클래스 수강 중 <br />
              🚀 현재 단계: <strong>Step 9</strong>
            </div>
          )}

          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setUnreadMessages(prev => prev + 1)}
              style={{ padding: '4px 8px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}
            >
              메시지 수신
            </button>
            {unreadMessages > 0 && (
              <span style={{ fontSize: '11px', color: '#e74c3c', fontWeight: 'bold' }}>
                📩 New: {unreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 로그 구역: Rendering Logic Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Rendering Logic Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Interaction logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Falsy (거짓 같은 값):</strong> <code>0</code>이나 <code>""</code>(빈 문자열)은 <code>&&</code> 연산 시 의도치 않게 출력될 수 있으니 주의하세요.
        </p>
      </footer>
    </div>
  );
}