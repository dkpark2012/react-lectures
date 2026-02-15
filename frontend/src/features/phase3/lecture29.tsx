import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// 1️⃣ [Technical Term] Data Transfer Object (DTO) Interface
// 폼 데이터를 정의하는 규격입니다.
interface RegistrationForm {
  username: string;
  email: string;
}

export function lecture29() {
  const [logs, setLogs] = useState<string[]>([]);
  
  // 2️⃣ [Technical Term] useForm Hook
  // register: 입력 요소를 등록, handleSubmit: 유효성 검사 후 제출, formState: 에러 상태 관리
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegistrationForm>();

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  // 3️⃣ [Technical Term] Submit Handler
  // 모든 유효성 검사를 통과했을 때만 실행됩니다.
  const onSubmit: SubmitHandler<RegistrationForm> = (data) => {
    addLog(`✅ Validation Passed: ${JSON.stringify(data)}`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step 29: React Hook Form 유효성 검사
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        {/* 실전 데모 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6c5ce7', margin: '0 0 12px 0' }}>📝 User Registration</h3>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Input */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>사용자 이름</label>
              <input 
                {...register("username", { required: "이름은 필수입니다.", minLength: { value: 2, message: "최소 2자 이상입니다." } })}
                placeholder="Name"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: errors.username ? '1px solid #e74c3c' : '1px solid #ddd', boxSizing: 'border-box' }}
              />
              {errors.username && <p style={{ color: '#e74c3c', fontSize: '11px', margin: '4px 0 0 0' }}>{errors.username.message}</p>}
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>이메일 주소</label>
              <input 
                {...register("email", { 
                  required: "이메일은 필수입니다.", 
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "올바른 이메일 형식이 아닙니다." } 
                })}
                placeholder="Email"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: errors.email ? '1px solid #e74c3c' : '1px solid #ddd', boxSizing: 'border-box' }}
              />
              {errors.email && <p style={{ color: '#e74c3c', fontSize: '11px', margin: '4px 0 0 0' }}>{errors.email.message}</p>}
            </div>

            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#6c5ce7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              회원가입 요청
            </button>
          </form>
        </div>

        {/* 아키텍처 설명 섹션 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#4a90e2', margin: '0 0 8px 0' }}>🏗️ Architecture Review</h3>
          <div style={{ fontSize: '12px', color: '#57606f', lineHeight: '1.6' }}>
            - <strong>[Technical Term] Non-controlled Input</strong>: 폼 데이터를 DOM 수준에서 관리하여 렌더링 부하 절감<br/>
            - <strong>[Technical Term] Declarative Validation</strong>: register 함수 안에 규칙을 정의하여 가독성 확보<br/>
            - <strong>Performance</strong>: 대규모 폼에서도 지연 없는 입력 경험 제공<br/>
            - <strong>Integration</strong>: **[Technical Term] Yup**이나 **Zod** 같은 스키마 검사 라이브러리와 완벽 호환
          </div>
        </div>
      </div>

      

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Form Submission Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '80px' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#747d8c' }}>- Waiting for form submission...</div>
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