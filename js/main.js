// ===================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ===================================================================
function getLevelByValue(value) {
    if (value <= 3) return 'low';
    if (value <= 6) return 'medium';
    return 'high';
}

function getColorByLevel(level) {
    switch (level) {
        case 'low':    return '#2ecc71';
        case 'medium': return '#f1c40f';
        case 'high':   return '#e74c3c';
        default:       return '#ffffff';
    }
}

function getLevelName(level) {
    switch (level) {
        case 'low':    return 'Низкий';
        case 'medium': return 'Средний';
        case 'high':   return 'Высокий';
        default:       return '—';
    }
}

function getMonthName(monthKey) {
    const names = { jan: 'Январь', feb: 'Февраль', march: 'Март', april: 'Апрель', may: 'Май', june: 'Июнь', first: 'Первое полугодие', july: 'Июль', august: 'Август', september: 'Сентябрь', october: 'Октябрь', november: 'Ноябрь', december: 'Декабрь' };
    return names[monthKey] || monthKey;
}

// ===================================================================
// КАРУСЕЛЬ МЕСЯЦЕВ
// ===================================================================
function centerSelectedMonth(trackElement, activeChip, containerElement) {
    if (!trackElement || !activeChip || !containerElement) return;
    const containerRect = containerElement.getBoundingClientRect();
    const chipRect = activeChip.getBoundingClientRect();
    let currentTranslateX = 0;
    const transform = trackElement.style.transform;
    if (transform && transform !== 'none') {
        const match = transform.match(/translateX\(([^)]+)px\)/);
        if (match) currentTranslateX = parseFloat(match[1]);
    }
    const delta = (containerRect.left + containerRect.width / 2) - (chipRect.left + chipRect.width / 2);
    const newTranslateX = currentTranslateX + delta;
    const trackWidth = trackElement.scrollWidth;
    const containerWidth = containerRect.width;
    const minTranslate = -(trackWidth - containerWidth);
    const clampedTranslate = Math.max(minTranslate, Math.min(0, newTranslateX));
    trackElement.style.transform = `translateX(${clampedTranslate}px)`;
}

function initCarousel(trackId, initialMonth, onMonthChange) {
    const track = document.getElementById(trackId);
    if (!track) return null;
    const chips = track.querySelectorAll('.month-chip');
    const container = track.closest('.month-carousel-mask');
    chips.forEach(chip => { if (chip.dataset.month === initialMonth) chip.classList.add('active-month'); });

    function setMonth(monthKey) {
        if (monthKey === initialMonth) return;
        initialMonth = monthKey;
        chips.forEach(chip => {
            if (chip.dataset.month === monthKey) chip.classList.add('active-month');
            else chip.classList.remove('active-month');
        });
        const activeChip = track.querySelector('.month-chip.active-month');
        if (activeChip && container) centerSelectedMonth(track, activeChip, container);
        if (onMonthChange) onMonthChange(monthKey);
    }

    chips.forEach(chip => chip.addEventListener('click', () => setMonth(chip.dataset.month)));
    setTimeout(() => {
        const activeChip = track.querySelector('.month-chip.active-month');
        if (activeChip && container) centerSelectedMonth(track, activeChip, container);
    }, 100);
    window.addEventListener('resize', () => {
        const activeChip = track.querySelector('.month-chip.active-month');
        if (activeChip && container) centerSelectedMonth(track, activeChip, container);
    });
    return { setMonth };
}

// ===================================================================
// ГЛОБАЛЬНОЕ СОСТОЯНИЕ
// ===================================================================
// При старте страницы не выбрано ни одной категории
let activeThemes = []; 
let currentChartMonth = 'jan';
let currentHeatmapMonth = 'jan';
let animationStarted = false;
let isZoomedToIzhevsk = false;
let currentTooltip = null;

// ===================================================================
// ГИСТОГРАММА
// ===================================================================
const bars = [
    { el: document.getElementById('bar1'), valueEl: document.getElementById('value1'), index: 0, interval: null },
    { el: document.getElementById('bar2'), valueEl: document.getElementById('value2'), index: 1, interval: null },
    { el: document.getElementById('bar3'), valueEl: document.getElementById('value3'), index: 2, interval: null },
    { el: document.getElementById('bar4'), valueEl: document.getElementById('value4'), index: 3, interval: null },
    { el: document.getElementById('bar5'), valueEl: document.getElementById('value5'), index: 4, interval: null }
];

