import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가

const curriculum = [
  { id: 'lv1', title: '초급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 1, path: `/study/lecture${i + 1}` })) },
  { id: 'lv2', title: '초상급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 11, path: `/study/lecture${i + 11}` })) },
  { id: 'lv3', title: '중급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 21, path: `/study/lecture${i + 21}` })) },
  { id: 'lv4', title: '중상급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 31, path: `/study/lecture${i + 31}` })) },
  { id: 'lv5', title: '고급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 41, path: `/study/lecture${i + 41}` })) },
];

export default function Navigation() {
  const [activeLv, setActiveLv] = useState('lv1');
  const location = useLocation();
  const navigate = useNavigate(); // 페이지 이동을 위한 훅(Hook) 선언

  // 레벨 버튼 클릭 시 실행되는 함수
  const handleLevelClick = (lvId: string) => {
    setActiveLv(lvId); // 사이드바 메뉴 탭 변경

    // 선택된 레벨의 첫 번째 Step 정보를 찾음
    const selectedLevel = curriculum.find(c => c.id === lvId);
    if (selectedLevel && selectedLevel.steps.length > 0) {
      const firstStepPath = selectedLevel.steps[0].path;
      navigate(firstStepPath); // 🚀 URL을 첫 번째 페이지로 강제 변경 (Programmatic Navigation)
    }
  };

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#252526' }}>
      {/* 로고 영역 */}
      <div style={{ padding: '20px 15px', borderBottom: '1px solid #333' }}>
        <Link to="/" style={{ color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }}>🚀 Dev-Master</Link>
      </div>

      {/* 레벨 선택 (Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', padding: '10px' }}>
        {curriculum.map((lv) => (
          <button
            key={lv.id}
            onClick={() => handleLevelClick(lv.id)} // 수정된 핸들러 연결
            style={{
              padding: '5px', fontSize: '10px', border: 'none', cursor: 'pointer', borderRadius: '3px',
              backgroundColor: activeLv === lv.id ? '#333' : 'transparent',
              color: activeLv === lv.id ? '#61dafb' : '#ccc',
            }}
          >
            {lv.title}
          </button>
        ))}
      </div>

      {/* 스텝 리스트 (세로 스크롤) */}
      <div style={{ flex: 1, overflowY: 'auto', marginTop: '10px' }}>
        {curriculum.find(c => c.id === activeLv)?.steps.map((step) => (
          <Link
            key={step.path}
            to={step.path}
            style={{
              display: 'block', padding: '10px 20px', textDecoration: 'none', fontSize: '12px', fontFamily: 'monospace',
              backgroundColor: location.pathname === step.path ? '#1e1e1e' : 'transparent',
              color: location.pathname === step.path ? '#61dafb' : '#999',
              borderLeft: location.pathname === step.path ? '3px solid #61dafb' : '3px solid transparent',
            }}
          >
            Step-{step.id}
          </Link>
        ))}
      </div>
    </nav>
  );
}