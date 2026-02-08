import { Link, useLocation } from 'react-router-dom'

interface LectureItem {
  path: string
  title: string
  description: string
}

const lectures: LectureItem[] = [
  { path: '/study/lecture1', title: 'Lecture 1', description: 'State와 리렌더링' },
  { path: '/study/lecture2', title: 'Lecture 2', description: 'useEffect' },
  { path: '/study/lecture3', title: 'Lecture 3', description: '컴포넌트 분리' },
  { path: '/study/lecture4', title: 'Lecture 4', description: '리스트 렌더링' },
  { path: '/study/lecture5', title: 'Lecture 5', description: '조건부 렌더링' },
  { path: '/study/lecture6', title: 'Lecture 6', description: '폼 처리' },
  // { path: '/study/lecture7', title: 'Lecture 7', description: '최적화' },
  // { path: '/study/lecture8', title: 'Lecture 8', description: '커스텀 Hook' },
  // { path: '/study/lecture9', title: 'Lecture 9', description: '에러 처리' },
  // { path: '/study/lecture10', title: 'Lecture 10', description: 'CRUD' },
]

function Navigation() {
  const location = useLocation()

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Link to="/" style={logoStyle}>
          🎓 React 실습
        </Link>

        <div style={menuStyle}>
          {lectures.map(lecture => (
            <Link
              key={lecture.path}
              to={lecture.path}
              style={{
                ...linkStyle,
                ...(location.pathname === lecture.path ? activeLinkStyle : {})
              }}
            >
              {lecture.title}
              <small style={{ display: 'block', fontSize: '11px', marginTop: '2px' }}>
                {lecture.description}
              </small>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

const navStyle: React.CSSProperties = {
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '15px 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '20px'
}

const logoStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '24px',
  fontWeight: 'bold',
  marginRight: '30px'
}

const menuStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '15px',
  flexWrap: 'wrap'
}

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  fontSize: '14px',
  transition: 'all 0.2s'
}

const activeLinkStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.3)',
  fontWeight: 'bold'
}

export default Navigation