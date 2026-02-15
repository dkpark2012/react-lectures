import { useState } from 'react';

export function lecture2() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  const setupSteps = [
    { 
      title: 'pnpm 설치', 
      cmd: 'npm install -g pnpm', 
      detail: 'pnpm은 하드링크를 사용하여 중복 패키지를 방지합니다.' 
    },
    { 
      title: 'Vite 생성', 
      cmd: 'pnpm create vite my-app --template react-ts', 
      detail: 'Vite는 Native ESM을 사용하여 서버 구동이 순식간에 끝납니다.' 
    },
    { 
      title: '의존성 설치', 
      cmd: 'pnpm install', 
      detail: '의존성 라이브러리들을 로컬 환경에 다운로드합니다.' 
    },
    { 
      title: '서버 실행', 
      cmd: 'pnpm dev', 
      detail: 'HMR 기능이 포함된 개발 서버가 실행됩니다.' 
    }
  ];

  const runCommand = () => {
    if (activeStep < setupSteps.length) {
      const current = setupSteps[activeStep];
      addLog(`> Executing: ${current.cmd}`);
      setTimeout(() => {
        addLog(`[Success] ${current.title} 완료.`);
        setActiveStep(prev => prev + 1);
      }, 800);
    }
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    // 🚨 [Technical Term] Box Model Reset - lecture1과 100% 동일 수치
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: 상단 여백 박살! */}
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
          🚀 Step-2: 개발 환경 구축 (Vite + TS)
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
          현대적인 리액트 개발은 <strong>Vite와 pnpm</strong>을 통해 압도적인 속도와 효율을 챙깁니다.
        </p>
      </section>

      {/* 데모 그리드: lecture1과 완벽 일치 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#0984e3', margin: '0 0 8px 0' }}>💻 Terminal Simulator</h3>
          <button 
            onClick={runCommand} 
            style={{ width: '100%', padding: '8px', backgroundColor: activeStep >= setupSteps.length ? '#b2bec3' : '#00b894', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            disabled={activeStep >= setupSteps.length}
          >
            {activeStep >= setupSteps.length ? '설치 완료 ✨' : '명령어 실행 ▶'}
          </button>
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center', fontFamily: 'monospace' }}>
             {activeStep < setupSteps.length ? `$ ${setupSteps[activeStep].cmd}` : 'Ready!'}
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6c5ce7', margin: '0 0 8px 0' }}>🛠 Tech Spec</h3>
          <div style={{ marginTop: '0px', padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '12px', textAlign: 'center', minHeight: '62px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeStep > 0 ? setupSteps[activeStep - 1].detail : 'Wait...'}
          </div>
        </div>
      </div>

      {/* 로그 구역: 콤팩트하게 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Performance Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Performance logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 Vite + pnpm = Fastest Dev Environment.
        </p>
      </footer>
    </div>
  );
}