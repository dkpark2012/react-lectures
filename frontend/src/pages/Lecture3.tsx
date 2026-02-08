import { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from '../components/UserCard'

interface User {
  id: number
  name: string
  email: string
  age: number
}

function Lecture3() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL

  console.log('🎨 Lecture3 렌더링, users 수:', users.length)

  useEffect(() => {
    axios.get<User[]>(`${APP_BASE_URL}/api/users`)
      .then(response => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  const handleDelete = (id: number) => {
    console.log('삭제 요청:', id)
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>
  }

  return (
    <div>
      <h1>📚 Lecture 3: 컴포넌트 분리와 Props</h1>
      
      <div style={sectionStyle}>
        <h2>학습 목표</h2>
        <ul>
          <li>컴포넌트 재사용성의 중요성 이해</li>
          <li>Props를 통한 부모→자식 데이터 흐름</li>
          <li>콜백 Props로 자식→부모 이벤트 전달</li>
          <li>TypeScript Interface로 타입 안정성 확보</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>사용자 목록 ({users.length}명)</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {users.map(user => (
            <UserCard 
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              age={user.age}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#e3f2fd' }}>
        <h3>💡 관찰 포인트</h3>
        <ul>
          <li>삭제 버튼 클릭 시 어떤 컴포넌트가 리렌더링되는가?</li>
          <li>Console에서 각 UserCard의 렌더링 로그 확인</li>
          <li>props로 함수를 전달하는 패턴 확인</li>
        </ul>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#fff3cd' }}>
        <h3>💡 핵심 개념</h3>
        <ul>
          <li><strong>Props</strong>: 부모 → 자식으로의 단방향 데이터 흐름</li>
          <li><strong>콜백 Props</strong>: 자식 → 부모로 이벤트 전달</li>
          <li><strong>컴포넌트 재사용</strong>: UserCard를 여러 곳에서 사용</li>
          <li><strong>TypeScript Interface</strong>: Props 타입 정의로 안정성 확보</li>
        </ul>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#f0f0f0' }}>
        <h3>📁 파일 구조</h3>
        <pre style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px' }}>
{`src/
  ├── pages/
  │   └── Lecture3.tsx      ← 현재 파일 (부모 컴포넌트)
  └── components/
      └── UserCard.tsx      ← 자식 컴포넌트 (재사용 가능)`}
        </pre>
        <p style={{ marginTop: '10px' }}>
          <strong>UserCard.tsx</strong> 파일을 열어서 어떻게 props를 받는지 확인하세요!
        </p>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#e8f5e9' }}>
        <h3>🔬 실습 과제</h3>
        <ol>
          <li>UserCard에 새로운 prop 추가해보기 (예: isActive: boolean)</li>
          <li>삭제 버튼 대신 "수정" 버튼 추가해보기</li>
          <li>props를 잘못 전달하면 TypeScript 에러가 나는지 확인</li>
          <li>UserCard 없이 inline으로 작성했다면 코드가 얼마나 복잡해질지 상상해보기</li>
        </ol>
      </div>
    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  border: '2px solid #e0e0e0',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  backgroundColor: 'white'
}

export default Lecture3
