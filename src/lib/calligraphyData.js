// Arabic Calligraphy Styles
export const calligraphyStyles = [
  {
    id: "thuluth",
    name: "Thuluth",
    nameAr: "الثلث",
    description: "One of the most elegant and complex Arabic calligraphy styles. Known for its tall, elongated letters with sweeping curves. Historically used for mosque inscriptions, Quran headings, and architectural decoration.",
    history: "Developed in the 7th century and refined during the Abbasid period. The name 'Thuluth' means 'one-third', referring to the proportion of the letters. It reached its peak during the Ottoman Empire under master calligraphers like Hâfız Osman.",
    characteristics: [
      "Tall vertical strokes with elegant curves",
      "Letters are one-third straight and two-thirds curved",
      "Extensive use of diacritical marks for decoration",
      "Complex ligatures and letter connections",
      "Wide pen angle creating dramatic thick-thin contrasts"
    ],
    difficulty: "Advanced",
    color: "#C49B3C",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80"
  },
  {
    id: "naskh",
    name: "Naskh",
    nameAr: "النسخ",
    description: "The most widely used Arabic calligraphy style. Clear, readable, and elegant — it is the standard for printed Arabic text, newspapers, and most Quran copies today.",
    history: "Developed by Ibn Muqlah in the 10th century and perfected by Ibn al-Bawwab. It gradually replaced Kufic as the dominant script for copying the Quran. The name means 'copying', reflecting its use for manuscript reproduction.",
    characteristics: [
      "Rounded, clear letterforms",
      "Consistent baseline with even proportions",
      "Moderate contrast between thick and thin strokes",
      "Highly readable even at small sizes",
      "Well-defined letter shapes"
    ],
    difficulty: "Beginner",
    color: "#2D5F8A",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600&q=80"
  },
  {
    id: "diwani",
    name: "Diwani",
    nameAr: "الديواني",
    description: "A flowing, ornamental style developed for the Ottoman royal court. Distinguished by its sweeping curves and decorative flourishes, it was once a closely guarded secret of the Ottoman chancellery.",
    history: "Created by Housam Roumi during the reign of the early Ottoman Sultans in the 15th century. It was refined by Shala Pasha and used exclusively for royal correspondence and official documents (firmans).",
    characteristics: [
      "Flowing, connected letters with no breaks",
      "Pronounced curves and loops",
      "Letters slant upward from right to left",
      "No diacritical marks in pure Diwani",
      "Decorative and ornamental appearance"
    ],
    difficulty: "Advanced",
    color: "#8B4A6B",
    image: "https://images.unsplash.com/photo-1579187707643-35646d22b596?w=600&q=80"
  },
  {
    id: "ruqah",
    name: "Ruq'ah",
    nameAr: "الرقعة",
    description: "The everyday handwriting style of the Arab world. Simple, compact, and efficient — it prioritizes speed and clarity, making it ideal for daily writing and note-taking.",
    history: "Developed during the Ottoman Empire as a practical everyday script. Standardized in the 19th century, it became the default handwriting taught in schools across the Middle East and North Africa.",
    characteristics: [
      "Short, compact letterforms",
      "Minimal decorative elements",
      "Letters sit slightly above the baseline",
      "Quick, efficient strokes",
      "Dots are often combined into dashes"
    ],
    difficulty: "Beginner",
    color: "#4A7B5E",
    image: "https://images.unsplash.com/photo-1585505933738-a85cf0393bbc?w=600&q=80"
  },
  {
    id: "kufi",
    name: "Kufic",
    nameAr: "الكوفي",
    description: "The oldest and most angular Arabic calligraphy style. Known for its geometric, square letterforms, it was the first script used to write the Quran and remains prominent in architectural decoration.",
    history: "Originated in the city of Kufa, Iraq, in the 7th century. It was the dominant script for Quran manuscripts for the first five centuries of Islam. Many sub-styles evolved, including foliated, floriated, and plaited Kufic.",
    characteristics: [
      "Angular, geometric letterforms",
      "Horizontal strokes are extended",
      "Strong emphasis on horizontal lines",
      "Minimal curves, mostly straight lines",
      "Often incorporated into geometric patterns"
    ],
    difficulty: "Intermediate",
    color: "#B85C3A",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80"
  },
  {
    id: "nastaliq",
    name: "Nastaliq",
    nameAr: "النستعليق",
    description: "A graceful, hanging script that flows diagonally. Predominantly used for Persian, Urdu, and Pashto, it is considered one of the most beautiful calligraphic styles ever created.",
    history: "Developed in Iran in the 14th-15th century by Mir Ali Tabrizi. The name is a portmanteau of Naskh and Ta'liq. It became the premier script for Persian poetry and literature.",
    characteristics: [
      "Letters hang from an imaginary diagonal line",
      "Deep curves and long horizontal strokes",
      "Flowing, rhythmic movement",
      "Significant variation in letter sizes",
      "Deeply aesthetic and poetic appearance"
    ],
    difficulty: "Advanced",
    color: "#6B5B8D",
    image: "https://images.unsplash.com/photo-1590076082573-5765d1e2cffe?w=600&q=80"
  }
];

