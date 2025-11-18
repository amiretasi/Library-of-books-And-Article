import React from 'react';

interface HeaderProps {
    navigateToArticles: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigateToArticles }) => {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent the default anchor link behavior
        e.preventDefault();
        
        // Get the target element's ID from the href attribute
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Use scrollIntoView for smooth scrolling, which works reliably in iframes
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-slate-200">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* The title is now provided by the Intro component's animation */}
                <div aria-hidden="true" style={{width: '10rem'}}></div>
                <ul className="flex flex-wrap justify-end items-center gap-x-6 gap-y-2 font-semibold">
                    <li><a href="#kpis" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">شاخص‌ها</a></li>
                    <li><a href="#full-list-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">لیست کامل</a></li>
                    <li><a href="#author-list-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">بر اساس نویسنده</a></li>
                    <li><a href="#genre-list-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">بر اساس ژانر</a></li>
                    <li><a href="#charts-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">نمودارها</a></li>
                    <li><a href="#timeline-section" onClick={handleSmoothScroll} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">خط زمانی</a></li>
                    {/* The articles link now navigates to the articles react app */}
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToArticles(); }} className="text-slate-600 hover:text-teal-600 transition-colors duration-200">مقاله های من</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
