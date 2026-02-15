import { createFileRoute, Link } from '@tanstack/react-router';

/**
 * @description Root Route Definition for Curriculum Dashboard
 * @module RouteConfig
 */
export const Route = createFileRoute('/')({
  component: Home,
});

/**
 * @constant levels
 * @description Learning Path Data Model with HEX color codes for dynamic injection
 */
const levels = [
  { lv: 1, title: "초급: 리액트의 본질", desc: "Virtual DOM, JSX, Props/State 등 리액트의 핵심 뼈대를 마스터합니다.", steps: "Step 1 ~ 10", targetPath: "/phase1/lecture1", color: "#1976d2" },
  { lv: 2, title: "초상급: 훅과 실무 핵심", desc: "다양한 Hooks와 API 연동, 실전 레이아웃 구성을 배웁니다.", steps: "Step 11 ~ 20", targetPath: "/phase2/lecture11", color: "#388e3c" },
  { lv: 3, title: "중급: 아키텍처", desc: "Zustand, React Query 등 대규모 상태 관리와 설계를 다룹니다.", steps: "Step 21 ~ 30", targetPath: "/phase3/lecture21", color: "#fbc02d" },
  { lv: 4, title: "중상급: 성능과 인프라", desc: "최적화, 테스팅, CI/CD 배포 자동화까지 전문가의 영역을 배웁니다.", steps: "Step 31 ~ 40", targetPath: "/phase4/lecture31", color: "#f57c00" },
  { lv: 5, title: "고급: 미래 기술", desc: "Next.js, RSC, Fiber 아키텍처 등 리액트의 최첨단 기술을 정복합니다.", steps: "Step 41 ~ 50", targetPath: "/phase5/lecture41", color: "#d32f2f" }
];

function Home() {
  return (
    // pb-[60px] -> pb-15
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-5 pb-15 text-center">
      <div className="mt-2.5 flex flex-col items-center pb-2.5">
        <Link to="/phase1/lecture1" className="no-underline">
          {/* h-[180px] -> h-45 / w-[350px] -> w-87.5 (v4에서는 작동함!) */}
          <div className="mb-2.5 h-45 w-87.5 cursor-pointer bg-[url('/logo.png')] bg-size-[70%] bg-center bg-no-repeat transition-transform duration-300 ease-in-out hover:scale-110" />
        </Link>
        {/* mb-[30px] -> mb-7.5 */}
        <p className="mt-2.5 mb-7.5 text-lg leading-relaxed text-[#666]">
          기초부터 아키텍처 설계까지 50단계로 완성하는 리액트 학습 과정입니다!
        </p>
      </div>

      {/* max-w-[1400px] -> max-w-350 (1400 / 4 = 350) */}
      <div className="grid w-full max-w-350 gap-5 px-2.5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {levels.map((item) => (
          <LevelCard key={item.lv} {...item} />
        ))}
      </div>
    </div>
  );
}

function LevelCard({ lv, title, desc, steps, targetPath, color }: LevelCardProps) {
  return (
    <Link to={targetPath as any} className="no-underline h-full group">
      <div 
        className="relative flex h-full flex-col p-6.25 text-left bg-white border border-[#eee] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
        style={{ borderTop: `5px solid ${color}` }}
      >
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: color }}>
          PHASE {lv}
        </div>
        <h3 className="mb-2.5 text-base font-bold text-[#1a1a1a] break-keep">{title}</h3>
        <p className="mb-5 text-[13px] leading-relaxed text-[#666]">{desc}</p>
        <div className="mt-auto">
          <span className="inline-block px-2 py-1 rounded-5 text-[10px] font-bold" style={{ backgroundColor: `${color}15`, color: color }}>
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