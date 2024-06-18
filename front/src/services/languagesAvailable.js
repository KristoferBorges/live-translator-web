const LanguagesAvailable = [
  {
    lang: 'af',
    name: 'Africâner',
  },
  {
    lang: 'sq',
    name: 'Albanês',
  },
  {
    lang: 'am',
    name: 'Amárico',
  },
  {
    lang: 'ar',
    name: 'Árabe',
  },
  {
    lang: 'hy',
    name: 'Armênio',
  },
  {
    lang: 'az',
    name: 'Azerbaijano',
  },
  {
    lang: 'eu',
    name: 'Basco',
  },
  {
    lang: 'be',
    name: 'Bielorrusso',
  },
  {
    lang: 'bn',
    name: 'Bengali',
  },
  {
    lang: 'bs',
    name: 'Bósnio',
  },
  {
    lang: 'bg',
    name: 'Búlgaro',
  },
  {
    lang: 'ca',
    name: 'Catalão',
  },
  {
    lang: 'ceb',
    name: 'Cebuano',
  },
  {
    lang: 'ny',
    name: 'Chichewa',
  },
  {
    lang: 'zh-cn',
    name: 'Chinês (Simplificado)',
  },
  {
    lang: 'zh-tw',
    name: 'Chinês (Tradicional)',
  },
  {
    lang: 'co',
    name: 'Corso',
  },
  {
    lang: 'hr',
    name: 'Croata',
  },
  {
    lang: 'cs',
    name: 'Tcheco',
  },
  {
    lang: 'da',
    name: 'Dinamarquês',
  },
  {
    lang: 'nl',
    name: 'Holandês',
  },
  {
    lang: 'en',
    name: 'Inglês',
  },
  {
    lang: 'eo',
    name: 'Esperanto',
  },
  {
    lang: 'et',
    name: 'Estoniano',
  },
  {
    lang: 'tl',
    name: 'Filipino',
  },
  {
    lang: 'fi',
    name: 'Finlandês',
  },
  {
    lang: 'fr',
    name: 'Francês',
  },
  {
    lang: 'fy',
    name: 'Frísio',
  },
  {
    lang: 'gl',
    name: 'Galego',
  },
  {
    lang: 'ka',
    name: 'Georgiano',
  },
  {
    lang: 'de',
    name: 'Alemão',
  },
  {
    lang: 'el',
    name: 'Grego',
  },
  {
    lang: 'gu',
    name: 'Gujarati',
  },
  {
    lang: 'ht',
    name: 'Haitiano',
  },
  {
    lang: 'ha',
    name: 'Hauçá',
  },
  {
    lang: 'haw',
    name: 'Havaiano',
  },
  {
    lang: 'he',
    name: 'Hebraico',
  },
  {
    lang: 'hi',
    name: 'Hindi',
  },
  {
    lang: 'hmn',
    name: 'Hmong',
  },
  {
    lang: 'hu',
    name: 'Húngaro',
  },
  {
    lang: 'is',
    name: 'Islandês',
  },
  {
    lang: 'ig',
    name: 'Igbo',
  },
  {
    lang: 'id',
    name: 'Indonésio',
  },
  {
    lang: 'ga',
    name: 'Irlandês',
  },
  {
    lang: 'it',
    name: 'Italiano',
  },
  {
    lang: 'ja',
    name: 'Japonês',
  },
  {
    lang: 'jw',
    name: 'Javanês',
  },
  {
    lang: 'kn',
    name: 'Canará',
  },
  {
    lang: 'kk',
    name: 'Cazaque',
  },
  {
    lang: 'km',
    name: 'Khmer',
  },
  {
    lang: 'ko',
    name: 'Coreano',
  },
  {
    lang: 'ku',
    name: 'Curdo (Kurmanji)',
  },
  {
    lang: 'ky',
    name: 'Quirguiz',
  },
  {
    lang: 'lo',
    name: 'Lao',
  },
  {
    lang: 'la',
    name: 'Latim',
  },
  {
    lang: 'lv',
    name: 'Letão',
  },
  {
    lang: 'lt',
    name: 'Lituano',
  },
  {
    lang: 'lb',
    name: 'Luxemburguês',
  },
  {
    lang: 'mk',
    name: 'Macedônio',
  },
  {
    lang: 'mg',
    name: 'Malgaxe',
  },
  {
    lang: 'ms',
    name: 'Malaio',
  },
  {
    lang: 'ml',
    name: 'Malaiala',
  },
  {
    lang: 'mt',
    name: 'Maltês',
  },
  {
    lang: 'mi',
    name: 'Maori',
  },
  {
    lang: 'mr',
    name: 'Marati',
  },
  {
    lang: 'mn',
    name: 'Mongol',
  },
  {
    lang: 'my',
    name: 'Birmanês',
  },
  {
    lang: 'ne',
    name: 'Nepalês',
  },
  {
    lang: 'no',
    name: 'Norueguês',
  },
  {
    lang: 'or',
    name: 'Oriá',
  },
  {
    lang: 'ps',
    name: 'Pashto',
  },
  {
    lang: 'fa',
    name: 'Persa',
  },
  {
    lang: 'pl',
    name: 'Polonês',
  },
  {
    lang: 'pt',
    name: 'Português',
  },
  {
    lang: 'pa',
    name: 'Punjabi',
  },
  {
    lang: 'ro',
    name: 'Romeno',
  },
  {
    lang: 'ru',
    name: 'Russo',
  },
  {
    lang: 'sm',
    name: 'Samoano',
  },
  {
    lang: 'gd',
    name: 'Gaélico Escocês',
  },
  {
    lang: 'sr',
    name: 'Sérvio',
  },
  {
    lang: 'st',
    name: 'Sesoto',
  },
  {
    lang: 'sn',
    name: 'Shona',
  },
  {
    lang: 'sd',
    name: 'Sindi',
  },
  {
    lang: 'si',
    name: 'Cingalês',
  },
  {
    lang: 'sk',
    name: 'Eslovaco',
  },
  {
    lang: 'sl',
    name: 'Esloveno',
  },
  {
    lang: 'so',
    name: 'Somali',
  },
  {
    lang: 'es',
    name: 'Espanhol',
  },
  {
    lang: 'su',
    name: 'Sundanês',
  },
  {
    lang: 'sw',
    name: 'Suaíli',
  },
  {
    lang: 'sv',
    name: 'Sueco',
  },
  {
    lang: 'tg',
    name: 'Tadjique',
  },
  {
    lang: 'ta',
    name: 'Tâmil',
  },
  {
    lang: 'te',
    name: 'Telugo',
  },
  {
    lang: 'th',
    name: 'Tailandês',
  },
  {
    lang: 'tr',
    name: 'Turco',
  },
  {
    lang: 'uk',
    name: 'Ucraniano',
  },
  {
    lang: 'ur',
    name: 'Urdu',
  },
  {
    lang: 'ug',
    name: 'Uigur',
  },
  {
    lang: 'uz',
    name: 'Uzbeque',
  },
  {
    lang: 'vi',
    name: 'Vietnamita',
  },
  {
    lang: 'cy',
    name: 'Galês',
  },
  {
    lang: 'xh',
    name: 'Xhosa',
  },
  {
    lang: 'yi',
    name: 'Iídiche',
  },
  {
    lang: 'yo',
    name: 'Iorubá',
  },
  {
    lang: 'zu',
    name: 'Zulu',
  },
];

export default LanguagesAvailable;
