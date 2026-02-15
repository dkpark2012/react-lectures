import { useState } from 'react';

// 1. [Atom] 원자 단계: 가장 작은 단위의 버튼
const MyButton = ({ label, onClick, color }: { label: string; onClick: () => void; color: string }) => (
  <button 
    onClick={onClick} 
    style={{ 
      backgroundColor: color, 
      color: 'white', 
      border: 'none', 
      padding: '6px 12px', 
      borderRadius: '4px', 
      cursor: 'pointer', 
      fontWeight: 'bold',
      marginRight: '5px',
      fontSize: '12px'
    }}
  >
    {label}
  </button>
);

// 2. [Molecule] 분자 단계: 버튼과 텍스트가 결합된 제어 박스
const ControlBox = ({ title, onAction }: { title: string; onAction: (type: string) => void }) => (
  <div style={{ border: '1px dashed #ced4da', padding: '12px', borderRadius: '8px', backgroundColor: '#fff' }}>
    <strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px', color: '#4b4b4b' }}>{title}</strong>
    <div style={{ display: 'flex' }}>
      <MyButton label="증가" onClick={() => onAction('plus')} color="#3498db" />
      <MyButton label="감소" onClick={() => onAction('minus')} color="#e74c3c" />
    </div>
  </div>
);

/**
 * [Step-4] 컴포넌트 기반 설계 (Atomic Thinking)
 */
export function lecture4() {
  const [atoms, setAtoms] = useState<{ id: number; type: string }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleAssemble = (type: string) => {
    const newAtom = { id: Date.now(), type };
    setAtoms(prev => [...prev, newAtom]);
    addLog(`[Assemble] ${type === 'plus' ? '증가' : '감소'} 부품 결합.`);
  };

  const clearAssembly = () => {
    setAtoms([]);
    addLog('[System] 모든 컴포넌트 해체 완료.');
  };

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션 */}
      <header style={{ 
        paddingTop: '10px', 
        marginBottom: '15px', 
        borderBottom: '2px solid #f1f2f6' 
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: '800', 
          color: '#2d3436', 
          margin: '0', 
          padding: '5px 0' 
        }}>
          🚀 Step-4: Atomic Design (아토믹 디자인)
        </h1>
      </header>
      
      {/* 개념 카드 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          UI를 <strong>Atom(원자) → Molecule(분자) → Organism(유기체)</strong> 단위로 설계하여 
          <strong>Reusability (재사용성: 작성한 코드를 여러 곳에서 다시 사용하는 능력)</strong>를 극대화합니다.
        </p>
      </section>

      {/* 데모 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 조립 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#0984e3', margin: '0 0 8px 0' }}>🧩 Component Assembly</h3>
          <ControlBox title="수량 조절기 부품" onAction={handleAssemble} />
          <button 
            onClick={clearAssembly}
            style={{ 
              marginTop: '10px', width: '100%', padding: '8px', 
              backgroundColor: '#636e72', color: 'white', border: 'none', 
              borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
            }}
          >
            Reset
          </button>
        </div>

        {/* 결과 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#6c5ce7', margin: '0 0 8px 0' }}>🧬 Organism View</h3>
          <div style={{ 
            display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '10px', 
            backgroundColor: '#f5f6fa', borderRadius: '5px', minHeight: '85px', alignContent: 'flex-start' 
          }}>
            {atoms.length === 0 ? <span style={{ color: '#a4b0be', fontSize: '12px' }}>부품 대기 중...</span> : atoms.map(atom => (
              <span key={atom.id} style={{ 
                padding: '2px 6px', backgroundColor: atom.type === 'plus' ? '#3498db' : '#e74c3c',
                color: 'white', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold'
              }}>
                {atom.type === 'plus' ? 'A:+' : 'A:-'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 로그 구역 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Architecture Design Log</h3>
        <div style={{ 
          padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', 
          borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Composition (합성):</strong> 작은 조각을 모아 큰 UI를 완성하는 리액트의 핵심 철학입니다.
        </p>
      </footer>
    </div>
  );
}