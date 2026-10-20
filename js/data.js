// ===================================================================
// 1. КОНФИГУРАЦИЯ И ТЕМЫ
// ===================================================================
const THEMES = [
    { key: 'terrorism',    name: 'Терроризм/экстремизм',          short: 'Терроризм/экстремизм', color: '#8e44ad' },
    { key: 'homelessness', name: 'Беспризорность/правонарушения', short: 'Правонарушения',       color: '#a05252' },
    { key: 'suicide',      name: 'Суицидальное поведение',        short: 'Суицид. поведение',    color: '#c0392b' },
    { key: 'substances',   name: 'Психоактивные вещества',        short: 'ПАВ',                  color: '#e67e22' },
    { key: 'cyber',        name: 'Сфера кибербезопасности',       short: 'Кибербезопасность',    color: '#b7950b' }
];

const monthKeys = ['jan','feb','march','april','may','june','july','august','september','october','november','december'];
const monthLabels = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
const fullMonthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

const CHART_CONFIG = { maxBarHeight: 200, globalMax: 250, animationDuration: 1.2, stepTime: 18, totalSteps: 50 };
const CAROUSEL_CONFIG = { initialMonth: 'jan' };

// ===================================================================
// 2. ГЛАВНЫЕ ДАННЫЕ (Заполняйте здесь)
// ===================================================================
// Ключи районов Удмуртии: Alnashsky, Balezinsky, Vavozhsky, Votkinsky, 
// Glazovsky, Grakhovsky, Debessky, Zavyalovsky, Igrinsky, Izhevsk, 
// Kambarsky, Karakulinsky, Kezsky, Kiznersky, Kiyasovsky, Krasnogorsky, 
// Malopurginsky, Mozhginsky, Sarapulsky, Seltinsky, Syumsinsky, Uvinsky, 
// Sharkansky, Yukamensky, YakshurBodyinsky, Yarsky.
// Районы Ижевска: Leninsky, Ustinovsky, Pervomaisky, Industrialny, Oktyabrskiy.

const DISTRICT_THEME_DATA = {
    // === РАЙОНЫ УДМУРТИИ ===
    'Alnashsky': {
        name: 'Алнашский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Balezinsky': {
        name: 'Балезинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Vavozhsky': {
        name: 'Вавожский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Votkinsky': {
        name: 'Воткинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Glazovsky': {
        name: 'Глазовский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Grakhovsky': {
        name: 'Граховский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Debessky': {
        name: 'Дебёсский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Zavyalovsky': {
        name: 'Завьяловский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Igrinsky': {
        name: 'Игринский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Izhevsk': {
        name: 'Ижевск',
        terrorism:    [1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [12, 14, 18, 16, 10, 5, 0, 0, 0, 0, 0, 0],
        suicide:      [3, 2, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
        substances:   [20, 22, 25, 24, 18, 10, 0, 0, 0, 0, 0, 0],
        cyber:        [1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    'Kambarsky': {
        name: 'Камбарский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Karakulinsky': {
        name: 'Каракулинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Kezsky': {
        name: 'Кезский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Kiznersky': {
        name: 'Кизнерский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Kiyasovsky': {
        name: 'Киясовский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Krasnogorsky': {
        name: 'Красногорский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Malopurginsky': {
        name: 'Малопургинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Mozhginsky': {
        name: 'Можгинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Sarapulsky': {
        name: 'Сарапульский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Seltinsky': {
        name: 'Селтинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Syumsinsky': {
        name: 'Сюмсинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Uvinsky': {
        name: 'Увинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Sharkansky': {
        name: 'Шарканский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Yukamensky': {
        name: 'Юкаменский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'YakshurBodyinsky': {
        name: 'Якшур-Бодьинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Yarsky': {
        name: 'Ярский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },

    // === РАЙОНЫ ИЖЕВСКА ===
    'Leninsky': {
        name: 'Ижевск · Ленинский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Ustinovsky': {
        name: 'Ижевск · Устиновский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Pervomaisky': {
        name: 'Ижевск · Первомайский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Industrialny': {
        name: 'Ижевск · Индустриальный район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    'Oktyabrskiy': {
        name: 'Ижевск · Октябрьский район',
        terrorism:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        homelessness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        suicide:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        substances:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cyber:        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};

// Функция для получения общего числа по всем районам за конкретный месяц и тему
function getTotalForTheme(themeKey, monthKey) {
    const monthIndex = monthKeys.indexOf(monthKey);
    if (monthIndex === -1) return 0; 
    let sum = 0;
    for (let d in DISTRICT_THEME_DATA) {
        if (DISTRICT_THEME_DATA[d][themeKey] && DISTRICT_THEME_DATA[d][themeKey][monthIndex]) {
            sum += DISTRICT_THEME_DATA[d][themeKey][monthIndex];
        }
    }
    return sum;
}
