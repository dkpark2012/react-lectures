import { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
  age: number
}

function Lecture4() {
  const [users, setUsers] = useState<User[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    axios.get<User[]>(`${APP_BASE_URL}/api/users`)
      .then(response => setUsers(response.data))
  }, [])

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    setUsers(prev => [...prev].reverse())
  }

  const renderWithIndexKey = () => {
    return users.map((user, index) => (
      <UserItem 
        key={index}  // ❌ 안티 패턴!
        user={user}
        label="Index Key"
        bgColor="#ffebee"
      />
    ))
  }

  const renderWithIdKey = () => {
    return users.map(user => (
      <UserItem 
        key={user.id}  // ✅ 올바른 방법
        user={user}
        label="ID Key"
        bgColor="#e8f5e9"
      />
    ))
  }

  return (
    <div>
      <h1>📚 Lecture 4: 리스트 렌더링과 Key</h1>
      
      <div style={sectionStyle}>
        <h2>학습 목표</h2>
        <ul>
          <li>key prop의 역할과 중요성 이해</li>
          <li>Index를 key로 사용하면 안 되는 이유 체감</li>
          <li>React가 리스트를 효율적으로 업데이트하는 방법</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <button onClick={toggleSort} style={buttonStyle}>
          🔄 정렬 토글 (현재: {sortOrder === 'asc' ? '오름차순' : '내림차순'})
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#d32f2f' }}>❌ Index를 Key로 사용</h2>
          <div style={listContainerStyle}>
            {renderWithIndexKey()}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#388e3c' }}>✅ ID를 Key로 사용</h2>
          <div style={listContainerStyle}>
            {renderWithIdKey()}
          </div>
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#e3f2fd', marginTop: '20px' }}>
        <h3>🔬 실험 방법</h3>
        <ol>
          <li><strong>각 input에 다른 텍스트를 입력하세요</strong> (예: 왼쪽에 "A", "B", "C", 오른쪽에 "X", "Y", "Z")</li>
          <li><strong>"정렬 토글" 버튼을 클릭하세요</strong></li>
          <li><strong>결과를 관찰하세요</strong></li>
        </ol>
        <div style={{ 
          marginTop: '15px', 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '4px',
          border: '2px solid #2196f3'
        }}>
          <p><strong>🎯 예상 결과:</strong></p>
          <ul>
            <li>❌ <strong>Index Key (왼쪽)</strong>: Input 값이 뒤섞입니다! "A"가 맨 아래로 가거나 사라집니다.</li>
            <li>✅ <strong>ID Key (오른쪽)</strong>: Input 값이 사용자와 함께 올바르게 이동합니다.</li>
          </ul>
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#fff3cd' }}>
        <h3>💡 핵심 개념</h3>
        <ul>
          <li><strong>key의 역할</strong>: React가 어떤 항목이 변경/추가/제거되었는지 식별</li>
          <li><strong>Index를 key로 사용하면 안 되는 이유</strong>: 순서가 바뀌면 잘못된 컴포넌트가 매칭됨</li>
          <li><strong>올바른 key</strong>: 고유하고 안정적인 식별자 (보통 id)</li>
          <li><strong>리스트 최적화</strong>: 올바른 key 사용 시 React가 효율적으로 DOM 업데이트</li>
        </ul>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#f0f0f0' }}>
        <h3>🤔 왜 이런 문제가 발생하나요?</h3>
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px' }}>
          <p><strong>Index를 key로 사용할 때:</strong></p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`정렬 전: [김철수(0), 이영희(1), 박민수(2)]
정렬 후: [박민수(0), 이영희(1), 김철수(2)]

React의 판단: "key가 0, 1, 2로 동일하네? 
             이름만 바꾸고 input은 재사용하자!"
결과: Input 값이 원래 위치에 그대로 남음 ❌`}
          </pre>

          <p style={{ marginTop: '15px' }}><strong>ID를 key로 사용할 때:</strong></p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`정렬 전: [김철수(id:1), 이영희(id:2), 박민수(id:3)]
정렬 후: [박민수(id:3), 이영희(id:2), 김철수(id:1)]

React의 판단: "key가 완전히 바뀌었네! 
             각 컴포넌트를 올바른 위치로 이동!"
결과: 전체 컴포넌트(input 포함)가 함께 이동 ✅`}
          </pre>
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: '#e8f5e9' }}>
        <h3>🔬 추가 실습 과제</h3>
        <ol>
          <li>Console을 열고 렌더링 로그를 확인하세요</li>
          <li>왼쪽과 오른쪽의 렌더링 차이를 비교하세요</li>
          <li>정렬을 여러 번 토글하며 동작을 관찰하세요</li>
          <li>UserItem 컴포넌트의 코드를 확인하고 useState가 어떻게 사용되는지 보세요</li>
        </ol>
      </div>
    </div>
  )
}

// 개별 사용자 아이템 컴포넌트
interface UserItemProps {
  user: User
  label: string
  bgColor: string
}

function UserItem({ user, label, bgColor }: UserItemProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  console.log(`🎨 UserItem 렌더링: ${user.name} (${label})`)

  return (
    <div style={{ ...itemStyle, backgroundColor: bgColor }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '16px' }}>{user.name}</strong>
        <span style={{ fontSize: '12px', color: '#666' }}>ID: {user.id}</span>
      </div>
      <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>{user.email}</p>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="텍스트를 입력하세요"
        style={{ width: '100%', padding: '8px', marginTop: '8px', fontSize: '14px' }}
      />
      {inputValue && (
        <p style={{ fontSize: '12px', marginTop: '5px', color: '#1976d2' }}>
          입력값: <strong>{inputValue}</strong>
        </p>
      )}
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

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
}

const listContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
}

const itemStyle: React.CSSProperties = {
  border: '2px solid #ddd',
  padding: '15px',
  borderRadius: '8px'
}

export default Lecture4
