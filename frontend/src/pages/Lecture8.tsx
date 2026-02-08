import { useState } from 'react';

/**
 * [Step-8] 리스트와 Key - 왜 index를 key로 쓰면 안 될까?
 * 💡 핵심 포인트:
 * 1. Map Function (맵 함수): 배열의 각 요소를 순회하며 새로운 형태(JSX)로 변환하는 자바스크립트 함수입니다.
 * 2. Key (키): 리액트가 어떤 항목을 변경, 추가, 삭제할지 식별하기 위해 사용하는 고유한 문자열입니다.
 * 3. Diffing (비교 알고리즘): 가상 돔 비교 시 Key를 기준으로 기존 요소와 새 요소를 매칭하여 효율적으로 렌더링합니다.
 * 4. Index as Key (인덱스를 키로 사용): 배열의 순서가 바뀌면 리액트가 엉뚱한 요소를 업데이트하는 성능 저하 및 버그의 원인이 됩니다.
 */

interface Item {
  id: number;
  text: string;
}

export default function Lecture8() {
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
    addLog(`[List] 맨 앞에 아이템 추가. 기존 인덱스들이 하나씩 밀립니다!`);
  };

  // 배열 순서 뒤집기
  const reverseList = () => {
    setItems(prev => [...prev].reverse());
    addLog(`[List] 리스트 순서 반전. 고유 ID를 Key로 쓰면 안전하게 재배치됩니다.`);
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-8: 리스트와 Key의 중요성</h1>

      <section className="lecture-section">
        <h2>1. 왜 고유한 Key가 필요한가?</h2>
        <p>
          리액트는 리스트를 렌더링할 때 <strong>Key</strong>를 보고 "이 녀석이 그 녀석이군!" 하고 판단합니다. 
          만약 <strong>Index (배열의 순번)</strong>를 키로 쓰면, 리스트 중간에 항목이 추가될 때 인덱스가 꼬여서 
          리액트가 엉뚱한 요소를 다시 그리거나 상태를 잘못 연결하는 <strong>Side Effect (부작용, 의도치 않은 결과)</strong>가 발생할 수 있습니다.
        </p>
      </section>

      <div className="demo-grid">
        {/* 리스트 조작 카드 */}
        <div className="lecture-card">
          <h3>🛠 List Controller</h3>
          <p>데이터를 추가하거나 뒤집어서 리액트의 반응을 확인하세요.</p>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button className="btn btn-primary" onClick={addItemToFront}>맨 앞에 추가하기</button>
            <button className="btn btn-success" onClick={reverseList}>순서 뒤집기</button>
          </div>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#636e72' }}>
            * 맨 앞에 추가할 때 Index를 Key로 쓰면 성능상 손해를 봅니다.
          </p>
        </div>

        {/* 리스트 출력 카드 */}
        <div className="lecture-card">
          <h3>📋 Item List (Key: item.id)</h3>
          <p>각 항목은 <strong>고유 ID</strong>를 Key로 가집니다.</p>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {items.map((item) => (
              <li key={item.id} className="display-box" style={{ marginBottom: '8px', minHeight: '40px' }}>
                {item.text}
                <input 
                  type="text" 
                  placeholder="상태 보존 테스트" 
                  style={{ marginLeft: '10px', fontSize: '11px', padding: '2px' }} 
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Reconciliation Log (재조정 로그)</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 리스트를 조작하여 가상 돔의 효율성을 느껴보세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 만약 리스트가 절대로 정렬되거나 필터링되지 않는 <strong>Static (정적인, 변화가 없는)</strong> 데이터라면 예외적으로 인덱스를 써도 무방합니다. 하지만 실무에서는 언제나 고유 ID를 사용하는 것이 <strong>Best Practice (권장 사례)</strong>입니다.
        </p>
      </footer>
    </div>
  );
}