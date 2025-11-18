
import React from 'react';
import type { KpiData } from '../types.ts';
import KpiCard from './KpiCard.tsx';

interface KpiSectionProps {
    data: KpiData;
}

const KpiSection: React.FC<KpiSectionProps> = ({ data }) => {
    return (
        <section id="kpis" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            <KpiCard title="کل کتاب‌ها (عناوین یکتا)" value={data.totalBooks} />
            <KpiCard title="کل نویسندگان" value={data.totalAuthors} />
            <KpiCard title="تعداد دفعات مطالعه" value={data.totalReads} />
            <KpiCard title="کتاب‌های ۱۴۰۴" value={data.currentYearBooks} />
        </section>
    );
};

export default KpiSection;