import { createRootRoute, Outlet } from '@tanstack/react-router'

// 💡 [Technical Term] Root Route (최상위 라우트)
// 모든 페이지의 껍데기를 담당하는 파일이야.
export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet /> 
    </>
  ),
})