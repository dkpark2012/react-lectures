import { Routes, Route, useLocation } from 'react-router-dom';
import { 
  Group as PanelGroup, 
  Panel, 
  Separator as PanelResizeHandle 
} from 'react-resizable-panels';
import Navigation from './components/Navigation';
import CodeViewer from './components/CodeViewer';
import Home from './pages/Home';
import Lecture1 from './pages/Lecture1';
import Lecture2 from './pages/Lecture2';
import Lecture3 from './pages/Lecture3';
import Lecture4 from './pages/Lecture4';
import Lecture5 from './pages/Lecture5';
import Lecture6 from './pages/Lecture6';
import Lecture7 from './pages/Lecture7';
import Lecture8 from './pages/Lecture8';
import Lecture9 from './pages/Lecture9';
import Lecture10 from './pages/Lecture10';
import Lecture11 from './pages/Lecture11';
import Lecture12 from './pages/Lecture12';
import Lecture13 from './pages/Lecture13';
import Lecture14 from './pages/Lecture14';
import Lecture15 from './pages/Lecture15';
import Lecture16 from './pages/Lecture16';
import Lecture17 from './pages/Lecture17';
import Lecture18 from './pages/Lecture18';
import Lecture19 from './pages/Lecture19';
import Lecture20 from './pages/Lecture20';
import { sourceData } from './data/sourceData';

function App() {
  const location = useLocation();
  // sourceData에서 현재 경로에 맞는 코드 배열을 가져옴
  const currentFiles = sourceData[location.pathname] || [];

  const resizeHandleStyle: React.CSSProperties = {
    width: '6px',
    backgroundColor: '#333',
    cursor: 'col-resize',
    borderLeft: '1px solid #444',
    borderRight: '1px solid #444'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#1e1e1e' }}>
      {/* 🔵 좌측 네비게이션 고정 영역 */}
      <div style={{ width: '160px', flexShrink: 0, borderRight: '1px solid #333' }}>
        <Navigation />
      </div>

      {/* ↔️ 우측 콘텐츠 영역 (패널 분할) */}
      <PanelGroup orientation="horizontal" style={{ flex: 1 }}>
        
        {/* 🟢 중앙 패널: 강의 설명 */}
        <Panel defaultSize={47} minSize={20}>
          <main style={{ height: '100%', overflowY: 'auto', backgroundColor: '#fff', padding: '0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/study/lecture1" element={<Lecture1 />} />
              <Route path="/study/lecture2" element={<Lecture2 />} />
              <Route path="/study/lecture3" element={<Lecture3 />} />
              <Route path="/study/lecture4" element={<Lecture4 />} />
              <Route path="/study/lecture5" element={<Lecture5 />} />
              <Route path="/study/lecture6" element={<Lecture6 />} />
              <Route path="/study/lecture7" element={<Lecture7 />} />
              <Route path="/study/lecture8" element={<Lecture8 />} />
              <Route path="/study/lecture9" element={<Lecture9 />} />
              <Route path="/study/lecture10" element={<Lecture10 />} />
              <Route path="/study/lecture11" element={<Lecture11 />} />
              <Route path="/study/lecture12" element={<Lecture12 />} />
              <Route path="/study/lecture13" element={<Lecture13 />} />
              <Route path="/study/lecture14" element={<Lecture14 />} />
              <Route path="/study/lecture15" element={<Lecture15 />} />
              <Route path="/study/lecture16" element={<Lecture16 />} />
              <Route path="/study/lecture17" element={<Lecture17 />} />
              <Route path="/study/lecture18" element={<Lecture18 />} />
              <Route path="/study/lecture19" element={<Lecture19 />} />
              <Route path="/study/lecture20" element={<Lecture20 />} />
              <Route path="/study/:lectureId" element={<div style={{padding: '40px', color: '#666'}}>강의 본문이 곧 업데이트됩니다.</div>} />
            </Routes>
          </main>
        </Panel>

        <PanelResizeHandle style={resizeHandleStyle} />

        {/* 🔴 우측 패널: 코드 뷰어 (sourceData 전달) */}
        <Panel defaultSize={53} minSize={30}>
          <aside style={{ height: '100%', overflowY: 'auto', backgroundColor: '#1e1e1e' }}>
            {/* files={currentFiles}를 통해 데이터를 확실하게 전달 */}
            <CodeViewer files={currentFiles} />
          </aside>
        </Panel>
        
      </PanelGroup>
    </div>
  );
}

export default App;