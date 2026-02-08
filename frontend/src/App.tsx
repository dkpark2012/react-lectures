import { Suspense, lazy } from 'react'; // 동적 로딩을 위한 lazy, Suspense 추가
import { Routes, Route, useLocation } from 'react-router-dom';
import { 
  Group as PanelGroup, 
  Panel, 
  Separator as PanelResizeHandle 
} from 'react-resizable-panels';
import Navigation from './components/Navigation';
import CodeViewer from './components/CodeViewer';
import Home from './pages/Home';
import { sourceData } from './data/sourceData';
import { PUBLISH_COUNT } from './constants/config'; // 불러오기

// 1. 모든 Lecture 컴포넌트를 동적으로 긁어옵니다.
const lectureModules = import.meta.glob('./pages/Lecture*.tsx');

// 2. 라우트 생성을 위한 배열을 만듭니다.
const lectureRoutes = Object.keys(lectureModules).map((path) => {
  const lectureNum = path.match(/\d+/)?.[0];
  const LazyComponent = lazy(lectureModules[path] as any); // 지연 로딩 컴포넌트 생성
  
  return {
    num: parseInt(lectureNum || "0", 10),
    path: `/study/lecture${lectureNum}`,
    Element: LazyComponent
  };
});

function App() {
  const location = useLocation();
  // 💡 경로 대소문자 무관하게 매칭되도록 처리
  const currentPath = location.pathname.toLowerCase();
  const currentFiles = sourceData[currentPath] || [];

  const resizeHandleStyle: React.CSSProperties = {
    width: '6px', backgroundColor: '#333', cursor: 'col-resize',
    borderLeft: '1px solid #444', borderRight: '1px solid #444'
  };
  console.log("현재 경로:", location.pathname);
  console.log("전달될 파일들:", currentFiles);
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#1e1e1e' }}>
      <div style={{ width: '160px', flexShrink: 0, borderRight: '1px solid #333' }}>
        <Navigation />
      </div>

      <PanelGroup orientation="horizontal" style={{ flex: 1 }}>
        <Panel defaultSize={47} minSize={20}>
          <main style={{ height: '100%', overflowY: 'auto', backgroundColor: '#fff' }}>
            {/* 3. Suspense로 감싸서 로딩 중 예외 처리 */}
            <Suspense fallback={<div className="p-10">강의를 불러오는 중...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* 4. 필터링된 라우트를 자동으로 생성 */}
                {lectureRoutes
                  .filter(route => route.num <= PUBLISH_COUNT)
                  .map((route) => (
                    <Route key={route.path} path={route.path} element={<route.Element />} />
                  ))
                }
                
                <Route path="/study/:lectureId" element={<div style={{padding: '40px', color: '#666'}}>강의 준비 중입니다.</div>} />
              </Routes>
            </Suspense>
          </main>
        </Panel>

        <PanelResizeHandle style={resizeHandleStyle} />

        <Panel defaultSize={53} minSize={30}>
          <aside style={{ height: '100%', overflowY: 'auto', backgroundColor: '#1e1e1e' }}>
            {currentFiles.length > 0 ? (
              <CodeViewer key={location.pathname} files={currentFiles} />
            ) : (
              <div style={{ padding: '40px', color: '#666' }}>코드를 불러오는 중...</div>
            )}
          </aside>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;