import React from 'react';
import type { ProcessedArticle } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

interface FullArticleListProps {
    articles: ProcessedArticle[];
}

const FullArticleList: React.FC<FullArticleListProps> = ({ articles }) => {
    const totalArticles = articles.length;

    return (
        <RevealOnScroll>
            <section id="full-list-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                 <Accordion
                    title={<h2 className="text-2xl font-bold text-slate-900">لیست کامل مقالات منتشر شده</h2>}
                >
                    <div className="overflow-x-auto mt-8 max-h-[520px] overflow-y-auto">
                        <table className="w-full text-sm text-right text-slate-500">
                             <thead className="text-xs text-slate-700 uppercase bg-slate-50 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-right">ردیف</th>
                                    <th scope="col" className="px-6 py-3 text-right w-2/5">عنوان مقاله</th>
                                    <th scope="col" className="px-6 py-3 text-right">رسانه</th>
                                    <th scope="col" className="px-6 py-3 text-right">تاریخ</th>
                                    <th scope="col" className="px-6 py-3 text-right">حوزه</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, index) => (
                                    <tr key={article.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{totalArticles - index}</td>
                                        <td className="px-6 py-4 font-semibold text-right">
                                            {article.link && article.link !== '#' ? (
                                                <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">{article.title}</a>
                                            ) : (
                                                article.title
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">{article.publication}</td>
                                        <td className="px-6 py-4 text-right">{article.date}</td>
                                        <td className="px-6 py-4 text-right">{article.category}</td>
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

export default FullArticleList;
