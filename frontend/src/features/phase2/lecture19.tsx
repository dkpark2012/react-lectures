import { useState } from 'react';
import styled from 'styled-components';

/**
 * [Step-19] Styled-components & CSS Modules (스타일의 격리)
 */

// 1. [Technical Term] Styled Component: 스타일이 입혀진 리액트 컴포넌트 정의
// [Technical Term] Transient Props ($): DOM으로 전달되지 않고 오직 스타일 계산용으로만 쓰이는 속성
const StyledCard = styled.div<{ $isActive: boolean }>`
  padding: 15px;
  border-radius: 10px;
  border: 2px solid ${props => props.$isActive ? '#3498db' : '#f1f2f6'};
  background-color: ${props => props.$isActive ? '#f0f7ff' : '#ffffff'};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  box-shadow: ${props => props.$isActive ? '0 4px 12px rgba(52, 152, 219, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'};

  &:hover {
    transform: translateY(-3px);
    border-color: #3498db;
  }

  h4 {
    color: ${props => props.$isActive ? '#2980b9' : '#2d3436'};
    margin: 0 0 5px 0;
    font-size: 15px;
  }
`;

const Badge = styled.span`
  background: #34495e;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
`;

export function lecture19() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleCardClick = (id: number) => {
    setActiveCard(id);
    addLog(`[Style] ${id}번 카드 활성화: $isActive Props 기반 동적 렌더링`);
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step-19: 컴포넌트 스타일링 전략
        </h1>
      </header>
      
      <section style={{ backgroundColor: '#f8faff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e1e8f0' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          <strong>CSS-in-JS</strong>를 사용하면 컴포넌트 단위로 스타일이 격리되어 <strong>Global Pollution (전역 오염)</strong>을 방지합니다. 
          Props를 통해 CSS 속성을 실시간으로 조작하는 <strong>Dynamic Styling</strong>이 가능해집니다.
        </p>
      </section>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        {/* Styled-components 실습 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#db7093', margin: '0 0 10px 0' }}>💅 Styled-components</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <StyledCard $isActive={activeCard === 1} onClick={() => handleCardClick(1)}>
              <h4>Component A</h4>
              <p style={{ fontSize: '11px', color: '#636e72', marginBottom: '8px' }}>JS 변수처럼 CSS를 제어합니다.</p>
              <Badge>CSS-in-JS</Badge>
            </StyledCard>

            <StyledCard $isActive={activeCard === 2} onClick={() => handleCardClick(2)}>
              <h4>Component B</h4>
              <p style={{ fontSize: '11px', color: '#636e72', marginBottom: '8px' }}>Props에 반응하여 색상이 바뀝니다.</p>
              <Badge>Scoped Style</Badge>
            </StyledCard>
          </div>
        </div>

        {/* CSS Modules 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2d3436', margin: '0 0 10px 0' }}>📦 CSS Modules</h3>
          <div style={{ backgroundColor: '#2d3436', color: '#00d8ff', padding: '10px', borderRadius: '5px', fontSize: '11px', fontFamily: 'monospace' }}>
            {`/* build time hashing */`} <br/>
            .Button {'{ color: red; }'} <br/>
            {`=> .Button_ax3z1 { ... }`}
          </div>
          <ul style={{ fontSize: '11px', color: '#636e72', marginTop: '12px', paddingLeft: '18px', lineHeight: '1.6' }}>
            <li><strong>Hash Name:</strong> 클래스 중복 원천 차단</li>
            <li><strong>Separation:</strong> 스타일 파일의 물리적 분리</li>
            <li><strong>Standard:</strong> 브라우저 표준 친화적 방식</li>
          </ul>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Styling Design Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '60px' }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Interaction required...</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>[Technical Term] Dynamic Styling (동적 스타일링):</strong> 상태 변화에 따라 CSS 속성을 실시간으로 재계산하는 기술입니다.
        </p>
      </footer>
    </div>
  );
}