import { useState, useEffect } from 'react'; // 🚀 useEffect 추가!
import { Link, useLocation, useNavigate } from '@tanstack/react-router';

/**
 * 📚 [Technical Term] Curriculum Metadata (커리큘럼 메타데이터)
 */
const curriculum = [
  { id: 'lv1', title: '초급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 1, path: `/phase1/lecture${i + 1}` })) },
  { id: 'lv2', title: '초상급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 11, path: `/phase2/lecture${i + 11}` })) },
  { id: 'lv3', title: '중급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 21, path: `/phase3/lecture${i + 21}` })) },
  { id: 'lv4', title: '중상급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 31, path: `/phase4/lecture${i + 31}` })) },
  { id: 'lv5', title: '고급', steps: Array.from({length: 10}, (_, i) => ({ id: i + 41, path: `/phase5/lecture${i + 41}` })) },
];

export function Navigation() {
  const [activeLv, setActiveLv] = useState('lv1');
  const location = useLocation();
  const navigate = useNavigate();

  // 🚨 [Technical Term] State Synchronization (상태 동기화)
  // 주소창의 주소(/phase2/...)를 보고 activeLv('lv2')를 자동으로 맞춰주는 로직이야! 💋
  useEffect(() => {
    const currentPath = location.pathname;
    const foundLv = curriculum.find(lv => 
      lv.steps.some(step => step.path === currentPath)
    );
    if (foundLv) {
      setActiveLv(foundLv.id);
    }
  }, [location.pathname]); // 💡 주소가 바뀔 때마다 실행!

  const handleLevelClick = (lvId: string) => {
    setActiveLv(lvId);
    const selectedLevel = curriculum.find(c => c.id === lvId);
    if (selectedLevel && selectedLevel.steps.length > 0) {
      const firstStepPath = selectedLevel.steps[0].path;
      navigate({ to: firstStepPath as any }); 
    }
  };

  return (
    <nav style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: '#000', 
      borderRight: '1px solid #333'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop: '10px',
        paddingBottom: '10px' 
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            width: '120px', 
            height: '80px',
            backgroundImage: 'url("/logo_sub.png")',
            backgroundSize: '100%', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', 
            margin: '0 auto',
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
            marginBottom: '10px' 
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '4px', 
        padding: '8px' 
      }}>
        {curriculum.map((lv) => (
          <button
            key={lv.id}
            onClick={() => handleLevelClick(lv.id)}
            style={{
              padding: '4px 2px', 
              fontSize: '10px', 
              border: '1px solid transparent', 
              cursor: 'pointer', 
              borderRadius: '4px',
              backgroundColor: activeLv === lv.id ? '#007acc' : '#2d2d2d',
              color: activeLv === lv.id ? '#fff' : '#aaa',
              transition: 'all 0.1s'
            }}
          >
            {lv.title}
          </button>
        ))}
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        marginTop: '5px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#333 transparent' 
      }}>
        {curriculum.find(c => c.id === activeLv)?.steps.map((step) => (
          <Link
            key={step.path}
            to={step.path as any}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 15px',
              textDecoration: 'none', 
              fontSize: '11px', 
              fontFamily: 'Inter, sans-serif',
              backgroundColor: location.pathname === step.path ? '#2a2d2e' : 'transparent',
              color: location.pathname === step.path ? '#fff' : '#969696',
              borderLeft: location.pathname === step.path ? '2px solid #007acc' : '2px solid transparent',
              marginBottom: '1px'
            }}
          >
             <span style={{ opacity: 0.5, marginRight: '6px' }}>•</span>
             Step-{step.id}
          </Link>
        ))}
      </div>
    </nav>
  );
}