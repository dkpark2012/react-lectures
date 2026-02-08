import { useState } from 'react';
import styled from 'styled-components';

/**
 * [Step-19] Styled-components & CSS Modules (스타일의 격리)
 * 💡 핵심 포인트:
 * 1. Scoped CSS (범위 제한 CSS): 스타일이 특정 컴포넌트에만 적용되어 전역 오염을 방지하는 개념입니다.
 * 2. Styled-components: CSS-in-JS 방식으로, 자바스크립트 파일 안에서 HTML 태그를 스타일링하여 컴포넌트화합니다.
 * 3. Dynamic Styling (동적 스타일링): Props를 기반으로 스타일을 조건부로 변경하는 기술입니다.
 * 4. CSS Modules: 클래스 이름 뒤에 고유한 해시값을 붙여 이름 중복을 원천 차단하는 방식입니다.
 */

// 1. [Styled-components] 스타일이 입혀진 컴포넌트 정의
const StyledCard = styled.div<{ $isActive: boolean }>`
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${props => props.$isActive ? '#3498db' : '#dfe6e9'};
  background-color: ${props => props.$isActive ? '#ebf5fb' : '#ffffff'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  h4 {
    color: ${props => props.$isActive ? '#2980b9' : '#2d3436'};
    margin: 0 0 10px 0;
  }
`;

const Badge = styled.span`
  background: #34495e;
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
`;

export default function Lecture19() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleCardClick = (id: number) => {
    setActiveCard(id);
    addLog(`[Style] ${id}번 카드 활성화: Props를 통해 CSS가 실시간 변경되었습니다.`);
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-19: 컴포넌트 스타일링 전략</h1>

      <section className="lecture-section">
        <h2>1. 전역 스타일 오염(CSS Global Pollution) 방지</h2>
        <p>
          전통적인 CSS는 모든 파일이 공유되므로 이름이 겹치면 디자인이 깨집니다. 
          <strong>CSS-in-JS (자바스크립트 내부의 CSS)</strong> 기술을 사용하면 스타일을 컴포넌트 내부에 
          <strong>Encapsulation (캡슐화, 외부의 접근을 막고 독립적으로 관리함)</strong> 할 수 있습니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* Styled-components 실습 */}
        <div className="lecture-card">
          <h3>💅 Styled-components</h3>
          <p>자바스크립트 변수처럼 스타일을 다룹니다.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <StyledCard 
              $isActive={activeCard === 1} 
              onClick={() => handleCardClick(1)}
            >
              <h4>Component A</h4>
              <p style={{ fontSize: '12px', color: '#636e72' }}>클릭 시 Props가 전달되어 색상이 바뀝니다.</p>
              <Badge>CSS-in-JS</Badge>
            </StyledCard>

            <StyledCard 
              $isActive={activeCard === 2} 
              onClick={() => handleCardClick(2)}
            >
              <h4>Component B</h4>
              <p style={{ fontSize: '12px', color: '#636e72' }}>독립적인 스타일 스코프를 가집니다.</p>
              <Badge>Scoped Style</Badge>
            </StyledCard>
          </div>
        </div>

        {/* CSS Modules 설명 카드 */}
        <div className="lecture-card">
          <h3>📦 CSS Modules (참고)</h3>
          <p><code>Button.module.css</code> 형식을 사용합니다.</p>
          <div className="display-box" style={{ backgroundColor: '#2d3436', color: '#ecf0f1', fontSize: '12px' }}>
            <pre>
{`// 빌드 시 클래스명이 자동 변경됨
.button { color: red; } 
=> .Button_button__ax3z1 { ... }`}
            </pre>
          </div>
          <ul style={{ fontSize: '12px', marginTop: '15px', color: '#636e72', lineHeight: '1.6' }}>
            <li><strong>Hash Name:</strong> 클래스명 뒤에 고유값 부여</li>
            <li><strong>Separation:</strong> 로직과 스타일 파일 분리</li>
            <li><strong>Standard:</strong> 브라우저 표준에 가까운 방식</li>
          </ul>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Styling Design Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 카드를 클릭하여 동적 스타일링을 체험하세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> Styled-components의 Props에는 <code>$</code> 접두사를 붙이는 <strong>Transient Props (일시적 프롭, 실제 DOM 요소에는 전달되지 않고 스타일 계산에만 쓰이는 속성)</strong> 패턴을 사용하는 것이 권장됩니다.
        </p>
      </footer>
    </div>
  );
}