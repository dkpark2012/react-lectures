import { Link } from 'react-router-dom';

// 📚 메인 화면에 보여줄 5단계 요약 데이터
const levels = [
  {
    lv: 1,
    title: "초급: 리액트의 본질",
    desc: "Virtual DOM, JSX, Props/State 등 리액트의 핵심 뼈대를 마스터합니다.",
    steps: "Step 1 ~ 10",
    path: "/study/lecture1"
  },
  {
    lv: 2,
    title: "초상급: 훅과 실무 핵심",
    desc: "다양한 Hooks와 API 연동, 실전 레이아웃 구성을 배웁니다.",
    steps: "Step 11 ~ 20",
    path: "/study/lecture11"
  },
  {
    lv: 3,
    title: "중급: 아키텍처",
    desc: "Zustand, React Query 등 대규모 상태 관리와 설계를 다룹니다.",
    steps: "Step 21 ~ 30",
    path: "/study/lecture21"
  },
  {
    lv: 4,
    title: "중상급: 성능과 인프라",
    desc: "최적화, 테스팅, CI/CD 배포 자동화까지 전문가의 영역을 배웁니다.",
    steps: "Step 31 ~ 40",
    path: "/study/lecture31"
  },
  {
    lv: 5,
    title: "고급: 미래 기술",
    desc: "Next.js, RSC, Fiber 아키텍처 등 리액트의 최첨단 기술을 정복합니다.",
    steps: "Step 41 ~ 50",
    path: "/study/lecture41"
  }
];

function Home() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '15px', color: '#1a1a1a' }}>
        🚀 React Master Roadmap
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '50px' }}>
        기초부터 아키텍처 설계까지, 50단계로 완성하는 리액트 전문가 과정
      </p>

      {/* 레벨 카드 그리드 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {levels.map((item) => (
          <LevelCard key={item.lv} {...item} />
        ))}
      </div>

      {/* 학습 안내 가이드 */}
      <div style={{ 
        marginTop: '70px', 
        padding: '40px', 
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        maxWidth: '800px',
        margin: '70px auto 0'
      }}>
        <h2 style={{ color: '#1976d2', marginBottom: '20px' }}>💡 학습 가이드</h2>
        <div style={{ textAlign: 'left', lineHeight: '1.8', color: '#444' }}>
          <p>• <b>좌측 사이드바:</b> 선택한 레벨의 상세 Step(1~10)으로 바로 이동합니다.</p>
          <p>• <b>실습 중심:</b> 모든 강의는 직접 코드를 타이핑하고 Console을 확인하며 진행합니다.</p>
          <p>• <b>계단식 성장:</b> 하위 레벨의 개념이 상위 레벨에서 계속 재사용되니 순차적 학습을 권장합니다.</p>
        </div>
      </div>
    </div>
  );
}

// 카드 컴포넌트
function LevelCard({ lv, title, desc, steps, path }: { lv: number, title: string, desc: string, steps: string, path: string }) {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '35px 25px',
        borderRadius: '16px',
        backgroundColor: 'white',
        border: '1px solid #eee',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#1976d2';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#eee';
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1976d2', marginBottom: '10px' }}>
          LEVEL {lv}
        </div>
        <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#1a1a1a' }}>{title}</h3>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px', minHeight: '68px' }}>{desc}</p>
        <div style={{ 
          display: 'inline-block',
          padding: '4px 12px',
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {steps}
        </div>
      </div>
    </Link>
  );
}

export default Home;