function animateBars(monthKey) {
    let maxOverall = 1;
    bars.forEach(item => {
        const total = getTotalForTheme(THEMES[item.index].key, monthKey);
        if (total > maxOverall) maxOverall = total;
    });

    bars.forEach((item, idx) => {
        const targetNumber = getTotalForTheme(THEMES[item.index].key, monthKey);
        let targetHeight = (targetNumber / maxOverall) * 200;
        if (targetHeight < 10) targetHeight = 10;

        if (item.el) {
            item.el.style.transition = `height ${CHART_CONFIG.animationDuration}s cubic-bezier(0.22, 0.97, 0.36, 1.05)`;
            setTimeout(() => { item.el.style.height = `${targetHeight}px`; }, idx * 120);
        }

        if (item.valueEl) {
            if (item.interval) clearInterval(item.interval);
            let current = 0;
            const increment = targetNumber / CHART_CONFIG.totalSteps;
            item.valueEl.textContent = '0';
            item.valueEl.classList.remove('show');
            const interval = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    item.valueEl.textContent = Math.round(targetNumber);
                    clearInterval(interval);
                    item.valueEl.classList.add('show');
                    item.interval = null;
                } else {
                    item.valueEl.textContent = Math.floor(current);
                    item.valueEl.classList.add('show');
                }
            }, CHART_CONFIG.stepTime + idx * 8);
            item.interval = interval;
        }
    });
}

function initBarClickHandlers() {
    document.querySelectorAll('.bar-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const themeIndex = parseInt(wrapper.dataset.theme);
            const barEl = wrapper.querySelector('.bar');
            
            if (activeThemes.includes(themeIndex)) {
                activeThemes = activeThemes.filter(i => i !== themeIndex);
                barEl.classList.remove('active');
            } else {
                activeThemes.push(themeIndex);
                barEl.classList.add('active');
            }
            
            drawLineChart();
            if (!isZoomedToIzhevsk) recolorDistricts(currentHeatmapMonth);
            else recolorIzhevskDistricts(currentHeatmapMonth);
        });
    });
}

// ===================================================================
// ЛИНЕЙНЫЙ ГРАФИК
// ===================================================================
const lineCanvas = document.getElementById('lineChartCanvas');
const lineCtx = lineCanvas ? lineCanvas.getContext('2d') : null;
let chartGeometry = null;

function drawLineChart() {
    if (!lineCanvas || !lineCtx) return;

    const container = lineCanvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(320, Math.min(container.clientWidth - 40, 900));
    const height = 400;

    lineCanvas.width = width * dpr;
    lineCanvas.height = height * dpr;
    lineCanvas.style.width = width + 'px';
    lineCanvas.style.height = height + 'px';

    const ctx = lineCtx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 40, bottom: 40, left: 46, right: 22 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Если ничего не выбрано, рисуем заглушку
    if (activeThemes.length === 0) {
        ctx.fillStyle = '#3a2c3f';
        ctx.font = '500 16px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Выберите тематику в блоке «Показатели», чтобы увидеть динамику', width / 2, height / 2);
        document.getElementById('dynamicLegend').innerHTML = '';
        return;
    }

    const series = activeThemes.map(themeIdx => {
        const theme = THEMES[themeIdx];
        const values = monthKeys.map(mKey => getTotalForTheme(theme.key, mKey));
        return { key: theme.key, name: theme.name, color: theme.color, values };
    });

    let rawMax = 0;
    series.forEach(s => s.values.forEach(v => { if (v > rawMax) rawMax = v; }));
    const maxVal = rawMax > 0 ? rawMax * 1.2 : 10;

    const steps = 5;
    ctx.font = '11px Montserrat, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= steps; i++) {
        const y = padding.top + chartHeight - (i / steps) * chartHeight;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(60, 50, 70, 0.15)';
        ctx.lineWidth = 1;
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillStyle = '#3a2c3f';
        ctx.fillText(Math.round((i / steps) * maxVal), padding.left - 8, y);
    }

    const xStep = chartWidth / (monthKeys.length - 1);
    const monthX = monthKeys.map((_, i) => padding.left + i * xStep);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#3a2c3f';
    ctx.font = (width < 560 ? '10px' : '13px') + ' Montserrat, sans-serif';
    monthLabels.forEach((label, i) => ctx.fillText(label, monthX[i], height - padding.bottom + 8));

    series.forEach(s => {
        const pts = s.values.map((v, i) => ({
            x: monthX[i],
            y: padding.top + chartHeight - (v / maxVal) * chartHeight
        }));

        ctx.beginPath();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.stroke();

        pts.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });
    });

    chartGeometry = { padding, width, height, chartWidth, chartHeight, xStep, monthX, series };
    updateLegend();
}

