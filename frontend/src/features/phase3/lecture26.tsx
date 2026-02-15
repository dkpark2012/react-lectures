import { useState, Component, ErrorInfo, ReactNode } from 'react';

// 1️⃣ [Technical Term] Error Boundary Definition
// 하위 컴포넌트 트리에서 발생하는 자바스크립트 에러를 포착하는 클래스 컴포넌트입니다.
class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  // 에러 발생 시 상태를 업데이트하여 다음 렌더링 때 폴백 UI가 나타나게 합니다.
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  // 에러 정보를 로깅하거나 외부 서비스(Sentry 등)로 전송할 때 사용합니다.
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("🚫 Error caught by Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2️⃣ 테스트용 컴포넌트: 의도적으로 런타임 에러를 발생시킵니다.
function BuggyComponent({ onCrash }: { onCrash: () => void }) {
  const [crash, setCrash] = useState(false);

  if (crash) {
    onCrash(); 
    throw new Error("💥 Runtime System Crash!");
  }

  return (
    <button 
      onClick={() => setCrash(true)}
      style={{ padding: '10px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
    >
      에러 시뮬레이션 실행
    </button>
  );
}

export function lecture26() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 26: Error Boundary 에러 핸들링
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 10px 0' }}>🛡️ Error Isolation Zone</h3>
          
          <ErrorBoundary fallback={
            <div style={{ padding: '15px', backgroundColor: '#fff5f5', borderRadius: '8px', border: '1px solid #feb2b2', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#c53030', fontWeight: 'bold' }}>🚨 컴포넌트 레벨 에러 포착 성공</p>
              <button 
                onClick={() => window.location.reload()} 
                style={{ marginTop: '10px', fontSize: '11px', padding: '5px 10px', cursor: 'pointer' }}
              >
                모듈 재로드
              </button>
            </div>
          }>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              에러 바운더리 내부에서 발생하는 예외는 시스템 전체에 영향을 주지 않습니다.
            </p>
            <BuggyComponent onCrash={() => addLog("System log: Error Boundary triggered.")} />
          </ErrorBoundary>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Error Capturing</strong>: 컴포넌트 트리의 렌더링 예외 전파 차단<br/>
            - <strong>[Technical Term] Graceful Degradation</strong>: 부분적 장애가 전체 서비스 다운으로 이어지지 않게 처리<br/>
            - <strong>User Experience</strong>: 크래시 발생 시 빈 화면 대신 안내 UI 제공
          </div>
        </div>
      </div>

      <section style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📋 Security & Monitoring Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- Monitoring system active.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '8px' }}>{log}</div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}