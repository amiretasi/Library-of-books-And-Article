
import React from 'react';
import KpiCard from './KpiCard.tsx';
import { ArticleKpiData } from '../types.ts';

interface ArticleKpiSectionProps {
    data: ArticleKpiData;
}

const ArticleKpiSection: React.FC<ArticleKpiSectionProps> = ({ data }) => {
    return (
        <section id="kpis" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            <KpiCard title="کل مقالات" value={data.totalArticles} />
            <KpiCard title="تعداد رسانه‌ها" value={data.totalPublications} />
            <KpiCard title="مقالات فارسی" value={data.persianArticles} />
            <KpiCard title="مقالات انگلیسی" value={data.englishArticles} />
        </section>
    );
};

export default ArticleKpiSection;