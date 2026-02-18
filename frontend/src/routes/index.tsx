import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from '../firebase';
import FlipNumbers from 'react-flip-numbers';

export const Route = createFileRoute('/')({
  component: Home,
});

// 설계 고수님의 명세: 자릿수별 독립 제어를 위한 래퍼 컴포넌트
const FlipUnit = ({ char, index, arrayLength, duration }: { char: string; index: number; arrayLength: number; duration: number }) => {
  // [설계 핵심] 모든 시작점은 "0"으로 통일하여 이동 거리를 상수로 고정
  const [displayNum, setDisplayNum] = useState("0");

  useEffect(() => {
    if (char === ",") {
      setDisplayNum(",");
      return;
    }

    // 1단계: 어떤 값이든 일단 0으로 돌려놓음 (리듬 동기화)
    setDisplayNum("0");

    // 2단계: 설정된 duration(0.5초) 후에 실제 값으로 Landing
    const timer = setTimeout(() => {
      setDisplayNum(char);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [char, duration]);

  return (
    <FlipNumbers
      height={20}
      width={char === ',' ? 6 : 18}
      color="#444444"
      background="transparent"
      play
      perspective={500}
      numbers={displayNum}
      duration={duration} // 고수님이 정의한 고정 0.5초 정속 사용
      // 오른쪽 자릿수부터 0.3초 간격 시차 부여
      delay={(arrayLength - 1 - index) * 0.3}
      numberStyle={{ 
        fontFamily: 'JetBrains Mono',
        fontSize: '16px', 
        fontWeight: 'bold',
        WebkitFontSmoothing: 'antialiased'
      }}
      nonNumberStyle={{ 
        fontSize: '13px', 
        fontWeight: 'bold', 
        color: '#888888',
        paddingTop: '8px',
        width: '6px',
        display: 'flex',
        justifyContent: 'center'
      }}
    />
  );
};

const levels = [
  { lv: 1, title: "초급: React의 본질", desc: "Virtual DOM, JSX, Props/State 등 React의 핵심 뼈대를 마스터합니다.", steps: "Step 1 ~ 10", targetPath: "/phase1/lecture1", color: "#1976d2" },
  { lv: 2, title: "초상급: Hooks와 실무 핵심", desc: "다양한 Hooks와 API 연동, 실전 Layout 구성을 배웁니다.", steps: "Step 11 ~ 20", targetPath: "/phase2/lecture11", color: "#388e3c" },
  { lv: 3, title: "중급: 아키텍처", desc: "Zustand, React Query 등 대규모 상태 관리와 설계를 다룹니다.", steps: "Step 21 ~ 30", targetPath: "/phase3/lecture21", color: "#fbc02d" },
  { lv: 4, title: "중상급: 성능과 인프라", desc: "최적화, 테스팅, CI/CD 배포 자동화까지 전문가의 영역을 배웁니다.", steps: "Step 31 ~ 40", targetPath: "/phase4/lecture31", color: "#f57c00" },
  { lv: 5, title: "고급: 미래 기술", desc: "Next.js, RSC, Fiber 아키텍처 등 React의 최신 기술을 정복합니다.", steps: "Step 41 ~ 50", targetPath: "/phase5/lecture41", color: "#d32f2f" }
];

function Home() {
  const [count, setCount] = useState<number | null>(null);
  const isIncreased = useRef(false); 

  useEffect(() => {
    const visitorRef = ref(db, 'visitor_count');

    const unsubscribe = onValue(visitorRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) {
        setCount(val);
      }
    });

    if (!isIncreased.current) {
      isIncreased.current = true; 

      runTransaction(visitorRef, (current) => {
        const currentVal = (current === null) ? 0 : Number(current);
        return currentVal + 1;
      }).then((result) => {
        if (result.committed) {
          setCount(result.snapshot.val());
        }
      }).catch((err) => {
        console.error("Counter Transaction Failed:", err);
      });
    }

    return () => unsubscribe();
  }, []);

  const formattedArray = (count !== null 
    ? count.toString().padStart(9, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
    : "000,000,000"
  ).split("");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-5 pb-15 text-center">
      <div className="mt-2.5 flex flex-col items-center pb-2.5">
        <Link to="/phase1/lecture1" className="no-underline">
          <div className="mb-2.5 h-45 w-87.5 cursor-pointer bg-[url('/logo.png')] bg-size-[70%] bg-center bg-no-repeat transition-transform duration-300 ease-in-out hover:scale-110" />
        </Link>        
        <div className="mt-1 mb-2 flex flex-col items-center gap-1">
          <h1 className="text-xl font-black tracking-tighter text-gray-400 leading-tight">
            기초부터 아키텍처 설계까지
          </h1>          
          <h1 className="text-3xl font-black tracking-tighter text-gray-400 leading-tight">
            <span className="bg-linear-to-r from-[#1976d2] via-[#388e3c] to-[#d32f2f] bg-clip-text text-transparent">
              50단계로 완성하는 리액트 여정
            </span>
          </h1>
          <div className="mt-1 flex flex-col items-center">
            <div className="flex items-center">
              {/* 고수님의 루프 로직: 각 자릿수를 FlipUnit으로 독립 렌더링 */}
              {formattedArray.map((char, index) => (
                <FlipUnit 
                  key={`${index}-${char}`} 
                  char={char} 
                  index={index} 
                  arrayLength={formattedArray.length}
                  duration={0.5} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
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