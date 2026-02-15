import { useReducer } from 'react';

/**
 * [Step-13] useReducer - 복잡한 상태 관리의 정석
 */

// 1️⃣ 초기 상태 정의
const initialState = { count: 0 };

// 2️⃣ 리듀서 함수 정의 (로직을 컴포넌트 외부로 분리!)
// [Technical Term] Pure Function (순수 함수): 동일한 입력에 대해 항상 동일한 출력을 보장함
function reducer(state: { count: number }, action: { type: string }) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function lecture13() {
  /**
   * 🧱 [Technical Term] Dispatch (디스패치): 
   * 상태 변경 알림을 리듀서에게 전달하는 메신저 역할을 합니다.
   */
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // 🚨 Box Model Reset: 상단 여백 제거 및 레이아웃 최적화
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: lecture1 규격 상속 */}
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
          🚀 Step-13: useReducer 마스터하기
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
          상태 업데이트 로직이 복잡해지면 컴포넌트 외부에 <strong>Reducer (리듀서 함수)</strong>를 분리하는 것이 관리에 유리합니다. 
          이는 <strong>State Management (상태 관리)</strong>의 핵심 패턴입니다.
        </p>
      </section>

      {/* 메인 데모 카드 */}
      <div style={{ 
        padding: '25px', 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        border: '1px solid #eee', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '14px', color: '#636e72', marginBottom: '10px' }}>🔢 Counter with Reducer</h3>
        <div style={{ 
          fontSize: '42px', 
          fontWeight: '900', 
          color: '#2d3436', 
          margin: '15px 0' 
        }}>
          {state.count}
        </div>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button 
            onClick={() => dispatch({ type: 'INCREMENT' })}
            style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + 증가
          </button>
          <button 
            onClick={() => dispatch({ type: 'DECREMENT' })}
            style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            - 감소
          </button>
          <button 
            onClick={() => dispatch({ type: 'RESET' })}
            style={{ padding: '10px 20px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            초기화
          </button>
        </div>
      </div>

      {/* 로직 시각화 섹션 */}
      <section style={{ 
        padding: '15px', 
        backgroundColor: '#1e272e', 
        borderRadius: '8px',
        color: '#f1f2f6'
      }}>
        <h3 style={{ fontSize: '14px', color: '#00d8ff', marginTop: 0 }}>🎯 Logic Flow</h3>
        <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: '#ced6e0', lineHeight: '1.8', margin: 0 }}>
          <li><strong>Dispatch:</strong> <code>dispatch({"{ type: 'INCREMENT' }"})</code> 호출</li>
          <li><strong>Action:</strong> 업데이트 정보가 리듀서로 <strong>Transfer (전달)</strong>됨</li>
          <li><strong>Reducer:</strong> 현재 상태와 액션을 비교해 <strong>New State (새 상태)</strong> 생성</li>
        </ul>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>Immutable (불변성):</strong> 리듀서는 기존 상태를 직접 수정하지 않고 반드시 새로운 객체를 반환해야 합니다.
        </p>
      </footer>
    </div>
  );
}