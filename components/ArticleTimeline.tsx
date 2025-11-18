import React, { useMemo } from 'react';
import type { ProcessedArticle } from '../types.ts';
import RevealOnScroll from './RevealOnScroll.tsx';

interface ArticleTimelineProps {
    articles: ProcessedArticle[];
}

const JALALI_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

const ArticleTimeline: React.FC<ArticleTimelineProps> = ({ articles }) => {
    const timelineData = useMemo(() => {
        const articlesByMonth = articles.reduce((acc: Record<string, ProcessedArticle[]>, article) => {
            const monthYearKey = (article.readYear && article.readMonth) ? `${article.readYear}-${article.readMonth.padStart(2, '0')}` : null;
            if (monthYearKey) {
                if (!acc[monthYearKey]) {
                    acc[monthYearKey] = [];
                }
                acc[monthYearKey].push(article);
            }
            return acc;
        }, {} as Record<string, ProcessedArticle[]>);

        return Object.entries(articlesByMonth).sort(([keyA], [keyB]) => keyB.localeCompare(keyA));
    }, [articles]);

    return (
        <RevealOnScroll>
            <section id="timeline-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">خط زمانی انتشار مقالات</h2>
                <div id="timeline-container" className="relative max-w-3xl mx-auto">
                    <div className="timeline-line"></div>
                    {timelineData.map(([monthKey, monthArticles]) => {
                        const [year, month] = monthKey.split('-');
                        const monthName = year === '1404' ? JALALI_MONTHS[parseInt(month, 10) - 1] : monthKey;
                        const displayTitle = year === '1404' ? `${monthName} ${year}`: monthKey;

                        return (
                             <div key={monthKey} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <h3 className="font-bold text-lg text-slate-800">{displayTitle}</h3>
                                 <p className="text-amber-600 font-semibold my-2">{monthArticles.length} مقاله منتشر شده</p>
                                <ul className="mt-2 list-inside space-y-2 text-slate-600">
                                    {monthArticles.map(article => {
                                        const titleLink = article.link && article.link !== '#'
                                            ? <a href={article.link || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">{article.title}</a>
                                            : article.title;
                                        return (
                                            <li key={article.id} dir={article.language === 'فارسی' ? 'rtl' : 'ltr'}>
                                                {titleLink} <span className="text-xs text-slate-400">({article.publication} - {article.date})</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </section>
        </RevealOnScroll>
    );
};

export default ArticleTimeline;
