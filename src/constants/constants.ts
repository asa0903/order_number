/**
 * 定数ファイル
 */
import type {
  CircleInfo,
} from '../types/types';

// 時間定数
export const TIME_CONSTANTS = {
  limitTime: 60,
  waringSeconds: 30,
  dangerSeconds: 10,
} as const;

// ゲーム結果情報キー定数
export const GAME_RESULT_KEY = {
  correct: 'correct',
  wrong: 'wrong',
} as const;

// ローカルストレージ（セッション）用キー定数
export const STORAGE_KEY = {
  bestScore: 'bestScore',
} as const;

// 難易度パラメータ定数
export const DIFFICULTY_PARAM = [
  {// かんたん
    patternIndex: 5,
    numberRange: 10,
  },
  {// ふつう
    patternIndex: 11,
    numberRange: 30,
  },
  {// むずかしい
    patternIndex: 13,
    numberRange: 50,
  },
  {// かなりむずかしい
    patternIndex: 16,
    numberRange: 100,
  },
] as const;

// 色のパターン定数
export const COLOR_PATTERNS: string[] = [
  '#ff3333', // 赤
  '#33cc33', // 緑
  '#3366ff', // 青
  '#ff33aa', // ピンク
  '#33cc99', // エメラルドグリーン
  '#33cfff', // 水色
  '#ff8844', // オレンジ
  '#f1c40f', // 黄緑
] as const;

// デモ用レイアウトパターン定数
export const DEMO_PATTERNS: CircleInfo[][] = [
  [
    { number: 2, top: '0px', left: '15%', width: '50px', height: '50px', fontSize: '18px', backgroundColor: COLOR_PATTERNS[0] },
    { number: 1, top: '0px', left: '40%', width: '50px', height: '50px', fontSize: '18px', backgroundColor: COLOR_PATTERNS[1] },
    { number: 3, top: '0px', left: '65%', width: '50px', height: '50px', fontSize: '18px', backgroundColor: COLOR_PATTERNS[2] },
  ],
] as const;

// レイアウトパターン定数（位置・大きさなど）
export const DESIGN_PATTERNS: CircleInfo[][] = [
  [
    { number: 0, top: '130px', left: '40px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '220px', left: '200px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' },
    { number: 0, top: '90px', left: '220px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '30px', left: '120px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '220px', left: '70px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '320px', left: '230px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '60px', left: '40px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' },
    { number: 0, top: '200px', left: '220px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' },
    { number: 0, top: '260px', left: '100px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '40px', left: '180px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '200px', left: '70px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '290px', left: '230px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '50px', left: '90px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '220px', left: '220px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '320px', left: '100px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '40px', left: '40px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '180px', left: '60px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '340px', left: '120px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '100px', left: '200px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '30px', left: '60px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '200px', left: '200px', width: '140px', height: '140px', fontSize: '54px', backgroundColor: '#111' },
    { number: 0, top: '80px', left: '240px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '290px', left: '80px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '70px', left: '60px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' },
    { number: 0, top: '220px', left: '40px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '140px', left: '200px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '330px', left: '160px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '30px', left: '190px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '70px', left: '60px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '200px', left: '30px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '280px', left: '180px', width: '140px', height: '140px', fontSize: '54px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '60px', left: '40px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '200px', left: '60px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '310px', left: '130px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '130px', left: '220px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '50px', left: '60px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' },
    { number: 0, top: '100px', left: '200px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' },
    { number: 0, top: '220px', left: '100px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '280px', left: '220px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
  ],
  [
    { number: 0, top: '30px', left: '30px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '190px', left: '50px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '100px', left: '180px', width: '120px', height: '120px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '240px', left: '230px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '320px', left: '100px', width: '120px', height: '120px', fontSize: '42px', backgroundColor: '#111' }
  ],
  [
    { number: 0, top: '40px', left: '40px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '270px', left: '30px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' },
    { number: 0, top: '70px', left: '200px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '300px', left: '220px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '170px', left: '120px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' }
  ],
  [
    { number: 0, top: '50px', left: '130px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '140px', left: '40px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '120px', left: '210px', width: '140px', height: '140px', fontSize: '54px', backgroundColor: '#111' },
    { number: 0, top: '270px', left: '80px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '270px', left: '200px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' }
  ],
  [
    { number: 0, top: '50px', left: '50px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' },
    { number: 0, top: '220px', left: '50px', width: '100px', height: '100px', fontSize: '40px', backgroundColor: '#111' },
    { number: 0, top: '120px', left: '180px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' },
    { number: 0, top: '270px', left: '200px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '340px', left: '100px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' }
  ],
  [
    { number: 0, top: '70px', left: '40px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '30px', left: '180px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '190px', left: '70px', width: '120px', height: '120px', fontSize: '45px', backgroundColor: '#111' },
    { number: 0, top: '250px', left: '220px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' },
    { number: 0, top: '320px', left: '120px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' }
  ],
  [
    { number: 0, top: '40px', left: '200px', width: '100px', height: '100px', fontSize: '38px', backgroundColor: '#111' },
    { number: 0, top: '100px', left: '60px', width: '130px', height: '130px', fontSize: '50px', backgroundColor: '#111' },
    { number: 0, top: '170px', left: '200px', width: '140px', height: '140px', fontSize: '54px', backgroundColor: '#111' },
    { number: 0, top: '260px', left: '30px', width: '110px', height: '110px', fontSize: '42px', backgroundColor: '#111' },
    { number: 0, top: '320px', left: '160px', width: '90px', height: '90px', fontSize: '34px', backgroundColor: '#111' }
  ],
] as const;
