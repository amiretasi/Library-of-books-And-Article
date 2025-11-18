import React, { useMemo } from 'react';
import type { ProcessedArticle } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

interface ArticleCategoryAccordionProps {
    articles: ProcessedArticle[];
}

const ArticleCategoryAccordion: React.FC<ArticleCategoryAccordionProps> = ({ articles }) => {
    const groupedByCategory = useMemo(() => {
        const grouped = articles.reduce((acc: Record<string, ProcessedArticle[]>, article) => {
            const cat = article.category || 'نامشخص';
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(article);
            return acc;
        }, {} as Record<string, ProcessedArticle[]>);

        // FIX: Cast Object.entries result to fix type inference issues.
        return (Object.entries(grouped) as [string, ProcessedArticle[]][]).sort(([, aArticles], [, bArticles]) => bArticles.length - aArticles.length);
    }, [articles]);

    return (
        <RevealOnScroll>
            <section id="category-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={<h2 className="text-2xl font-bold text-slate-900">لیست مقالات بر اساس حوزه موضوعی</h2>}
                >
                    <div className="space-y-4 mt-8">
                        {groupedByCategory.map(([category, catArticles]) => {
                            const title = (
                                <h3 className="font-bold text-lg text-slate-800">
                                    {category}
                                    <span className="text-sm font-medium text-slate-600 mr-2">
                                        ({catArticles.length} مقاله)
                                    </span>
                                </h3>
                            );

                            return (
                                <Accordion key={category} title={title}>
                                    <ul className="space-y-1 p-4">
                                        {catArticles.map((article, index) => (
                                            <li key={article.id} className="text-slate-700 py-2 border-b border-slate-100 last:border-b-0" dir={article.language === 'فارسی' ? 'rtl' : 'ltr'}>
                                                <span className="inline-block w-8 text-left font-medium text-slate-500">{index + 1}.</span>
                                                <strong>
                                                    {article.link && article.link !== '#' ? (
                                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">{article.title}</a>
                                                    ) : (
                                                        article.title
                                                    )}
                                                </strong>
                                                {' '}- <span className="text-sm text-slate-500">({article.publication} - {article.date})</span>
                                            </li>
                                        ))}
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

export default ArticleCategoryAccordion;