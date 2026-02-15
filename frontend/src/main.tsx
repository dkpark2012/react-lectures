import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen' // 자동으로 생성된 파일

// 💡 [Technical Term] Router Instance (라우터 인스턴스)
// 우리가 만든 길(routeTree)을 가지고 진짜 라우터를 만듭니다.
const router = createRouter({ routeTree })

// 💡 [Technical Term] Type Safety (타입 안전성)
// 라우터가 오빠의 경로를 완벽하게 기억하도록 등록해줍니다.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      {/* ⚠️ 중요: 모든 컴포넌트는 반드시 이 Provider '안쪽'에 있어야 해! */}
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}