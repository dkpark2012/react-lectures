import { useState } from 'react';

/**
 * [Step-20] Tailwind CSS 실전 레이아웃 구성
 * 💡 핵심 포인트:
 * 1. Utility-First (유틸리티 우선): 미리 정의된 클래스 조합만으로 디자인을 완성하는 방식입니다.
 * 2. Responsive Design (반응형 디자인): 'sm:', 'md:', 'lg:' 등의 접두사로 화면 크기별 스타일을 제어합니다.
 * 3. Arbitrary Values (임의의 값): 'bg-[#3b82f6]' 처럼 대괄호를 사용하여 설정 파일에 없는 값을 직접 넣습니다.
 * 4. State-Driven Class (상태 기반 클래스): React의 상태에 따라 클래스명을 동적으로 갈아끼워 UI를 변경합니다.
 */

export default function Lecture20() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Overview');

  // 사이드바 메뉴 데이터
  const menuItems = [
    { name: 'Overview', icon: '📊' },
    { name: 'Analytics', icon: '📈' },
    { name: 'Team', icon: '👥' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    /* 전체 배경: h-screen(화면 꽉 채움), overflow-hidden(스크롤 제어) */
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 font-sans">
      
      {/* 1. Sidebar (사이드바) */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-700">
          {isSidebarOpen && <span className="text-xl font-bold tracking-widest text-indigo-400">DASHBOARD</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:text-indigo-400">
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 space-y-2 py-6 px-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`
                w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors
                ${activeTab === item.name ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. Main Content Area (메인 콘텐츠) */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        
        {/* Header (상단바) */}
        <header className="flex h-16 items-center justify-between bg-white px-8 shadow-sm border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">2026년 2월 8일</span>
            <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        {/* Content Section (실제 내용) */}
        <main className="p-8">
          {/* Grid Layout (그리드 레이아웃) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Total Sales {i}</span>
                  <span className="text-emerald-500 text-xs font-bold">+12.5%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">$24,500</div>
              </div>
            ))}
          </div>

          

          {/* Table Area (테이블 영역) */}
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">📦</div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">Project #{row}042</div>
                        <div className="text-xs text-slate-500">Customer ID: CUST-{row}99</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center text-slate-400 text-sm">
            <p>💡 <strong>Deep Dive:</strong> Tailwind는 <strong>Atomic CSS (아토믹 CSS, 작은 조각의 스타일)</strong>를 지향합니다. 
            처음에는 HTML이 복잡해 보일 수 있으나, 클래스 이름 충돌 걱정 없이 <strong>Rapid Prototyping (빠른 프로토타입 제작)</strong>이 가능하다는 최고의 장점이 있습니다.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}