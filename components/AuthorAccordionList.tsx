import React, { useMemo } from 'react';
import type { ProcessedBook } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

interface AuthorAccordionListProps {
    books: ProcessedBook[];
}

const AuthorAccordionList: React.FC<AuthorAccordionListProps> = ({ books }) => {
    const groupedByAuthor = useMemo(() => {
        const grouped = books.reduce((acc: Record<string, ProcessedBook[]>, book) => {
            const author = book.author || 'نامشخص';
            if (!acc[author]) {
                acc[author] = [];
            }
            acc[author].push(book);
            return acc;
        }, {} as Record<string, ProcessedBook[]>);

        // FIX: Cast Object.entries result to fix type inference issues.
        return (Object.entries(grouped) as [string, ProcessedBook[]][]).sort(([, aBooks], [, bBooks]) => bBooks.length - aBooks.length);
    }, [books]);

    return (
        <RevealOnScroll>
            <section id="author-list-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={
                        <h2 className="text-2xl font-bold text-slate-900">لیست کتاب‌ها بر اساس نویسنده</h2>
                    }
                >
                    <div className="space-y-4 mt-8">
                        {groupedByAuthor.map(([author, authorBooks]) => {
                            const booksByTitle = authorBooks.reduce((acc: Record<string, { book: ProcessedBook; readYears: string[] }>, book) => {
                                if (!acc[book.title]) {
                                    acc[book.title] = {
                                        book: book,
                                        readYears: [],
                                    };
                                }
                                acc[book.title].readYears.push(book.readYear);
                                return acc;
                            }, {} as Record<string, { book: ProcessedBook; readYears: string[] }>);

                            // FIX: Cast Object.values result to fix type inference issues.
                            const sortedBooks = (Object.values(booksByTitle) as { book: ProcessedBook; readYears: string[] }[])
                                .sort((a, b) => {
                                    const latestYearA = [...a.readYears].sort((y1, y2) => y2.localeCompare(y1))[0];
                                    const latestYearB = [...b.readYears].sort((y1, y2) => y2.localeCompare(y1))[0];
                                    return latestYearB.localeCompare(latestYearA);
                                });

                            const title = (
                                <h3 className="font-bold text-lg text-slate-800">
                                    {author}
                                    <span className="text-sm font-medium text-slate-600 mr-2">
                                        ({Object.keys(booksByTitle).length} کتاب / {authorBooks.length} بار خوانش)
                                    </span>
                                </h3>
                            );

                            return (
                                <Accordion key={author} title={title}>
                                    <ul className="space-y-1 p-4">
                                        {sortedBooks.map(({ book, readYears }, index) => {
                                            const dates = readYears.sort((a, b) => a.localeCompare(b)).join(' - ');
                                            const translatorText =
                                                book.translator && !['تألیفی', 'تصحیح شفیعی کدکنی', 'تصحیح قزوینی', 'تصحیح نیکلسون', 'تصحیح فروزانفر', 'تصحیح موحد', 'تصحیح وحید دستگردی', 'تصحیح هانری کربن', 'تصحیح فروغی'].includes(book.translator)
                                                    ? ` - ${book.translator}`
                                                    : '';
                                            const listNumber = sortedBooks.length - index;
                                            return (
                                                <li key={`${book.id}-${readYears[0]}`} className="text-slate-700 py-2 border-b border-slate-100 last:border-b-0 text-right">
                                                    <span className="inline-block w-8 text-left font-medium text-slate-500">{listNumber}.</span>
                                                    <strong>{book.title}</strong>
                                                    {translatorText} -{' '}
                                                    <span className="text-sm text-slate-500">({dates})</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Accordion>
                            );
                        })}
                    </div>
                </Accordion>
            </section>
        </RevealOnScroll>
    );
};

export default AuthorAccordionList;