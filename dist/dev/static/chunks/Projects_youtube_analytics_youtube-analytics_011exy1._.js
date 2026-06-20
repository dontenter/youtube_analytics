(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/youtube_analytics/youtube-analytics/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "formatNumber",
    ()=>formatNumber,
    "getData",
    ()=>getData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function getData() {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BASE_URL || ''}/data.json`, {
        next: {
            revalidate: 3600
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}
function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/youtube_analytics/youtube-analytics/lib/data.ts [app-client] (ecmascript)");
'use client';
;
;
;
function GameChart({ game }) {
    const data = game.records.map((record)=>({
            ...record,
            formattedDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(record.day)
        }));
    const campaignSet = new Set(game.campaignDates);
    const updateSet = new Set(game.updateDates);
    const hasCampaigns = game.campaignDates.length > 0;
    const hasUpdates = game.updateDates.length > 0;
    const hasEvents = hasCampaigns || hasUpdates;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[400px] w-full rounded-2xl border border-border bg-card p-4 sm:p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                        data: data,
                        margin: {
                            top: 8,
                            right: 8,
                            left: -20,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "gameplaysGradient",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "5%",
                                            stopColor: "#3b82f6",
                                            stopOpacity: 0.3
                                        }, void 0, false, {
                                            fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                            lineNumber: 41,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "95%",
                                            stopColor: "#3b82f6",
                                            stopOpacity: 0
                                        }, void 0, false, {
                                            fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                            lineNumber: 42,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "#262626",
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "day",
                                tickFormatter: (value)=>{
                                    const [, month, day] = value.split('-');
                                    return `${day}.${month}`;
                                },
                                stroke: "#737373",
                                tick: {
                                    fill: '#737373',
                                    fontSize: 12
                                },
                                tickLine: false,
                                axisLine: false,
                                minTickGap: 30
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                stroke: "#737373",
                                tick: {
                                    fill: '#737373',
                                    fontSize: 12
                                },
                                tickLine: false,
                                axisLine: false,
                                tickFormatter: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(value)
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                content: ({ active, payload, label })=>{
                                    if (active && payload && payload.length) {
                                        const isCampaignDay = campaignSet.has(label);
                                        const isUpdateDay = updateSet.has(label);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border border-border bg-background px-3 py-2 shadow-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(label)
                                                }, void 0, false, {
                                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm font-semibold text-foreground",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(payload[0].value),
                                                        " геймплеев"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 23
                                                }, this),
                                                isCampaignDay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs font-medium text-accent",
                                                    children: "Запуск рекламной кампании"
                                                }, void 0, false, {
                                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 25
                                                }, this),
                                                isUpdateDay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs font-medium text-emerald-500",
                                                    children: "Апдейт игры"
                                                }, void 0, false, {
                                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                            lineNumber: 71,
                                            columnNumber: 21
                                        }, this);
                                    }
                                    return null;
                                }
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            game.campaignDates.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    x: date,
                                    stroke: "#3b82f6",
                                    strokeDasharray: "4 4",
                                    strokeOpacity: 0.6,
                                    ifOverflow: "extendDomain"
                                }, `campaign-${date}`, false, {
                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this)),
                            game.updateDates.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    x: date,
                                    stroke: "#10b981",
                                    strokeDasharray: "4 4",
                                    strokeOpacity: 0.6,
                                    ifOverflow: "extendDomain"
                                }, `update-${date}`, false, {
                                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                type: "monotone",
                                dataKey: "gameplays",
                                stroke: "#3b82f6",
                                strokeWidth: 2,
                                fill: "url(#gameplaysGradient)",
                                animationDuration: 1000
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            hasEvents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted",
                children: [
                    hasCampaigns && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-4 w-px border-l-2 border-dashed border-accent/60"
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "кампании"
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                        lineNumber: 126,
                        columnNumber: 13
                    }, this),
                    hasUpdates && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-4 w-px border-l-2 border-dashed border-emerald-500/60"
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$youtube_analytics$2f$youtube$2d$analytics$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "апдейты"
                            }, void 0, false, {
                                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                        lineNumber: 132,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/youtube_analytics/youtube-analytics/components/GameChart.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = GameChart;
var _c;
__turbopack_context__.k.register(_c, "GameChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Projects_youtube_analytics_youtube-analytics_011exy1._.js.map