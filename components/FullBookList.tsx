
import React from 'react';
import type { ProcessedBook } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

interface FullBookListProps {
    books: ProcessedBook[];
}

const toPersianNumerals = (str: string | number) => {
    if (str === null || str === undefined) return '';
    const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.toString().replace(/[0-9]/g, (d) => persianNumerals[parseInt(d)]);
};

const FullBookList: React.FC<FullBookListProps> = ({ books }) => {
    const totalBooks = books.length;

    return (
        <RevealOnScroll>
            <section id="full-list-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={<h2 className="text-2xl font-bold text-slate-900">لیست کامل کتاب‌های مطالعه شده</h2>}
                >
                    <div className="overflow-x-auto mt-8 max-h-[520px] overflow-y-auto">
                        <table className="w-full text-sm text-right text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ردیف</th>
                                    <th scope="col" className="px-6 py-3">عنوان کتاب</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">نویسنده</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">مترجم</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">تاریخ نگارش</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">تاریخ مطالعه</th>
                                    <th scope="col" className="px-6 py-3">ژانر</th>
                                    <th scope="col" className="px-6 py-3">ملیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={`${book.id}-${index}`} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{totalBooks - index}</td>
                                        <td className="px-6 py-4 font-semibold">{book.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{book.translator || '---'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{toPersianNumerals(book.originalPubDate)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{toPersianNumerals(book.readYear)}</td>
                                        <td className="px-6 py-4">{book.genre}</td>
                                        <td className="px-6 py-4">{book.nationality}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Accordion>
            </section>
        </RevealOnScroll>
    );
};

export default FullBookList;