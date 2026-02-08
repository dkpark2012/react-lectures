import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * [Step-17] Axios를 활용한 REST API 연동
 * 💡 핵심 포인트:
 * 1. REST API (Representational State Transfer): HTTP 프로토콜을 통해 데이터를 주고받는 아키텍처 스타일입니다.
 * 2. Axios: 비동기 통신을 지원하는 자바스크립트 라이브러리로, JSON 데이터 자동 변환과 에러 처리가 뛰어납니다.
 * 3. Async/Await (비동기 처리): 비동기 코드를 마치 동기 코드처럼 직관적으로 작성하게 해주는 자바스크립트 문법입니다.
 * 4. Error Handling (에러 핸들링): 서버 장애나 네트워크 오류 등 예외 상황을 처리하여 앱이 멈추지 않게 하는 과정입니다.
 */

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Lecture17() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  // 데이터를 가져오는 비동기 함수 (Data Fetching)
  const fetchPosts = async () => {
    setLoading(true); // 로딩 시작
    setError(null);   // 에러 초기화
    addLog('[API] 데이터 요청 시작 (GET /posts)');

    try {
      // JSONPlaceholder라는 테스트용 가짜 API 서비스를 사용합니다.
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
      
      setPosts(response.data); // Axios는 JSON 데이터를 .data 속성에 자동으로 파싱합니다.
      addLog(`[API] 성공: ${response.data.length}개의 데이터를 불러왔습니다.`);
    } catch (err: any) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      addLog(`[Error] 실패: ${err.message}`);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트 마운트 시 최초 1회 실행
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Step-17: Axios 외부 데이터 연동</h1>

      <section className="lecture-section">
        <h2>1. 비동기 데이터 통신 이해하기</h2>
        <p>
          웹 앱은 모든 데이터를 가지고 있지 않습니다. 필요할 때마다 <strong>Server (서버)</strong>에 요청을 보내고, 
          그 응답을 기다리는 동안 <strong>Loading State (로딩 상태)</strong>를 보여주는 사용자 경험(UX) 처리가 매우 중요합니다.
        </p>
      </section>

      

      <div className="demo-grid">
        {/* 컨트롤 카드 */}
        <div className="lecture-card">
          <h3>📡 API Controller</h3>
          <p>서버에 새로운 데이터를 요청하거나 상태를 제어합니다.</p>
          
          <button 
            className="btn btn-primary" 
            onClick={fetchPosts} 
            disabled={loading}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            {loading ? '데이터 불러오는 중...' : '데이터 다시 불러오기'}
          </button>
          
          <button 
            className="btn btn-danger" 
            onClick={() => setPosts([])} 
            style={{ width: '100%' }}
          >
            목록 비우기
          </button>
        </div>

        {/* 결과 출력 카드 */}
        <div className="lecture-card">
          <h3>📦 JSON Data Response</h3>
          <p>서버에서 받아온 실제 데이터입니다.</p>
          
          <div className="display-box" style={{ minHeight: '150px', maxHeight: '300px', overflowY: 'auto' }}>
            {loading && <div style={{ color: '#f39c12' }}>🔄 로딩 중입니다...</div>}
            {error && <div style={{ color: '#e74c3c' }}>❌ 에러: {error}</div>}
            
            {!loading && !error && posts.map(post => (
              <div key={post.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                <strong style={{ fontSize: '13px', color: '#3498db' }}>{post.id}. {post.title}</strong>
                <p style={{ fontSize: '12px', color: '#636e72', margin: '5px 0 0' }}>{post.body.substring(0, 50)}...</p>
              </div>
            ))}
            
            {!loading && posts.length === 0 && !error && <div>데이터가 없습니다.</div>}
          </div>
        </div>
      </div>

      <section className="log-section">
        <h3>📊 HTTP Communication Log</h3>
        <div className="log-container">
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </section>

      <footer className="lecture-section" style={{ marginTop: '40px', fontSize: '12px', color: '#95a5a6' }}>
        <p>
          💡 <strong>Deep Dive:</strong> 실제 협업에서는 <code>axios.create()</code>를 통해 <strong>Instance (인스턴스, 공통 설정이 적용된 통신 객체)</strong>를 만들어 
          Base URL이나 인증 토큰(JWT) 등을 관리하는 방식이 선호됩니다.
        </p>
      </footer>
    </div>
  );
}