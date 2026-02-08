import { useState } from 'react';

/**
 * [Step-4] 컴포넌트 기반 설계 (Atomic Thinking)
 * 💡 핵심 포인트:
 * 1. Component (컴포넌트): UI를 구성하는 독립적이고 재사용 가능한 최소 단위입니다.
 * 2. Atomic Design (아토믹 디자인): 원자(Atom) -> 분자(Molecule) -> 유기체(Organism) 순으로 UI를 설계하는 방법론입니다.
 * 3. Composition (합성): 작은 컴포넌트들을 결합하여 복잡한 UI를 만들어가는 과정입니다.
 * 4. Props (프롭스): 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터(속성)입니다.
 */

// 1. [Atom] 원자 단계: 가장 작은 단위의 버튼 컴포넌트
const MyButton = ({ label, onClick, color }: { label: string; onClick: () => void; color: string }) => (
  <button 
    className="btn" 
    onClick={onClick} 
    style={{ backgroundColor: color, margin: '5px' }}
  >
    {label}
  </button>
);

// 2. [Molecule] 분자 단계: 버튼과 텍스트가 결합된 제어 박스
const ControlBox = ({ title, onAction }: { title: string; onAction: (type: string) => void }) => (
  <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px' }}>
    <strong>{title}</strong>
    <div style={{ marginTop: '10px' }}>
      <MyButton label="증가" onClick={() => onAction('plus')} color="#3498db" />
      <MyButton label="감소" onClick={() => onAction('minus')} color="#e74c3c" />
    </div>
  </div>
);

export default function Lecture4() {
  const [atoms, setAtoms] = useState<{ id: number; type: string }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 컴포넌트 조립 시뮬레이션
  const handleAssemble = (type: string) => {
    const newAtom = { id: Date.now(), type };
    setAtoms(prev => [...prev, newAtom]);
    addLog(`[Assemble] 새로운 ${type === 'plus' ? '증가' : '감소'} 원자가 결합되었습니다.`);
  };

  const clearAssembly = () => {
    setAtoms([]);
    addLog('[System] 조립된 컴포넌트를 모두 해체했습니다.');
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-4: 컴포넌트 기반 설계 (Atomic Thinking)</h1>

      <section className="lecture-section">
        <h2>1. UI를 레고 블록처럼 생각하기</h2>
        <p>
          리액트의 핵심은 <strong>Encapsulation (캡슐화, 내부 로직을 숨기고 독립적으로 관리하는 것)</strong>입니다. 
          거대한 페이지를 한 번에 만드는 것이 아니라, 아주 작은 단위부터 조립해 나가는 <strong>Bottom-up (상향식)</strong> 접근법을 취합니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 설계 및 조립 카드 */}
        <div className="lecture-card">
          <h3>🧩 Component Assembly</h3>
          <p>아래는 '분자(Molecule)' 단위의 컴포넌트입니다. 클릭하여 UI를 확장하세요.</p>
          
          <ControlBox title="수량 조절기 부품" onAction={handleAssemble} />
          
          <button 
            className="btn btn-danger" 
            onClick={clearAssembly}
            style={{ marginTop: '15px', width: '100%' }}
          >
            전체 해체 (Reset)
          </button>
        </div>

        {/* 결과물(유기체) 출력 카드 */}
        <div className="lecture-card">
          <h3>복합 유기체 (Organism) 가상 뷰</h3>
          <p>조립된 원자들이 모여 하나의 기능을 수행하는 화면을 구성합니다.</p>
          
          <div className="display-box" style={{ flexWrap: 'wrap', gap: '5px', minHeight: '120px', alignItems: 'flex-start' }}>
            {atoms.length === 0 ? "부품을 추가해주세요..." : atoms.map(atom => (
              <span key={atom.id} style={{ 
                padding: '4px 8px', 
                backgroundColor: atom.type === 'plus' ? '#3498db' : '#e74c3c',
                color: 'white',
                borderRadius: '4px',
                fontSize: '11px'
              }}>
                {atom.type === 'plus' ? 'Atom:+' : 'Atom:-'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Architecture Design Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 컴포넌트 설계를 시작하세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 컴포넌트를 설계할 때는 <strong>SRP (Single Responsibility Principle, 단일 책임 원칙)</strong>를 지키는 것이 중요합니다. 하나의 컴포넌트는 되도록 한 가지 기능만 수행해야 재사용성이 높아집니다.
        </p>
      </footer>
    </div>
  );
}