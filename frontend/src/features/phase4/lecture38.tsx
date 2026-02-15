import { useState } from 'react';

export function lecture38() {
  const [testStatus, setTestStatus] = useState<'IDLE' | 'RUNNING' | 'SUCCESS'>('IDLE');
  const [logs, setLogs] = useState<string[]>(["[System] Playwright 엔진 대기 중"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] E2E Simulation (E2E 시뮬레이션)
  // 실제 브라우저에서 일어나는 일련의 과정을 시뮬레이션합니다.
  const runE2ETest = () => {
    setTestStatus('RUNNING');
    addLog("🌐 브라우저 컨텍스트 생성 (Chromium)");
    
    setTimeout(() => {
      addLog("🖱️ '결제하기' 버튼 클릭 탐지");
      setTimeout(() => {
        addLog("✅ 결제 완료 페이지 이동 확인");
        setTestStatus('SUCCESS');
        addLog("🎉 E2E 테스트 시나리오 통과!");
      }, 1000);
    }, 1000);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 38: Playwright E2E 테스트
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#fff9db', borderRadius: '10px', marginBottom: '15px', border: '1px solid #fab005' }}>
        <h3 style={{ fontSize: '15px', color: '#f59f00', margin: '0 0 10px 0' }}>💡 왜 E2E 테스트인가?</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          단위 테스트(Vitest)가 개별 부품을 검사한다면, E2E 테스트는 <strong>전체 시스템</strong>이 잘 조립되었는지 확인합니다. 
          <strong>[Technical Term] Playwright</strong>는 여러 브라우저를 동시에 테스트할 수 있으며, 
          <strong>[Technical Term] Auto-waiting</strong> 기능을 통해 불안정한 테스트(Flaky Tests)를 획기적으로 줄여줍니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#f59f00', margin: '0 0 12px 0' }}>🕹️ Playwright Runner Demo</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #fab005', marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              시나리오: <strong>장바구니 담기 → 결제 진행</strong>
            </p>
            
            <button 
              onClick={runE2ETest}
              disabled={testStatus === 'RUNNING'}
              style={{ 
                padding: '12px 25px', 
                backgroundColor: testStatus === 'SUCCESS' ? '#40c057' : '#f59f00', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: testStatus === 'RUNNING' ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              {testStatus === 'IDLE' && "E2E 시나리오 실행"}
              {testStatus === 'RUNNING' && "브라우저 구동 중..."}
              {testStatus === 'SUCCESS' && "테스트 성공 (다시 실행)"}
            </button>
          </div>

          <p style={{ fontSize: '11px', color: '#868e96' }}>
            * 실제 환경에서는 <code>npx playwright test</code> 명령어로 실행됩니다.
          </p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Playwright Core Features</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Headless Mode</strong>: 화면 없이 백그라운드에서 빠르게 테스트를 수행합니다.<br/>
            - <strong>[Technical Term] Trace Viewer</strong>: 실패한 테스트의 실행 과정을 영상과 스냅샷으로 확인합니다.<br/>
            - <strong>[Technical Term] Codegen</strong>: 사용자의 동작을 녹화하여 자동으로 테스트 코드를 생성합니다.<br/>
            - <strong>[Technical Term] Fixtures</strong>: 테스트 실행 전 필요한 환경(로그인 상태 등)을 미리 설정합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 E2E Test Pipeline Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#fcc419', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #fcc419', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}