// src/data/sourceData.ts
import { PUBLISH_COUNT } from '../constants/config';

// ?raw 쿼리를 통해 실제 코드 원문을 가져옵니다.
const modules = import.meta.glob('../pages/Lecture*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

import appCode from '../App.tsx?raw';
import homeCode from '../pages/Home.tsx?raw';
import navigationCode from '../components/Navigation.tsx?raw';

const commonFiles = [
  { name: "App.tsx", code: appCode },
  { name: "Home.tsx", code: homeCode },
  { name: "Navigation.tsx", code: navigationCode },
];

export const sourceData: Record<string, { name: string; code: string }[]> = {};

Object.entries(modules).forEach(([path, code]) => {
  // 경로: ../pages/Lecture1.tsx -> 파일명: Lecture1.tsx
  const fileName = path.split('/').pop() || ''; 
  const match = fileName.match(/\d+/);
  const lectureNum = match ? parseInt(match[0], 10) : 0;

  if (lectureNum > 0 && lectureNum <= PUBLISH_COUNT) {
    const routeKey = `/study/lecture${lectureNum}`;
    
    // 핵심: 기존 배열을 참조하지 않고 매번 새 배열을 생성하여 할당
    sourceData[routeKey] = [
      ...commonFiles,
      { name: fileName, code: String(code) }
    ];
  }
});

console.log("✅ [SourceData] 로드된 경로 목록:", Object.keys(sourceData));