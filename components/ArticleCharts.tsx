
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import type { ProcessedArticle } from '../types.ts';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        const finalLabel = label || data.name; // `label` for bar/line, `data.name` for pie
        const finalValue = data.value;
        const color = data.fill || (data.payload && data.payload.fill) || data.stroke;

        return (
            <div className="bg-white p-3 border border-slate-300 rounded-lg shadow-lg">
                <p className="font-bold text-slate-800">{`${finalLabel}`}</p>
                <p style={{ color: color }}>{`تعداد: ${finalValue}`}</p>
            </div>
        );
    }
    return null;
};

interface ArticleChartsProps {
    articles: ProcessedArticle[];
}

const JALALI_MONTHS_SHORT = ['فر', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'];

const ArticleCharts: React.FC<ArticleChartsProps> = ({ articles }) => {
    const chartColors = ['#14b8a6', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#64748b', '#0891b2', '#f97316' ];

    const publicationData = useMemo(() => {
        const counts = articles.reduce((acc: Record<string, number>, article) => {
            acc[article.publication] = (acc[article.publication] || 0) + 1;
            return acc;
        }, {});
        // FIX: Cast Object.entries result to fix type inference issues.
        return (Object.entries(counts) as [string, number][])
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count); // FIX: Sort descending
    }, [articles]);

    const themeData = useMemo(() => {
        const allKeywords = articles.flatMap(a => a.keywords || []).filter(k => k);
        const themeCounts = allKeywords.reduce((acc: Record<string, number>, keyword) => {
            let key = keyword;
            if (keyword === 'جهان' || keyword === 'جهانی') key = 'اقتصاد جهانی';
            if (keyword === 'منطقه') key = 'آسیا';
            if (keyword === 'آب' || keyword === 'برق') key = 'انرژی (آب و برق)';
            if (keyword === 'خودرو') key = 'صنعت';
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        // FIX: Cast Object.entries result to fix type inference issues for filter and sort.
        return (Object.entries(themeCounts) as [string, number][])
            .filter(([, count]) => count > 0)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count) // FIX: Sort descending
            .slice(0, 12); // Take top 12
    }, [articles]);

    const monthlyData = useMemo(() => {
        const counts = articles.reduce((acc: Record<string, number>, article) => {
            const key = (article.readYear && article.readMonth) ? `${article.readYear}-${article.readMonth.padStart(2, '0')}` : null;
            if (key) {
                acc[key] = (acc[key] || 0) + 1;
            }
            return acc;
        }, {});
        return Object.entries(counts)
            .map(([key, count]) => {
                const [year, month] = key.split('-');
                let name = key;
                if (year === '1404') {
                    name = JALALI_MONTHS_SHORT[parseInt(month, 10) -1]
                } else {
                    const date = new Date(parseInt(year), parseInt(month) - 1);
                    name = date.toLocaleString('en-US', { month: 'short' });
                }
                return { key, count, name };
            })
            .sort((a, b) => a.key.localeCompare(b.key));
    }, [articles]);
    
    const categoryData = useMemo(() => {
        const counts = articles.reduce((acc: Record<string, number>, article) => {
            const category = article.category || 'سایر';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        // FIX: Cast Object.entries result to fix type inference issues for filter.
        return (Object.entries(counts) as [string, number][])
            .map(([name, count]) => ({ name, count }))
            .filter(item => item.count > 0);
    }, [articles]);

    return (
        <section id="charts-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-16">
            <div className="bg-white rounded-xl shadow-md p-2">
                <h3 className="text-lg font-semibold text-center mb-4">فراوانی انتشار در رسانه‌ها</h3>
                <div className="relative h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={publicationData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="name" width={80} interval={0} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }} />
                            <Bar dataKey="count" fill={chartColors[0]} name="تعداد مقالات" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-2">
                <h3 className="text-lg font-semibold text-center mb-4">تحلیل موضوعات کلیدی مقالات</h3>
                <div className="relative h-[320px]">
                   <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={themeData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="name" width={80} interval={0} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }} />
                            <Bar dataKey="count" fill={chartColors[1]} name="تکرار موضوع" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-2">
                <h3 className="text-lg font-semibold text-center mb-4">تعداد مقالات در هر ماه</h3>
                <div className="relative h-[320px]">
                   <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="count" stroke={chartColors[2]} strokeWidth={2} name="تعداد مقالات" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-2">
                <h3 className="text-lg font-semibold text-center mb-4">تفکیک حوزه‌های موضوعی</h3>
                 <div className="relative h-[320px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                            <Pie data={categoryData} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100}>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default ArticleCharts;