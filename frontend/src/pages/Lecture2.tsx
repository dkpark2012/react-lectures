import { useState } from 'react';

/**
 * [Step-2] 개발 환경 구축 (Vite + TypeScript + pnpm)
 * 💡 핵심 포인트:
 * 1. Build Tool (빌드 도구): 작성한 코드를 브라우저가 실행할 수 있게 변환하고 묶어주는 도구입니다.
 * 2. Package Manager (패키지 관리자): 외부 라이브러리를 설치, 업데이트, 삭제하는 관리 시스템입니다.
 * 3. Environment Setup (환경 설정): 개발자가 효율적으로 코딩할 수 있는 최적의 기반을 만드는 과정입니다.
 */

export default function Lecture2() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 환경 구축 단계 시나리오
  const setupSteps = [
    { 
      title: 'pnpm 설치', 
      cmd: 'npm install -g pnpm', 
      detail: 'pnpm(Performant NPM)은 하드링크를 사용하여 중복 패키지를 방지하고 설치 속도가 매우 빠릅니다.' 
    },
    { 
      title: 'Vite 프로젝트 생성', 
      cmd: 'pnpm create vite my-app --template react-ts', 
      detail: 'Vite(비트)는 Native ESM(브라우저가 직접 모듈을 읽는 방식)을 사용하여 개발 서버 구동이 순식간에 끝납니다.' 
    },
    { 
      title: '의존성 설치', 
      cmd: 'pnpm install', 
      detail: 'Dependencies(의존성, 프로젝트 구동에 필요한 라이브러리)들을 로컬 환경에 다운로드합니다.' 
    },
    { 
      title: '개발 서버 실행', 
      cmd: 'pnpm dev', 
      detail: 'HMR(Hot Module Replacement, 코드 수정 시 페이지 새로고침 없이 변경분만 즉시 반영) 기능이 켜집니다.' 
    }
  ];

  const runCommand = () => {
    if (activeStep < setupSteps.length) {
      const current = setupSteps[activeStep];
      addLog(`> Executing: ${current.cmd}`);
      
      // 실행 시뮬레이션 (딜레이 부여)
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
    <div className="lecture-container">
      <h1 className="lecture-title">Step-2: 개발 환경 구축 (Vite + TS + pnpm)</h1>

      <section className="lecture-section">
        <h2>1. 왜 이 도구들을 사용하나요?</h2>
        <p>
          현대적인 리액트 개발 환경은 <strong>DX(Developer Experience, 개발자 경험)</strong>를 극대화하는 방향으로 발전했습니다. 
          Vite는 기존 Webpack보다 압도적으로 빠르며, <strong>TypeScript(타입스크립트, 정적 타입 검사 언어)</strong>를 기본 지원하여 코드의 안정성을 보장합니다.
        </p>
      </section>

      <div className="demo-grid">
        {/* 터미널 시뮬레이터 카드 */}
        <div className="lecture-card">
          <h3>💻 Terminal Simulator</h3>
          <p>명령어를 실행하여 환경 구축 과정을 체험하세요.</p>
          <button 
            onClick={runCommand} 
            className={`btn ${activeStep >= setupSteps.length ? 'btn-primary' : 'btn-success'}`}
            disabled={activeStep >= setupSteps.length}
          >
            {activeStep >= setupSteps.length ? '설치 완료' : '명령어 실행'}
          </button>
          
          <div className="display-box">
            {activeStep < setupSteps.length ? (
              <code>$ {setupSteps[activeStep].cmd}</code>
            ) : (
              <span style={{ color: '#55efc4' }}>✨ All systems operational!</span>
            )}
          </div>
        </div>

        {/* 상세 설명 카드 */}
        <div className="lecture-card">
          <h3>🛠 Tech Specification</h3>
          {activeStep > 0 ? (
            <div>
              <strong>현재 기술: {setupSteps[activeStep - 1].title}</strong>
              <p style={{ marginTop: '10px', fontSize: '13px' }}>{setupSteps[activeStep - 1].detail}</p>
              <ul style={{ paddingLeft: '20px', fontSize: '12px', color: '#636e72' }}>
                <li><strong>Node.js:</strong> 브라우저 밖에서 자바스크립트를 실행하는 환경입니다.</li>
                <li><strong>TSX:</strong> TypeScript와 JSX를 결합한 파일 형식입니다.</li>
              </ul>
            </div>
          ) : (
            <p>버튼을 눌러 환경 구축 시뮬레이션을 시작하세요.</p>
          )}
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Setup Progress Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">준비 중...</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> <code>pnpm-lock.yaml</code> 파일은 팀원 모두가 동일한 버전의 라이브러리를 설치하도록 강제하는 '버전 고정 장치'입니다.
        </p>
      </footer>
    </div>
  );
}