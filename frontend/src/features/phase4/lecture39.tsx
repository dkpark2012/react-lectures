import { useState } from 'react';

export function lecture39() {
  const [pipelineState, setPipelineState] = useState<'IDLE' | 'ACTIVE' | 'DONE'>('IDLE');
  const [logs, setLogs] = useState<string[]>(["[System] GitHub Actions YAML 구성 완료"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] Pipeline Simulation (파이프라인 시뮬레이션)
  const runPipeline = () => {
    setPipelineState('ACTIVE');
    addLog("🚀 CI/CD Pipeline 트리거 (Triggered by Push)");
    
    setTimeout(() => {
      addLog("📦 Build & Lint 체크 통과");
      setTimeout(() => {
        addLog("🧪 Vitest & Playwright 테스트 완료");
        setTimeout(() => {
          addLog("🚢 Vercel/AWS 프로덕션 배포 완료");
          setPipelineState('DONE');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 39: GitHub Actions CI/CD 자동화
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#e3fafc', borderRadius: '10px', marginBottom: '15px', border: '1px solid #3bc9db' }}>
        <h3 style={{ fontSize: '15px', color: '#0b7285', margin: '0 0 10px 0' }}>💡 CI/CD의 핵심 가치</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          <strong>[Technical Term] Continuous Integration (CI)</strong>는 여러 명의 개발자가 작업한 코드를 자주 통합하고 검증하는 과정입니다. 
          여기에 배포 자동화인 <strong>[Technical Term] Continuous Deployment (CD)</strong>를 결합하면, 
          수동 배포 중 발생하는 인적 실수를 방지하고 서비스 릴리스 주기를 획기적으로 단축할 수 있습니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#0b7285', margin: '0 0 12px 0' }}>🛠️ Pipeline Runner Demo</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #3bc9db', marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              Action: <code>git push origin main</code>
            </p>
            
            <button 
              onClick={runPipeline}
              disabled={pipelineState === 'ACTIVE'}
              style={{ 
                padding: '12px 25px', 
                backgroundColor: pipelineState === 'DONE' ? '#12b886' : '#22b8cf', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: pipelineState === 'ACTIVE' ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {pipelineState === 'IDLE' && "워크플로우 트리거"}
              {pipelineState === 'ACTIVE' && "Action 실행 중..."}
              {pipelineState === 'DONE' && "배포 성공 (Re-run)"}
            </button>
          </div>

          <p style={{ fontSize: '11px', color: '#868e96' }}>
            * <code>.github/workflows/main.yml</code> 설정 파일을 통해 구동됩니다.
          </p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ GitHub Actions Components</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Workflow</strong>: 저장소에 추가하는 자동화된 전체 프로세스입니다.<br/>
            - <strong>[Technical Term] Event</strong>: <code>push</code>, <code>pull_request</code> 등 워크플로우를 시작시키는 활동입니다.<br/>
            - <strong>[Technical Term] Job</strong>: 동일한 러너에서 실행되는 여러 <code>Step</code>의 집합입니다.<br/>
            - <strong>[Technical Term] Secret</strong>: API 키나 비밀번호를 안전하게 저장하는 <strong>[Technical Term] Environment Variable</strong>입니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 GitHub Actions Workflow Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#3bc9db', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #3bc9db', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}