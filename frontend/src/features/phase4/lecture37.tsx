import { useState } from 'react';

export function lecture37() {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(["[System] RTL 컴포넌트 환경 감지"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleAuth = () => {
    const nextState = !isLogined;
    setIsLogined(nextState);
    addLog(nextState ? "👤 인증 성공 이벤트 발생" : "🚪 로그아웃 이벤트 발생");
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 37: RTL 컴포넌트 테스트 (Fixed)
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#f1f2f6', borderRadius: '10px', marginBottom: '15px', border: '1px solid #dcdde1' }}>
        <h3 style={{ fontSize: '15px', color: '#8e44ad', margin: '0 0 10px 0' }}>💡 getByRole & aria-label 사용법</h3>
        <p style={{ fontSize: '13px', color: '#2f3640', lineHeight: '1.6', margin: 0 }}>
          최신 테스트 환경에서는 <code>name</code> 속성 대신 <strong>[Technical Term] aria-label</strong> 또는 
          버튼 내부의 텍스트 노드를 권장합니다. <strong>[Technical Term] RTL</strong>은 실제 브라우저의 
          <strong>[Technical Term] Accessibility Tree (접근성 트리)</strong>를 탐색하여 테스트를 수행하기 때문입니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#8e44ad', margin: '0 0 12px 0' }}>🔐 Accessibility Test Demo</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              상태: <strong>{isLogined ? "인증 성공" : "인증 필요"}</strong>
            </p>
            
            {/* 🚨 Fix: Deprecated name 속성 제거 및 버튼 텍스트 중심 설계 */}
            <button 
              aria-label={isLogined ? "로그아웃 버튼" : "로그인 버튼"}
              onClick={handleAuth}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: isLogined ? '#e74c3c' : '#8e44ad', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer', 
                fontWeight: 'bold' 
              }}
            >
              {isLogined ? "로그아웃" : "로그인"}
            </button>
          </div>

          <p style={{ fontSize: '11px', color: '#7f8c8d' }}>
            * RTL 쿼리 예시: <code>screen.getByRole('button', {'{'} name: /로그인/i {'}'})</code>
          </p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ RTL Testing Guide</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] screen.debug()</strong>: 테스트 중 DOM 구조를 콘솔에 출력하여 확인합니다.<br/>
            - <strong>[Technical Term] waitFor</strong>: 비동기적으로 변하는 UI 요소를 기다릴 때 사용합니다.<br/>
            - <strong>[Technical Term] Jest-DOM</strong>: <code>toBeInTheDocument</code> 같은 커스텀 매처를 제공합니다.<br/>
            - <strong>[Technical Term] userEvent.setup()</strong>: 사용자 세션을 초기화하여 더 정확한 상호작용을 구현합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Unit Test Action Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#a29bfe', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #a29bfe', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}