// Thuluth Letter Data — based on traditional calligraphy practice books
export const thuluthLetters = [
  {
    id: "alif",
    letter: "ا",
    name: "Aleef (ا)",
    nameAr: "ألف",
    transliteration: "ā / a",
    group: 1,
    forms: {
      isolated: "ا",
      initial: "ا",
      medial: "ـا",
      final: "ـا"
    },
    strokeCount: 1,
    description: "The first letter of the Arabic alphabet. In Thuluth, it is a tall, elegant vertical stroke with a subtle curve at the top and a graceful serif at the base.",
    strokeGuide: [
      "Start from the top with a thick entry stroke angled at 30°",
      "Draw a tall, slightly curved vertical line downward",
      "The height should be 7 dots (rhombic dots from the pen nib)",
      "End with a gentle serif curving slightly to the left",
      "Maintain consistent pressure throughout the stroke"
    ],
    proportionTip: "The Alif is the measuring unit in Thuluth — all other letters are proportioned relative to it. Its height equals 7 rhombic dots stacked vertically.",
    difficulty: 1,
    practiceOrder: 1
  },
  {
    id: "ba",
    letter: "ب",
    name: "Ba (ب)",
    nameAr: "باء",
    transliteration: "b",
    group: 1,
    forms: {
      isolated: "ب",
      initial: "بـ",
      medial: "ـبـ",
      final: "ـب"
    },
    strokeCount: 2,
    description: "A horizontal base with a gentle curve and a single dot below. In Thuluth, the curve is more pronounced and sweeping than in other styles.",
    strokeGuide: [
      "Begin with a small entry tooth at the top right",
      "Sweep rightward with a shallow curve, then dip below the baseline",
      "Create a wide, boat-like curve extending to the left",
      "The tail curves upward slightly at the end",
      "Place a single rhombic dot below the center of the curve"
    ],
    proportionTip: "The horizontal span of Ba should be approximately 4-5 dots wide. The depth below the baseline is about 2 dots.",
    difficulty: 2,
    practiceOrder: 2
  },
  {
    id: "ta",
    letter: "ت",
    name: "Ta (ت)",
    nameAr: "تاء",
    transliteration: "t",
    group: 1,
    forms: {
      isolated: "ت",
      initial: "تـ",
      medial: "ـتـ",
      final: "ـت"
    },
    strokeCount: 2,
    description: "Shares the same body as Ba but with two dots above instead of one below. The Thuluth form features an elegant sweeping baseline.",
    strokeGuide: [
      "Same base stroke as Ba — entry tooth, then sweeping curve",
      "The horizontal body is slightly more compact",
      "End the tail with a subtle upward curl",
      "Place two rhombic dots above, slightly tilted",
      "Dots should be close but not touching"
    ],
    proportionTip: "The two dots are placed at a slight diagonal angle, each the size of one pen-width dot.",
    difficulty: 2,
    practiceOrder: 3
  },
  {
    id: "tha",
    letter: "ث",
    name: "Tha (ث)",
    nameAr: "ثاء",
    transliteration: "th",
    group: 1,
    forms: {
      isolated: "ث",
      initial: "ثـ",
      medial: "ـثـ",
      final: "ـث"
    },
    strokeCount: 2,
    description: "Same body as Ba and Ta, with three dots arranged in a triangular pattern above. The dots form a distinctive crown in Thuluth.",
    strokeGuide: [
      "Draw the same base curve as Ba/Ta",
      "The body stroke remains identical",
      "Place three dots above in a triangular arrangement",
      "Two dots at the base, one dot centered above them",
      "In Thuluth, dots may be slightly larger and more decorative"
    ],
    proportionTip: "The three dots form an equilateral triangle. The base pair sits directly above the letter body.",
    difficulty: 2,
    practiceOrder: 4
  },
  {
    id: "jim",
    letter: "ج",
    name: "Jeem (ج)",
    nameAr: "جيم",
    transliteration: "j",
    group: 2,
    forms: {
      isolated: "ج",
      initial: "جـ",
      medial: "ـجـ",
      final: "ـج"
    },
    strokeCount: 2,
    description: "A distinctive bowl-shaped letter with a dot in the center. In Thuluth, the bowl is deep and wide with an elegant ascending stroke.",
    strokeGuide: [
      "Start with a curved head stroke rising above the baseline",
      "The top curves rightward like a hook",
      "Drop down sharply into a deep bowl below the baseline",
      "The bowl sweeps left and curves back up elegantly",
      "Place a single dot inside the bowl center"
    ],
    proportionTip: "The bowl depth is about 4 dots below baseline. The head rises about 3 dots above.",
    difficulty: 3,
    practiceOrder: 5
  },
  {
    id: "ha_small",
    letter: "ح",
    name: "Ha (ح)",
    nameAr: "حاء",
    transliteration: "ḥ",
    group: 2,
    forms: {
      isolated: "ح",
      initial: "حـ",
      medial: "ـحـ",
      final: "ـح"
    },
    strokeCount: 1,
    description: "Same shape as Jim but without the dot. In Thuluth, the clean bowl form showcases the calligrapher's control.",
    strokeGuide: [
      "Identical body stroke to Jim",
      "Start with the ascending head stroke",
      "Create the deep bowl below the baseline",
      "Sweep the tail left and curve up",
      "No dot — the form stands alone"
    ],
    proportionTip: "Same proportions as Jim. The absence of the dot emphasizes the purity of the curve.",
    difficulty: 3,
    practiceOrder: 6
  },
  {
    id: "kha",
    letter: "خ",
    name: "Kha (خ)",
    nameAr: "خاء",
    transliteration: "kh",
    group: 2,
    forms: {
      isolated: "خ",
      initial: "خـ",
      medial: "ـخـ",
      final: "ـخ"
    },
    strokeCount: 2,
    description: "Same body as Jim and Ha, with a single dot placed above the head stroke. The dot placement in Thuluth is precise and decorative.",
    strokeGuide: [
      "Draw the same body as Jim/Ha",
      "The ascending head stroke and bowl are identical",
      "Place a single dot above the head stroke",
      "The dot sits centered above the highest point",
      "In Thuluth, the dot may have a slight decorative tail"
    ],
    proportionTip: "The dot sits approximately 1.5 dot-widths above the peak of the head stroke.",
    difficulty: 3,
    practiceOrder: 7
  },
  {
    id: "dal",
    letter: "د",
    name: "Dal (د)",
    nameAr: "دال",
    transliteration: "d",
    group: 3,
    forms: {
      isolated: "د",
      initial: "د",
      medial: "ـد",
      final: "ـد"
    },
    strokeCount: 1,
    description: "A compact letter that doesn't connect to the following letter. In Thuluth, it features a distinctive angular head with a short curved body.",
    strokeGuide: [
      "Start with a triangular head above the baseline",
      "The head has a sharp angle at the top right",
      "Draw a short curved stroke descending to the left",
      "The stroke gently curves at the baseline",
      "End with a subtle exit stroke"
    ],
    proportionTip: "Dal is one of the shorter letters — about 3 dots in height and 2 dots in width.",
    difficulty: 2,
    practiceOrder: 8
  },
  {
    id: "dhal",
    letter: "ذ",
    name: "Dhal (ذ)",
    nameAr: "ذال",
    transliteration: "dh",
    group: 3,
    forms: {
      isolated: "ذ",
      initial: "ذ",
      medial: "ـذ",
      final: "ـذ"
    },
    strokeCount: 2,
    description: "Same as Dal with a dot above. The dot placement is key to distinguishing it from Dal in Thuluth calligraphy.",
    strokeGuide: [
      "Draw the same body as Dal",
      "The triangular head and curved body are identical",
      "Place a single dot above the head",
      "Position the dot slightly to the right of center",
      "The dot should be clearly visible above the letterform"
    ],
    proportionTip: "The dot sits about 1 dot-width above the peak of Dal's head.",
    difficulty: 2,
    practiceOrder: 9
  },
  {
    id: "ra",
    letter: "ر",
    name: "Ra (ر)",
    nameAr: "راء",
    transliteration: "r",
    group: 3,
    forms: {
      isolated: "ر",
      initial: "ر",
      medial: "ـر",
      final: "ـر"
    },
    strokeCount: 1,
    description: "A simple descending curve that drops below the baseline. In Thuluth, Ra has a distinctive thick-to-thin transition.",
    strokeGuide: [
      "Start at the baseline with a thick entry point",
      "Curve downward and slightly to the right",
      "The stroke descends about 3 dots below baseline",
      "Gradually thin the stroke as you descend",
      "End with a sharp, pointed tail curving right"
    ],
    proportionTip: "The descent below baseline is about 3 dots. The overall width is minimal — about 1.5 dots.",
    difficulty: 1,
    practiceOrder: 10
  },
  {
    id: "zay",
    letter: "ز",
    name: "Zay (ز)",
    nameAr: "زاي",
    transliteration: "z",
    group: 3,
    forms: {
      isolated: "ز",
      initial: "ز",
      medial: "ـز",
      final: "ـز"
    },
    strokeCount: 2,
    description: "Same form as Ra with a dot above. Distinguished by its simple elegance in the Thuluth style.",
    strokeGuide: [
      "Draw the same descending curve as Ra",
      "Maintain the thick-to-thin transition",
      "Place a single dot above the top of the stroke",
      "The dot is centered above the entry point",
      "Keep the dot crisp and defined"
    ],
    proportionTip: "Same proportions as Ra. The dot sits directly above the starting point.",
    difficulty: 1,
    practiceOrder: 11
  },
  {
    id: "sin",
    letter: "س",
    name: "Seen (س)",
    nameAr: "سين",
    transliteration: "s",
    group: 4,
    forms: {
      isolated: "س",
      initial: "سـ",
      medial: "ـسـ",
      final: "ـس"
    },
    strokeCount: 1,
    description: "Features three teeth above the baseline followed by a sweeping tail. In Thuluth, the teeth are elegantly pointed and the tail is dramatically curved.",
    strokeGuide: [
      "Begin with three small, evenly-spaced teeth (peaks)",
      "Each tooth rises slightly above the baseline",
      "After the third tooth, sweep into a deep curve below baseline",
      "The tail extends left and curves upward",
      "Maintain rhythm — teeth should be evenly spaced"
    ],
    proportionTip: "Each tooth is about 1 dot high. The tail descends 3-4 dots below baseline and extends about 3 dots to the left.",
    difficulty: 3,
    practiceOrder: 12
  },
  {
    id: "shin",
    letter: "ش",
    name: "Sheen (ش)",
    nameAr: "شين",
    transliteration: "sh",
    group: 4,
    forms: {
      isolated: "ش",
      initial: "شـ",
      medial: "ـشـ",
      final: "ـش"
    },
    strokeCount: 2,
    description: "Same body as Sin with three dots above arranged in a triangular pattern. The combination of teeth and dots creates a distinctive crown effect in Thuluth.",
    strokeGuide: [
      "Draw the same three-tooth body as Sin",
      "The sweeping tail is identical",
      "Place three dots above in a triangular arrangement",
      "Two dots at the base, one centered above",
      "Dots should sit above the middle tooth area"
    ],
    proportionTip: "The dots triangle sits centered above the three teeth, about 1.5 dots above the peaks.",
    difficulty: 3,
    practiceOrder: 13
  },
  {
    id: "sad",
    letter: "ص",
    name: "Saad (ص)",
    nameAr: "صاد",
    transliteration: "ṣ",
    group: 4,
    forms: {
      isolated: "ص",
      initial: "صـ",
      medial: "ـصـ",
      final: "ـص"
    },
    strokeCount: 1,
    description: "A wide letter with a distinctive enclosed loop and a sweeping tail. In Thuluth, the loop is generous and perfectly formed.",
    strokeGuide: [
      "Start with a small tooth at the right",
      "Create a wide, enclosed oval loop",
      "The loop sits on the baseline",
      "After closing the loop, sweep into a deep tail below baseline",
      "The tail curves left and gently rises"
    ],
    proportionTip: "The loop is about 3 dots wide and 2 dots tall. The tail descends about 4 dots below baseline.",
    difficulty: 4,
    practiceOrder: 14
  },
  {
    id: "dad",
    letter: "ض",
    name: "Daad (ض)",
    nameAr: "ضاد",
    transliteration: "ḍ",
    group: 4,
    forms: {
      isolated: "ض",
      initial: "ضـ",
      medial: "ـضـ",
      final: "ـض"
    },
    strokeCount: 2,
    description: "Same body as Sad with a dot above. Known as 'the Arabic letter' — Arabic is sometimes called 'the language of the Dad'.",
    strokeGuide: [
      "Draw the same body as Sad — tooth, loop, and tail",
      "The enclosed loop and sweeping tail are identical",
      "Place a single dot above the loop",
      "The dot sits centered above the oval",
      "This letter is unique to Arabic — master it with pride"
    ],
    proportionTip: "Same proportions as Sad. The dot sits about 1.5 dots above the top of the loop.",
    difficulty: 4,
    practiceOrder: 15
  },
  {
    id: "tah",
    letter: "ط",
    name: "Tah (ط)",
    nameAr: "طاء",
    transliteration: "ṭ",
    group: 5,
    forms: {
      isolated: "ط",
      initial: "طـ",
      medial: "ـطـ",
      final: "ـط"
    },
    strokeCount: 2,
    description: "Features a tall vertical stroke rising from an oval base. In Thuluth, the vertical element is stately and the base is smoothly curved.",
    strokeGuide: [
      "Start with the oval base on the baseline",
      "The base is similar to Sad's loop but more compact",
      "From the right side, draw a tall vertical stroke upward",
      "The vertical should be about 5 dots tall",
      "The vertical has a subtle serif at the top"
    ],
    proportionTip: "The vertical rises about 5 dots above the baseline. The base is about 2.5 dots wide.",
    difficulty: 3,
    practiceOrder: 16
  },
  {
    id: "dhah",
    letter: "ظ",
    name: "Dhah (ظ)",
    nameAr: "ظاء",
    transliteration: "ẓ",
    group: 5,
    forms: {
      isolated: "ظ",
      initial: "ظـ",
      medial: "ـظـ",
      final: "ـظ"
    },
    strokeCount: 3,
    description: "Same as Tah with a dot above. The dot in Thuluth is placed precisely above the vertical stroke.",
    strokeGuide: [
      "Draw the same base and vertical as Tah",
      "The oval base and tall stroke are identical",
      "Place a single dot above the vertical stroke",
      "The dot sits near the top of the vertical",
      "Ensure clear space between dot and stroke tip"
    ],
    proportionTip: "Same as Tah. The dot is placed about 1 dot-width above the top of the vertical.",
    difficulty: 3,
    practiceOrder: 17
  },
  {
    id: "ain",
    letter: "ع",
    name: "Aeen (ع)",
    nameAr: "عين",
    transliteration: "ʿ",
    group: 5,
    forms: {
      isolated: "ع",
      initial: "عـ",
      medial: "ـعـ",
      final: "ـع"
    },
    strokeCount: 1,
    description: "A distinctive letter with no equivalent in European languages. In Thuluth, Ain features an elegant open head and a deep descending bowl.",
    strokeGuide: [
      "Start with an open, C-shaped head above the baseline",
      "The head opening faces right",
      "Transition into a curved stroke descending below baseline",
      "Create a deep bowl that curves left",
      "The tail sweeps upward to the left"
    ],
    proportionTip: "The head is about 2 dots high. The bowl descends about 4 dots below baseline.",
    difficulty: 4,
    practiceOrder: 18
  },
  {
    id: "ghain",
    letter: "غ",
    name: "Ghaeen (غ)",
    nameAr: "غين",
    transliteration: "gh",
    group: 5,
    forms: {
      isolated: "غ",
      initial: "غـ",
      medial: "ـغـ",
      final: "ـغ"
    },
    strokeCount: 2,
    description: "Same form as Ain with a dot above. The deep guttural sound it represents is distinctly Arabic.",
    strokeGuide: [
      "Draw the same body as Ain",
      "The C-shaped head and descending bowl are identical",
      "Place a single dot above the head",
      "The dot sits above the opening of the C-shape",
      "Keep the dot balanced above the letter's center"
    ],
    proportionTip: "Same proportions as Ain. The dot hovers above the C-shaped head opening.",
    difficulty: 4,
    practiceOrder: 19
  },
  {
    id: "fa",
    letter: "ف",
    name: "Fa (ف)",
    nameAr: "فاء",
    transliteration: "f",
    group: 6,
    forms: {
      isolated: "ف",
      initial: "فـ",
      medial: "ـفـ",
      final: "ـف"
    },
    strokeCount: 2,
    description: "Features a small rounded head with a single dot above, connected to a sweeping tail. In Thuluth, the head is perfectly circular.",
    strokeGuide: [
      "Draw a small, circular head sitting on the baseline",
      "The circle should be about 1.5 dots in diameter",
      "From the left of the circle, extend a sweeping tail",
      "The tail descends below baseline and curves left",
      "Place a single dot above the circular head"
    ],
    proportionTip: "The head circle is about 1.5 dots. The tail descends about 3 dots below baseline.",
    difficulty: 2,
    practiceOrder: 20
  },
  {
    id: "qaf",
    letter: "ق",
    name: "Qaaf (ق)",
    nameAr: "قاف",
    transliteration: "q",
    group: 6,
    forms: {
      isolated: "ق",
      initial: "قـ",
      medial: "ـقـ",
      final: "ـق"
    },
    strokeCount: 2,
    description: "Similar to Fa but with two dots above and a deeper bowl. In Thuluth, the distinction between Fa and Qaf is elegantly emphasized.",
    strokeGuide: [
      "Draw a slightly larger circular head than Fa",
      "The head is more open, like a small cup",
      "The tail descends deeper below baseline",
      "The tail curves are more dramatic than Fa",
      "Place two dots above the head, side by side"
    ],
    proportionTip: "The head is about 2 dots wide. The tail descends about 4 dots below baseline.",
    difficulty: 3,
    practiceOrder: 21
  },
  {
    id: "kaf",
    letter: "ك",
    name: "Kaaf (ك)",
    nameAr: "كاف",
    transliteration: "k",
    group: 6,
    forms: {
      isolated: "ك",
      initial: "كـ",
      medial: "ـكـ",
      final: "ـك"
    },
    strokeCount: 2,
    description: "A tall letter with a distinctive inner hamza mark. In Thuluth, Kaf is one of the most impressive letters with its sweeping vertical.",
    strokeGuide: [
      "Start with a horizontal base stroke on the baseline",
      "Rise into a tall vertical stroke on the right side",
      "The vertical is about 5-6 dots tall",
      "Add a small hamza-like mark inside the letter",
      "The base extends to the left with a gentle curve"
    ],
    proportionTip: "The vertical rises about 6 dots. The base extends about 3 dots to the left.",
    difficulty: 4,
    practiceOrder: 22
  },
  {
    id: "lam",
    letter: "ل",
    name: "Lam (ل)",
    nameAr: "لام",
    transliteration: "l",
    group: 7,
    forms: {
      isolated: "ل",
      initial: "لـ",
      medial: "ـلـ",
      final: "ـل"
    },
    strokeCount: 1,
    description: "A tall, elegant vertical with a curved base. In Thuluth, Lam is one of the tallest letters and anchors many beautiful compositions.",
    strokeGuide: [
      "Start at the top with a serif entry stroke",
      "Draw a tall, straight vertical line downward",
      "The height is about 7 dots (same as Alif)",
      "At the baseline, curve gently to the left",
      "The base curve is smooth and controlled"
    ],
    proportionTip: "Same height as Alif — 7 dots. The base curve extends about 1.5 dots to the left.",
    difficulty: 2,
    practiceOrder: 23
  },
  {
    id: "mim",
    letter: "م",
    name: "Meem (م)",
    nameAr: "ميم",
    transliteration: "m",
    group: 7,
    forms: {
      isolated: "م",
      initial: "مـ",
      medial: "ـمـ",
      final: "ـم"
    },
    strokeCount: 1,
    description: "Features a distinctive circular head with a descending tail. In Thuluth, the Mim circle is perfectly round and precisely positioned.",
    strokeGuide: [
      "Draw a perfect small circle sitting on the baseline",
      "The circle is about 1.5-2 dots in diameter",
      "The circle should be cleanly closed",
      "From the bottom, extend a short tail below baseline",
      "The tail descends about 2 dots and curves slightly"
    ],
    proportionTip: "The circle is about 2 dots in diameter. The tail is short — about 2 dots below baseline.",
    difficulty: 2,
    practiceOrder: 24
  },
  {
    id: "nun",
    letter: "ن",
    name: "Noon (ن)",
    nameAr: "نون",
    transliteration: "n",
    group: 7,
    forms: {
      isolated: "ن",
      initial: "نـ",
      medial: "ـنـ",
      final: "ـن"
    },
    strokeCount: 2,
    description: "A curved, boat-shaped letter with a dot above. In Thuluth, Nun's curve is generous and its dot is placed with precision.",
    strokeGuide: [
      "Start with a small tooth at the right",
      "Sweep into a wide, shallow curve (like a boat)",
      "The curve dips slightly below the baseline",
      "The left end curves upward slightly",
      "Place a single dot above the center of the curve"
    ],
    proportionTip: "The curve spans about 4 dots wide. The depth below baseline is about 1.5 dots.",
    difficulty: 2,
    practiceOrder: 25
  },
  {
    id: "ha_big",
    letter: "ه",
    name: "Ha (ه)",
    nameAr: "هاء",
    transliteration: "h",
    group: 7,
    forms: {
      isolated: "ه",
      initial: "هـ",
      medial: "ـهـ",
      final: "ـه"
    },
    strokeCount: 1,
    description: "A circular, enclosed letter with multiple forms. In Thuluth, the isolated form resembles an elegant eye shape.",
    strokeGuide: [
      "In isolated form, draw an enclosed oval/eye shape",
      "Start from the top right, curve down and around",
      "Close the shape back at the starting point",
      "The shape sits centered on the baseline",
      "In Thuluth, the form is rounder and more decorative"
    ],
    proportionTip: "The isolated form is about 2 dots tall and 2 dots wide — a near-perfect circle.",
    difficulty: 3,
    practiceOrder: 26
  },
  {
    id: "waw",
    letter: "و",
    name: "Waw (و)",
    nameAr: "واو",
    transliteration: "w / ū",
    group: 8,
    forms: {
      isolated: "و",
      initial: "و",
      medial: "ـو",
      final: "ـو"
    },
    strokeCount: 1,
    description: "A circular head with a descending tail. In Thuluth, Waw's head is elegantly rounded and its tail gracefully descends.",
    strokeGuide: [
      "Draw a small circular head above the baseline",
      "The head is about 1.5 dots in diameter",
      "From the bottom of the circle, descend vertically",
      "The tail drops about 3 dots below baseline",
      "End with a gentle rightward curve at the tip"
    ],
    proportionTip: "Head circle is 1.5 dots. Tail descends about 3 dots below baseline.",
    difficulty: 2,
    practiceOrder: 27
  },
  {
    id: "ya",
    letter: "ي",
    name: "Ya (ي)",
    nameAr: "ياء",
    transliteration: "y / ī",
    group: 8,
    forms: {
      isolated: "ي",
      initial: "يـ",
      medial: "ـيـ",
      final: "ـي"
    },
    strokeCount: 2,
    description: "The last letter of the Arabic alphabet. In Thuluth, it features a distinctive return stroke and two dots below.",
    strokeGuide: [
      "Start with a small tooth above the baseline",
      "Sweep into a wide curve to the left",
      "The curve returns under the starting point",
      "Create a deep, sweeping bowl below baseline",
      "Place two dots below the bowl"
    ],
    proportionTip: "The bowl extends about 4 dots below baseline. The two dots sit below the deepest point of the curve.",
    difficulty: 3,
    practiceOrder: 28
  }
];

