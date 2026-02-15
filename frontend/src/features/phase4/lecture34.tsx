import { useState, useEffect, useRef } from 'react';

export function lecture34() {
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const workerRef = useRef<Worker | null>(null);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  useEffect(() => {
    // 1️⃣ [Technical Term] Web Worker Initialization
    // 인라인 워커를 생성하여 별도의 파일 없이 실습 가능하게 구성했습니다.
    const workerCode = `
      self.onmessage = function(e) {
        console.log('[Worker] 연산 시작');
        let sum = 0;
        // 의도적인 고부하 연산 (약 20억 번 반복)
        for (let i = 0; i < 2000000000; i++) {
          sum += i;
        }
        self.postMessage(sum);
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    // 2️⃣ [Technical Term] Message Event Listener
    // 워커로부터 결과를 전달받는 이벤트 핸들러입니다.
    workerRef.current.onmessage = (e) => {
      setResult(e.data);
      setIsCalculating(false);
      addLog("✅ Worker 연산 완료: 메인 스레드 복귀");
    };

    return () => {
      workerRef.current?.terminate();
      addLog("🧹 Worker 리소스 해제 완료");
    };
  }, []);

  const runCalculation = () => {
    if (isCalculating) return;
    
    setIsCalculating(true);
    setResult(null);
    addLog("📡 Worker에게 고부하 작업 할당 (Main Thread는 자유!)");
    
    // 3️⃣ [Technical Term] PostMessage
    // 워커에게 데이터를 전달하여 작업을 요청합니다.
    workerRef.current?.postMessage('start');
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 34: Web Workers 고성능 연산
        </h1>
      </header>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 12px 0' }}>⚙️ Computation Demo</h3>
          
          <button 
            onClick={runCalculation}
            disabled={isCalculating}
            style={{ width: '100%', padding: '10px', backgroundColor: isCalculating ? '#bdc3c7' : '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isCalculating ? '계산 중... (화면 조작 가능!)' : '20억 번 더하기 실행'}
          </button>

          <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#fff5f5', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', margin: '0' }}>결과값: <strong>{result !== null ? result.toLocaleString() : '대기 중'}</strong></p>
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#34495e', margin: '0 0 8px 0' }}>🏗️ Worker Architecture</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Main Thread</strong>: DOM 조작 및 UI 렌더링 전담<br/>
            - <strong>[Technical Term] Worker Thread</strong>: 비즈니스 로직 및 복잡한 연산 전담<br/>
            - <strong>[Technical Term] Message Passing</strong>: 메인과 워커 간의 데이터 통신 방식<br/>
            - <strong>Non-blocking UI</strong>: 연산 중에도 사용자는 입력이나 애니메이션을 끊김 없이 경험
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Multi-thread Activity Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#2c3e50', color: '#ecf0f1', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '100px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#95a5a6' }}>- Interaction required to start thread logging.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #e74c3c', paddingLeft: '8px' }}>{log}</div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}