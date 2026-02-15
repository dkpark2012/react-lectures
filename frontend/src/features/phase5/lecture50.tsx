import { useState } from 'react';

export function lecture50() {
  const [deployStatus, setDeployStatus] = useState<'IDLE' | 'BUILDING' | 'LIVE'>('IDLE');
  const [logs, setLogs] = useState<string[]>(["[System] 프로젝트 최종 검수 시작"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] Final Deployment Simulation
  const startFinalDeploy = () => {
    setDeployStatus('BUILDING');
    addLog("🏗️ [Build] 정적 자원 최적화 및 서버 코드 번들링");

    setTimeout(() => {
      addLog("🚀 [Deploy] Edge Network 배포 및 도메인 연결");
      
      setTimeout(() => {
        setDeployStatus('LIVE');
        addLog("✨ [Live] AI 협업 에디터 배포 성공! (v1.0.0)");
        addLog("🔗 URL: https://ai-collab-editor.vercel.app");
      }, 1500);
    }, 1500);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 50: AI 협업 에디터 완성과 배포
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#f1f3f5', borderRadius: '10px', marginBottom: '15px', border: '1px solid #ced4da' }}>
        <h3 style={{ fontSize: '15px', color: '#212529', margin: '0 0 10px 0' }}>💡 이제 당신은 시니어 개발자입니다</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          배포는 끝이 아니라 시작입니다. <strong>[Technical Term] Blue-Green Deployment (블루-그린 배포: 구 버전과 신 버전을 동시에 띄워 무중단 배포를 실현하는 방식)</strong>나 
          <strong>[Technical Term] Canary Release (카나리 배포: 소수의 사용자에게만 먼저 기능을 노출하는 방식)</strong>를 통해 
          안정성을 확보해야 합니다. 이제 오빠가 만든 AI 에디터가 전 세계 사용자의 데이터를 처리할 준비가 되었습니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#212529', margin: '0 0 12px 0' }}>🚢 Production Launch Pad</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #adb5bd', marginBottom: '15px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>
              {deployStatus === 'IDLE' && "🏁"}
              {deployStatus === 'BUILDING' && "⚙️"}
              {deployStatus === 'LIVE' && "🌍"}
            </div>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {deployStatus === 'IDLE' && "준비 완료"}
              {deployStatus === 'BUILDING' && "배포 진행 중..."}
              {deployStatus === 'LIVE' && "서비스 활성화 (LIVE)"}
            </p>
          </div>

          <button 
            onClick={startFinalDeploy}
            disabled={deployStatus === 'BUILDING' || deployStatus === 'LIVE'}
            style={{ 
              width: '100%', padding: '12px', 
              backgroundColor: deployStatus === 'LIVE' ? '#40c057' : '#212529', 
              color: 'white', border: 'none', borderRadius: '5px', 
              cursor: (deployStatus === 'BUILDING' || deployStatus === 'LIVE') ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {deployStatus === 'LIVE' ? "서비스 운영 중" : "최종 배포 시작"}
          </button>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Post-Deployment Key Tasks</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Error Tracking</strong>: Sentry 등을 사용하여 실시간 런타임 에러를 포착합니다.<br/>
            - <strong>[Technical Term] Analytics</strong>: 사용자 행동을 분석하여 UI/UX를 지속적으로 개선합니다.<br/>
            - <strong>[Technical Term] Auto Scaling</strong>: 트래픽 증가 시 서버 자원을 자동으로 확장합니다.<br/>
            - <strong>[Technical Term] Security Patching</strong>: 의존성 라이브러리의 보안 취약점을 주기적으로 체크합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Deployment Analytics Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#adb5bd', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #212529', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}