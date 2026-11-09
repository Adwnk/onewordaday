/** Word-find themes, keyed by Korean Word Bank word. A word may sit in more than one theme. */
export const THEMES: { label: string; words: string[] }[] = [
  { label: "Food", words: ["밥", "빵", "커피", "치킨", "김치볶음밥", "음식", "요리", "국", "과자", "양파", "물", "점심", "저녁"] },
  { label: "Home", words: ["집", "방", "문", "창문", "소파", "테이블", "이불", "계단", "불", "열쇠", "쓰레기", "가스레인지", "에어컨"] },
  { label: "People", words: ["아기", "아이", "아빠", "엄마", "할머니", "언니", "가족", "친구", "여자친구", "아내", "선생님", "기사님"] },
  { label: "Time", words: ["오늘", "내일", "어제", "아침", "밤", "주말", "토요일", "일요일", "달", "년", "일주일", "분", "이따가", "벌써", "곧"] },
  { label: "Places", words: ["집", "은행", "카페", "도서관", "시장", "식당", "노래방", "가게", "한국", "밖"] },
  { label: "Shopping", words: ["쇼핑", "가게", "시장", "돈", "지갑", "은행", "선물", "택배", "물가"] },
  { label: "Getting around", words: ["버스", "차", "택시", "지하철", "기사님", "표", "여행", "자리"] },
  { label: "Study", words: ["책", "펜", "숙제", "선생님", "도서관", "편지", "한국어"] },
  { label: "Fun", words: ["영화", "음악", "노래", "춤", "드라마", "노래방"] },
  { label: "Outdoors", words: ["비", "우산", "바다", "밖", "꽃"] },
  { label: "Questions", words: ["뭐", "어디", "언제", "왜", "어떻게", "어떤"] },
];
