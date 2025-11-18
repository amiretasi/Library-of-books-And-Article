
import React from 'react';
import type { KpiData } from '../types.ts';
import KpiCard from './KpiCard.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

interface KpiSectionProps {
    data: KpiData;
}

const KpiSection: React.FC<KpiSectionProps> = ({ data }) => {
    return (
        <section id="kpis" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            <RevealOnScroll delay={0}>
                <KpiCard title="کل کتاب‌ها (عناوین یکتا)" value={data.totalBooks} />
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
                <KpiCard title="کل نویسندگان" value={data.totalAuthors} />
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
                <KpiCard title="تعداد دفعات مطالعه" value={data.totalReads} />
            </RevealOnScroll>
            <RevealOnScroll delay={450}>
                <KpiCard title="کتاب‌های ۱۴۰۴" value={data.currentYearBooks} />
            </RevealOnScroll>
        </section>
    );
};

export default KpiSection;