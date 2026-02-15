import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Navigation } from '@/components/Navigation' 
import { CodeViewer } from '@/components/CodeViewer'
import { sourceData } from '@data/sourceData'

export const Route = createFileRoute('/_features')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const location = useLocation()
  
  let p = location.pathname.replace('/_features', '');
  if (p === '') p = '/';

  const currentFiles = sourceData[p] || sourceData[p.startsWith('/') ? p.substring(1) : '/' + p] || [];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '140px 1.2fr 1fr', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden', // 💡 브라우저 최외곽 스크롤 차단
      backgroundColor: '#f8f9fa' 
    }}>
      
      {/* 1. 왼쪽: 네비게이션 */}
      <nav style={{ 
        borderRight: '1px solid #ddd', 
        overflowY: 'auto', 
        height: '100%',
        backgroundColor: '#f8f9fa' 
      }}>
        <Navigation />
      </nav>

      {/* 2. 가운데: 강의 본문 */}
      <main style={{ 
        overflowY: 'auto', 
        padding: '30px', 
        backgroundColor: '#e8e6e1', // 오빠 눈 편한 웜 그레이
        height: '100%',
        boxSizing: 'border-box' 
      }}>
        {currentFiles.length > 0 ? (
          <Outlet /> 
        ) : (
          <div style={{ padding: '20px', border: '1px solid red' }}>
            <h3>😭 데이터를 찾지 못했어!</h3>
          </div>
        )}
      </main>

      {/* 3. 오른쪽: 코드 뷰어 (문제의 구간!) */}
      <aside style={{ 
        borderLeft: '1px solid #333', 
        backgroundColor: '#1e1e1e', 
        height: '100%',
        overflow: 'hidden', // 💡 [Technical Term] Overflow Hidden (오버플로 숨김)
        display: 'flex',    // 💡 내부 CodeViewer가 꽉 차게 설정
        flexDirection: 'column'
      }}>
        {/* CodeViewer 자체가 스크롤을 가지고 있어야 깔끔해! */}
        <CodeViewer files={currentFiles} />
      </aside>

      <style>{`
        /* 🚨 [Technical Term] Global Reset (전역 초기화) */
        html, body, #root { 
          margin: 0; 
          padding: 0; 
          height: 100vh; 
          width: 100vw;
          overflow: hidden !important; 
        }
      `}</style>
    </div>
  )
}