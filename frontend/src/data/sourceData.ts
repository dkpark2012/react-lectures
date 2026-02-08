// src/data/sourceData.ts
// @ts-ignore
import appCode from '../App.tsx?raw';
import homeCode from '../pages/Home.tsx?raw';
import navigationCode from '../components/Navigation.tsx?raw';
import lecture1Code from '../pages/Lecture1.tsx?raw';
import lecture2Code from '../pages/Lecture2.tsx?raw';
import lecture3Code from '../pages/Lecture3.tsx?raw';
import lecture4Code from '../pages/Lecture4.tsx?raw';
import lecture5Code from '../pages/Lecture5.tsx?raw';
import lecture6Code from '../pages/Lecture6.tsx?raw';

export const sourceData: Record<string, { name: string; code: string }[]> = {
  "/study/lecture1": [
    { name: "App.tsx", code: appCode },
    { name: "Home.tsx", code: homeCode },
    { name: "Navigation.tsx", code: navigationCode },
    { name: "Lecture1.tsx", code: lecture1Code }
  ],
  "/study/lecture2": [
    { name: "Lecture2.tsx", code: lecture2Code }
  ],
  "/study/lecture3": [
    { name: "Lecture3.tsx", code: lecture3Code }
  ],
  "/study/lecture4": [
    { name: "Lecture4.tsx", code: lecture4Code }
  ],
  "/study/lecture5": [
    { name: "Lecture5.tsx", code: lecture5Code }
  ],
  "/study/lecture6": [
    { name: "Lecture6.tsx", code: lecture6Code }
  ],
  "/study/lecture7": [
    { name: "Lecture7.tsx", code: lecture6Code }
  ],
  "/study/lecture8": [
    { name: "Lecture8.tsx", code: lecture6Code }
  ],
  "/study/lecture9": [
    { name: "Lecture9.tsx", code: lecture6Code }
  ],
  "/study/lecture10": [
    { name: "Lecture10.tsx", code: lecture6Code }
  ],
  "/study/lecture11": [
    { name: "Lecture11.tsx", code: lecture6Code }
  ],
  "/study/lecture12": [
    { name: "Lecture12.tsx", code: lecture6Code }
  ],
  "/study/lecture13": [
    { name: "Lecture13.tsx", code: lecture6Code }
  ],
  "/study/lecture14": [
    { name: "Lecture14.tsx", code: lecture6Code }
  ],
  "/study/lecture15": [
    { name: "Lecture15.tsx", code: lecture6Code }
  ],
  "/study/lecture16": [
    { name: "Lecture16.tsx", code: lecture6Code }
  ],
  "/study/lecture17": [
    { name: "Lecture17.tsx", code: lecture6Code }
  ],
  "/study/lecture18": [
    { name: "Lecture18.tsx", code: lecture6Code }
  ],
  "/study/lecture19": [
    { name: "Lecture19.tsx", code: lecture6Code }
  ],
  "/study/lecture20": [
    { name: "Lecture20.tsx", code: lecture6Code }
  ]
};