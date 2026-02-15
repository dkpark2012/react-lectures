import { PUBLISH_COUNT } from '@constants/config';
import React from 'react';

export interface SourceFile {
  name: string;
  code: string;
  content?: React.ComponentType; 
}

// 1. 강의 파일들만 타이트하게 긁어오기
const rawModules = import.meta.glob('../features/phase*/*.tsx', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
}) as Record<string, string>;

const componentModules = import.meta.glob('../features/phase*/*.tsx', { 
  eager: true 
}) as Record<string, any>; 

export const sourceData: Record<string, SourceFile[]> = {};

Object.entries(rawModules).forEach(([path, code]) => {
  const fileName = path.split('/').pop() || ''; 
  const lectureMatch = fileName.match(/lecture(\d+)/);
  const lectureNum = lectureMatch ? parseInt(lectureMatch[1], 10) : 0;

  if (lectureNum > 0 && lectureNum <= PUBLISH_COUNT) {
    const phaseMatch = path.match(/phase(\d+)/);
    const phaseNum = phaseMatch ? phaseMatch[1] : '1';
    
    // 💡 주소창 매칭용 키 생성
    const routeKey = `/phase${phaseNum}/lecture${lectureNum}`;
    
    // 해당 모듈에서 컴포넌트(함수) 추출
    const module = componentModules[path];
    const MainComponent = Object.values(module).find(val => typeof val === 'function') as React.ComponentType;

    /**
     * 🚀 오빠 요청대로 lecture.tsx 파일 하나만 담아!
     * 이렇게 하면 LectureComponent에서도 0번 인덱스로 바로 찾을 수 있어.
     */
    const lectureData = [
      { 
        name: fileName, 
        code: String(code), 
        content: MainComponent 
      }
    ];

    sourceData[routeKey] = lectureData;
    sourceData[routeKey.substring(1)] = lectureData; // 슬래시 없는 버전
  }
});