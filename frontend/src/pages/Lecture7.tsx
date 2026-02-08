import React, { useState } from 'react';

/**
 * [Step-7] 이벤트 핸들링과 합성 이벤트 (Synthetic Event)
 * 💡 핵심 포인트:
 * 1. Event Handling (이벤트 핸들링): 사용자가 버튼을 클릭하거나 키보드를 입력하는 등의 사건을 처리하는 과정입니다.
 * 2. Synthetic Event (합성 이벤트): 브라우저마다 다른 기본 이벤트를 리액트가 하나로 감싸서(Wrapping) 만든 교차 브라우저용 객체입니다.
 * 3. Event Pooling (이벤트 풀링): 리액트 16 이하에서 성능을 위해 이벤트 객체를 재사용하던 방식입니다. (17부터는 폐지되어 자유롭게 접근 가능)
 * 4. CamelCase (카멜 케이스): 리액트의 이벤트 속성은 HTML과 달리 'onClick', 'onChange'처럼 카멜 케이스를 사용합니다.
 */

export default function Lecture7() {
  const [inputValue, setInputValue] = useState<string>('');
  const [eventType, setEventType] = useState<string>('없음');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 1. 클릭 이벤트 핸들러 (SyntheticEvent 활용)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e는 브라우저 고유의 이벤트가 아니라 리액트가 제공하는 합성 이벤트 객체입니다.
    setEventType(e.type);
    addLog(`[Click] 클릭된 좌표: X(${e.clientX}), Y(${e.clientY})`);
  };

  // 2. 변경 이벤트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setEventType(e.type);
    // e.target은 이벤트를 발생시킨 DOM 요소(Input)를 가리킵니다.
  };

  // 3. 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addLog(`[Keydown] 엔터키 감지! 입력값: ${inputValue}`);
      setInputValue(''); // 입력창 초기화
    }
  };

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-7: 이벤트 핸들링과 합성 이벤트</h1>

      <section className="lecture-section">
        <h2>1. 리액트 이벤트 시스템의 특징</h2>
        <p>
          리액트는 모든 이벤트를 <strong>Document (문서 전체)</strong> 레벨에서 관리하는 <strong>Event Delegation (이벤트 위임, 부모 요소에서 자식의 이벤트를 한꺼번에 처리하는 기법)</strong> 방식을 사용합니다. 
          이를 통해 메모리를 아끼고 성능을 최적화합니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 마우스 이벤트 카드 */}
        <div className="lecture-card">
          <h3>🖱 Mouse Event</h3>
          <p>버튼을 클릭하여 <strong>SyntheticEvent (합성 이벤트)</strong> 객체의 정보를 확인하세요.</p>
          <button className="btn btn-primary" onClick={handleClick} style={{ width: '100%' }}>
            클릭 좌표 확인
          </button>
          <div className="display-box">
            최근 발생 이벤트: {eventType}
          </div>
        </div>

        {/* 입력 이벤트 카드 */}
        <div className="lecture-card">
          <h3>⌨ Keyboard & Input Event</h3>
          <p>텍스트를 입력하고 <strong>Enter</strong> 키를 눌러보세요.</p>
          <input 
            type="text" 
            className="display-box" 
            style={{ width: '100%', border: '1px solid #ddd', color: '#fff' }}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="여기에 입력 후 엔터..."
          />
          <p style={{ fontSize: '12px', marginTop: '5px' }}>실시간 입력: {inputValue}</p>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Event Analysis Log</h3>
        <div className="log-container">
          {logs.length === 0 && <div className="log-item">- 이벤트를 발생시켜보세요.</div>}
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 리액트 이벤트는 <strong>Native Event (브라우저 고유 이벤트)</strong>와 1:1로 매칭되지 않을 수 있습니다. 
          예를 들어, 리액트의 <code>onChange</code>는 브라우저의 <code>oninput</code>과 유사하게 모든 입력 변화에 실시간으로 반응하도록 최적화되어 있습니다.
        </p>
      </footer>
    </div>
  );
}