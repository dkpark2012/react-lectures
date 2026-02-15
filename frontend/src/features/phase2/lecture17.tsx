import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * [Step-17] Axios를 활용한 REST API 연동
 */

interface Post {
  id: number;
  title: string;
  body: string;
}

export function lecture17() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  /**
   * 📡 [Technical Term] Async/Await (비동기 처리):
   * 서버 응답을 기다리는 동안 브라우저가 멈추지 않게 비동기적으로 처리합니다.
   */
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    addLog('[API] GET 요청 전송 (JSONPlaceholder)');

    try {
      // Axios는 응답 데이터를 자동으로 JSON으로 파싱해주는 기특한 녀석이야!
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=3');
      
      setPosts(response.data);
      addLog(`[API] 성공: ${response.data.length}건 수신`);
    } catch (err: any) {
      // [Technical Term] Exception Handling (예외 처리)
      setError(err.message || '네트워크 오류 발생');
      addLog(`[Error] 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <header style={{ paddingTop: '10px', marginBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3436', margin: '0', padding: '5px 0' }}>
          🚀 Step-17: Axios 외부 데이터 연동
        </h1>
      </header>
      
      <section style={{ backgroundColor: '#f8faff', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e1e8f0' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          실제 앱은 서버와 <strong>HTTP 통신</strong>을 통해 데이터를 주고받습니다. 
          데이터가 오는 동안 <strong>Loading (로딩)</strong> 상태를 관리하는 것이 <strong>UX (사용자 경험)</strong>의 핵심입니다.
        </p>
      </section>

      

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
        
        {/* 컨트롤 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#3498db', margin: '0 0 8px 0' }}>📡 API Controller</h3>
          <button 
            onClick={fetchPosts} 
            disabled={loading}
            style={{ 
              width: '100%', padding: '10px', backgroundColor: loading ? '#bdc3c7' : '#3498db', 
              color: 'white', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', 
              fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' 
            }}
          >
            {loading ? 'Fetching...' : '데이터 리로드'}
          </button>
          <button 
            onClick={() => setPosts([])} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            목록 비우기
          </button>
        </div>

        {/* 결과 출력 카드 */}
        <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', color: '#2ecc71', margin: '0 0 8px 0' }}>📦 Response Data</h3>
          <div style={{ 
            height: '150px', overflowY: 'auto', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', fontSize: '12px' 
          }}>
            {loading && <div style={{ textAlign: 'center', color: '#f39c12', paddingTop: '50px' }}>🔄 Loading...</div>}
            {error && <div style={{ color: '#e74c3c' }}>❌ Error: {error}</div>}
            {!loading && !error && posts.map(post => (
              <div key={post.id} style={{ marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 'bold', color: '#2d3436' }}>#{post.id} {post.title.slice(0, 20)}...</div>
                <div style={{ color: '#636e72', fontSize: '11px' }}>{post.body.slice(0, 40)}...</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 로그 구역: HTTP Communication Log */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📊 HTTP Communication Log</h3>
        <div style={{ padding: '10px', backgroundColor: '#1e272e', color: '#00d8ff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', minHeight: '60px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '2px', borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>{log}</div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>[Technical Term] REST (Representational State Transfer):</strong> 자원을 이름으로 구분하여 그 상태를 주고받는 가장 대중적인 API 아키텍처입니다.
        </p>
      </footer>
    </div>
  );
}