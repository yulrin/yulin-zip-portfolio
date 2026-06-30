import railway from "@/assets/work-railway.jpg";
import sodeung from "@/assets/work-sodeung.jpg";
import paris from "@/assets/work-paris.jpg";
import dior from "@/assets/work-dior.jpg";
import arcade from "@/assets/work-arcade.jpg";
import chromeflora from "@/assets/work-chromeflora.jpg";
import skincare from "@/assets/work-skincare.jpg";
import glitch from "@/assets/work-glitch.jpg";

export const CATEGORIES = [
  "AI Brand Film",
  "Music Video",
  "Animation",
  "Fashion Visual",
  "Experimental",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  "AI Brand Film": "AI 광고·브랜드 필름",
  "Music Video": "뮤직비디오",
  Animation: "애니메이션",
  "Fashion Visual": "패션 비주얼",
  Experimental: "실험 영상",
};

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  categoryLabel: string;
  year: string;
  client?: string;
  duration?: string;
  thumb: string;
  tags: string[];
  description: string; // short blurb for cards
  concept: string;
  role: string;
  tools: string[];
  process: string[];
  output: string;
  improved: string;
  featured?: boolean;
};

export const works: Work[] = [
  {
    slug: "midnight-railway-diner",
    title: "철길심야식당",
    subtitle: "Midnight Railway Diner",
    category: "Experimental",
    categoryLabel: "단편영화 / AI 내러티브",
    year: "2025",
    duration: "2:48",
    thumb: railway,
    tags: ["AI 영화", "스토리텔링", "네온", "한국"],
    description:
      "기찻길 옆 작은 심야식당과 그곳을 스쳐 가는 낯선 사람들을 담은 네온빛 AI 단편영화.",
    concept:
      "막차가 오가는 철길 옆 심야식당을 무대로, 형광등 아래에서 단 한 번 마주치는 사람들의 온기를 그리고자 했습니다. 낯선 손님과 수증기, 빗소리를 엮어 밤의 짧은 초상을 완성했습니다.",
    role: "연출 · AI 비주얼 · 편집",
    tools: ["Runway Gen-3", "Midjourney v6", "Suno", "DaVinci Resolve", "After Effects"],
    process: [
      "1990년대 한국 영화의 정서를 참고해 6개 장면의 쇼트리스트를 설계했습니다.",
      "인물의 일관성을 위해 캐릭터 LoRA를 고정하고 200장 이상의 스틸을 생성했습니다.",
      "수증기, 빗줄기, 열차의 움직임을 Runway 모션 브러시로 장면별 연출했습니다.",
      "Kodak Vision3 500T의 질감을 기준으로 Resolve에서 합성과 색보정을 마무리했습니다.",
    ],
    output: "2분 48초 분량의 단편으로 완성했으며, 2025 서울 AI 필름 쇼케이스에 선정되었습니다.",
    improved:
      "모든 장면에서 동일한 주방장이 유지되도록 캐릭터 레퍼런스 워크플로를 구축해, AI 영상의 핵심 과제인 인물 연속성을 크게 개선했습니다.",
    featured: true,
  },
  {
    slug: "sodeung",
    title: "SODEUNG",
    subtitle: "소등 / 불이 꺼진 뒤",
    category: "Music Video",
    categoryLabel: "뮤직비디오 / AI 에디토리얼",
    year: "2025",
    client: "인디 아티스트 SODEUNG",
    duration: "3:24",
    thumb: sodeung,
    tags: ["뮤직비디오", "드림코어", "인물", "파스텔"],
    description:
      "사라지는 방과 반투명 패브릭, 파스텔빛 기억을 꿈의 논리로 연결한 인디 아티스트 SODEUNG의 뮤직비디오.",
    concept:
      "자신의 여러 모습을 잊어가는 주인공을 통해 기억의 불완전함을 표현했습니다. 반투명 천과 녹아내리는 공간을 반복 모티프로 삼아 노래의 호흡을 시각화했습니다.",
    role: "콘셉트 연출 · AI 촬영",
    tools: ["Kling 1.6", "Flux Pro", "Topaz Video AI", "Premiere Pro"],
    process: [
      "아티스트와 2시간의 화상 미팅을 진행하며 무드보드를 구체화했습니다.",
      "기억마다 다른 색을 부여해 14개의 독립적인 공간을 생성했습니다.",
      "Kling으로 천과 머리카락의 느린 움직임을 만들고 Topaz로 4배 업스케일했습니다.",
      "킥보다 보컬의 호흡을 기준으로 편집해 들이쉬고 내쉬는 듯한 리듬을 만들었습니다.",
    ],
    output: "아티스트 공식 채널에 공개되어 첫 달 48만 회 이상의 조회를 기록했습니다.",
    improved:
      "과도한 프롬프트를 덜어내고 핵심 연출어만 남기자 더 부드럽고 영화적인 프레임을 얻을 수 있었습니다.",
    featured: true,
  },
  {
    slug: "post-apocalypse-paris",
    title: "Post-Apocalypse Paris",
    subtitle: "패션 캠페인 제안",
    category: "Fashion Visual",
    categoryLabel: "패션 필름 / 캠페인 제안",
    year: "2025",
    duration: "0:35",
    thumb: paris,
    tags: ["패션", "캠페인", "시네마틱", "에디토리얼"],
    description:
      "시간이 멈춘 파리에서 생존의 언어가 된 쿠튀르를 그린 럭셔리 캠페인 제안. 메인 필름과 세로형 숏폼 9편으로 구성했습니다.",
    concept:
      "럭셔리 하우스가 시간이 멈춘 파리에서 FW 컬렉션을 발표한다면 어떨까? 쿠튀르를 향수가 아닌 단단한 생존 방식으로 재해석했습니다.",
    role: "크리에이티브 디렉션 · 디지털 스타일링 · 편집",
    tools: ["Midjourney v6", "Runway Gen-3 Alpha Turbo", "Magnific", "After Effects"],
    process: [
      "독립 패션 진의 문법을 참고해 1페이지 트리트먼트를 작성했습니다.",
      "6개의 핵심 룩과 실루엣을 고정한 뒤 조명만 변주해 일관성을 확보했습니다.",
      "먼지, 바람, 옷감의 흐름을 Runway로 연출해 스틸에 생명력을 더했습니다.",
      "35초 메인 필름과 소셜용 세로형 숏폼 9편으로 편집했습니다.",
    ],
    output: "완성된 제안 필름과 키아트 키트를 유럽 패션 하우스 2곳의 피칭 자료로 활용했습니다.",
    improved:
      "AI를 자동 생성 버튼이 아닌 의상팀처럼 다뤘습니다. 실제 트리트먼트를 먼저 설계하니 모든 프롬프트가 명확해지고 아트디렉션의 밀도가 높아졌습니다.",
    featured: true,
  },
  {
    slug: "dior-adidas",
    title: "Dior / Adidas",
    subtitle: "브랜드 비주얼 프로젝트",
    category: "AI Brand Film",
    categoryLabel: "브랜드 협업 / 비주얼 시스템",
    year: "2024",
    client: "Spec — Dior × Adidas",
    thumb: dior,
    tags: ["브랜드", "스포츠웨어", "럭셔리", "비주얼 시스템"],
    description:
      "쿠튀르 아틀리에의 차가운 빛 속에서 촬영한 모노그램 트랙슈트. Dior × Adidas 가상 캡슐 컬렉션입니다.",
    concept:
      "Dior의 절제된 우아함과 Adidas의 스포츠 문법을 하나의 가상 캡슐 컬렉션으로 연결했습니다. 장식을 덜고 소재, 실루엣, 빛의 대비에 집중했습니다.",
    role: "아트디렉션 · AI 제작",
    tools: ["Stable Diffusion XL", "ComfyUI", "Photoshop", "Figma"],
    process: [
      "제품과 모델의 일관된 표현을 위해 ComfyUI 그래프를 구축했습니다.",
      "Dior의 세리프와 Adidas의 그로테스크를 결합한 타이포그래피 시스템을 설계했습니다.",
      "가상 룩북을 위한 핵심 스틸 12장과 모션 루프 4편을 제작했습니다.",
      "포스터, 옥외광고, 이커머스 페이지까지 캠페인 적용안을 확장했습니다.",
    ],
    output: "24페이지 룩북 PDF와 모션 릴을 완성해 브랜드 비주얼 시스템의 확장성을 보여주었습니다.",
    improved:
      "프롬프트보다 구도와 크롭을 우선하는 아트디렉터의 관점으로 접근해 생성 이미지 특유의 우연성을 브랜드 결과물로 정돈했습니다.",
    featured: true,
  },
  {
    slug: "arcade-heart",
    title: "ARCADE HEART",
    subtitle: "アーケード・ハート",
    category: "Music Video",
    categoryLabel: "뮤직비디오 / Y2K 비주얼라이저",
    year: "2025",
    client: "MEGUMI*",
    duration: "2:58",
    thumb: arcade,
    tags: ["뮤직비디오", "Y2K", "갸루", "네온"],
    description:
      "신인 J-pop 아티스트 MEGUMI*를 위해 핑크빛 오락실의 열기를 담은 뮤직비디오. CRT 광원과 갸루 스타일을 AI로 구현했습니다.",
    concept:
      "새벽 2시 시부야 게임센터에 보내는 러브레터입니다. 고백처럼 들리는 곡을 네온을 오래 바라본 뒤 남는 잔상 같은 이미지로 번역했습니다.",
    role: "연출 · AI 촬영 · 편집",
    tools: ["Kling 1.6", "Midjourney v6", "Magnific", "After Effects"],
    process: [
      "모든 생성물에 하나의 핫핑크 LUT를 적용해 색의 일관성을 잡았습니다.",
      "후보 장면 80개 중 22개를 선별해 4막 구조로 배열했습니다.",
      "After Effects에서 CRT 주사선, 색수차, VHS 떨림을 더했습니다.",
      "킥 대신 리듬 기타에 컷을 맞춰 1990년대 뮤직비디오의 리듬을 재현했습니다.",
    ],
    output: "소셜 채널 공개 첫 주에 일본 음악 블로그 3곳에 소개되었습니다.",
    improved:
      "조명을 장면마다 통제하기보다 초기에 색상 팔레트를 고정해 모든 프롬프트가 이를 공유하도록 했고, 제작 기간을 3주에서 3일로 단축했습니다.",
    featured: true,
  },
  {
    slug: "chrome-flora",
    title: "CHROME FLORA",
    subtitle: "루프 스터디 03",
    category: "Animation",
    categoryLabel: "애니메이션 / 생성형 루프",
    year: "2025",
    duration: "0:30 루프",
    thumb: chromeflora,
    tags: ["애니메이션", "생성형", "3D", "루프"],
    description:
      "어둠 속에서 액체 크롬 꽃이 피고 지는 30초 무한 루프. 라이브 공연의 무대 배경용으로 제작했습니다.",
    concept:
      "꽃을 기계처럼, 기계를 꽃처럼 바라본 핑크 크롬의 명상입니다. 개화와 붕괴가 끊김 없이 이어지는 순환 구조를 설계했습니다.",
    role: "애니메이션 · 생성형 디자인",
    tools: ["Stable Video Diffusion", "Houdini", "TouchDesigner", "After Effects"],
    process: [
      "Houdini에서 핵심 꽃의 개화 동작을 모델링하고 이미지 시퀀스로 출력했습니다.",
      "시퀀스를 SVD에 입력해 변주한 뒤 서로 다른 개화 장면 8개를 선별했습니다.",
      "After Effects에서 루프 지점을 합성하고 TouchDesigner로 전환부를 정리했습니다.",
      "무대와 소셜 채널에 맞춘 4K 가로·세로 마스터를 납품했습니다.",
    ],
    output: "서울과 도쿄에서 열린 인디 레이블 쇼케이스 2회의 라이브 배경 영상으로 사용되었습니다.",
    improved:
      "핵심 형태는 전통 3D로 통제하고 변주는 AI에 맡기는 하이브리드 파이프라인으로 안정성과 우연성을 함께 확보했습니다.",
  },
  {
    slug: "ai-mizu",
    title: "AI / MIZU",
    subtitle: "스킨케어 브랜드 필름",
    category: "AI Brand Film",
    categoryLabel: "브랜드 필름 / 제품 론칭",
    year: "2025",
    client: "MIZU (제안 작업)",
    duration: "0:45",
    thumb: skincare,
    tags: ["브랜드", "스킨케어", "제품", "에디토리얼"],
    description:
      "분홍빛 밀크 텍스처 위를 떠다니는 도자기 보틀. 가상의 스킨케어 라인을 위해 AI로 제작한 무중력 브랜드 필름입니다.",
    concept:
      "스튜디오 촬영 없이도 에이전시 수준의 제품 모션을 구현할 수 있는지 검증한 45초 론칭 필름입니다. 제품 형태의 정확성과 질감 표현을 최우선으로 두었습니다.",
    role: "연출 · 프로듀싱 · 편집",
    tools: ["Sora", "Flux Pro", "Topaz Video AI", "DaVinci Resolve"],
    process: [
      "보틀을 3D 레퍼런스로 제작하고 렌더 이미지를 Flux의 조건 이미지로 사용했습니다.",
      "Sora에서 제품 모션 14개를 생성하고 형태가 가장 정확한 6개를 선별했습니다.",
      "Resolve에서 부드러운 핑크·크림 브랜드 팔레트로 색보정했습니다.",
      "메인 필름과 제품 상세페이지용 숏폼 6편으로 구성했습니다.",
    ],
    output: "인디 뷰티 브랜드 2곳에 제안했으며, 후속 유료 프로젝트 1건으로 연결되었습니다.",
    improved:
      "3D 보틀을 시각적 기준점으로 먼저 제작해 장면 간 제품 형태가 달라지는 문제를 약 90% 줄였습니다.",
    featured: true,
  },
  {
    slug: "static-self",
    title: "STATIC SELF",
    subtitle: "실험적 자화상",
    category: "Experimental",
    categoryLabel: "실험 영상 / 데이터모시",
    year: "2024",
    duration: "1:12",
    thumb: glitch,
    tags: ["실험", "글리치", "VHS", "인물"],
    description:
      "분홍색 CRT 노이즈 속으로 해체되는 자화상. 생성 모델의 오류를 의도적으로 드러낸 실험 영상입니다.",
    concept:
      "생성의 흔적을 숨기지 않으면 무엇이 보일까? 모든 글리치와 아티팩트를 프레임 안에 남겨 얼굴이 아닌 매체 자체의 초상을 만들었습니다.",
    role: "연출 · 편집",
    tools: ["Runway Gen-2", "Datamoshing scripts", "After Effects", "Premiere"],
    process: [
      "서로 충돌하는 프롬프트를 의도적으로 사용해 인물 클립 30개를 생성했습니다.",
      "클립 사이의 I-프레임을 데이터모시해 정체성이 서로 번지도록 만들었습니다.",
      "CRT의 낡은 질감을 위해 주사선과 색 분리 효과를 더했습니다.",
      "음악 대신 하나의 서브베이스 톤만 사용해 이미지의 질감에 집중했습니다.",
    ],
    output: "2024년 12월 홍대 실험 단편 상영회에서 공개했습니다.",
    improved:
      "깨끗한 결과만을 목표로 삼지 않고 오류를 재료로 받아들이면서 새로운 비주얼 방향을 발견했습니다.",
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
export const featuredWorks = works.filter((w) => w.featured);
