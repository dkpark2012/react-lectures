// 'React' 전체를 가져오지 않고, 필요한 함수(Hooks)와 타입만 가져옵니다.
import { createContext, useContext, useState } from 'react';

/**
 * [Step-15] Context API - Prop Drilling (프롭 드릴링) 탈출하기
 * 💡 핵심 포인트:
 * 1. Context (컨텍스트): 컴포넌트 트리 전체에 데이터를 공급할 수 있는 '공유 저장소'입니다.
 * 2. Provider (프로바이더): Context에 저장된 데이터를 하위 컴포넌트들에게 제공하는 역할을 합니다.
 * 3. Prop Drilling (프롭 드릴링): 데이터를 쓰지 않는 중간 컴포넌트들이 하위로 전달만 하는 비효율적인 상황입니다.
 * 4. Consumer / useContext: Provider가 제공한 데이터를 실시간으로 가져와 사용하는 단계입니다.
 */

// 1. Context 생성 (공유할 데이터의 설계도)
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
// 전역 저장소를 만듭니다. 초기값은 undefined로 설정합니다.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. 중간 컴포넌트 (데이터를 전혀 전달받지도, 전달하지도 않음!)
const IntermediateComponent = () => {
  return (
    <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
      <p style={{ color: '#95a5a6', fontSize: '13px' }}>
        저는 <strong>중간 단계</strong>입니다. Props를 받지도 않고 넘기지도 않죠!
      </p>
      <DeepChildComponent />
    </div>
  );
};

// 3. 깊숙한 곳에 있는 자식 컴포넌트
const DeepChildComponent = () => {
  // useContext를 통해 부모의 Provider가 보낸 데이터를 다이렉트로 '구독'합니다.
  const context = useContext(ThemeContext);

  // 컨텍스트 외부에서 사용될 경우를 대비한 안전 코드
  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <div className="lecture-card" style={{ 
      backgroundColor: theme === 'dark' ? '#2d3436' : '#f1f2f6',
      color: theme === 'dark' ? '#fff' : '#2d3436',
      marginTop: '10px',
      transition: 'all 0.3s ease'
    }}>
      <h4>최하위 자식 (Deep Child)</h4>
      <p>전역 상태 테마: <strong>{theme.toUpperCase()}</strong></p>
      <button className="btn btn-primary" onClick={toggleTheme} style={{ width: '100%' }}>
        테마 스위칭 하기
      </button>
    </div>
  );
};

export default function Lecture15() {
  const [theme, setTheme] = useState<string>('light');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    addLog(`[Context] 전역 테마가 ${newTheme}로 변경되어 트리 전체에 전파되었습니다.`);
  };

  return (
    // 4. Provider(공급자)로 감싸기: 이 안의 모든 컴포넌트는 theme과 toggleTheme에 접근 가능합니다.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="lecture-container">
        <h1 className="lecture-title">Step-15: Context API (전역 상태 관리)</h1>

        <section className="lecture-section">
          <h2>1. 프롭 드릴링(Prop Drilling) 해결</h2>
          <p>
            데이터가 필요한 컴포넌트가 계층 구조상 아주 깊은 곳에 있을 때, 
            <strong>Broadcast (브로드캐스트, 여러 대상에게 동시에 데이터를 전달함)</strong> 방식을 사용하여 중간 컴포넌트들의 오버헤드를 줄입니다.
          </p>
        </section>

        

        <div className="demo-grid">
          {/* 상태 제공자 영역 */}
          <div className="lecture-card">
            <h3>🏢 Top-level Provider</h3>
            <p>최상위 부모가 <strong>State(상태)</strong>를 소유하고 있습니다.</p>
            <div className="display-box" style={{ textAlign: 'center' }}>
              현재 테마: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
            </div>
            <ul style={{ fontSize: '12px', marginTop: '15px', color: '#636e72', lineHeight: '1.6' }}>
              <li><strong>createContext:</strong> 통로 개설</li>
              <li><strong>Provider:</strong> 전압(데이터) 공급</li>
              <li><strong>useContext:</strong> 플러그 꽂기(사용)</li>
            </ul>
          </div>

          {/* 컴포넌트 트리 시각화 */}
          <div className="lecture-card">
            <h3>🌲 Component Tree</h3>
            <p>중간 컴포넌트를 건너뛰고 하위 자식에게 직접 전달됩니다.</p>
            <IntermediateComponent />
          </div>
        </div>

        <section className="log-section">
          <h3>📊 Global State Analysis</h3>
          <div className="log-container">
            {logs.length === 0 && <div className="log-item">- 아래 '테마 변경' 버튼을 클릭해 보세요.</div>}
            {logs.map((log, i) => (
              <div key={i} className="log-item">{log}</div>
            ))}
          </div>
        </section>

        <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
          <p>
            💡 <strong>주의사항:</strong> Context의 값이 바뀌면 이를 사용하는 모든 자식 컴포넌트가 <strong>Re-rendering (리렌더링, UI를 다시 그림)</strong>됩니다. 
            따라서 너무 빈번하게 바뀌는 값은 <strong>Memoization (메모이제이션)</strong> 처리하거나 별도의 Context로 분리하는 것이 좋습니다.
          </p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}