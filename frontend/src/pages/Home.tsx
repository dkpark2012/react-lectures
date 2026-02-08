import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        🎓 React 핵심 메커니즘 실습
      </h1>
      <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
        단계별로 React의 핵심 개념을 실습하며 배워보세요!
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '40px'
      }}>
        <LectureCard
          number={1}
          title="State와 리렌더링"
          description="useState의 동작 원리와 리렌더링 메커니즘을 이해합니다."
          path="/study/lecture1"
        />
        <LectureCard
          number={2}
          title="useEffect 마스터"
          description="의존성 배열과 cleanup 함수의 동작을 완벽히 이해합니다."
          path="/study/lecture2"
        />
        <LectureCard
          number={3}
          title="컴포넌트 분리"
          description="Props를 통한 데이터 흐름과 컴포넌트 재사용을 배웁니다."
          path="/study/lecture3"
        />
        <LectureCard
          number={4}
          title="리스트 렌더링"
          description="key prop의 중요성과 올바른 사용법을 익힙니다."
          path="/study/lecture4"
        />
        <LectureCard
          number={5}
          title="조건부 렌더링"
          description="다양한 조건부 렌더링 패턴을 마스터합니다."
          path="/study/lecture5"
        />
        <LectureCard
          number={6}
          title="폼 처리"
          description="제어/비제어 컴포넌트와 폼 검증을 배웁니다."
          path="/study/lecture6"
        />
      </div>

      <div style={{ 
        marginTop: '60px', 
        padding: '30px', 
        backgroundColor: '#e3f2fd',
        borderRadius: '8px'
      }}>
        <h2>💡 학습 방법</h2>
        <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
          <li style={{ marginBottom: '10px' }}>상단 네비게이션에서 Lecture를 선택합니다</li>
          <li style={{ marginBottom: '10px' }}>Console을 열어 렌더링 로그를 확인합니다</li>
          <li style={{ marginBottom: '10px' }}>각 버튼과 입력을 직접 조작해봅니다</li>
          <li style={{ marginBottom: '10px' }}>코드를 수정하며 동작을 실험합니다</li>
        </ol>
      </div>
    </div>
  )
}

interface LectureCardProps {
  number: number
  title: string
  description: string
  path: string
}

function LectureCard({ number, title, description, path }: LectureCardProps) {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '30px',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: 'white',
        transition: 'all 0.3s',
        cursor: 'pointer',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#1976d2'
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e0e0e0'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#1976d2',
          marginBottom: '15px'
        }}>
          {number}
        </div>
        <h3 style={{ 
          fontSize: '24px', 
          marginBottom: '10px',
          color: '#333'
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#666',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      </div>
    </Link>
  )
}

export default Home