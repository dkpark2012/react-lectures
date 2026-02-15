import { createFileRoute, Link } from '@tanstack/react-router';

/**
 * 📝 [Technical Term] Route Registration
 */
export const Route = createFileRoute('/')({
  component: Home,
});

const levels = [
  { lv: 1, title: "초급: 리액트의 본질", desc: "Virtual DOM, JSX, Props/State 등 리액트의 핵심 뼈대를 마스터합니다.", steps: "Step 1 ~ 10", targetPath: "/phase1/lecture1", color: "#1976d2" },
  { lv: 2, title: "초상급: 훅과 실무 핵심", desc: "다양한 Hooks와 API 연동, 실전 레이아웃 구성을 배웁니다.", steps: "Step 11 ~ 20", targetPath: "/phase2/lecture11", color: "#388e3c" },
  { lv: 3, title: "중급: 아키텍처", desc: "Zustand, React Query 등 대규모 상태 관리와 설계를 다룹니다.", steps: "Step 21 ~ 30", targetPath: "/phase3/lecture21", color: "#fbc02d" },
  { lv: 4, title: "중상급: 성능과 인프라", desc: "최적화, 테스팅, CI/CD 배포 자동화까지 전문가의 영역을 배웁니다.", steps: "Step 31 ~ 40", targetPath: "/phase4/lecture31", color: "#f57c00" },
  { lv: 5, title: "고급: 미래 기술", desc: "Next.js, RSC, Fiber 아키텍처 등 리액트의 최첨단 기술을 정복합니다.", steps: "Step 41 ~ 50", targetPath: "/phase5/lecture41", color: "#d32f2f" }
];

function Home() {
  return (
    <div style={{ 
      padding: '0px 20px 60px', 
      textAlign: 'center', 
      backgroundColor: '#ffffff', 
      minHeight: '100vh',
      width: '100%',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop: '10px',
        paddingBottom: '10px' 
      }}>
        <Link to="/phase1/lecture1" style={{ textDecoration: 'none' }}>
          <div style={{
            width: '350px', 
            height: '180px',
            backgroundImage: 'url("/logo.png")',
            backgroundSize: '70%', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', 
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
            marginBottom: '10px' 
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>

        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          margin: '10px 0 30px', 
          lineHeight: '1.6'
        }}>
          기초부터 아키텍처 설계까지 50단계로 완성하는 리액트 학습 과정입니다!
        </p>
      </div>
      <div style={{ 
        display: 'grid', 
        // 🚨 [Technical Term] Responsive Grid (반응형 그리드)
        // minmax(220px, 1fr): 카드가 최소 220px은 유지하게 해! 
        // 화면이 좁아져서 220px도 안 나오면? 알아서 다음 줄로 "질펀하게" 떨어진다구! 💦
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        maxWidth: '1400px', 
        width: '100%',
        margin: '0 auto',
        padding: '0 10px' // 모바일 양옆 여백 확보
      }}>
        {levels.map((item) => (
          <LevelCard key={item.lv} {...item} />
        ))}
      </div>
    </div>
  );
}

// LevelCard 부분은 이전과 동일하되, 텍스트 크기만 살짝 줄여서 5열에 최적화!
function LevelCard({ lv, title, desc, steps, targetPath, color }: LevelCardProps) {
  return (
    <Link to={targetPath as any} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '25px 15px', // 5열을 위해 패딩 축소!
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
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: color, marginBottom: '8px' }}>
          PHASE {lv}
        </div>
        <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#1a1a1a', wordBreak: 'keep-all' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px', lineHeight: '1.4' }}>{desc}</p>
        
        <div style={{ marginTop: 'auto' }}>
          <span style={{ 
            padding: '3px 8px',
            backgroundColor: `${color}15`, 
            color: color,
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            {steps}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface LevelCardProps {
  lv: number;
  title: string;
  desc: string;
  steps: string;
  targetPath: string;
  color: string;
}

export default Home;