import { useReducer } from 'react';

/**
 * [Step-13] useReducer - 복잡한 상태 로직 관리
 * 💡 핵심 포인트:
 * 1. useReducer: 컴포넌트의 상태 업데이트 로직을 컴포넌트 외부로 분리할 수 있게 해주는 훅입니다.
 * 2. Action (액션): 상태를 어떻게 변경할지에 대한 정보를 담은 객체입니다. (예: { type: 'INCREMENT' })
 * 3. Reducer (리듀서): 현재 상태와 액션을 받아 '새로운 상태'를 반환하는 순수 함수입니다.
 * 4. Dispatch (디스패치): 액션을 리듀서에게 전달하여 상태 업데이트를 요청하는 함수입니다.
 */

// 1. 초기 상태 정의
const initialState = {
  count: 0,
  isLocked: false,
  status: 'Idle (대기)'
};

// 2. 리듀서 함수 정의 (컴포넌트 외부에서 로직 관리 가능)
function reducer(state: typeof initialState, action: { type: string }) {
  if (state.isLocked && action.type !== 'TOGGLE_LOCK') {
    return { ...state, status: '⚠️ 잠금 상태입니다!' };
  }

  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, status: '숫자 증가됨' };
    case 'DECREMENT':
      return { ...state, count: state.count - 1, status: '숫자 감소됨' };
    case 'RESET':
      return { ...state, count: 0, status: '초기화됨' };
    case 'TOGGLE_LOCK':
      return { ...state, isLocked: !state.isLocked, status: !state.isLocked ? '잠금 활성' : '잠금 해제' };
    default:
      return state;
  }
}

export default function Lecture13() {
  // useReducer(리듀서함수, 초기상태)
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-13: useReducer (구조화된 상태 관리)</h1>

      <section className="lecture-section">
        <h2>1. 언제 useReducer를 사용할까요?</h2>
        <p>
          상태가 여러 개이고 서로 의존적일 때, <code>useState</code>를 남발하면 코드가 스파게티처럼 꼬일 수 있습니다. 
          이때 <strong>Reducer (리듀서)</strong>를 사용하면 "어떤 일이 일어날지(Action)"와 "어떻게 바뀔지(Logic)"를 명확히 분리할 수 있습니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 제어 카드 */}
        <div className="lecture-card">
          <h3>🎮 State Controller</h3>
          <p>액션을 <strong>Dispatch (디스패치)</strong> 하여 상태를 변화시키세요.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'INCREMENT' })}>증가 (+)</button>
            <button className="btn btn-danger" onClick={() => dispatch({ type: 'DECREMENT' })}>감소 (-)</button>
            <button className="btn" onClick={() => dispatch({ type: 'RESET' })} style={{ backgroundColor: '#95a5a6' }}>초기화</button>
            <button 
              className={`btn ${state.isLocked ? 'btn-success' : 'btn-danger'}`} 
              onClick={() => dispatch({ type: 'TOGGLE_LOCK' })}
            >
              {state.isLocked ? '잠금 해제' : '기능 잠금'}
            </button>
          </div>
        </div>

        {/* 상태 출력 카드 */}
        <div className="lecture-card">
          <h3>📊 Multi-State Monitor</h3>
          <p>여러 상태값이 유기적으로 변하는 모습을 확인하세요.</p>
          
          <div className="display-box" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            <div>🔢 Count: <span style={{ color: '#f1c40f' }}>{state.count}</span></div>
            <div>🔒 Locked: <span style={{ color: state.isLocked ? '#e74c3c' : '#2ecc71' }}>{state.isLocked ? 'Yes' : 'No'}</span></div>
            <div>📝 Status: <span style={{ fontSize: '12px' }}>{state.status}</span></div>
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 Action Dispatch Log</h3>
        <div className="log-container">
          <div className="log-item">현재 상태 객체: {JSON.stringify(state)}</div>
          <div className="log-item">💡 액션이 발생할 때마다 리듀서가 새로운 상태를 생성합니다.</div>
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 리듀서는 <strong>Pure Function (순수 함수, 입력값이 같으면 항상 같은 결과가 나오는 함수)</strong>여야 합니다. 
          함수 내부에서 API를 호출하거나 <code>Date.now()</code> 같은 비순수 작업을 수행하면 안 됩니다.
        </p>
      </footer>
    </div>
  );
}