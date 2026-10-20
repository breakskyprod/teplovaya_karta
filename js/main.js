// ===================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ===================================================================
function getLevelByValue(value) {
    const v = Number(value) || 0;
    if (v <= 0) return 'zero';
    if (v <= 5) return 'low';
    if (v <= 10) return 'medium';
    return 'high';
}

function getColorByLevel(level) {
    switch (level) {
        case 'zero':   return '#2ecc71';
        case 'low':    return '#f1c40f';
        case 'medium': return '#e67e22';
        case 'high':   return '#e74c3c';
        default:       return '#ffffff';
    }
}

function getLevelName(level) {
    switch (level) {
        case 'zero':   return 'Нулевой';
        case 'low':    return 'Низкий';
        case 'medium': return 'Средний';
        case 'high':   return 'Высокий';
        default:       return '—';
    }
}

function getLevelEmoji(level) {
    switch (level) {
        case 'zero':   return '🟢';
        case 'low':    return '🟡';
        case 'medium': return '🟠';
        case 'high':   return '🔴';
        default:       return '';
    }
}

function getMonthName(monthKey) {
    const names = {
        jan: 'Январь', feb: 'Февраль', march: 'Март', april: 'Апрель',
        may: 'Май', june: 'Июнь', july: 'Июль', august: 'Август',
        september: 'Сентябрь', october: 'Октябрь', november: 'Ноябрь', december: 'Декабрь'
    };
    return names[monthKey] || monthKey;
}

// ===================================================================
// КАРУСЕЛИ
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
// ГИСТОГРАММА
// ===================================================================
const bars = [
    { bar: document.getElementById('bar1'), valueEl: document.getElementById('value1'), index: 0, interval: null },
    { bar: document.getElementById('bar2'), valueEl: document.getElementById('value2'), index: 1, interval: null },
    { bar: document.getElementById('bar3'), valueEl: document.getElementById('value3'), index: 2, interval: null },
    { bar: document.getElementById('bar4'), valueEl: document.getElementById('value4'), index: 3, interval: null },
    { bar: document.getElementById('bar5'), valueEl: document.getElementById('value5'), index: 4, interval: null }
];

let currentChartMonth = 'jan';
let animationStarted = false;

function animateBars(monthKey) {
    const targetValues = monthlyTargets[monthKey];
    bars.forEach((item, idx) => {
        const targetNumber = targetValues[item.index];
        let targetHeight = (targetNumber / CHART_CONFIG.globalMax) * CHART_CONFIG.maxBarHeight;
        if (targetHeight < 10) targetHeight = 10;

        if (item.bar) {
            item.bar.style.transition = `height ${CHART_CONFIG.animationDuration}s cubic-bezier(0.22, 0.97, 0.36, 1.05)`;
            setTimeout(() => { item.bar.style.height = `${targetHeight}px`; }, idx * 120);
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

// ===================================================================
// ЛИНЕЙНЫЙ ГРАФИК
// ===================================================================
const DISTRICTS_ORDER = [
    ...Object.keys(districtsStats).map(id => ({ id, name: districtsStats[id].name })),
    ...Object.keys(izhevskDistrictsStats).map(id => ({ id, name: 'Ижевск · ' + izhevskDistrictsStats[id].name }))
];

const districtThemeData = {};
DISTRICTS_ORDER.forEach(d => {
    const src = DISTRICT_THEME_DATA[d.id] || {};
    const themes = {};
    THEMES.forEach(t => {
        const arr = Array.isArray(src[t.key]) ? src[t.key] : [];
        themes[t.key] = monthKeys.map((_, i) => {
            const v = Number(arr[i]);
            return Number.isFinite(v) ? v : 0;
        });
    });
    districtThemeData[d.id] = { name: d.name, themes };
});

let currentDistrictId = 'Izhevsk';
let hoverMonthIndex = null;
let chartGeometry = null;

const lineCanvas = document.getElementById('lineChartCanvas');
const lineCtx = lineCanvas ? lineCanvas.getContext('2d') : null;

function niceMax(v) {
    if (v <= 5) return 5;
    const pow = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / pow;
    const mult = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return mult * pow;
}

function drawLineChart(districtId) {
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

    const data = districtThemeData[districtId];
    const series = THEMES.map(t => ({
        key: t.key,
        name: t.name,
        color: t.color,
        values: data ? data.themes[t.key].slice() : monthKeys.map(() => 0)
    }));

    let rawMax = 0;
    series.forEach(s => s.values.forEach(v => { if (v > rawMax) rawMax = v; }));
    const maxVal = rawMax > 0 ? niceMax(rawMax) : 5;

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

    if (hoverMonthIndex !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(60, 50, 70, 0.35)';
        ctx.setLineDash([4, 4]);
        ctx.moveTo(monthX[hoverMonthIndex], padding.top);
        ctx.lineTo(monthX[hoverMonthIndex], padding.top + chartHeight);
        ctx.stroke();
        ctx.restore();
    }

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
            ctx.arc(p.x, p.y, i === hoverMonthIndex ? 5.5 : 3.5, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });
    });

    ctx.fillStyle = '#2d2a3e';
    ctx.font = 'bold 14px Montserrat, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(data ? data.name : '', padding.left, 10);

    if (rawMax === 0) {
        ctx.fillStyle = 'rgba(58, 44, 63, 0.55)';
        ctx.font = '500 14px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Нет данных: заполните DISTRICT_THEME_DATA для этого района', width / 2, padding.top + chartHeight / 2);
    }

    chartGeometry = { padding, width, height, chartWidth, chartHeight, xStep, monthX, series };
}

