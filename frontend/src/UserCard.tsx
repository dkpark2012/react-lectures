interface UserCardProps {
  id: number
  name: string
  email: string
  age: number
  onDelete?: (id: number) => void  // optional
}

function UserCard({ id, name, email, age, onDelete }: UserCardProps) {
  console.log('🎨 UserCard 렌더링:', name)

  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      {onDelete && (
        <button 
          onClick={() => onDelete(id)}
          style={{ ...buttonStyle, backgroundColor: '#f44336' }}
        >
          삭제
        </button>
      )}
    </div>
  )
}

const cardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  margin: '10px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9'
}

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
}

export default UserCard