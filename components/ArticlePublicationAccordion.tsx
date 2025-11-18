import React, { useMemo } from 'react';
import type { ProcessedArticle } from '../types.ts';
import Accordion from './Accordion.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';

interface ArticlePublicationAccordionProps {
    articles: ProcessedArticle[];
}

const ArticlePublicationAccordion: React.FC<ArticlePublicationAccordionProps> = ({ articles }) => {
    const groupedByPublication = useMemo(() => {
        const grouped = articles.reduce((acc: Record<string, ProcessedArticle[]>, article) => {
            const pub = article.publication || 'نامشخص';
            if (!acc[pub]) {
                acc[pub] = [];
            }
            acc[pub].push(article);
            return acc;
        }, {} as Record<string, ProcessedArticle[]>);

        // FIX: Cast Object.entries result to fix type inference issues.
        return (Object.entries(grouped) as [string, ProcessedArticle[]][]).sort(([, aArticles], [, bArticles]) => bArticles.length - aArticles.length);
    }, [articles]);

    return (
        <RevealOnScroll>
            <section id="publications-section" className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-16">
                <Accordion
                    title={<h2 className="text-2xl font-bold text-slate-900">لیست مقالات بر اساس رسانه</h2>}
                >
                    <div className="space-y-4 mt-8">
                        {groupedByPublication.map(([publication, pubArticles]) => {
                            const title = (
                                <h3 className="font-bold text-lg text-slate-800">
                                    {publication}
                                    <span className="text-sm font-medium text-slate-600 mr-2">
                                        ({pubArticles.length} مقاله)
                                    </span>
                                </h3>
                            );

                            return (
                                <Accordion key={publication} title={title}>
                                    <ul className="space-y-1 p-4">
                                        {pubArticles.map((article, index) => (
                                            <li key={article.id} className="text-slate-700 py-2 border-b border-slate-100 last:border-b-0" dir={article.language === 'فارسی' ? 'rtl' : 'ltr'}>
                                                <span className="inline-block w-8 text-left font-medium text-slate-500">{index + 1}.</span>
                                                <strong>
                                                     {article.link && article.link !== '#' ? (
                                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">{article.title}</a>
                                                    ) : (
                                                        article.title
                                                    )}
                                                </strong>
                                                {' '}- <span className="text-sm text-slate-500">({article.date})</span>
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

export default ArticlePublicationAccordion;