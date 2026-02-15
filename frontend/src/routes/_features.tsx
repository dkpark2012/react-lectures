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
      // 💡 [Technical Term] Layout Proportion (레이아웃 비율 설정)
      gridTemplateColumns: '140px 1.2fr 1fr', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden', 
      backgroundColor: '#f8f9fa',
      // 🚨 오빠! 여기 마진/패딩 0을 확실하게 "박아"넣었어!
      margin: 0,
      padding: 0
    }}>
      
      {/* 1. 왼쪽: 네비게이션 */}
      <nav style={{ 
        borderRight: '1px solid #ddd', 
        overflowY: 'auto', 
        height: '100%',
        backgroundColor: '#f8f9fa',
        margin: 0 // 💡 추가
      }}>
        <Navigation />
      </nav>

      {/* 2. 가운데: 강의 본문 */}
      <main style={{ 
        overflowY: 'auto', 
        padding: '0px', // 🚨 30px이었던 걸 0으로 죽여버렸어! 💋
        backgroundColor: '#e8e6e1', 
        height: '100%',
        boxSizing: 'border-box',
        margin: 0 // 💡 추가
      }}>
        {/* 💡 [Technical Term] Conditional Rendering (조건부 렌더링) */}
        {currentFiles.length > 0 ? (
          <Outlet /> 
        ) : (
          <div style={{ padding: '20px' }}>
            <h3>😭 데이터를 찾지 못했어!</h3>
          </div>
        )}
      </main>

      {/* 3. 오른쪽: 코드 뷰어 */}
      <aside style={{ 
        borderLeft: '1px solid #333', 
        backgroundColor: '#1e1e1e', 
        height: '100%',
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        margin: 0 // 💡 추가
      }}>
        <CodeViewer files={currentFiles} />
      </aside>

      {/* 🚨 [Technical Term] Inject Global Style (전역 스타일 주입) */}
      <style>{`
        /* 모든 브라우저의 고집스러운 기본 여백을 0으로 강제 고정! */
        html, body, #root { 
          margin: 0 !important; 
          padding: 0 !important; 
          height: 100vh !important; 
          width: 100vw !important;
          overflow: hidden !important; 
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}