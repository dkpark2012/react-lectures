interface UserCardProps {
  id: number
  name: string
  email: string
  age: number
  onDelete?: (id: number) => void
}

function UserCard({ id, name, email, age, onDelete }: UserCardProps) {
  console.log('🎨 UserCard 렌더링:', name)

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>{name}</h3>
      <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
        📧 {email}
      </p>
      <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
        🎂 {age}세
      </p>
      {onDelete && (
        <button 
          onClick={() => onDelete(id)}
          style={buttonStyle}
        >
          삭제
        </button>
      )}
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  border: '2px solid #e0e0e0',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  minWidth: '250px',
  transition: 'all 0.2s'
}

const buttonStyle: React.CSSProperties = {
  marginTop: '15px',
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
}

export default UserCard