function updateLegend() {
    const legend = document.getElementById('dynamicLegend');
    if (activeThemes.length === 0) {
        legend.innerHTML = '';
        return;
    }
    legend.innerHTML = activeThemes.map(idx => {
        const t = THEMES[idx];
        return `<div class="chart-legend-item"><span class="chart-legend-dot" style="background:${t.color}"></span>${t.name}</div>`;
    }).join('');
}

// ===================================================================
// КАРТА И ТУЛТИПЫ
// ===================================================================
function getDistrictValueForSelectedThemes(districtData, monthKey) {
    const monthIdx = monthKeys.indexOf(monthKey);
    if (monthIdx === -1) return 0;
    
    // Если ничего не выбрано, берем сумму ВСЕХ тем
    let themesToSum = activeThemes.length > 0 ? activeThemes : [0, 1, 2, 3, 4];
    let sum = 0;
    
    themesToSum.forEach(themeIdx => {
        const key = THEMES[themeIdx].key;
        if (districtData[key] && districtData[key][monthIdx]) {
            sum += districtData[key][monthIdx];
        }
    });
    return sum;
}

function recolorDistricts(month) {
    for (const [dId, data] of Object.entries(DISTRICT_THEME_DATA)) {
        if (['Leninsky', 'Ustinovsky', 'Pervomaisky', 'Industrialny', 'Oktyabrskiy'].includes(dId)) continue;
        const val = getDistrictValueForSelectedThemes(data, month);
        const path = document.querySelector(`#udmurtiaMap g[id="${dId}"] path`);
        if (path) path.style.fill = getColorByLevel(getLevelByValue(val));
    }
}

function recolorIzhevskDistricts(month) {
    for (const [dId, data] of Object.entries(DISTRICT_THEME_DATA)) {
        if (!['Leninsky', 'Ustinovsky', 'Pervomaisky', 'Industrialny', 'Oktyabrskiy'].includes(dId)) continue;
        const val = getDistrictValueForSelectedThemes(data, month);
        const path = document.querySelector(`#izhevskMap path[id="${dId}"]`);
        if (path) path.style.fill = getColorByLevel(getLevelByValue(val));
    }
}

