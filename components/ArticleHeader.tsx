import React from 'react';

const ArticleHeader: React.FC = () => {
    return (
        <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">دست نوشته های من</h2>
            <p className="text-lg text-slate-600 mt-2">مروری بر مقالات و تحلیل‌های منتشر شده</p>
        </header>
    );
};

export default ArticleHeader;
