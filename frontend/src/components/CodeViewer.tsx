// src/components/CodeViewer.tsx
import { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeFile {
  name: string;
  code: string;
}

interface CodeViewerProps {
  files?: CodeFile[];
}

export default function CodeViewer({ files = [] }: CodeViewerProps) {
  const [activeFileName, setActiveFileName] = useState<string>('');
  const [displaySize, setDisplaySize] = useState(13);
  const sizeRef = useRef(13);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1️⃣ 탭 정렬 로직 (Lecture 파일을 최우선으로)
  const sortedFiles = [...files].sort((a, b) => {
    const isALecture = a.name.includes('Lecture');
    const isBLecture = b.name.includes('Lecture');

    if (isALecture && !isBLecture) return -1;
    if (!isALecture && isBLecture) return 1;

    const priority = ['App.tsx', 'Navigation.tsx', 'Home.tsx', 'Main.tsx'];
    const pA = priority.indexOf(a.name) === -1 ? 99 : priority.indexOf(a.name);
    const pB = priority.indexOf(b.name) === -1 ? 99 : priority.indexOf(b.name);
    
    return pA - pB;
  });

  // 2️⃣ 강의 변경 시 첫 번째 탭 자동 활성화
  useEffect(() => {
    if (sortedFiles.length > 0) {
      setActiveFileName(sortedFiles[0].name);
    }
  }, [files]);

  // 3️⃣ Ctrl + MouseWheel 글자 크기 조절
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: any) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -1 : 1;
        const nextSize = Math.min(Math.max(sizeRef.current + delta, 8), 40);
        sizeRef.current = nextSize;
        setDisplaySize(nextSize);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const activeFile = sortedFiles.find((f) => f.name === activeFileName) || sortedFiles[0];

  if (sortedFiles.length === 0) {
    return (
      <div style={{ padding: '40px', color: '#858585', textAlign: 'center', backgroundColor: '#1e1e1e', height: '100%' }}>
        <h3>🚀 소스 코드가 로드되지 않았습니다.</h3>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* 📁 파일 탭바 */}
      <div style={tabBarStyle}>
        {sortedFiles.map((file) => (
          <div
            key={file.name}
            onClick={() => setActiveFileName(file.name)}
            style={{
              ...tabStyle,
              backgroundColor: activeFileName === file.name ? '#1e1e1e' : '#2d2d2d',
              color: activeFileName === file.name ? '#61dafb' : '#969696',
              borderTop: activeFileName === file.name ? '2px solid #61dafb' : '2px solid transparent',
            }}
          >
            {file.name}
          </div>
        ))}
      </div>

      {/* 💻 코드 출력 영역 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus as any}
          // 💡 [수정] lineProps에 whiteSpace와 wordBreak를 추가하여 자동 줄바꿈을 복구했습니다.
          lineProps={{
            style: { 
              display: 'block', 
              width: '100%', 
              padding: '0', 
              whiteSpace: 'pre-wrap', // 자동 줄바꿈 적용 (Wrap)
              wordBreak: 'break-all'   // 단어 깨짐 방지
            }
          }}
          codeTagProps={{
            style: {
              fontSize: `${displaySize}px`,
              lineHeight: '1.2', 
              fontFamily: 'monospace'
            }
          } as any}
          customStyle={{
            margin: 0,
            padding: '10px',
            backgroundColor: '#1e1e1e',
            height: '100%',
            overflowX: 'hidden', // 가로 스크롤을 막아야 줄바꿈이 일어납니다.
          }}
          showLineNumbers={true}
          wrapLines={true} 
        >
          {String(activeFile?.code || '')}
        </SyntaxHighlighter>
      </div>

      {/* 하단 상태바 */}
      <div style={statusBarStyle}>
        Size: {displaySize}px | Line: 1.2 | Wrap: ON | Ctrl + Scroll
      </div>
    </div>
  );
}

// 🎨 스타일 정의
const containerStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', height: '100%',
  backgroundColor: '#1e1e1e', position: 'relative', overflow: 'hidden'
};

const tabBarStyle: React.CSSProperties = {
  display: 'flex', backgroundColor: '#252526', overflowX: 'auto',
  borderBottom: '1px solid #333', flexShrink: 0
};

const tabStyle: React.CSSProperties = {
  padding: '10px 15px', fontSize: '12px', cursor: 'pointer',
  whiteSpace: 'nowrap', borderRight: '1px solid #1e1e1e', transition: '0.2s'
};

const statusBarStyle: React.CSSProperties = {
  padding: '4px 12px', backgroundColor: '#007acc', color: '#fff',
  fontSize: '10px', textAlign: 'right', fontWeight: '500'
};