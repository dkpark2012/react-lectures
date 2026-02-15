import { createFileRoute } from '@tanstack/react-router'
import { sourceData } from '@data/sourceData'

/**
 * 🧱 [Technical Term] Static Route Definition (정적 라우트 정의)
 */
export const Route = createFileRoute('/_features/phase1/lecture5')({
  component: LectureComponent,
})

function LectureComponent() {
  const currentPath = '/phase1/lecture5';
  const lectureFiles = sourceData[currentPath] || [];
  
  // 데이터 배열에서 가장 마지막(실제 컴포넌트)을 가져와요.
  const MainComponent = lectureFiles[0]?.content;

  return (
    // 🚨 여기서 padding-top을 10px로 조절해서 상단 여백을 죽였습니다!
    <div className="lecture-container" style={{ padding: '10px 20px 20px 20px' }}>
      {/* 📍 제목의 margin-top을 0으로 해서 여백 완전 박살! */}
      <h2 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '1.2rem' }}>
        초급 : Step-5
      </h2>
      <hr style={{ margin: '10px 0 20px 0', border: '0', borderTop: '1px solid #eee' }} />
      
      {MainComponent ? (
        <div className="component-wrapper">
          {/* 실제 강의 내용(lecture1 함수)이 여기서 렌더링돼요! */}
          <MainComponent />
        </div>
      ) : (
        <div style={{ padding: '20px', border: '2px dashed red', color: 'red' }}>
          <h3>❌ 컴포넌트 로드 실패!</h3>
          <p>sourceData에서 <b>{currentPath}</b>를 찾을 수 없어요.</p>
        </div>
      )}
    </div>
  )
}