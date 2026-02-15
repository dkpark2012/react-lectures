import { useState } from 'react';

/**
 * 🚀 Step-20: Tailwind CSS 실전 레이아웃 구성
 * [Technical Term] Unified UI System (통일된 UI 시스템)을 적용해 
 * lecture1과 동일한 사용자 경험을 제공합니다.
 */
export function Lecture20() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const menuItems = [
    { name: 'Overview', icon: '📊' },
    { name: 'Analytics', icon: '📈' },
    { name: 'Team', icon: '👥' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    // 🚨 lecture1과 동일한 Box Model Reset 적용
    <div style={{ padding: '0 15px 15px 15px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 헤더 섹션: 상단 여백 박살! */}
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
          🚀 Step-20: Tailwind CSS 실전 레이아웃 구성
        </h1>
      </header>
      
      {/* 개념 카드: lecture1 스타일 계승 */}
      <section style={{ 
        backgroundColor: '#f8faff', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        border: '1px solid #e1e8f0'
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0', color: '#4a90e2' }}>💡 핵심 포인트</h2>
        <p style={{ fontSize: '13.5px', color: '#57606f', margin: 0, lineHeight: '1.4' }}>
          실제 프로젝트에서는 <strong>Tailwind CSS</strong>를 사용해 사이드바와 메인 영역이 유기적으로 움직이는 레이아웃을 구성합니다.
        </p>
      </section>

      {/* 데모 그리드: 실제 레이아웃 시뮬레이션 */}
      <div style={{ 
        display: 'flex', 
        height: '350px', 
        border: '1px solid #eee', 
        borderRadius: '10px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '15px'
      }}>
        
        {/* 미니 사이드바 프리뷰 */}
        <aside style={{ 
          width: isSidebarOpen ? '140px' : '50px',
          backgroundColor: '#1e293b',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px'
        }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ 
              backgroundColor: '#334155', color: 'white', border: 'none', 
              borderRadius: '4px', cursor: 'pointer', marginBottom: '10px', padding: '5px'
            }}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
          {menuItems.map(item => (
            <div key={item.name} style={{ 
              color: activeTab === item.name ? '#818cf8' : '#94a3b8',
              fontSize: '12px', padding: '8px 0', cursor: 'pointer',
              display: 'flex', gap: '8px'
            }} onClick={() => setActiveTab(item.name)}>
              <span>{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </div>
          ))}
        </aside>

        {/* 메인 영역 프리뷰 */}
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{activeTab}</h3>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>2026.02.15</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[1, 2].map(i => (
              <div key={i} style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}>METRIC {i}</div>
                <div style={{ fontSize: '18px', fontWeight: '900' }}>$12,400</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* 실습 로그: lecture1 스타일과 일치 */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📝 Layout State Log</h3>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#1e272e', 
          color: '#00d8ff', 
          borderRadius: '6px', 
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <div style={{ borderLeft: '2px solid #00d8ff', paddingLeft: '6px' }}>
            Sidebar Status: {isSidebarOpen ? 'EXPANDED' : 'COLLAPSED'}
          </div>
          <div style={{ borderLeft: '2px solid #00d8ff', paddingLeft: '6px', marginTop: '4px' }}>
            Active Menu: {activeTab.toUpperCase()}
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a4b0be', margin: 0 }}>
          💡 <strong>[Technical Term] Responsive Grid (반응형 그리드):</strong> 화면 크기에 따라 유연하게 변하는 레이아웃을 구성하는 실습입니다.
        </p>
      </footer>
    </div>
  );
}