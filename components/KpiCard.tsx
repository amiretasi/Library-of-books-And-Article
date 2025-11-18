import React from 'react';

interface KpiCardProps {
    title: string;
    value: number | string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-semibold text-slate-500">{title}</h3>
            <p className="text-4xl font-bold text-teal-600 mt-2">{value}</p>
        </div>
    );
};

export default KpiCard;