function ensureChartTooltip() {
    let el = document.getElementById('chartTooltip');
    if (!el) {
        el = document.createElement('div');
        el.id = 'chartTooltip';
        el.className = 'chart-tooltip';
        el.style.display = 'none';
        lineCanvas.parentElement.appendChild(el);
    }
    return el;
}

function showChartTooltip(index, clientY) {
    if (!chartGeometry) return;
    const tip = ensureChartTooltip();
    const rows = chartGeometry.series.map((s, i) =>
        `<div class="ct-row">` +
            `<span class="ct-dot" style="background:${s.color}"></span>` +
            `<span class="ct-name">${THEMES[i].short}</span>` +
            `<span class="ct-val">${s.values[index]}</span>` +
        `</div>`
    ).join('');
    tip.innerHTML = `<div class="ct-title">${fullMonthNames[index]}</div>${rows}`;
    tip.style.display = 'block';

    const contRect = lineCanvas.parentElement.getBoundingClientRect();
    const canvasRect = lineCanvas.getBoundingClientRect();
    let left = (canvasRect.left - contRect.left) + chartGeometry.monthX[index] + 14;
    let top = clientY - contRect.top - 20;

    const tipRect = tip.getBoundingClientRect();
    if (left + tipRect.width > contRect.width - 4) {
        left = (canvasRect.left - contRect.left) + chartGeometry.monthX[index] - tipRect.width - 14;
    }
    if (left < 4) left = 4;
    if (top + tipRect.height > contRect.height - 4) top = contRect.height - tipRect.height - 4;
    if (top < 4) top = 4;

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
}

function hideChartTooltip() {
    const tip = document.getElementById('chartTooltip');
    if (tip) tip.style.display = 'none';
}

function initLineChartHandlers() {
    if (!lineCanvas) return;

    lineCanvas.addEventListener('mousemove', (e) => {
        if (!chartGeometry) return;
        const rect = lineCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;

        let idx = 0, best = Infinity;
        chartGeometry.monthX.forEach((mx, i) => {
            const d = Math.abs(mx - x);
            if (d < best) { best = d; idx = i; }
        });

        if (best > chartGeometry.xStep * 0.65) {
            if (hoverMonthIndex !== null) {
                hoverMonthIndex = null;
                drawLineChart(currentDistrictId);
            }
            hideChartTooltip();
            return;
        }

        if (idx !== hoverMonthIndex) {
            hoverMonthIndex = idx;
            drawLineChart(currentDistrictId);
        }
        showChartTooltip(idx, e.clientY);
    });

    lineCanvas.addEventListener('mouseleave', () => {
        hoverMonthIndex = null;
        drawLineChart(currentDistrictId);
        hideChartTooltip();
    });
}

function initDistrictCarousel() {
    const track = document.getElementById('districtTrack');
    if (!track) return;
    const container = track.closest('.month-carousel-mask');

    track.innerHTML = DISTRICTS_ORDER.map(d =>
        `<div class="month-chip district-chip${d.id === currentDistrictId ? ' active-month' : ''}" data-district="${d.id}">${d.name}</div>`
    ).join('');

    const chips = Array.from(track.querySelectorAll('.district-chip'));

    chips.forEach(chip => chip.addEventListener('click', () => {
        const id = chip.dataset.district;
        if (id === currentDistrictId) return;
        currentDistrictId = id;
        chips.forEach(c => c.classList.toggle('active-month', c === chip));
        centerSelectedMonth(track, chip, container);
        hoverMonthIndex = null;
        hideChartTooltip();
        drawLineChart(currentDistrictId);
    }));

    const centerActive = () => {
        const active = track.querySelector('.district-chip.active-month');
        if (active && container) centerSelectedMonth(track, active, container);
    };

    setTimeout(centerActive, 100);
    window.addEventListener('resize', centerActive);
    window.addEventListener('resize', () => drawLineChart(currentDistrictId));

    drawLineChart(currentDistrictId);
}

// ===================================================================
// УТИЛИТЫ ДЛЯ КАРТЫ
// ===================================================================
let currentHeatmapMonth = 'jan';
let currentTooltip = null;
let isZoomedToIzhevsk = false;

function recolorDistricts(month) {
    for (const [districtId, data] of Object.entries(districtsStats)) {
        const stats = data.stats[month];
        if (!stats) continue;
        const path = document.querySelector(`#udmurtiaMap g[id="${districtId}"] path`);
        if (path) path.style.fill = getColorByLevel(getLevelByValue(stats.value));
    }
}

