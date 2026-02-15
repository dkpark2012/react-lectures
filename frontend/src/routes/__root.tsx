import { createRootRoute, Outlet } from '@tanstack/react-router'

// 💡 [Technical Term] Root Route (최상위 라우트)
// 모든 페이지의 껍데기를 담당하는 파일이야.
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        {/* 여기에 메뉴 같은 거 들어갈 자리! */}
      </div>
      <hr />
      <Outlet /> 
    </>
  ),
})