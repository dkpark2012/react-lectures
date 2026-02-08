// frontend/src/components/CodeViewer.tsx
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

export default function CodeViewer({ files }: CodeViewerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displaySize, setDisplaySize] = useState(14); // UI 반영용 상태
  const sizeRef = useRef(14); // 💡 계산용 레퍼런스 (멈춤 및 클로저 방지)
  const containerRef = useRef<HTMLDivElement>(null);

  // 1️⃣ 탭 정렬 로직 (App.tsx를 가장 왼쪽으로)
  const priority = ['App.tsx', 'Navigation.tsx', 'Main.tsx'];
  const sortedFiles = files ? [...files].sort((a, b) => {
    const indexA = priority.indexOf(a.name);
    const indexB = priority.indexOf(b.name);
    const pA = indexA === -1 ? 99 : indexA;
    const pB = indexB === -1 ? 99 : indexB;
    return pA - pB;
  }) : [];

  // 2️⃣ [핵심] Ctrl + MouseWheel 글자 크기 조절 로직
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault(); // 브라우저 전체 확대 방지
        
        const delta = e.deltaY > 0 ? -1 : 1;
        const nextSize = sizeRef.current + delta;
        
        // 최소 10px ~ 최대 40px 제한
        if (nextSize >= 10 && nextSize <= 40) {
          sizeRef.current = nextSize;
          setDisplaySize(nextSize); // 폰트 크기 상태 업데이트
        }
      }
    };

    // passive: false를 주어야 e.preventDefault()가 먹힙니다.
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // 3️⃣ 강의 변경 시 첫 번째 탭 자동 선택
  useEffect(() => {
    setActiveIdx(0);
  }, [files]);

  if (sortedFiles.length === 0) {
    return (
      <div style={{ padding: '40px', color: '#858585', textAlign: 'center', backgroundColor: '#1e1e1e', height: '100%' }}>
        <h3>🚀 소스 코드가 로드되지 않았습니다.</h3>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* 📁 파일 탭바 영역 */}
      <div style={tabBarStyle}>
        {sortedFiles.map((file, idx) => (
          <div
            key={file.name}
            onClick={() => setActiveIdx(idx)}
            style={{
              ...tabStyle,
              backgroundColor: activeIdx === idx ? '#1e1e1e' : '#2d2d2d',
              color: activeIdx === idx ? '#61dafb' : '#969696',
              borderTop: activeIdx === idx ? '2px solid #61dafb' : '2px solid transparent',
              fontWeight: activeIdx === idx ? 'bold' : 'normal',
            }}
          >
            {file.name}
          </div>
        ))}
      </div>

      {/* 💻 코드 출력 영역 (Syntax Highlighter 설정 풀세트) */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          // 💡 [중요] codeTagProps를 건드려야 줄 간격이 아닌 '글자 크기'가 변합니다.
          codeTagProps={{
            style: {
              fontSize: `${displaySize}px`,
              lineHeight: '1.5',
              fontFamily: 'monospace'
            }
          }}
          customStyle={{
            margin: 0,
            padding: '20px',
            backgroundColor: '#1e1e1e',
            height: '100%',
            overflowX: 'hidden',
            fontSize: `${displaySize}px`, // 줄 번호 크기 매칭
          }}
          showLineNumbers={true} // 줄 번호 활성화 (Line Numbers)
          wrapLines={true}       // 자동 줄바꿈 활성화 (Wrap Lines)
          lineProps={{
            style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
          }}
        >
          {sortedFiles[activeIdx]?.code || ''}
        </SyntaxHighlighter>
      </div>

      {/* 💡 하단 상태바 (Status Bar) */}
      <div style={statusBarStyle}>
        Font Size: {displaySize}px | Ctrl + MouseWheel to Resize
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