import { createContext, useContext, useState } from 'react';

/**
 * [Step-15] Context API - Prop Drilling 탈출하기
 */

// 1. Context 생성 (공유할 데이터의 설계도)
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
// [Technical Term] Context (컨텍스트): 전역 데이터를 담는 저장소
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. 중간 컴포넌트 (데이터를 건드리지 않음)
const IntermediateComponent = () => {
  return (
    <div style={{ padding: '12px', border: '1px solid #e1e8f0', borderRadius: '8px', backgroundColor: '#f8faff' }}>
      <p style={{ color: '#95a5a6', fontSize: '11px', margin: '0 0 10px 0' }}>
        🏢 <strong>중간 컴포넌트:</strong> 저는 Props를 받지도, 전달하지도 않아요!
      </p>
      <DeepChildComponent />
    </div>
  );
};

// 3. 최하위 자식 컴포넌트 (데이터 직접 구독)
const DeepChildComponent = () => {
  // [Technical Term] useContext: Provider가 쏜 데이터를 다이렉트로 수신
  const context = useContext(ThemeContext);
  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <div style={{ 
      padding: '15px', 
      borderRadius: '8px', 
      backgroundColor: theme === 'dark' ? '#2d3436' : '#fff',
      color: theme === 'dark' ? '#fff' : '#2d3436',
      border: '1px solid #ddd',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '13px' }}>👶 최하위 자식 (Deep Child)</h4>
      <p style={{ fontSize: '12px', marginBottom: '10px' }}>현재 테마: <strong>{theme.toUpperCase()}</strong></p>
      <button 
        onClick={toggleTheme}
        style={{ 
          width: '100%', padding: '8px', backgroundColor: '#3498db', color: 'white', 
          border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' 
        }}
      >
        테마 스위칭
      </button>
    </div>
  );
};

export function lecture15() {
  const [theme, setTheme] = useState<string>('light');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    addLog(`[Context] 테마가 ${newTheme}로 변경되어 하위 트리에 Broadcast 되었습니다.`);
  };

  return (
    // 4. [Technical Term] Provider (공급자): 전역 상태를 하위 트리에 뿌려줌
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
            🚀 Step-15: Context API (전역 상태 관리)
          </h1>
        </header>
        
        <section style={{ backgroundColor: '#f8faff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e1e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
          <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
            <strong>Context API</strong>는 여러 컴포넌트가 공유하는 데이터를 관리합니다. 
            <strong>Prop Drilling</strong> 없이도 깊은 곳의 자식에게 데이터를 직접 전달할 수 있습니다.
          </p>
        </section>

        

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
          {/* 공급자 정보 카드 */}
          <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🏢 Top-level Provider</h3>
            <div style={{ 
              height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              backgroundColor: '#f5f6fa', borderRadius: '5px', fontSize: '13px', fontWeight: 'bold'
            }}>
              현재 부모 테마: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
            </div>
            <p style={{ fontSize: '11px', color: '#636e72', marginTop: '10px' }}>
              부모의 State가 변하면 구독 중인 모든 자식이 리렌더링됩니다.
            </p>
          </div>

          {/* 트리 시뮬레이션 카드 */}
          <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>🌲 Component Tree</h3>
            <IntermediateComponent />
          </div>
        </div>

        {/* 로그 구역: Global State Analysis */}
        <section>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Global State Analysis</h3>
          <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '60px' }}>
            {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Waiting for state changes...</div>}
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
            💡 <strong>Overhead (오버헤드):</strong> 컨텍스트 값이 자주 바뀌면 성능 저하가 올 수 있으니, <strong>Atomic (원자적)</strong>으로 쪼개서 관리하세요.
          </p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}