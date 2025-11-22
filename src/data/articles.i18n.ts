import type { Lang } from '../i18n/I18nContext';

export type LocalizedArticleFields = {
  section?: string;
  title?: string;
  content?: string[];
  questions?: { q: string; options: string[] }[];
};

// Per-article localized overrides. Any missing field falls back to the base ARTICLES data.
export const ARTICLES_I18N: Record<string, Partial<Record<Lang, LocalizedArticleFields>>> = {
  basics: {
    en: {
      section: 'Financial Basics',
      title: 'Financial Basics: Budget, Savings and Investing',
      content: [
        'Financial literacy is the foundation of a stable and confident life. Managing money helps avoid debt, build an emergency fund, and steadily grow capital. The three pillars of personal finance are budgeting, saving, and investing.',
        'A budget is a plan for income and expenses. It helps control money and avoid impulsive purchases. The 50/30/20 rule is common: 50% needs, 30% wants, 20% savings/investments.',
        'Savings create a safety net for unforeseen events and future goals. Aim for 3–6 months of expenses and save 10–20% of income monthly.',
        'Investments make money work for you and protect against inflation. Start small, diversify, and focus on the long term (3–5+ years).',
      ],
      questions: [
        {
          q: 'How are expenses split by the 50/30/20 rule?',
          options: [
            '50% savings, 30% needs, 20% wants',
            '50% needs, 30% wants, 20% savings/investments',
            '30% needs, 50% wants, 20% savings',
          ],
        },
        {
          q: 'What is the recommended size of an emergency fund?',
          options: ['1–2 months of expenses', '3–6 months of expenses', '12 months of expenses'],
        },
        {
          q: 'What percentage of income is effective to save monthly?',
          options: ['1–5%', '10–20%', '25–40%'],
        },
        {
          q: 'Which of the following is NOT an investment instrument?',
          options: ['Stocks and bonds', 'Savings account', 'Funds (ETF/Mutual funds)'],
        },
        {
          q: 'What investment horizon is recommended in the article?',
          options: ['Up to 1 year', '1–2 years', '3–5 years or more'],
        },
      ],
    },
    ky: {
      section: 'Каржынын негиздери',
      title: 'Каржынын негиздери: бюджет, сактык жана инвестициялар',
      content: [
        'Каржылык сабаттуулук — туруктуу жана ишенимдүү жашоонун негизи. Акчаны туура башкаруу карыздардан качууга, “коопсуздук жаздыгын” түзүүгө жана капиталды көбөйтүүгө жардам берет. Үч негизги элемент — бюджет, сактык жана инвестициялар.',
        'Бюджет — киреше/чыгаша планы. 50/30/20 эрежеси кеңири: 50% — милдеттүү чыгымдар, 30% — каалоолор, 20% — сактык/инвестициялар.',
        'Сактык — күтүлбөгөн жагдайлар жана максаттар үчүн. 3–6 айлык чыгымга жетчү “жаздык”, ай сайын 10–20% сактоо максатка ылайык.',
        'Инвестициялар — акчаны иштетүү ыкмасы. Кичине баштаңыз, диверсификациялаңыз, узак мөөнөткө (3–5+ жыл) караңыз.',
      ],
      questions: [
        {
          q: '50/30/20 эрежеси боюнча чыгымдар кантип бөлүштүрүлөт?',
          options: [
            '50% — сактык, 30% — милдеттүү чыгымдар, 20% — каалоолор',
            '50% — милдеттүү чыгымдар, 30% — каалоолор, 20% — сактык/инвестициялар',
            '30% — милдеттүү чыгымдар, 50% — каалоолор, 20% — сактык',
          ],
        },
        {
          q: 'Коопсуздук “жаздыгынын” сунушталган көлөмү?',
          options: ['1–2 айлык чыгым', '3–6 айлык чыгым', '12 айлык чыгым'],
        },
        {
          q: 'Айына кирешенин канча пайызын сактоо натыйжалуу?',
          options: ['1–5%', '10–20%', '25–40%'],
        },
        {
          q: 'Төмөнкүлөрдүн кайсынысы инвестиция куралы ЭМЕС?',
          options: ['Акциялар жана облигациялар', 'Накопительный эсеп', 'Фонддор (ETF/ПИФ)'],
        },
        {
          q: 'Макалада кайсы инвестиция горизонту сунушталат?',
          options: ['1 жылга чейин', '1–2 жыл', '3–5 жыл жана андан көп'],
        },
      ],
    },
  },

  'credits-debt': {
    en: {
      section: 'Credits and Debt',
      title: 'How to Use Credit and Manage Debt Wisely',
      questions: [
        {
          q: 'What level of debt load is considered optimal?',
          options: ['Up to 30% of monthly income', 'Up to 50% of income', 'At least 10% of income'],
        },
        {
          q: 'What helps reduce total interest paid on a loan?',
          options: ['Maximum term', 'Minimum term and early repayments', 'No emergency fund'],
        },
        {
          q: 'When should you take a loan?',
          options: ['To boost status', 'Only when necessary after comparing offers', 'When the bank promotes it'],
        },
        {
          q: 'What to do if you struggle with payments?',
          options: ['Ignore payments', 'Take new loans', 'Ask the bank for restructuring'],
        },
        {
          q: 'What reserve is recommended before taking on credit obligations?',
          options: ['1 month cushion', '3–6 months cushion', 'No reserve needed'],
        },
      ],
    },
    ky: {
      section: 'Кредиттер жана карыздар',
      title: 'Кредитти туура колдонуу жана карызды башкаруу',
      questions: [
        {
          q: 'Кандай деңгээлдеги карыз жүгү оптималдуу?',
          options: ['Айлык кирешенин 30% чейин', 'Кирешенин 50% чейин', 'Кеминде 10%'],
        },
        {
          q: 'Кантип кредит боюнча ашыкча төлөмдү азайтууга болот?',
          options: ['Максималдуу мөөнөт', 'Минималдуу мөөнөт жана мөөнөтүнөн мурда төлөө', 'Коопсуздук жаздыгы жок'],
        },
        {
          q: 'Качан кредит алууга болот?',
          options: ['Статус үчүн', 'Зарыл болгондо жана сунуштарды салыштырып', 'Банк сунуштаганда'],
        },
        {
          q: 'Төлөмдөр кыйын болсо эмне кылуу керек?',
          options: ['Төлөмдөрдү этибарга албоо', 'Жаңы кредит алуу', 'Банкка реструктуризация үчүн кайрылуу'],
        },
        {
          q: 'Кредиттерге чейин кайсы резерв сунушталат?',
          options: ['1 айлык жаздык', '3–6 айлык жаздык', 'Резерв кереги жок'],
        },
      ],
    },
  },

  'funds-market-instruments': {
    en: {
      section: 'Market and Investments',
      title: 'Funds, Market and Financial Instruments',
      questions: [
        {
          q: 'Which description is correct for an ETF?',
          options: [
            'Credit product with a fixed coupon',
            'An exchange-traded fund that tracks an index/sector',
            'Insurance product with guaranteed yield',
          ],
        },
        {
          q: 'What does diversification do?',
          options: ['Increases risk', 'Reduces risk', 'Does not affect risk'],
        },
        {
          q: 'Which segments are part of financial markets?',
          options: [
            'Stocks, bonds, currency, commodities, derivatives',
            'Only stocks and bonds',
            'Only currency market',
          ],
        },
        {
          q: 'What is typical for bonds?',
          options: ['Company ownership', 'Fixed income (coupon/interest)', 'Guaranteed profit'],
        },
        {
          q: 'Why are funds convenient for beginners?',
          options: [
            'High entry thresholds',
            'Require deep analysis of each company',
            'Accessible, simple, and provide diversification',
          ],
        },
      ],
    },
    ky: {
      section: 'Базар жана инвестициялар',
      title: 'Фонддор, базар жана каржы куралдары',
      questions: [
        {
          q: 'ETF үчүн туура аныктама кайсы?',
          options: [
            'Фиксирленген купону бар кредиттик продукт',
            'Индекс/секторду кайталаган, биржада соодаланган фонд',
            'Кепилденген кирешеси бар камсыздандыруу продукты',
          ],
        },
        {
          q: 'Диверсификация эмне берет?',
          options: ['Риск артат', 'Риск азаят', 'Риске таасир бербейт'],
        },
        {
          q: 'Каржы базарынын кайсы сегменттери бар?',
          options: [
            'Акциялар, облигациялар, валюта, товарлар, деривативдер',
            'Жөн гана акциялар жана облигациялар',
            'Жөн гана валюта базары',
          ],
        },
        {
          q: 'Облигациялардын өзгөчөлүгү кандай?',
          options: ['Компаниядагы үлүш', 'Фиксирленген киреше (купон/пайыз)', 'Кепилденген пайда'],
        },
        {
          q: 'Эмне үчүн фонддор жаңы баштагандарга ыңгайлуу?',
          options: [
            'Кирүү босогосу жогору',
            'Ар бир компанияны терең талдоону талап кылат',
            'Жеткиликтүү, жөнөкөй жана диверсификация берет',
          ],
        },
      ],
    },
  },

  'bank-products': {
    en: {
      section: 'Banking products',
      title: 'Deposits, Cards and Payments',
      questions: [
        {
          q: 'What is the main purpose of a bank deposit?',
          options: ['To earn interest income', 'To take a loan', 'To increase debt'],
        },
        {
          q: 'How do debit and credit cards differ?',
          options: [
            'Debit uses own funds, credit uses bank funds',
            'Both use bank funds',
            'Both are cash only',
          ],
        },
        {
          q: 'What do payment services do?',
          options: ['Slow down settlements', 'Speed up, simplify and increase safety', 'Provide only loans'],
        },
        {
          q: 'What advantages do banking apps provide?',
          options: ['No expense control', 'Cashback, bonuses and expense tracking', 'Only cash withdrawal'],
        },
        {
          q: 'What types of deposits exist?',
          options: ['Only on-demand', 'Only savings', 'Term, on-demand, savings, foreign currency'],
        },
      ],
    },
    ky: {
      section: 'Банкттык продуктылар',
      title: 'Депозиттер, карталар жана төлөмдөр',
      questions: [
        {
          q: 'Банктык депозиттин негизги максаты эмнеде?',
          options: ['Пайыз түрүндө киреше алуу', 'Кредит алуу', 'Карызды көбөйтүү'],
        },
        {
          q: 'Дебеттик жана кредиттик карталардын айырмасы?',
          options: [
            'Дебеттик — өз каражат, кредиттик — банктын каражаты',
            'Экөө тең банктын каражаты',
            'Экөө тең накталай гана',
          ],
        },
        {
          q: 'Төлөм сервистери эмне кылат?',
          options: ['Эсептешүүнү жайлатат', 'Ылдамдатып, жөнөкөйлөтүп, коопсуздукту жогорулатат', 'Жөн гана кредит берет'],
        },
        {
          q: 'Банк тиркемелеринин артыкчылыктары?',
          options: ['Чыгымдарга көзөмөл жок', 'Кэшбэк, бонус жана чыгымдарды көзөмөл', 'Жөн гана акча алуу'],
        },
        {
          q: 'Депозиттердин кандай түрлөрү бар?',
          options: ['Жөн гана талап боюнча', 'Жөн гана топтоочу', 'Мөөнөттүү, талап боюнча, топтоочу, валюта'],
        },
      ],
    },
  },

  'financial-psychology': {
    en: {
      section: 'Psychology and Finance',
      title: 'Psychology of Financial Behavior',
      questions: [
        {
          q: 'What is a cognitive bias in personal finance?',
          options: [
            'Overvaluing short-term gains and undervaluing long-term outcomes',
            'Absolute rationality',
            'No impact of emotions',
          ],
        },
        {
          q: 'Which emotions can hinder rational investing?',
          options: ['Loss aversion and overconfidence', 'Boredom and joy', 'Euphoria and indifference'],
        },
        {
          q: 'What helps reduce the influence of psychology?',
          options: ['Ignoring budget', 'Financial literacy and awareness', 'Impulse buying'],
        },
        {
          q: 'How does social environment influence finance?',
          options: [
            'No influence',
            'Shapes consumption norms and expectations of success',
            'Defines only credit score',
          ],
        },
        {
          q: 'What is financial success linked to, according to research?',
          options: ['Only to income', 'Emotional intelligence and self-control', 'Number of loans'],
        },
      ],
    },
    ky: {
      section: 'Психология жана финансы',
      title: 'Каржылык жүрүм-турумдун психологиясы',
      questions: [
        {
          q: 'Жеке финанстардагы когнитивдик жаңылыштык эмне?',
          options: [
            'Кыска мөөнөттүү пайдага ашыкча маани берүү, узак мөөнөттү баалабоо',
            'Абсолюттук рационалдуулук',
            'Эмоциялар таасир бербейт',
          ],
        },
        {
          q: 'Кайсы эмоциялар акылга сыярлык инвестицияга тоскоол болот?',
          options: ['Жоготуудан коркуу жана ашыкча ишеним', 'Скука жана кубаныч', 'Эйфория жана кайдыгерлик'],
        },
        {
          q: 'Психологиялык факторлордун таасирин эмне азайтат?',
          options: ['Бюджетти көз жаздымда калтыруу', 'Каржылык сабаттуулук жана аң-сезимдүүлүк', 'Импульсивдүү сатып алуулар'],
        },
        {
          q: 'Социалдык чөйрө финанстарга кантип таасир этет?',
          options: [
            'Таасир этпейт',
            'Керектөө нормаларын жана ийгилик күтүүсүн калыптандырат',
            'Жөн гана кредит рейтингин аныктайт',
          ],
        },
        {
          q: 'Изилдөөлөргө ылайык, каржылык ийгилик эмнеге байланыштуу?',
          options: ['Жалаң кирешеге', 'Эмоционалдык интеллект жана өзүн-өзү көзөмөлдөө', 'Кредиттердин санына'],
        },
      ],
    },
  },

  'digital-financial-literacy': {
    en: {
      section: 'Digital Finance',
      title: 'Financial Literacy in the Digital Era',
      questions: [
        {
          q: 'Which risks increased in the digital era?',
          options: ['Only inflation', 'Fraud and impulsive spending', 'Only currency risks'],
        },
        {
          q: 'Which digital tools should you master?',
          options: [
            'Online banking, investing apps, crypto wallets',
            'Only cash and paper checks',
            'Only bank terminals',
          ],
        },
        {
          q: 'Why is discipline important for online shopping and easy credit?',
          options: [
            'To increase debt',
            'To avoid overspending and debt burden',
            'To raise bank fees',
          ],
        },
        {
          q: 'Is high return always without risk?',
          options: ['Yes', 'No, high returns come with risk', 'Depends on the bank'],
        },
        {
          q: 'What helps make informed decisions?',
          options: [
            'Real-time data analysis and critical thinking',
            'Impulse decisions',
            'Advice from social networks without verification',
          ],
        },
      ],
    },
    ky: {
      section: 'Санариптик финансы',
      title: 'Санарип доорундагы каржылык сабаттуулук',
      questions: [
        {
          q: 'Санарип доорунда кайсы тобокелдиктер күчөдү?',
          options: ['Жөн гана инфляция', 'Алдамчылык жана импульсивдүү чыгымдар', 'Жөн гана валюта рисктери'],
        },
        {
          q: 'Кайсы санарип куралдарын колдонгонду билиш керек?',
          options: [
            'Онлайн-банкинг, инвестиция тиркемелери, крипто капчыктар',
            'Жөн гана накталай жана кагаз чек',
            'Жөн гана банктын терминалдары',
          ],
        },
        {
          q: 'Эмне үчүн онлайн-сатып алууларда жана кредиттин жеткиликтүүлүгүндө тартип керек?',
          options: [
            'Карызды көбөйтүү үчүн',
            'Артыкча чыгымдар жана карыз жүгүн болтурбоо үчүн',
            'Банк комиссиясын көбөйтүү үчүн',
          ],
        },
        {
          q: 'Жогорку киреше дайыма эле рисксизби?',
          options: ['Ооба', 'Жок, жогорку киреше рисктер менен коштолот', 'Банкка жараша'],
        },
        {
          q: 'Негиздүү чечим кабыл алууга эмне жардам берет?',
          options: [
            'Реалдуу убакыттагы маалыматтарды талдоо жана сыни ой жүгүртүү',
            'Импульсивдүү чечимдер',
            'Текшерилбеген соцтармак кеңештери',
          ],
        },
      ],
    },
  },

  'financial-security': {
    en: {
      section: 'Security',
      title: 'Financial Security and Fraud Protection',
      questions: [
        {
          q: 'Which measure increases account security?',
          options: ['Simple password', 'Reusing passwords', 'Two-factor authentication'],
        },
        {
          q: 'What should be avoided when sharing data?',
          options: [
            'Sharing confidential data via phone/email',
            'Using official channels',
            'Encrypting the connection',
          ],
        },
        {
          q: 'Why avoid public Wi‑Fi for financial operations?',
          options: ['They may be insecure', 'They are always faster', 'They give cashback'],
        },
        {
          q: 'What helps detect fraud in time?',
          options: [
            'Rarely checking reports',
            'Regularly checking financial statements',
            'Ignoring notifications',
          ],
        },
        {
          q: 'What is the best strategy against fraud?',
          options: ['Negligence', 'Education and attentiveness', 'Trust all offers'],
        },
      ],
    },
    ky: {
      section: 'Коопсуздук',
      title: 'Каржылык коопсуздук жана алдамчылыктан коргонуу',
      questions: [
        {
          q: 'Кайсы чара аккаунттун коопсуздугун жогорулатат?',
          options: ['Жөнөкөй сырсөз', 'Сырсөздөрдү кайталоо', 'Эки факторлуу аутентификация'],
        },
        {
          q: 'Маалыматты өткөрүүдө эмнеден сактануу керек?',
          options: [
            'Телефон/почта аркылуу купуя маалыматты берүү',
            'Расмий каналдарды колдонуу',
            'Шифрленген байланышты колдонуу',
          ],
        },
        {
          q: 'Эмне үчүн финоперациялар үчүн коомдук Wi‑Fiдан качуу керек?',
          options: ['Коопсуз эмес болушу мүмкүн', 'Ар дайым тезирээк', 'Кэшбэк берет'],
        },
        {
          q: 'Алдамчылыкты өз убагында байкоого эмне жардам берет?',
          options: [
            'Отчетторду сейрек текшерүү',
            'Финансы отчетторун үзгүлтүксүз текшерүү',
            'Билдирүүлөрдү этибарга албоо',
          ],
        },
        {
          q: 'Алдамчылыктан эң жакшы коргонуу ыкмасы?',
          options: ['Кайдыгерлик', 'Билим жана дыкаттык', 'Ар бир сунушту ишеним менен кабыл алуу'],
        },
      ],
    },
  },

  'corporate-finance-risk': {
    en: {
      section: 'Corporate Finance',
      title: 'Corporate Finance and Risk Management',
      questions: [
        {
          q: 'Main goal of corporate finance?',
          options: [
            'Reduce headcount',
            'Maximize company value for shareholders with controlled risks',
            'Increase debt load',
          ],
        },
        {
          q: 'Which types of risks are considered in companies?',
          options: [
            'Only market risks',
            'Credit, market, operational and legal',
            'Only credit risks',
          ],
        },
        {
          q: 'Which method helps reduce risks?',
          options: ['Ignoring threats', 'Diversification and hedging', 'Increasing debts'],
        },
        {
          q: 'Why is liquidity management important?',
          options: [
            'So obligations are not met',
            'So company can meet obligations on time',
            'To increase expenses',
          ],
        },
        {
          q: 'What does combining planning and risk management lead to?',
          options: [
            'Lower competitiveness',
            'Higher competitiveness and resilience',
            'No change',
          ],
        },
      ],
    },
    ky: {
      section: 'Корпоративдик финансы',
      title: 'Корпоративдик финансы жана риск-менеджмент',
      questions: [
        {
          q: 'Корпоративдик финансылардын башкы максаты?',
          options: [
            'Кызматкерлерди кыскартуу',
            'Рискти контролдоо менен акционерлер үчүн компаниянын наркын максималдаштыруу',
            'Карыз жүгүн көбөйтүү',
          ],
        },
        {
          q: 'Компанияларда кайсы рисктер эске алынат?',
          options: [
            'Жөн гана рыноктук',
            'Кредиттик, рыноктук, операциялык жана юридикалык',
            'Жөн гана кредиттик',
          ],
        },
        {
          q: 'Рисктерди азайтууга кайсы ыкма жардам берет?',
          options: ['Коркунучтарды этибарга албоо', 'Диверсификация жана хеджирлөө', 'Карызды көбөйтүү'],
        },
        {
          q: 'Ликвиддүүлүктү башкаруу эмне үчүн маанилүү?',
          options: [
            'Милдеттемелер аткарылбай калышы үчүн',
            'Компания милдеттемелерди өз убагында аткаруу үчүн',
            'Чыгымдарды көбөйтүү үчүн',
          ],
        },
        {
          q: 'Пландоо менен риск-менеджменттин айкалышы эмне берет?',
          options: [
            'Атаандаштыкка жөндөмдүүлүктү төмөндөтөт',
            'Атаандаштыкка жөндөмдүүлүк жана туруктуулукту жогорулатат',
            'Өзгөрүү жок',
          ],
        },
      ],
    },
  },
};