function recolorIzhevskDistricts(month) {
    for (const [districtId, data] of Object.entries(izhevskDistrictsStats)) {
        const stats = data.stats[month];
        if (!stats) continue;
        const path = document.querySelector(`#izhevskMap path[id="${districtId}"]`);
        if (path) path.style.fill = getColorByLevel(getLevelByValue(stats.value));
    }
}

function showTooltip(districtId, event, isIzhevskMap = false) {
    const data = isIzhevskMap ? izhevskDistrictsStats[districtId] : districtsStats[districtId];
    if (!data) return;

    const stats = data.stats[currentHeatmapMonth];
    if (!stats) return;

    if (currentTooltip) currentTooltip.remove();

    const level = getLevelByValue(stats.value);
    const levelText = `${getLevelName(level)} ${getLevelEmoji(level)}`;
    const levelColor = getColorByLevel(level);

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-title">${data.name}</div>
        <div class="tooltip-row"><span>📊 Уровень:</span><span style="color: ${levelColor};">${levelText}</span></div>
        <div class="tooltip-row"><span>📈 Показатель:</span><span>${stats.value}</span></div>
        <div class="tooltip-row"><span>🗓️ Месяц:</span><span>${getMonthName(currentHeatmapMonth)}</span></div>
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
    setTimeout(() => { if (currentTooltip) { currentTooltip.remove(); currentTooltip = null; } }, 5000);
}

function hideTooltip() {
    if (currentTooltip) { currentTooltip.remove(); currentTooltip = null; }
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
                if (districtsStats[districtId]) {
                    showTooltip(districtId, e, false);
                    districts.forEach(d => d.classList.remove('selected'));
                    district.classList.add('selected');
                }
            });
        } else if (path && districtId === 'Izhevsk') {
            path.classList.add('district');
            const mapWrapper = document.getElementById('mapWrapper');
            const backButton = document.getElementById('backButton');
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                zoomToIzhevsk(mapWrapper, backButton);
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

        const izhevskPaths = mapWrapper.querySelectorAll('path');
        izhevskPaths.forEach(path => {
            path.classList.add('district');
            const districtId = path.id;
            const stats = izhevskDistrictsStats[districtId]?.stats[currentHeatmapMonth];
            if (stats) {
                path.style.fill = getColorByLevel(getLevelByValue(stats.value));
            }
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                if (izhevskDistrictsStats[districtId]) {
                    showTooltip(districtId, e, true);
                    izhevskPaths.forEach(p => p.classList.remove('selected'));
                    path.classList.add('selected');
                }
            });
            path.addEventListener('mouseenter', () => {
                path.style.filter = 'brightness(0.95)';
            });
            path.addEventListener('mouseleave', () => {
                path.style.filter = '';
            });
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

function initBarHoverEffects() {
    document.querySelectorAll('.bar').forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            const wrapper = bar.closest('.bar-wrapper');
            if (wrapper) wrapper.style.transform = 'scale(1.02)';
        });
        bar.addEventListener('mouseleave', () => {
            const wrapper = bar.closest('.bar-wrapper');
            if (wrapper) wrapper.style.transform = 'scale(1)';
        });
    });
}

function initBottomMenuScroll() {
    const bottomMenu = document.getElementById('bottomMenu');
    if (!bottomMenu) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) bottomMenu.classList.add('visible'); });
    }, { threshold: 0.1 });
    observer.observe(bottomMenu);
}

function animateContainerAppearance() {
    const container = document.querySelector('.main-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(25px)';
    container.style.transition = 'opacity 1s ease, transform 0.9s ease';
    setTimeout(() => { container.style.opacity = '1'; container.style.transform = 'translateY(0)'; }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    // Карусели
    initCarousel('chartMonthTrack', CAROUSEL_CONFIG.initialMonth, (month) => {
        currentChartMonth = month;
        if (animationStarted) animateBars(month);
    });

    initCarousel('heatmapMonthTrack', CAROUSEL_CONFIG.initialMonth, (month) => {
        currentHeatmapMonth = month;
        if (!isZoomedToIzhevsk) {
            recolorDistricts(month);
        } else {
            recolorIzhevskDistricts(month);
        }
    });

    // График по районам
    initDistrictCarousel();
    initLineChartHandlers();

    animateContainerAppearance();

    // Карта
    setTimeout(() => {
        const mapWrapper = document.getElementById('mapWrapper');
        if (mapWrapper) {
            mapWrapper.innerHTML = UDMURTIA_MAP_SVG;
            initUdmurtiaMapHandlers();
            recolorDistricts(currentHeatmapMonth);
        }
    }, 100);

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        const mapWrapper = document.getElementById('mapWrapper');
        resetToFullMap(mapWrapper, backButton);
    });

    initScrollTrigger();
    initBottomMenuScroll();
    initBarHoverEffects();

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.district')) hideTooltip();
    });

    setTimeout(() => drawLineChart(currentDistrictId), 200);
});
