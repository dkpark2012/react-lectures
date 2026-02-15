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

export function CodeViewer({ files = [] }: CodeViewerProps) {
  const [activeFileName, setActiveFileName] = useState<string>('');
  const [displaySize, setDisplaySize] = useState(12.2);
  const sizeRef = useRef(13);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1️⃣ 탭 정렬 로직 (Lecture 파일을 최우선으로)
  const sortedFiles = [...files].sort((a, b) => {
    const isALecture = a.name.includes('lecture');
    const isBLecture = b.name.includes('lecture');
    if (isALecture && !isBLecture) return -1;
    if (!isALecture && isBLecture) return 1;
    const priority = ['Navigation.tsx', 'main.tsx'];
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
              // 🚨 A/S 포인트: 높이를 결정하는 padding과 line-height 조절
              padding: '1px 16px', // 상하 8px, 좌우 16px로 좁혀서 타이틀에 딱 붙게!
              height: 'auto',      // 고정 높이 대신 내용물에 맞게 (또는 약 35px-40px 추천)
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',    // 타이틀 폰트 크기 기준
              cursor: 'pointer',
              
              backgroundColor: activeFileName === file.name ? '#1e1e1e' : '#2d2d2d',
              color: activeFileName === file.name ? '#61dafb' : '#969696',
              borderTop: activeFileName === file.name ? '2px solid #61dafb' : '2px solid transparent',
              transition: 'all 0.2s ease', // 누를 때 부드럽게 반응하도록!
            }}
          >
            {file.name}
          </div>
        ))}
      </div>

      {/* 💻 코드 출력 영역 - 💡 스크롤 간섭 해결을 위해 height 설정 조정 */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus as any}
          lineProps={{
            style: { 
              display: 'block', 
              width: '100%', 
              padding: '0', 
              whiteSpace: 'pre-wrap', 
              wordBreak: 'break-all'
            }
          }}
          codeTagProps={{
            style: {
              fontSize: `${displaySize}px`,
              lineHeight: '1.4', 
              fontFamily: 'monospace'
            }
          } as any}
          customStyle={{
            margin: 0,
            padding: '10px',
            backgroundColor: '#1e1e1e',
            flex: 1,           // 💡 고정 높이 대신 남은 공간을 다 쓰게 함
            overflowY: 'auto', // 💡 여기서만 스크롤이 생기도록 유도
            overflowX: 'hidden',
            border: 'none'
          }}
          showLineNumbers={true}
          wrapLines={true} 
        >
          {String(activeFile?.code || '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

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