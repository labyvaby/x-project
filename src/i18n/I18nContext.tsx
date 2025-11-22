import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ru' | 'ky' | 'en';

type Dict = Record<string, Record<Lang, string>>;

const DICT: Dict = {
  'nav.home':        { ru: 'Главная', ky: 'Башкы бет', en: 'Home' },
  'nav.articles':    { ru: 'Статьи', ky: 'Макалалар', en: 'Articles' },
  'nav.achievements':{ ru: 'Достижения', ky: 'Жетишкендиктер', en: 'Achievements' },
  'nav.profile':     { ru: 'Профиль', ky: 'Профиль', en: 'Profile' },
  'nav.details':     { ru: 'Подробнее', ky: 'Кененирээк', en: 'Details' },

  'head.recommended':{ ru: 'Рекомендовано', ky: 'Сунушталат', en: 'Recommended' },
  'head.articles':   { ru: 'Статьи', ky: 'Макалалар', en: 'Articles' },
  'head.achievements':{ ru: 'Достижения', ky: 'Жетишкендиктер', en: 'Achievements' },
  'head.profile':    { ru: 'Профиль', ky: 'Профиль', en: 'Profile' },
  'head.details':    { ru: 'Подробнее', ky: 'Кененирээк', en: 'Details' },

  /* Details (Eldik Coins) */
  'details.main.title':      { ru: 'Как работают Eldik Coins', ky: 'Eldik Coins кантип иштейт', en: 'How Eldik Coins work' },
  'details.main.p1':         { ru: 'Для повышения мотивации и интереса к обучению в приложении Eldik SmartFinance используется специальная виртуальная валюта — Eldik Coins.', ky: 'Окууга кызыгууну жана мотивацияны жогорулатуу үчүн Eldik SmartFinance колдонмосунда атайын виртуалдык валюта — Eldik Coins колдонулат.', en: 'To boost motivation and interest in learning, Eldik SmartFinance uses a special virtual currency — Eldik Coins.' },

  'details.exchange.title':  { ru: '💰 Обмен', ky: '💰 Алмашуу', en: '💰 Exchange' },
  'details.exchange.rate':   { ru: '100 Eldik Coins = 5 сом.', ky: '100 Eldik Coins = 5 сом.', en: '100 Eldik Coins = 5 KGS' },

  'details.earn.title':          { ru: '🎯 Как получать Eldik Coins', ky: '🎯 Eldik Coins кантип алуу', en: '🎯 How to earn Eldik Coins' },
  'details.earn.app.title':      { ru: '1. В приложении (основной способ)', ky: '1. Колдонмодо (негизги ыкма)', en: '1. In the app (main way)' },
  'details.earn.app.b1':         { ru: 'Проходите уроки', ky: 'Сабактарды өтүңүз', en: 'Complete lessons' },
  'details.earn.app.b2':         { ru: 'Выполняйте задания', ky: 'Тапшырмаларды аткарыңыз', en: 'Do assignments' },
  'details.earn.app.b3':         { ru: 'Сдавайте тесты', ky: 'Тест тапшырыңыз', en: 'Pass quizzes' },
  'details.earn.app.b4':         { ru: 'Повышайте уровень', ky: 'Деңгээлиңизди жогорулатыңыз', en: 'Level up' },
  'details.earn.app.b5':         { ru: 'Получайте достижения', ky: 'Жетишкендиктерди алыңыз', en: 'Unlock achievements' },
  'details.earn.app.note':       { ru: 'За активность в приложении начисляются основные баллы, которые составляют большую часть вашего прогресса.', ky: 'Колдонмодогу активдүүлүк үчүн негизги баллдар берилет, алар прогресстин негизги бөлүгүн түзөт.', en: 'Most of your progress comes from in-app activity, which grants the main share of points.' },

  'details.earn.site.title':     { ru: '2. На сайте (дополнительные баллы каждую неделю)', ky: '2. Сайтта (ар жума кошумча балл)', en: '2. On the website (weekly bonus points)' },
  'details.earn.site.b1':        { ru: 'Читайте обучающие статьи по финансовой грамотности', ky: 'Каржылык сабаттуулук тууралуу макалаларды окуңуз', en: 'Read financial literacy articles' },
  'details.earn.site.b2':        { ru: 'Отвечайте на короткий тест из 3–5 вопросов', ky: '3–5 суроодон турган кыска тестке жооп бериңиз', en: 'Answer a short 3–5 question quiz' },
  'details.earn.site.b3':        { ru: 'Получайте дополнительные Eldik Coins за правильные ответы', ky: 'Туура жооп үчүн кошумча Eldik Coins алыңыз', en: 'Get bonus Eldik Coins for correct answers' },
  'details.earn.site.note':      { ru: 'Это позволяет расширить знания и заработать бонус, даже если вы не зашли в приложение.', ky: 'Бул билимди кеңейтүүгө жана бонус алууга жардам берет, колдонмого кирбесеңиз да.', en: 'This lets you learn more and earn a bonus even if you did not open the app.' },

  'details.spend.title':         { ru: '🛍 На что можно потратить Eldik Coins', ky: '🛍 Eldik Coins кайсы нерсеге сарптаса болот', en: '🛍 What you can spend Eldik Coins on' },
  'details.spend.b1':            { ru: 'Покупка новых уровней и тем', ky: 'Жаңы деңгээлдерди жана темаларды сатып алуу', en: 'Buying new levels and topics' },
  'details.spend.b2':            { ru: 'Разблокировка дополнительных уроков', ky: 'Кошумча сабактарды ачуу', en: 'Unlocking extra lessons' },
  'details.spend.b3':            { ru: 'Получение бонусов для ускоренного обучения', ky: 'Ылдам окутуу үчүн бонус алуу', en: 'Bonuses to speed up learning' },
  'details.spend.b4':            { ru: 'Открытие эксклюзивного контента', ky: 'Эксклюзивдүү контент ачуу', en: 'Exclusive content' },
  'details.spend.b5':            { ru: 'Покупка визуальных улучшений (иконки, стили, темы)', ky: 'Визуалдык жакшыртуулар (иконка, стиль, тема)', en: 'Visual upgrades (icons, styles, themes)' },

  'details.benefits.title':      { ru: '🟢 Зачем это нужно?', ky: '🟢 Эмне үчүн керек?', en: '🟢 Why this matters' },
  'details.benefits.b1':         { ru: 'Учиться финансовой грамотности с интересом', ky: 'Каржылык сабаттуулукту кызыгуу менен үйрөнүү', en: 'Learn financial literacy with interest' },
  'details.benefits.b2':         { ru: 'Поддерживать стабильную мотивацию', ky: 'Туруктуу мотивацияны сактоо', en: 'Maintain steady motivation' },
  'details.benefits.b3':         { ru: 'Создавать полезные привычки', ky: 'Пайдалуу адаттарды калыптандыруу', en: 'Build helpful habits' },
  'details.benefits.b4':         { ru: 'Получать награды за знания', ky: 'Билим үчүн сыйлык алуу', en: 'Earn rewards for knowledge' },

  'filters.all':     { ru: 'Все', ky: 'Баары', en: 'All' },
  'results.found':   { ru: 'Найдено', ky: 'Табылды', en: 'Found' },

  'search.placeholder': { ru: 'Поиск по названию или тексту...', ky: 'Аталыш же текст боюнча издөө...', en: 'Search by title or text...' },

  'status.unlocked': { ru: 'Открыто', ky: 'Ачылган', en: 'Unlocked' },
  'status.locked':   { ru: 'Заблокировано', ky: 'Жабык', en: 'Locked' },
  'ach.reward':      { ru: 'Награда', ky: 'Сыйлык', en: 'Reward' },
  'actions.more':    { ru: 'Подробнее', ky: 'Кененирээк', en: 'More' },
  'actions.close':   { ru: 'Закрыть', ky: 'Жабуу', en: 'Close' },
  'actions.readArticle': { ru: 'Прочитать статью', ky: 'Макаланы окуу', en: 'Read article' },

  'profile.heading': { ru: 'Профиль', ky: 'Профиль', en: 'Profile' },
  'profile.badges':  { ru: 'Бейджики', ky: 'Бейдждер', en: 'Badges' },
  'profile.upload':  { ru: 'Загрузить аватар', ky: 'Аватар жүктөө', en: 'Upload avatar' },
  'profile.reset':   { ru: 'Сбросить аватар', ky: 'Аватарды өчүрүү', en: 'Reset avatar' },
  'profile.logout':  { ru: 'Выйти из аккаунта', ky: 'Аккаунттан чыгуу', en: 'Log out' },

  'login.heading':   { ru: 'Вход в Eldik SmartFinance', ky: 'Eldik SmartFinance кирүү', en: 'Sign in to Eldik SmartFinance' },
  'login.email':     { ru: 'Email', ky: 'Email', en: 'Email' },
  'login.password':  { ru: 'Пароль', ky: 'Сырсөз', en: 'Password' },
  'login.email.placeholder': { ru: 'admin@gmail.com', ky: 'admin@gmail.com', en: 'admin@gmail.com' },
  'login.password.placeholder': { ru: 'admin', ky: 'admin', en: 'admin' },
  'login.submit':    { ru: 'Войти', ky: 'Кирүү', en: 'Sign in' },
  'login.loading':   { ru: 'Входим...', ky: 'Кирүүдө...', en: 'Signing in...' },
  'login.error':     { ru: 'Неверный email или пароль', ky: 'Email же сырсөз туура эмес', en: 'Invalid email or password' },

  /* Article page UI */
  'article.notFound':        { ru: 'Статья не найдена', ky: 'Макала табылган жок', en: 'Article not found' },
  'article.back':            { ru: 'Назад', ky: 'Артка', en: 'Back' },
  'article.takeQuiz':        { ru: 'Пройти тест', ky: 'Тесттен өтүү', en: 'Start quiz' },
  'article.warn.title':      { ru: 'Предупреждение', ky: 'Эскертүү', en: 'Warning' },
  'article.warn.text':       { ru: 'Вы можете проходить тест только один раз в неделю. Уверены, что хотите продолжить?', ky: 'Тестти жумада бир гана жолу тапшыра аласыз. Улантууга ишенесизби?', en: 'You can take this quiz only once per week. Are you sure you want to continue?' },
  'article.warn.continue':   { ru: 'Продолжить', ky: 'Улантуу', en: 'Continue' },
  'article.warn.readMore':   { ru: 'Почитать ещё', ky: 'Дагы окуу', en: 'Keep reading' },
  'article.cooldown.title':  { ru: 'Повторная сдача недоступна', ky: 'Кайра тапшыруу мүмкүн эмес', en: 'Retake unavailable' },
  'article.cooldown.ok':     { ru: 'Понятно', ky: 'Түшүндүм', en: 'Got it' },
  'article.cooldown.until':  { ru: 'Повторная сдача через', ky: 'Кайра тапшыруу аркылуу', en: 'Retake in' },

  /* Quiz page UI */
  'quiz.notFound':           { ru: 'Тест не найден', ky: 'Тест табылган жок', en: 'Quiz not found' },
  'quiz.back':               { ru: 'Назад', ky: 'Артка', en: 'Back' },
  'quiz.title':              { ru: 'Тест', ky: 'Тест', en: 'Quiz' },
  'quiz.question':           { ru: 'Вопрос', ky: 'Суроо', en: 'Question' },
  'quiz.of':                 { ru: 'из', ky: 'ден', en: 'of' },
  'quiz.prev':               { ru: '← Предыдущий', ky: '← Мурунку', en: '← Previous' },
  'quiz.next':               { ru: 'Следующий →', ky: 'Кийинки →', en: 'Next →' },
  'quiz.finish':             { ru: 'Завершить', ky: 'Аяктоо', en: 'Finish' },
  'quiz.result':             { ru: 'Ваш результат', ky: 'Сиздин жыйынтык', en: 'Your result' },
  'quiz.retry':              { ru: 'Пересдать', ky: 'Кайра тапшыруу', en: 'Retake' },
  'quiz.retakeNote':         { ru: 'Повторная сдача через', ky: 'Кайра тапшыруу аркылуу', en: 'Retake in' },
  'quiz.home':               { ru: 'На главную', ky: 'Башкы бетке', en: 'Home' },
  'quiz.success.title':      { ru: 'Поздравляем!', ky: 'Куттуктайбыз!', en: 'Congratulations!' },
  'quiz.success.text':       { ru: 'Вы прошли тест без ошибок. Ваш промокод:', ky: 'Сиз тесттен катасыз өттүңүз. Сиздин промокодуңуз:', en: 'You passed the quiz with no mistakes. Your promo code:' },
  'quiz.copy':               { ru: 'Скопировать', ky: 'Көчүрүү', en: 'Copy' },
  'quiz.close':              { ru: 'Закрыть', ky: 'Жабуу', en: 'Close' },

  /* Achievements (titles, summaries, details, rewards) */
  'achv.first-steps.title':   { ru: 'Первые шаги', ky: 'Алгачкы кадамдар', en: 'First Steps' },
  'achv.first-steps.summary': { ru: 'Откройте свою первую статью.', ky: 'Алгачкы макалаңызды ачыңыз.', en: 'Open your first article.' },
  'achv.first-steps.details': { ru: 'Вы начали путь знаний! Это достижение выдаётся за открытие первой статьи в приложении. Продолжайте — впереди много интересного.', ky: 'Сиз билим алуу жолун баштадыңыз! Бул жетишкендик колдонмодо алгачкы макаланы ачканыңыз үчүн берилет. Улантыңыз — алдыда кызыктуу нерселер көп.', en: 'You have started your learning journey! This is awarded for opening your first article. Keep going—much more ahead.' },
  'achv.first-steps.reward':  { ru: '+50 XP', ky: '+50 XP', en: '+50 XP' },

  'achv.burning-interest.title':   { ru: 'Горящий интерес', ky: 'Ыктыярдуу кызыгуу', en: 'Burning Interest' },
  'achv.burning-interest.summary': { ru: 'Прочитайте 3 статьи за один день.', ky: 'Бир күндө 3 макала окуңуз.', en: 'Read 3 articles in a day.' },
  'achv.burning-interest.details': { ru: 'Сильная вовлечённость — ключ к быстрому прогрессу. Читайте больше и закрепляйте знания тестами.', ky: 'Жогорку катышуу — тез прогресстин ачкычы. Көбүрөөк окуп, тесттер менен бекемдеңиз.', en: 'Strong engagement is key to rapid progress. Read more and reinforce your knowledge with quizzes.' },
  'achv.burning-interest.reward':  { ru: '+75 XP', ky: '+75 XP', en: '+75 XP' },

  'achv.bookworm.title':   { ru: 'Книжный червь', ky: 'Китеп курту', en: 'Bookworm' },
  'achv.bookworm.summary': { ru: 'Завершите 10 статей (с тестами).', ky: '10 макаланы бүтүрүңүз (тесттери менен).', en: 'Complete 10 articles (with quizzes).' },
  'achv.bookworm.details': { ru: 'Уверенное погружение в материал. Чтобы получить это достижение, завершите 10 статей и пройдите связанные тесты.', ky: 'Материалга терең сүңгүү. Бул жетишкендик үчүн 10 макаланы бүтүрүп, тиешелүү тесттерден өтүңүз.', en: 'A confident deep dive into content. Complete 10 articles and their related quizzes.' },
  'achv.bookworm.reward':  { ru: 'Бейдж «Читатель»', ky: 'Бейдж «Окуучу»', en: 'Badge "Reader"' },

  'achv.precision.title':   { ru: 'Точность', ky: 'Тактык', en: 'Precision' },
  'achv.precision.summary': { ru: 'Ответьте правильно на 5 вопросов подряд.', ky: 'Катарынан 5 суроого туура жооп бериңиз.', en: 'Answer 5 questions correctly in a row.' },
  'achv.precision.details': { ru: 'Отличная концентрация и внимательность! Держать серию правильных ответов непросто — так держать.', ky: 'Супер концентрация жана кунт коюу! Туура жооптордун сериясын кармоо оңой эмес — ушундай эле улантыңыз.', en: 'Great focus and attention! Keeping a streak is not easy—keep it up.' },
  'achv.precision.reward':  { ru: '+100 XP', ky: '+100 XP', en: '+100 XP' },

  'achv.bronze-laurel.title':   { ru: 'Бронзовый лавр', ky: 'Колоң лавр', en: 'Bronze Laurel' },
  'achv.bronze-laurel.summary': { ru: 'Наберите 60%+ в 3 тестах подряд.', ky: 'Катарынан 3 тесттен 60%+ жыйнаңыз.', en: 'Score 60%+ in 3 quizzes in a row.' },
  'achv.bronze-laurel.details': { ru: 'Стабильность — важнее всего. Три успешных теста подряд показывают ваш уверенный прогресс.', ky: 'Туруктуулук — эң маанилүүсү. Үч тизмектеги ийгиликтүү тесттер сиздин ишенимдүү прогрессти көрсөтөт.', en: 'Consistency matters most. Three successful quizzes in a row show steady progress.' },
  'achv.bronze-laurel.reward':  { ru: 'Бейдж «Бронза»', ky: 'Бейдж «Колоң»', en: 'Badge "Bronze"' },

  'achv.star-student.title':   { ru: 'Звёздный ученик', ky: 'Жылдыз окуучу', en: 'Star Student' },
  'achv.star-student.summary': { ru: 'Получите 90%+ в одном из тестов.', ky: 'Бир тесттен 90%+ алыңыз.', en: 'Score 90%+ in a quiz.' },
  'achv.star-student.details': { ru: 'Высокий результат говорит сам за себя. Отличная работа! Попробуйте повторить успех на других темах.', ky: 'Жогорку натыйжа өзү эле көп нерсени айтат. Сонун иш! Башка темаларда да кайталай көрүңүз.', en: 'A high score speaks for itself. Great job! Try to repeat it on other topics.' },
  'achv.star-student.reward':  { ru: '+150 XP', ky: '+150 XP', en: '+150 XP' },

  'achv.deep-thinking.title':   { ru: 'Глубокое мышление', ky: 'Терең ой жүгүртүү', en: 'Deep Thinking' },
  'achv.deep-thinking.summary': { ru: 'Пройдите продвинутый тест без ошибок.', ky: 'Өнүккөн тестти катасыз бүтүрүңүз.', en: 'Complete an advanced quiz with no mistakes.' },
  'achv.deep-thinking.details': { ru: 'Ни одной ошибки — впечатляюще. Это достижение отмечает глубокое понимание темы.', ky: 'Бир да ката жок — таасирдүү. Бул жетишкендик теманы терең түшүнгөнүңүздү белгилейт.', en: 'Not a single mistake—impressive. This marks deep understanding of the topic.' },
  'achv.deep-thinking.reward':  { ru: 'Бейдж «Эксперт»', ky: 'Бейдж «Эксперт»', en: 'Badge "Expert"' },

  'achv.early-bird.title':   { ru: 'Ранняя пташка', ky: 'Эрте куш', en: 'Early Bird' },
  'achv.early-bird.summary': { ru: 'Завершите статью в течение 24 часов после публикации.', ky: 'Публикациядан 24 саат ичинде макаланы бүтүрүңүз.', en: 'Finish an article within 24 hours of its publication.' },
  'achv.early-bird.details': { ru: 'Вы держите руку на пульсе. Первые всегда получают преимущество и свежие знания.', ky: 'Сиз ар дайым кабардарсыз. Биринчилер ар дайым артыкчылыкка ээ жана жаңы билим алышат.', en: 'You are on the pulse. Early readers gain advantage and fresh knowledge.' },
  'achv.early-bird.reward':  { ru: '+50 XP', ky: '+50 XP', en: '+50 XP' },

  'achv.consistent.title':   { ru: 'Непробиваемый', ky: 'Туруктуу', en: 'Consistent' },
  'achv.consistent.summary': { ru: 'Учитесь 5 дней подряд (есть активность каждый день).', ky: 'Катарынан 5 күн окуңуз (күн сайын активдүүлүк).', en: 'Study 5 days in a row (daily activity).' },
  'achv.consistent.details': { ru: 'Последовательность — главный секрет мастерства. Отмечайте прогресс ежедневно, даже если это 10–15 минут.', ky: 'Туратуулук — чеберчиликтин башкы сыры. Күн сайын 10–15 мүнөт болсода прогрессти белгилеңиз.', en: 'Consistency is the secret. Track progress daily, even for 10–15 minutes.' },
  'achv.consistent.reward':  { ru: 'Бейдж «Серия 5»', ky: 'Бейдж «Серия 5»', en: 'Badge "Streak 5"' },

  'achv.king-of-hill.title':   { ru: 'Король горы', ky: 'Тоонун падышасы', en: 'King of the Hill' },
  'achv.king-of-hill.summary': { ru: 'Завершите все текущие статьи и тесты.', ky: 'Учурдагы бардык макалаларды жана тесттерди бүтүрүңүз.', en: 'Complete all current articles and quizzes.' },
  'achv.king-of-hill.details': { ru: 'Вы освоили весь доступный материал на текущий момент. Продолжайте удерживать лидерство!', ky: 'Учурда жеткиликтүү материалдардын баарын өздөштүрдүңүз. Лидерликти сактаңыз!', en: 'You have mastered all current content. Keep leading!' },
  'achv.king-of-hill.reward':  { ru: 'Профильная рамка «Top Learner»', ky: 'Профиль рамкасы «Top Learner»', en: 'Profile frame "Top Learner"' },

  'lang.label':      { ru: 'Язык', ky: 'Тил', en: 'Language' },
  'lang.ru':         { ru: 'Русский', ky: 'Орусча', en: 'Russian' },
  'lang.ky':         { ru: 'Кыргызча', ky: 'Кыргызча', en: 'Kyrgyz' },
  'lang.en':         { ru: 'Английский', ky: 'Англисче', en: 'English' },
};

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved === 'ru' || saved === 'ky' || saved === 'en') return saved;
    } catch { void 0; }
    return 'ru';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch { void 0; }
  }, []);

  const t = useCallback((key: string) => {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[lang] ?? entry['ru'] ?? key;
  }, [lang]);

  // Apply html lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
