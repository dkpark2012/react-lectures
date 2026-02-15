import { createFileRoute, Link } from '@tanstack/react-router';

/**
 * 📝 [Technical Term] Route Registration
 */
export const Route = createFileRoute('/')({
  component: Home,
});

const levels = [
  {
    lv: 1,
    title: "초급: 리액트의 본질",
    desc: "Virtual DOM, JSX, Props/State 등 리액트의 핵심 뼈대를 마스터합니다.",
    steps: "Step 1 ~ 10",
    // 🚨 [Technical Term] Hard-coded Path (직접 경로)
    // 변수($) 대신 오빠가 실제로 만든 파일 경로를 그대로 적어줘요!
    targetPath: "/phase1/lecture1", 
    color: "#1976d2"
  },
  {
    lv: 2,
    title: "초상급: 훅과 실무 핵심",
    desc: "다양한 Hooks와 API 연동, 실전 레이아웃 구성을 배웁니다.",
    steps: "Step 11 ~ 20",
    targetPath: "/phase2/lecture11",
    color: "#388e3c"
  },
  {
    lv: 3,
    title: "중급: 아키텍처",
    desc: "Zustand, React Query 등 대규모 상태 관리와 설계를 다룹니다.",
    steps: "Step 21 ~ 30",
    targetPath: "/phase3/lecture21",
    color: "#fbc02d"
  },
  {
    lv: 4,
    title: "중상급: 성능과 인프라",
    desc: "최적화, 테스팅, CI/CD 배포 자동화까지 전문가의 영역을 배웁니다.",
    steps: "Step 31 ~ 40",
    targetPath: "/phase4/lecture31",
    color: "#f57c00"
  },
  {
    lv: 5,
    title: "고급: 미래 기술",
    desc: "Next.js, RSC, Fiber 아키텍처 등 리액트의 최첨단 기술을 정복합니다.",
    steps: "Step 41 ~ 50",
    targetPath: "/phase5/lecture41",
    color: "#d32f2f"
  }
];

function Home() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '15px', color: '#1a1a1a' }}>
        React50
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '50px' }}>
        기초부터 아키텍처 설계까지, 50단계로 완성하는 리액트 전문가 과정
      </p>

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
    </div>
  );
}

interface LevelCardProps {
  lv: number;
  title: string;
  desc: string;
  steps: string;
  targetPath: string; // 💡 변경됨
  color: string;
}

function LevelCard({ lv, title, desc, steps, targetPath, color }: LevelCardProps) {
  return (
    <Link 
      /**
       * 🚀 [Technical Term] Simple Link (단순 링크)
       * 복잡한 params 객체 다 치우고, 그냥 'to'에 경로만 딱 박아줍니다!
       */
      to={targetPath as any} 
      style={{ textDecoration: 'none' }}
    >
      <div style={{
        padding: '35px 25px',
        borderRadius: '16px',
        backgroundColor: 'white',
        border: `1px solid #eee`,
        borderTop: `5px solid ${color}`,
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'left',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        cursor: 'pointer'
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
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: color, marginBottom: '10px' }}>
          PHASE {lv}
        </div>
        <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#1a1a1a' }}>{title}</h3>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>{desc}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ 
            padding: '4px 12px',
            backgroundColor: `${color}15`, 
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