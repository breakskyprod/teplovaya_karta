// ===================================================================
// ДАННЫЕ ДЛЯ ГИСТОГРАММЫ (столбики "Динамика показателей")
// ===================================================================
const monthlyTargets = {
    jan:       [0, 16, 4, 37, 0],
    feb:       [0, 9, 9, 38, 0],
    march:     [0, 23, 7, 51, 0],
    april:     [0, 25, 9, 57, 0],
    may:       [0, 16, 10, 26, 0],
    june:      [0, 20, 5, 0, 0],
    first:     [40, 109, 44, 209, 88],
    july:      [0, 0, 0, 0, 0],
    august:    [0, 0, 0, 0, 0],
    september: [0, 0, 0, 0, 0],
    october:   [0, 0, 0, 0, 0],
    november:  [0, 0, 0, 0, 0],
    december:  [0, 0, 0, 0, 0]
};

const CHART_CONFIG = {
    maxBarHeight: 1,
    globalMax: 1,
    animationDuration: 1.2,
    stepTime: 18,
    totalSteps: 50
};

const CAROUSEL_CONFIG = {
    initialMonth: 'jan'
};
