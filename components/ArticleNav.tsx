import React from 'react';

interface ArticleNavProps {
    navigateToBooks: () => void;
}

const ArticleNav: React.FC<ArticleNavProps> = ({ navigateToBooks }) => {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <nav className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-50 border-b border-slate-200">
            <div className="container mx-auto flex justify-center items-center p-4">
                <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 font-semibold">
                    <li><a href="#kpis" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">شاخص‌ها</a></li>
                    <li><a href="#full-list-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">لیست کامل</a></li>
                    <li><a href="#charts-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">نمودارها</a></li>
                    <li><a href="#publications-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">رسانه‌ها</a></li>
                    <li><a href="#category-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">حوزه‌ها</a></li>
                    <li><a href="#timeline-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">خط زمانی</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToBooks(); }} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">کتاب های من</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default ArticleNav;
