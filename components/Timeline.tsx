import React, { useMemo } from 'react';
import type { ProcessedBook } from '../types.ts';
import { JALALI_MONTHS } from '../constants.ts';
import RevealOnScroll from './RevealOnScroll.tsx';

interface TimelineProps {
    books: ProcessedBook[];
}

const Timeline: React.FC<TimelineProps> = ({ books }) => {
    const timelineData = useMemo(() => {
        const booksByYear = books.reduce((acc: Record<string, ProcessedBook[]>, book) => {
            const year = book.year;
            if (year === 'نامشخص') return acc;
            if (!acc[year]) acc[year] = [];
            acc[year].push(book);
            return acc;
        }, {} as Record<string, ProcessedBook[]>);

        return Object.entries(booksByYear).sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
    }, [books]);

    return (
        <RevealOnScroll>
            <section id="timeline-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">خط زمانی مطالعه کتاب‌ها</h2>
                <div id="timeline-container" className="relative max-w-3xl mx-auto">
                    <div className="timeline-line"></div>
                    {timelineData.map(([year, yearBooks]) => {
                        if (year === '1404') {
                             const booksByMonth1404 = yearBooks.reduce((acc: Record<string, ProcessedBook[]>, book) => {
                                if (book.month) {
                                    if (!acc[book.month]) acc[book.month] = [];
                                    acc[book.month].push(book);
                                }
                                return acc;
                            }, {} as Record<string, ProcessedBook[]>);

                            // FIX: Cast Object.entries result to fix type inference issues.
                            const sortedMonths: [string, ProcessedBook[]][] = (Object.entries(booksByMonth1404) as [string, ProcessedBook[]][]).sort((a, b) => b[0].localeCompare(a[0]));

                            return sortedMonths.map(([month, monthBooks]) => {
                                const monthName = JALALI_MONTHS[parseInt(month, 10) - 1];
                                return (
                                    <div key={`${year}-${month}`} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <h3 className="font-bold text-lg text-slate-800">{`${monthName} ${year}`}</h3>
                                        <ul className="mt-3 space-y-2">
                                            {monthBooks.map((book, index) => {
                                                const translatorText = book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator) ? ` - ${book.translator}` : '';
                                                return <li key={`${book.id}-${index}`} className="text-slate-700"><strong>{book.title}</strong> - {book.author}{translatorText} <span className="text-xs text-slate-500">({book.readYear})</span></li>
                                            })}
                                        </ul>
                                    </div>
                                )
                            })
                        }
                        
                        return (
                            <div key={year} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <h3 className="font-bold text-lg text-slate-800">سال {year}</h3>
                                <ul className="mt-3 space-y-2">
                                    {yearBooks.map((book, index) => {
                                       const translatorText = book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator) ? ` - ${book.translator}` : '';
                                        return <li key={`${book.id}-${index}`} className="text-slate-700"><strong>{book.title}</strong> - {book.author}{translatorText} <span className="text-xs text-slate-500">({book.readYear})</span></li>
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

export default Timeline;