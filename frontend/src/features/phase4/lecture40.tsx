import { useState } from 'react';

export function lecture40() {
  const [dockerPhase, setDockerPhase] = useState<'IDLE' | 'BUILDING' | 'RUNNING'>('IDLE');
  const [logs, setLogs] = useState<string[]>(["[System] Docker Daemon 연결됨"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] Docker Lifecycle Simulation
  const runDockerFlow = () => {
    setDockerPhase('BUILDING');
    addLog("🐳 Dockerfile 읽기 및 레이어 빌드 시작");
    
    setTimeout(() => {
      addLog("📦 Image 빌드 완료 (react-app:latest)");
      setTimeout(() => {
        addLog("🚀 Container 실행 중 (Port 3000 -> 80)");
        setDockerPhase('RUNNING');
        addLog("✅ 배포 환경 격리 및 구동 성공!");
      }, 1000);
    }, 1000);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 40: Docker 기반 배포 자동화
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 */}
      <div style={{ padding: '15px', backgroundColor: '#e7f5ff', borderRadius: '10px', marginBottom: '15px', border: '1px solid #74c0fc' }}>
        <h3 style={{ fontSize: '15px', color: '#1864ab', margin: '0 0 10px 0' }}>💡 왜 도커를 써야 할까?</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          도커는 **[Technical Term] Resource Isolation (자원 격리)**을 통해 서버의 다른 프로세스와 충돌 없이 앱을 실행합니다. 
          또한 <strong>[Technical Term] Docker Compose</strong>를 사용하면 DB, 백엔드, 프론트엔드를 단 한 줄의 명령어로 
          동시에 오케스트레이션(관리) 할 수 있어 배포의 복잡성을 획기적으로 낮춰줍니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#1864ab', margin: '0 0 12px 0' }}>🐳 Docker Container Runner</h3>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px dashed #74c0fc', marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              Status: <strong>{dockerPhase === 'IDLE' ? "Ready to Build" : dockerPhase === 'BUILDING' ? "Building..." : "Container Active"}</strong>
            </p>
            
            <button 
              onClick={runDockerFlow}
              disabled={dockerPhase === 'BUILDING'}
              style={{ 
                padding: '12px 25px', 
                backgroundColor: dockerPhase === 'RUNNING' ? '#228be6' : '#1c7ed6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: dockerPhase === 'BUILDING' ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {dockerPhase === 'IDLE' && "Docker Image 빌드"}
              {dockerPhase === 'BUILDING' && "레이어 캐싱 중..."}
              {dockerPhase === 'RUNNING' && "이미지 재생성 (Re-build)"}
            </button>
          </div>

          <p style={{ fontSize: '11px', color: '#868e96' }}>
            * CMD: <code>docker build -t react-app . && docker run -p 80:3000 react-app</code>
          </p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Docker Core Vocabulary</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Dockerfile</strong>: 이미지를 생성하기 위한 단계별 명령어 집합입니다.<br/>
            - <strong>[Technical Term] Layer Caching</strong>: 변경되지 않은 단계는 재사용하여 빌드 속도를 높입니다.<br/>
            - <strong>[Technical Term] Volume</strong>: 컨테이너가 삭제되어도 데이터를 보존하기 위한 저장소 연결 방식입니다.<br/>
            - <strong>[Technical Term] Multi-stage Build</strong>: 최종 이미지 크기를 줄이기 위해 빌드용과 실행용 환경을 분리합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Docker Instance Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#74c0fc', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #74c0fc', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}