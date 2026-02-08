// src/pages/Home.tsx
import { Link } from 'react-router-dom';

/**
 * 📚 [Technical Term] Curriculum Data (커리큘럼 데이터)
 * 5단계 레벨과 각 레벨의 시작 경로(Path)를 정의한 객체 배열입니다.
 */
const levels = [
  {
    lv: 1,
    title: "초급: 리액트의 본질",
    desc: "Virtual DOM, JSX, Props/State 등 리액트의 핵심 뼈대를 마스터합니다.",
    steps: "Step 1 ~ 10",
    path: "/study/lecture1",
    color: "#1976d2"
  },
  {
    lv: 2,
    title: "초상급: 훅과 실무 핵심",
    desc: "다양한 Hooks와 API 연동, 실전 레이아웃 구성을 배웁니다.",
    steps: "Step 11 ~ 20",
    path: "/study/lecture11",
    color: "#388e3c"
  },
  {
    lv: 3,
    title: "중급: 아키텍처",
    desc: "Zustand, React Query 등 대규모 상태 관리와 설계를 다룹니다.",
    steps: "Step 21 ~ 30",
    path: "/study/lecture21",
    color: "#fbc02d"
  },
  {
    lv: 4,
    title: "중상급: 성능과 인프라",
    desc: "최적화, 테스팅, CI/CD 배포 자동화까지 전문가의 영역을 배웁니다.",
    steps: "Step 31 ~ 40",
    path: "/study/lecture31",
    color: "#f57c00"
  },
  {
    lv: 5,
    title: "고급: 미래 기술",
    desc: "Next.js, RSC, Fiber 아키텍처 등 리액트의 최첨단 기술을 정복합니다.",
    steps: "Step 41 ~ 50",
    path: "/study/lecture41",
    color: "#d32f2f"
  }
];

function Home() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: '100%' }}>
      {/* 메인 헤더 */}
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '15px', color: '#1a1a1a' }}>
        🚀 React Master Roadmap
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '50px' }}>
        기초부터 아키텍처 설계까지, 50단계로 완성하는 리액트 전문가 과정
      </p>

      {/* 레벨 카드 그리드 영역 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {levels.map((item) => (
          <LevelCard key={item.lv} {...item} />
        ))}
      </div>

      {/* 💡 학습 안내 가이드 (Technical Term: UI/UX Guide) */}
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
          <p>• <b>Progressive Learning (점진적 학습):</b> 하위 레벨의 개념이 상위 레벨에서 계속 재사용됩니다.</p>
          <p>• <b>Hands-on Lab (실습 중심):</b> 좌측의 소스 코드 뷰어를 통해 실제 구현체를 분석하며 학습하세요.</p>
          <p>• <b>Roadmap Goal:</b> 50단계를 마치면 단순 개발자를 넘어 <b>Architect (설계자)</b>의 시야를 갖게 됩니다.</p>
        </div>
      </div>
    </div>
  );
}

// 🧱 카드 컴포넌트 (Technical Term: Component Abstraction)
function LevelCard({ lv, title, desc, steps, path, color }: { lv: number, title: string, desc: string, steps: string, path: string, color: string }) {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '35px 25px',
        borderRadius: '16px',
        backgroundColor: 'white',
        border: `1px solid #eee`,
        borderTop: `5px solid ${color}`, // 레벨별 고유 색상 부여
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'left',
        position: 'relative',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = `0 15px 30px rgba(0,0,0,0.1)`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
        e.currentTarget.style.borderColor = '#eee';
      }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: color, marginBottom: '10px', textTransform: 'uppercase' }}>
          Phase {lv}
        </div>
        <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#1a1a1a' }}>{title}</h3>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '25px', minHeight: '68px', lineHeight: '1.6' }}>{desc}</p>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ 
            padding: '4px 12px',
            backgroundColor: `${color}15`, // 색상에 투명도 15% 추가
            color: color,
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {steps}
          </span>
          <span style={{ fontSize: '14px', color: '#aaa' }}>자세히 보기 →</span>
        </div>
      </div>
    </Link>
  );
}

export default Home;