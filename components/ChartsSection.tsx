import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { ProcessedBook } from '../types.ts';
import RevealOnScroll from './RevealOnScroll.tsx';

interface ChartsSectionProps {
    books: ProcessedBook[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-300 rounded-lg shadow-lg">
                <p className="font-bold text-slate-800">{`${label}`}</p>
                <p className="text-teal-600">{`تعداد: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const ChartsSection: React.FC<ChartsSectionProps> = ({ books }) => {

    const authorData = useMemo(() => {
        const counts = books.reduce((acc: Record<string, number>, book) => {
            acc[book.author] = (acc[book.author] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        // FIX: Cast Object.entries result to fix type inference issues.
        return (Object.entries(counts) as [string, number][])
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [books]);

    const genreData = useMemo(() => {
        const counts = books.reduce((acc: Record<string, number>, book) => {
            acc[book.genre] = (acc[book.genre] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        // FIX: Cast Object.entries result to fix type inference issues.
        return (Object.entries(counts) as [string, number][])
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.count - b.count);
    }, [books]);

    const yearlyData = useMemo(() => {
        const counts = books.reduce((acc: Record<string, number>, book) => {
            if (book.year !== 'نامشخص') {
                acc[book.year] = (acc[book.year] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [books]);

    return (
        <section id="charts-section" className="space-y-8 mb-16">
            <RevealOnScroll>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">فراوانی کتاب‌ها (بر اساس مطالعه) بر اساس نویسنده</h3>
                    <div className="relative h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={authorData} layout="horizontal" margin={{ top: 5, right: 20, left: 0, bottom: 90 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" angle={-60} textAnchor="end" interval={0} />
                                <YAxis allowDecimals={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}/>
                                <Bar dataKey="count" fill="#0d9488" name="تعداد کتاب‌ها" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevealOnScroll>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-center mb-4">تحلیل ژانرهای مطالعه شده</h3>
                        <div className="relative h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={genreData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" allowDecimals={false} />
                                    <YAxis type="category" dataKey="name" width={100} interval={0} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                                    <Bar dataKey="count" fill="#3b82f6" name="تعداد کتاب‌ها" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </RevealOnScroll>
                <RevealOnScroll>
                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-center mb-4">تعداد کتاب‌های مطالعه شده (بر اساس سال)</h3>
                        <div className="relative h-[400px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="تعداد کتاب‌ها" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default ChartsSection;