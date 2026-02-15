import { useState } from 'react';

/**
 * [Step-8] 리스트와 Key - 왜 index를 key로 쓰면 안 될까?
 */

interface Item {
  id: number;
  text: string;
}

export function lecture8() {
  // 고유 ID를 가진 데이터 리스트
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: '🍎 사과 (ID: 1)' },
    { id: 2, text: '🍌 바나나 (ID: 2)' },
    { id: 3, text: '🍇 포도 (ID: 3)' },
  ]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 배열의 맨 앞에 요소를 추가 (인덱스 변화 시뮬레이션)
  const addItemToFront = () => {
    const newItem = { id: Date.now(), text: `🍓 딸기 (ID: ${Date.now() % 1000})` };
    setItems(prev => [newItem, ...prev]);
    addLog(`[List] 맨 앞에 아이템 추가. 인덱스 밀림 발생!`);
  };

  // 배열 순서 뒤집기
  const reverseList = () => {
    setItems(prev => [...prev].reverse());
    addLog(`[List] 리스트 순서 반전. 고유 ID Key로 안전하게 유지.`);
  };

  return (
    // 🚨 Box Model Reset: 상단 여백 0, 중앙 정렬 최적화
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 그대로 복사 */}
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
          🚀 Step-8: 리스트와 Key의 중요성
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
          리액트는 <strong>Key</strong>를 통해 요소의 변경을 식별합니다. <strong>Index(배열 순번)</strong>를 키로 쓰면 리스트가 바뀔 때 리액트가 혼란을 느껴 성능 저하나 버그가 생길 수 있습니다.
        </p>
      </section>

      {/* 데모 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 리스트 조작 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>🛠 Controller</h3>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <button 
              onClick={addItemToFront}
              style={{ padding: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
            >
              맨 앞에 아이템 추가
            </button>
            <button 
              onClick={reverseList}
              style={{ padding: '8px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
            >
              순서 뒤집기
            </button>
          </div>
          <p style={{ fontSize: '11px', marginTop: '10px', color: '#a4b0be' }}>
            * 아이템 추가 시 인덱스가 꼬이는 현상을 관찰하세요.
          </p>
        </div>

        {/* 리스트 출력 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#e74c3c', margin: '0 0 8px 0' }}>📋 Item List</h3>
          <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ 
                padding: '8px', backgroundColor: '#f5f6fa', borderRadius: '5px', 
                marginBottom: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span>{item.text}</span>
                <input 
                  type="text" 
                  placeholder="보존 확인" 
                  style={{ width: '60px', padding: '2px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '10px' }} 
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 로그 구역: Reconciliation Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 Reconciliation Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace',
          minHeight: '60px'
        }}>
          {logs.length === 0 && <div style={{ color: '#747d8c' }}>- Performance logs appear here.</div>}
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Best Practice:</strong> 실무에서는 항상 고유 ID(UUID, DB ID 등)를 Key로 사용하세요.
        </p>
      </footer>
    </div>
  );
}