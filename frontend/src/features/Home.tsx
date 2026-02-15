// src/routes/index.tsx (또는 src/pages/Home.tsx)
import { createFileRoute, Link } from '@tanstack/react-router'; // TanStack에서 제공하는 Link 사용

// 📝 [Technical Term] File-based Route Definition (파일 기반 라우트 정의)
// TanStack Router는 파일 자체가 경로가 되므로 createFileRoute를 사용해 연결합니다.
export const Route = createFileRoute('/')({
  component: Home,
});

const levels = [
  {
    lv: 1,
    title: "초급: 리액트의 본질",
    desc: "Virtual DOM, JSX, Props/State 등 리액트의 핵심 뼈대를 마스터합니다.",
    steps: "Step 1 ~ 10",
    path: "/pages/Lecture1", // 실제 파일 구조에 맞게 수정 필요
    color: "#1976d2"
  },
  // ... 나머지 레벨 데이터는 동일 (중략)
];

function Home() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: '100%' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '15px', color: '#1a1a1a' }}>
        🚀 React Master Roadmap
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '50px' }}>
        기초부터 아키텍처 설계까지 50단계로 완성하는 리액트 전문가 과정
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
          <p>• <b>Progressive Learning (점진적 학습):</b> 하위 레벨의 개념이 상위 레벨에서 계속 재사용됩니다.</p>
          <p>• <b>Hands-on Lab (실습 중심):</b> 소스 코드 뷰어를 통해 실제 구현체를 분석하며 학습하세요.</p>
          <p>• <b>Roadmap Goal:</b> Architect (설계자)의 시야를 갖게 됩니다.</p>
        </div>
      </div>
    </div>
  );
}

// 🧱 [Technical Term] Component Abstraction (컴포넌트 추상화)
function LevelCard({ lv, title, desc, steps, path, color }: { lv: number, title: string, desc: string, steps: string, path: string, color: string }) {
  return (
    /* 💡 TanStack의 Link는 'to' 속성에서 자동 완성을 지원합니다.
      만약 path가 존재하지 않는 경로라면 빨간 줄(에러)을 띄워줍니다.
    */
    <Link to={path as any} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '35px 25px',
        borderRadius: '16px',
        backgroundColor: 'white',
        border: `1px solid #eee`,
        borderTop: `5px solid ${color}`,
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