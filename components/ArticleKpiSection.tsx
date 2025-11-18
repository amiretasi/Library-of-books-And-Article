import React from 'react';
import KpiCard from './KpiCard.tsx';
import { ArticleKpiData } from '../types.ts';
import RevealOnScroll from './RevealOnScroll.tsx';

interface ArticleKpiSectionProps {
    data: ArticleKpiData;
}

const ArticleKpiSection: React.FC<ArticleKpiSectionProps> = ({ data }) => {
    return (
        <section id="kpis" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            <RevealOnScroll delay={0}>
                <KpiCard title="کل مقالات" value={data.totalArticles} />
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
                <KpiCard title="تعداد رسانه‌ها" value={data.totalPublications} />
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
                <KpiCard title="مقالات فارسی" value={data.persianArticles} />
            </RevealOnScroll>
            <RevealOnScroll delay={450}>
                <KpiCard title="مقالات انگلیسی" value={data.englishArticles} />
            </RevealOnScroll>
        </section>
    );
};

export default ArticleKpiSection;