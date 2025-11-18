import React, { useMemo } from 'react';
import { articlesData } from '../articlesData.ts';
import type { ProcessedArticle, ArticleKpiData } from '../types.ts';
import ArticleNav from './ArticleNav.tsx';
import ArticleHeader from './ArticleHeader.tsx';
import ArticleKpiSection from './ArticleKpiSection.tsx';
import FullArticleList from './FullArticleList.tsx';
import ArticleCharts from './ArticleCharts.tsx';
import Footer from './Footer.tsx';
import ScrollButton from './ScrollButton.tsx';
import ArticlePublicationAccordion from './ArticlePublicationAccordion.tsx';
import ArticleCategoryAccordion from './ArticleCategoryAccordion.tsx';
import ArticleTimeline from './ArticleTimeline.tsx';
import RevealOnScroll from './RevealOnScroll.tsx';
import { parseArticleDate } from '../utils.ts';

const ArticlesApp: React.FC = () => {
    const processedData: ProcessedArticle[] = useMemo(() => {
        return articlesData.map(article => {
            const dateInfo = parseArticleDate(article.date);
            return { ...article, ...dateInfo };
        }).sort((a, b) => b.sortableDate.getTime() - a.sortableDate.getTime());
    }, []);

    const kpiData: ArticleKpiData = useMemo(() => {
        const publications = new Set(processedData.map(a => a.publication));
        const persianCount = processedData.filter(a => a.language === 'فارسی').length;
        const englishCount = processedData.filter(a => a.language === 'انگلیسی').length;
        return {
            totalArticles: processedData.length,
            totalPublications: publications.size,
            persianArticles: persianCount,
            englishArticles: englishCount
        };
    }, [processedData]);

    return (
        <>
            <ArticleNav />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <ArticleHeader />
                <ArticleKpiSection data={kpiData} />
                <FullArticleList articles={processedData} />
                <ArticleCharts articles={processedData} />
                <ArticlePublicationAccordion articles={processedData} />
                <ArticleCategoryAccordion articles={processedData} />
                <ArticleTimeline articles={processedData} />
            </main>
            <Footer />
            <ScrollButton />
        </>
    );
};

export default ArticlesApp;