// ===================================================================
// ДАННЫЕ ДЛЯ ТЕПЛОВОЙ КАРТЫ (Районы Удмуртии)
// ===================================================================
const districtsStats = {
    'Alnashsky': {
        name: 'Алнашский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Balezinsky': {
        name: 'Балезинский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 1, level: 'medium', desc: 'Средний уровень' },
            april: { value: 2, level: 'medium', desc: 'Средний уровень' },
            may: { value: 1, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 9, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Vavozhsky': {
        name: 'Вавожский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 13, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Votkinsky': {
        name: 'Воткинский район',
        stats: {
            jan: { value: 1, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 1, level: 'low', desc: '-' },
            march: { value: 4, level: 'medium', desc: 'Средний уровень' },
            april: { value: 3, level: 'medium', desc: 'Средний уровень' },
            may: { value: 5, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 34, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Glazovsky': {
        name: 'Глазовский район',
        stats: {
            jan: { value: 1, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 4, level: 'medium', desc: 'Средний уровень' },
            march: { value: 2, level: 'medium', desc: 'Средний уровень' },
            april: { value: 4, level: 'medium', desc: 'Средний уровень' },
            may: { value: 5, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 26, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Grakhovsky': {
        name: 'Граховский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 1, level: 'medium', desc: 'Средний уровень' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Debessky': {
        name: 'Дебёсский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Zavyalovsky': {
        name: 'Завьяловский район',
        stats: {
            jan: { value: 2, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 1, level: 'medium', desc: 'Средний уровень' },
            march: { value: 8, level: 'high', desc: 'Красная зона' },
            april: { value: 6, level: 'high', desc: 'Красная зона' },
            may: { value: 5, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 86, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Igrinsky': {
        name: 'Игринский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 1, level: 'medium', desc: 'Средний уровень' },
            march: { value: 1, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 1, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 4, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Izhevsk': {
        name: 'Ижевск',
        stats: {
            jan: { value: 29, level: 'high', desc: 'Красная зона' },
            feb: { value: 28, level: 'high', desc: 'Красная зона' },
            march: { value: 33, level: 'high', desc: 'Красная зона' },
            april: { value: 30, level: 'high', desc: 'Красная зона' },
            may: { value: 30, level: 'high', desc: 'Красная зона' },
            june: { value: 3, level: 'low', desc: '-' },
            first: { value: 175, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Kambarsky': {
        name: 'Камбарский район',
        stats: {
            jan: { value: 1, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 1, level: 'medium', desc: 'Средний уровень' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 1, level: 'medium', desc: 'Средний уровень' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 5, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Karakulinsky': {
        name: 'Каракулинский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 1, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 2, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Kezsky': {
        name: 'Кезский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 1, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 6, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Kiznersky': {
        name: 'Кизнерский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 1, level: 'low', desc: '-' },
            first: { value: 2, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Kiyasovsky': {
        name: 'Киясовский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 1, level: 'medium', desc: 'Средний уровень' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Krasnogorsky': {
        name: 'Красногорский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 4, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Malopurginsky': {
        name: 'Малопургинский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 1, level: 'medium', desc: 'Средний уровень' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 1, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 2, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Mozhginsky': {
        name: 'Можгинский район',
        stats: {
            jan: { value: 1, level: 'low', desc: '-' },
            feb: { value: 1, level: 'medium', desc: 'Средний уровень' },
            march: { value: 1, level: 'medium', desc: 'Средний уровень' },
            april: { value: 1, level: 'medium', desc: 'Средний уровень' },
            may: { value: 1, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 10, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Sarapulsky': {
        name: 'Сарапульский район',
        stats: {
            jan: { value: 1, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 5, level: 'medium', desc: 'Средний уровень' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 6, level: 'high', desc: 'Красная зона' },
            may: { value: 3, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 33, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Seltinsky': {
        name: 'Селтинский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: {value: 2, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Syumsinsky': {
        name: 'Сюмсинский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Uvinsky': {
        name: 'Увинский район',
        stats: {
            jan: { value: 1, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 4, level: 'medium', desc: 'Средний уровень' },
            march: { value: 2, level: 'medium', desc: 'Средний уровень' },
            april: { value: 4, level: 'medium', desc: 'Средний уровень' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 18, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Sharkansky': {
        name: 'Шарканский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 1, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Yukamensky': {
        name: 'Юкаменский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 0, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 2, level: 'medium', desc: 'Средний уровень' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'YakshurBodyinsky': {
        name: 'Якшур-Бодьинский район',
        stats: {
            jan: { value: 4, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 4, level: 'medium', desc: 'Средний уровень' },
            april: { value: 3, level: 'medium', desc: 'Средний уровень' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 13, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Yarsky': {
        name: 'Ярский район',
        stats: {
            jan: { value: 0, level: 'low', desc: '-' },
            feb: { value: 0, level: 'low', desc: '-' },
            march: { value: 1, level: 'low', desc: '-' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 0, level: 'low', desc: '-' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 1, level: 'low', desc: '-' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    }
};

const izhevskDistrictsStats = {
    'Leninsky': {
        name: 'Ленинский район',
        stats: {
            jan: { value: 5, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 2, level: 'medium', desc: 'Средний уровень' },
            march: { value: 4, level: 'medium', desc: 'Средний уровень' },
            april: { value: 0, level: 'low', desc: '-' },
            may: { value: 3, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 23, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Ustinovsky': {
        name: 'Устиновский район',
        stats: {
            jan: { value: 6, level: 'high', desc: 'Красная зона' },
            feb: { value: 5, level: 'medium', desc: 'Средний уровень' },
            march: { value: 8, level: 'high', desc: 'Красная зона' },
            april: { value: 5, level: 'medium', desc: 'Средний уровень' },
            may: { value: 6, level: 'high', desc: 'Красная зона' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 58, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Pervomaisky': {
        name: 'Первомайский район',
        stats: {
            jan: { value: 4, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 4, level: 'medium', desc: 'Средний уровень' },
            march: { value: 3, level: 'medium', desc: 'Средний уровень' },
            april: { value: 2, level: 'medium', desc: 'Средний уровень' },
            may: { value: 2, level: 'medium', desc: 'Средний уровень' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 27, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Industrialny': {
        name: 'Индустриальный район',
        stats: {
            jan: { value: 4, level: 'medium', desc: 'Средний уровень' },
            feb: { value: 8, level: 'high', desc: 'Красная зона' },
            march: { value: 8, level: 'high', desc: 'Красная зона' },
            april: { value: 13, level: 'high', desc: 'Красная зона' },
            may: { value: 7, level: 'high', desc: 'Красная зона' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 67, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    },
    'Oktyabrskiy': {
        name: 'Октябрьский район',
        stats: {
            jan: { value: 7, level: 'high', desc: 'Красная зона' },
            feb: { value: 3, level: 'medium', desc: 'Средний уровень' },
            march: { value: 6, level: 'high', desc: 'Красная зона' },
            april: { value: 6, level: 'high', desc: 'Красная зона' },
            may: { value: 8, level: 'high', desc: 'Красная зона' },
            june: { value: 0, level: 'low', desc: '-' },
            first: { value: 38, level: 'high', desc: 'Красная зона' },
            july: { value: 0, level: 'low', desc: '-' },
            august: { value: 0, level: 'low', desc: '-' },
            september: { value: 0, level: 'low', desc: '-' },
            october: { value: 0, level: 'low', desc: '-' },
            november: { value: 0, level: 'low', desc: '-' },
            december: { value: 0, level: 'low', desc: '-' }
        }
    }
};