// Lesson structure
export const lessons = [
  {
    id: "intro",
    title: "Introduction to Arabic Calligraphy",
    description: "Learn the fundamentals of Arabic calligraphy and the Thuluth style",
    type: "theory",
    xpReward: 20,
    icon: "BookOpen",
    content: {
      sections: [
        {
          title: "What is Arabic Calligraphy?",
          text: "Arabic calligraphy (الخط العربي — al-khaṭṭ al-ʿarabī) is the artistic practice of handwriting the Arabic script. It is considered one of the highest art forms in Islamic culture, developed over 1,400 years into dozens of distinct styles."
        },
        {
          title: "The Thuluth Style",
          text: "Thuluth (الثلث) is one of the most majestic calligraphic styles. Its name means 'one-third,' referring to the proportion of curved to straight strokes. Developed in the 7th century and perfected during the Ottoman period, it is the calligrapher's ultimate test of skill."
        },
        {
          title: "Tools You'll Need",
          text: "Traditional Thuluth calligraphy uses a reed pen (qalam) cut at an angle, along with special calligraphy ink. In this app, we'll teach you the principles — the pen angle, proportions, and stroke order — that you can then apply with physical tools."
        },
        {
          title: "The Rhombic Dot System",
          text: "In Arabic calligraphy, proportions are measured using the 'rhombic dot' — a diamond shape created by pressing the pen nib flat on the paper. The Alif (ا) is the fundamental measuring unit: in Thuluth, it equals 7 stacked rhombic dots."
        }
      ]
    },
    order: 0
  },
  {
    id: "basic-strokes",
    title: "Basic Strokes & Pen Control",
    description: "Master the fundamental strokes used in Thuluth calligraphy",
    type: "theory",
    xpReward: 25,
    icon: "Pen",
    content: {
      sections: [
        {
          title: "Pen Angle",
          text: "Hold the pen at approximately 30° to the baseline. This angle creates the characteristic thick-thin variation that defines Thuluth. Vertical strokes appear thicker, while horizontal strokes are thinner."
        },
        {
          title: "Basic Vertical Stroke",
          text: "The vertical stroke is the foundation of letters like Alif (ا) and Lam (ل). Start from the top, draw downward with steady pressure, and end with a controlled serif. The stroke should be 7 rhombic dots tall."
        },
        {
          title: "Curved Strokes",
          text: "Thuluth is defined by its curves. Practice drawing smooth, consistent arcs. The key is to rotate the pen slightly as you curve, maintaining the thick-thin contrast throughout the stroke."
        },
        {
          title: "Dots & Diacritics",
          text: "Dots in Thuluth are rhombic (diamond-shaped), created by pressing the pen nib flat once. They should be consistent in size and precisely placed. Practice making clean, crisp dots."
        }
      ]
    },
    order: 1
  },
  {
    id: "group-1",
    title: "Group 1: Alif, Ba, Ta, Tha",
    description: "Learn the first family of letters sharing the same base form",
    type: "practice",
    xpReward: 30,
    icon: "Edit3",
    letters: ["alif", "ba", "ta", "tha"],
    order: 2
  },
  {
    id: "group-2",
    title: "Group 2: Jim, Ha, Kha",
    description: "Master the bowl-shaped letters with their deep curves",
    type: "practice",
    xpReward: 35,
    icon: "Edit3",
    letters: ["jim", "ha_small", "kha"],
    order: 3
  },
  {
    id: "group-3",
    title: "Group 3: Dal, Dhal, Ra, Zay",
    description: "Learn the non-connecting letters with elegant simplicity",
    type: "practice",
    xpReward: 30,
    icon: "Edit3",
    letters: ["dal", "dhal", "ra", "zay"],
    order: 4
  },
  {
    id: "group-4",
    title: "Group 4: Seen, Sheen, Saad, Daad",
    description: "Tackle the toothed and looped letters",
    type: "practice",
    xpReward: 40,
    icon: "Edit3",
    letters: ["sin", "shin", "sad", "dad"],
    order: 5
  },
  {
    id: "group-5",
    title: "Group 5: Tah, Dhah, Ain, Ghain",
    description: "Master letters with vertical ascenders and deep bowls",
    type: "practice",
    xpReward: 40,
    icon: "Edit3",
    letters: ["tah", "dhah", "ain", "ghain"],
    order: 6
  },
  {
    id: "group-6",
    title: "Group 6: Fa, Qaf, Kaf",
    description: "Learn the circular-headed letters and tall Kaf",
    type: "practice",
    xpReward: 35,
    icon: "Edit3",
    letters: ["fa", "qaf", "kaf"],
    order: 7
  },
  {
    id: "group-7",
    title: "Group 7: Lam, Meem, Noon, Ha",
    description: "Practice elegant verticals, circles, and curves",
    type: "practice",
    xpReward: 35,
    icon: "Edit3",
    letters: ["lam", "mim", "nun", "ha_big"],
    order: 8
  },
  {
    id: "group-8",
    title: "Group 8: Waw & Ya",
    description: "Complete the alphabet with the final two letters",
    type: "practice",
    xpReward: 30,
    icon: "Edit3",
    letters: ["waw", "ya"],
    order: 9
  }
];

// XP thresholds for levels
export const levelThresholds = [
  0, 50, 120, 220, 350, 520, 730, 1000, 1350, 1800, 2400
];

export function getLevelFromXP(xp) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (xp >= levelThresholds[i]) return i + 1;
  }
  return 1;
}

export function getXPForNextLevel(xp) {
  const level = getLevelFromXP(xp);
  if (level >= levelThresholds.length) return { current: xp, needed: xp, progress: 100 };
  const currentThreshold = levelThresholds[level - 1];
  const nextThreshold = levelThresholds[level] || currentThreshold + 500;
  return {
    current: xp - currentThreshold,
    needed: nextThreshold - currentThreshold,
    progress: Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100)
  };
}

export const levelTitles = [
  "Novice Scribe",
  "Apprentice",
  "Student",
  "Practitioner",
  "Artisan",
  "Skilled Calligrapher",
  "Master Scribe",
  "Grand Calligrapher",
  "Khattāt",
  "Master Khattāt",
  "Legendary Khattāt"
];