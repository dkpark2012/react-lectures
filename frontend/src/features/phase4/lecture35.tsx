import { useState } from 'react';
// [Technical Term] DOMPurify: XSS 공격을 차단하기 위해 HTML을 정제해주는 라이브러리
import DOMPurify from 'dompurify';

export function lecture35() {
  const [userInput, setUserInput] = useState('');
  const [secureContent, setSecureContent] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 1️⃣ [Technical Term] XSS Defense (새니타이징)
  const handleXSSDefense = () => {
    // 사용자가 입력한 위험한 스크립트(예: <img src=x onerror=alert(1)>)를 제거합니다.
    const cleanHTML = DOMPurify.sanitize(userInput);
    setSecureContent(cleanHTML);
    addLog("🛡️ Sanitization 완료: 위험 요소 제거됨");
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 35: 리액트 보안 (XSS & CSRF)
        </h1>
      </header>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 12px 0' }}>🔐 XSS Protection Demo</h3>
          
          <textarea 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="공격 스크립트를 입력해보세요 (예: <img src=x onerror=alert('Hacked')>)"
            style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '10px', boxSizing: 'border-box' }}
          />

          <button 
            onClick={handleXSSDefense}
            style={{ width: '100%', padding: '10px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            안전하게 렌더링하기
          </button>

          {/* 2️⃣ [Technical Term] dangerouslySetInnerHTML */}
          {/* 리액트에서 직접 HTML을 삽입할 때 쓰는 API로, 반드시 정제 후 사용해야 합니다. */}
          <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ced4da' }}>
            <p style={{ fontSize: '11px', color: '#6c757d', marginBottom: '5px' }}>출력 결과:</p>
            <div dangerouslySetInnerHTML={{ __html: secureContent || '콘텐츠가 여기에 표시됩니다.' }} />
          </div>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏗️ Security Architecture</h3>
          <div style={{ fontSize: '12px', color: '#495057', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Auto-Escaping</strong>: 리액트는 기본적으로 텍스트 노드에서 스크립트 실행을 차단합니다.<br/>
            - <strong>[Technical Term] SameSite Cookie</strong>: CSRF를 막기 위해 쿠키에 `SameSite=Strict` 설정을 권장합니다.<br/>
            - <strong>[Technical Term] Anti-CSRF Token</strong>: 서버에서 발행한 고유 토큰을 헤더에 담아 요청의 정당성을 검증합니다.<br/>
            - <strong>Content Security Policy (CSP)</strong>: 허용된 도메인의 스크립트만 실행되도록 브라우저 정책을 설정합니다.
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Security Audit Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- Waiting for security event...</div>
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