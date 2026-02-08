import { useState } from 'react';

/**
 * [Step-18] 비동기 프로그래밍 (async/await)과 로딩 처리
 * 💡 핵심 포인트:
 * 1. Asynchronous (비동기): 특정 작업이 끝날 때까지 기다리지 않고 다음 코드를 먼저 실행하는 방식입니다.
 * 2. Promise (프로미스): 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.
 * 3. async/await: Promise를 더 읽기 쉽고 동기적인 코드 흐름처럼 작성하게 해주는 문법 설탕(Syntactic Sugar)입니다.
 * 4. UX (User Experience): 데이터가 오는 동안 '로딩 중'임을 알려 사용자가 앱이 멈췄다고 느끼지 않게 하는 사용자 경험 기술입니다.
 */

// 가상 API 함수 (서버 통신을 흉내냅니다)
const fakeApiFetch = (isSuccess: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) resolve("✅ 서버로부터 데이터를 성공적으로 수신했습니다!");
      else reject(new Error("❌ 서버 연결에 실패했습니다. (Network Error)"));
    }, 2000); // 2초의 지연 시간을 줌
  });
};

export default function Lecture18() {
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 비동기 처리 함수
  const handleDataRequest = async (shouldSucceed: boolean) => {
    // 1. 요청 시작 시 상태 초기화
    setIsLoading(true);
    setError(null);
    setData('');
    addLog(`[Async] 요청 시작... (비동기 작업 실행)`);

    try {
      // 2. await를 사용하여 비동기 작업이 완료될 때까지 기다림
      const result = await fakeApiFetch(shouldSucceed);
      setData(result);
      addLog(`[Success] 데이터 수신 완료`);
    } catch (err: any) {
      // 3. 에러 발생 시 처리
      setError(err.message);
      addLog(`[Error] 에러 발생: ${err.message}`);
    } finally {
      // 4. 성공하든 실패하든 로딩 상태 종료
      setIsLoading(false);
      addLog(`[Async] 비동기 프로세스 종료`);
    }
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-18: 비동기 제어와 로딩 UX</h1>

      <section className="lecture-section">
        <h2>1. 기다림을 관리하는 기술</h2>
        <p>
          웹 앱에서 <strong>Network I/O (네트워크 입출력)</strong>는 항상 시간이 걸립니다. 
          이 시간을 <strong>async/await</strong>로 어떻게 우아하게 기다리고, 그동안 사용자에게 어떤 화면을 보여줄지가 프론트엔드 개발의 핵심 역량입니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 비동기 실행 카드 */}
        <div className="lecture-card">
          <h3>🚀 Async Execution</h3>
          <p>서버 통신 상황을 시뮬레이션합니다. (2초 소요)</p>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-success" 
              onClick={() => handleDataRequest(true)} 
              disabled={isLoading}
              style={{ flex: 1 }}
            >
              성공 케이스 요청
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => handleDataRequest(false)} 
              disabled={isLoading}
              style={{ flex: 1 }}
            >
              실패 케이스 요청
            </button>
          </div>
        </div>

        {/* 로딩 및 결과 UI 카드 */}
        <div className="lecture-card">
          <h3>🖼 Conditional UX View</h3>
          <p>상태(State)에 따라 다른 UI가 나타납니다.</p>
          
          <div className="display-box" style={{ minHeight: '100px', justifyContent: 'center', textAlign: 'center' }}>
            {isLoading && (
              <div className="loading-spinner">
                <span style={{ fontSize: '24px' }}>⏳</span>
                <p>데이터를 가져오는 중...</p>
              </div>
            )}
            
            {!isLoading && data && <div style={{ color: '#2ecc71', fontWeight: 'bold' }}>{data}</div>}
            
            {!isLoading && error && <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>{error}</div>}
            
            {!isLoading && !data && !error && "버튼을 눌러 요청을 시작하세요."}
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Async Lifecycle Log</h3>
        <div className="log-container">
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> <code>try-catch-finally</code> 구문은 비동기 작업의 <strong>Stability (안정성)</strong>를 보장합니다. 
          특히 <code>finally</code> 블록은 성공/실패 여부와 상관없이 무조건 로딩 인디케이터를 꺼야 할 때 매우 유용합니다.
        </p>
      </footer>
    </div>
  );
}