import { useState, useRef, useEffect } from 'react';

export function lecture49() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<'Canvas2D' | 'WebGL'>('Canvas2D');
  const [logs, setLogs] = useState<string[]>(["[System] 그래픽 파이프라인 무결성 검사 완료"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 입자 렌더링 시뮬레이션
    ctx.fillStyle = engine === 'Canvas2D' ? '#ff922b' : '#339af0';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    addLog(`🎨 ${engine} 가속 모드 구동 중...`);
  }, [engine]);

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 49: Canvas/WebGL 시각화 (Fixed)
        </h1>
      </header>

      {/* 📘 35강 스타일의 강의 본문 (🚨 Fix: strong 태그 닫기 완료) */}
      <div style={{ padding: '15px', backgroundColor: '#e3fafc', borderRadius: '10px', marginBottom: '15px', border: '1px solid #99e9f2' }}>
        <h3 style={{ fontSize: '15px', color: '#0b7285', margin: '0 0 10px 0' }}>💡 GPU 가속의 힘</h3>
        <p style={{ fontSize: '13px', color: '#2d3436', lineHeight: '1.6', margin: 0 }}>
          일반적인 웹 요소는 CPU가 처리하지만, <strong>[Technical Term] WebGL</strong>은 그래픽 카드(GPU)를 직접 사용하여 
          병렬 연산을 수행합니다. <strong>[Technical Term] Shaders</strong>를 
          통해 수백만 개의 점과 선을 <strong>[Technical Term] 60 FPS</strong>로 부드럽게 출력할 수 있습니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#0b7285', margin: '0 0 12px 0' }}>🕹️ Graphics Engine Demo</h3>
          
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <button 
              onClick={() => setEngine('Canvas2D')}
              style={{ padding: '5px 15px', marginRight: '5px', backgroundColor: engine === 'Canvas2D' ? '#ff922b' : '#f1f2f6', color: engine === 'Canvas2D' ? 'white' : '#495057', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
            >
              Canvas 2D
            </button>
            <button 
              onClick={() => setEngine('WebGL')}
              style={{ padding: '5px 15px', backgroundColor: engine === 'WebGL' ? '#339af0' : '#f1f2f6', color: engine === 'WebGL' ? 'white' : '#495057', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
            >
              WebGL (GPU)
            </button>
          </div>

          <canvas 
            ref={canvasRef} 
            width={400} 
            height={200} 
            style={{ width: '100%', height: 'auto', backgroundColor: '#1e272e', borderRadius: '8px', border: '2px solid #343a40' }}
          />
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Core Concepts</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Rasterization</strong>: 기하학적 데이터를 픽셀로 변환합니다.<br/>
            - <strong>[Technical Term] Shader</strong>: GPU에서 실행되는 렌더링 연산 코드입니다.<br/>
            - <strong>[Technical Term] Frame Buffer</strong>: 현재 그려진 프레임을 저장하는 메모리 공간입니다.<br/>
            - <strong>[Technical Term] Draw Call</strong>: CPU가 GPU에게 그리기 명령을 보내는 시점입니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Rendering Metrics Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#99e9f2', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #0b7285', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}