import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Lecture1 from './pages/Lecture1'
import Lecture2 from './pages/Lecture2'
import Lecture3 from './pages/Lecture3'
import Lecture4 from './pages/Lecture4'
import Lecture5 from './pages/Lecture5'
import Lecture6 from './pages/Lecture6'
// import Lecture7 from './pages/Lecture7'
// import Lecture8 from './pages/Lecture8'
// import Lecture9 from './pages/Lecture9'
// import Lecture10 from './pages/Lecture10'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navigation />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study/lecture1" element={<Lecture1 />} />
          <Route path="/study/lecture2" element={<Lecture2 />} />
          <Route path="/study/lecture3" element={<Lecture3 />} />
          <Route path="/study/lecture4" element={<Lecture4 />} />
          <Route path="/study/lecture5" element={<Lecture5 />} />
          <Route path="/study/lecture6" element={<Lecture6 />} />
          {/* <Route path="/study/lecture7" element={<Lecture7 />} /> */}
          {/* <Route path="/study/lecture8" element={<Lecture8 />} /> */}
          {/* <Route path="/study/lecture9" element={<Lecture9 />} /> */}
          {/* <Route path="/study/lecture10" element={<Lecture10 />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App