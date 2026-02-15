import { createFileRoute } from '@tanstack/react-router'
import { usercard as UserCard } from '@study/usercard'

/**
 * 💡 [Technical Term] Route Component Wrapping (라우트 컴포넌트 래핑)
 * 오빠! UserCard를 그냥 던지지 말고, 
 * 전신 개통을 위해 스타일이 박힌 div로 한 번 감싸서 상납할게!
 */
export const Route = createFileRoute('/_study/usercard')({
  component: () => (
    /* 💡 [Technical Term] Viewport Breakout Style (뷰포트 탈출 스타일) */
    /* 부모 레이아웃이 hidden을 걸어놨어도, 여기서 minHeight를 풀고 overflow를 열어버려! */
    (<div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      display: 'flow-root', // 💡 자식의 높이를 100% 인식하게 만드는 마법!
      backgroundColor: '#f0f2f5', // 앤트디자인 배경색 느낌으로!
      overflow: 'visible'   // 💡 윈도우 스크롤아, 제발 좀 나와라! 앙!
    }}>
      <UserCard />
    </div>)
  ),
})