function showTooltip(districtId, event, isIzhevskMap = false) {
    const data = DISTRICT_THEME_DATA[districtId];
    if (!data) return;

    if (currentTooltip) currentTooltip.remove();

    const monthIdx = monthKeys.indexOf(currentHeatmapMonth);
    let htmlRows = '';
    let total = 0;

    // Если ничего не выбрано, показываем все темы
    let themesToShow = activeThemes.length > 0 ? activeThemes : [0, 1, 2, 3, 4];

    themesToShow.forEach(themeIdx => {
        const t = THEMES[themeIdx];
        const val = data[t.key] ? (data[t.key][monthIdx] || 0) : 0;
        total += val;
        htmlRows += `<div class="tooltip-row" style="color:${t.color}"><span>● ${t.short}:</span><span>${val}</span></div>`;
    });

    const level = getLevelByValue(total);
    const levelColor = getColorByLevel(level);
    const levelName = getLevelName(level);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-title">${data.name}</div>
        <div class="tooltip-row">
            <span>Уровень:</span>
            <span style="color:${levelColor}; font-weight:700;">${levelName}</span>
        </div>
        <div class="tooltip-divider"></div>
        ${htmlRows}
        <div class="tooltip-divider"></div>
        <div class="tooltip-row" style="color:#fff; font-weight:bold;">
            <span>Итого:</span>
            <span>${total}</span>
        </div>
    `;

    document.body.appendChild(tooltip);

    let x = event.clientX + 15;
    let y = event.clientY - 10;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';

    const rect = tooltip.getBoundingClientRect();
    if (rect.right > window.innerWidth) tooltip.style.left = (event.clientX - rect.width - 10) + 'px';
    if (rect.bottom > window.innerHeight) tooltip.style.top = (event.clientY - rect.height - 10) + 'px';

    currentTooltip = tooltip;
    setTimeout(() => { if (currentTooltip) { currentTooltip.remove(); currentTooltip = null; } }, 6000);
}

function initUdmurtiaMapHandlers() {
    const districts = document.querySelectorAll('#udmurtiaMap g[id]');
    districts.forEach(district => {
        const districtId = district.id;
        const path = district.querySelector('path');
        if (path && districtId !== 'Izhevsk') {
            path.classList.add('district');
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                if (DISTRICT_THEME_DATA[districtId]) {
                    showTooltip(districtId, e, false);
                    districts.forEach(d => d.classList.remove('selected'));
                    district.classList.add('selected');
                }
            });
        } else if (path && districtId === 'Izhevsk') {
            path.classList.add('district');
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                zoomToIzhevsk(document.getElementById('mapWrapper'), document.getElementById('backButton'));
            });
        }
    });
}

function zoomToIzhevsk(mapWrapper, backButton) {
    if (isZoomedToIzhevsk) return;
    mapWrapper.classList.add('zooming');

    setTimeout(() => {
        mapWrapper.innerHTML = IZHEVSK_MAP_SVG;
        isZoomedToIzhevsk = true;
        backButton.classList.add('show');
        mapWrapper.classList.remove('zooming');

        recolorIzhevskDistricts(currentHeatmapMonth);

        const izhevskPaths = mapWrapper.querySelectorAll('path');
        izhevskPaths.forEach(path => {
            path.classList.add('district');
            const districtId = path.id;
            
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                if (DISTRICT_THEME_DATA[districtId]) {
                    showTooltip(districtId, e, true);
                    izhevskPaths.forEach(p => p.classList.remove('selected'));
                    path.classList.add('selected');
                }
            });
            path.addEventListener('mouseenter', () => { path.style.filter = 'brightness(0.95)'; });
            path.addEventListener('mouseleave', () => { path.style.filter = ''; });
        });
    }, 300);
}

function resetToFullMap(mapWrapper, backButton) {
    if (!isZoomedToIzhevsk) return;
    mapWrapper.classList.add('zooming');

    setTimeout(() => {
        mapWrapper.innerHTML = UDMURTIA_MAP_SVG;
        isZoomedToIzhevsk = false;
        backButton.classList.remove('show');
        mapWrapper.classList.remove('zooming');

        initUdmurtiaMapHandlers();
        recolorDistricts(currentHeatmapMonth);
    }, 300);
}

// ===================================================================
// ИНИЦИАЛИЗАЦИЯ
// ===================================================================
function initScrollTrigger() {
    const indicatorsSection = document.getElementById('indicators-section');
    if (!indicatorsSection) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                animationStarted = true;
                setTimeout(() => animateBars(currentChartMonth), 300);
                observer.unobserve(indicatorsSection);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(indicatorsSection);
}

function initBottomMenuScroll() {
    const bottomMenu = document.getElementById('bottomMenu');
    if (!bottomMenu) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) bottomMenu.classList.add('visible'); });
    }, { threshold: 0.1 });
    observer.observe(bottomMenu);
}

document.addEventListener('DOMContentLoaded', function() {
    initCarousel('chartMonthTrack', CAROUSEL_CONFIG.initialMonth, (month) => {
        currentChartMonth = month;
        if (animationStarted) animateBars(month);
    });

    initCarousel('heatmapMonthTrack', CAROUSEL_CONFIG.initialMonth, (month) => {
        currentHeatmapMonth = month;
        if (!isZoomedToIzhevsk) recolorDistricts(month);
        else recolorIzhevskDistricts(month);
    });

    initBarClickHandlers();

    drawLineChart();
    window.addEventListener('resize', drawLineChart);

    setTimeout(() => {
        const mapWrapper = document.getElementById('mapWrapper');
        if (mapWrapper) {
            mapWrapper.innerHTML = UDMURTIA_MAP_SVG;
            initUdmurtiaMapHandlers();
            recolorDistricts(currentHeatmapMonth);
        }
    }, 100);

    document.getElementById('backButton').addEventListener('click', () => {
        resetToFullMap(document.getElementById('mapWrapper'), document.getElementById('backButton'));
    });

    initScrollTrigger();
    initBottomMenuScroll();
    document.querySelector('.main-container').style.opacity = '1';

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.district')) {
            if (currentTooltip) { currentTooltip.remove(); currentTooltip = null; }
        }
    });
});
