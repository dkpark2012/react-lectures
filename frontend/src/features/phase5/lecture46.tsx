import { useState } from 'react';

export function lecture46() {
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS'>('IDLE');
  const [logs, setLogs] = useState<string[]>(["[System] Server Actions 런타임 준비 완료"]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 🚨 Fix: 클라이언트 컴포넌트 내에서 호출할 때는 함수를 직접 정의해서 
  // onSubmit으로 감싸거나, 서버 액션 파일을 별도로 분리해야 해!
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 브라우저 기본 동작 방지
    setStatus('PENDING');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    addLog(`📡 [Action] 데이터 전송 시뮬레이션: ${email}`);

    // [Technical Term] RPC (Remote Procedure Call) 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('SUCCESS');
    addLog("✅ [Server] DB 저장 및 캐시 갱신 완료");
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 46: Server Actions Zero-API (Fixed)
        </h1>
      </header>

      <div style={{ padding: '15px', backgroundColor: '#e6fcf5', borderRadius: '10px', marginBottom: '15px', border: '1px solid #63e6be' }}>
        <h3 style={{ fontSize: '15px', color: '#099268', margin: '0 0 10px 0' }}>💡 Type Error 해결: action vs onSubmit</h3>
        <p style={{ fontSize: '13px', color: '#495057', lineHeight: '1.6', margin: 0 }}>
          Next.js의 <strong>[Technical Term] Server Action</strong> 기능을 사용하려면 해당 함수가 별도의 파일이나 <code>'use server'</code> 블록에 정의되어야 합니다. 일반 컴포넌트 내에서는 <code>onSubmit</code>을 사용하여 <strong>[Technical Term] FormData</strong> 객체를 수동으로 서버 함수에 전달하는 것이 타입 안정성 면에서 가장 확실합니다.
        </p>
      </div>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#099268', margin: '0 0 12px 0' }}>🧪 Server Action Simulator</h3>
          
          <form 
            onSubmit={handleSubmit} // 🚨 Fix: action 대신 onSubmit으로 타입 안정성 확보
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <input 
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
            />
            <button 
              type="submit"
              disabled={status === 'PENDING'}
              style={{ 
                padding: '12px', 
                backgroundColor: status === 'SUCCESS' ? '#20c997' : '#099268', 
                color: 'white', border: 'none', borderRadius: '5px', 
                cursor: status === 'PENDING' ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {status === 'PENDING' ? "서버 처리 중..." : "서버 함수 직접 호출"}
            </button>
          </form>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Advanced Server Actions</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] useFormStatus</strong>: 현재 폼이 제출 중인지(pending) 상태를 자식 컴포넌트에서 쉽게 가져옵니다.<br/>
            - <strong>[Technical Term] useFormState</strong>: 서버 작업의 결과(성공 메시지, 에러 등)를 상태로 관리합니다.<br/>
            - <strong>[Technical Term] revalidatePath</strong>: 특정 경로의 데이터를 즉시 새로고침하여 최신 상태를 유지합니다.<br/>
            - <strong>[Technical Term] redirect</strong>: 서버 액션 완료 후 사용자를 다른 페이지로 이동시킵니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Server Network Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#63e6be', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #099268', paddingLeft: '8px' }}>{log}</div>
          ))}
        </div>
      </section>
    </div>
  );
}