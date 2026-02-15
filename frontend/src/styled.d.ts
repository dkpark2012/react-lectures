import 'styled-components';

// 1️⃣ [Technical Term] Interface Extension (인터페이스 확장)
// styled-components의 기본 테마 타입을 오빠의 테마 구조에 맞게 확장해!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    accent: string;
    cardBg: string;
    border: string;
  }
}