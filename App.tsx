

import React, { useMemo, useState } from 'react';
// Book imports
import { booksData } from './constants.ts';
import type { ProcessedBook, ProcessedArticle, ArticleKpiData } from './types.ts';
import Header from './components/Header.tsx';
import PageHeader from './components/PageHeader.tsx';
import KpiSection from './components/KpiSection.tsx';
import FullBookList from './components/FullBookList.tsx';
import ChartsSection from './components/ChartsSection.tsx';
import AuthorAccordionList from './components/AuthorAccordionList.tsx';
import GenreAccordionList from './components/GenreAccordionList.tsx';
import Timeline from './components/Timeline.tsx';
import Footer from './components/Footer.tsx';
import ScrollButton from './components/ScrollButton.tsx';
import Intro from './components/Intro.tsx';
import { parseReadDate, parseArticleDate } from './utils.ts';

// Article imports
import { articlesData } from './articlesData.ts';
import ArticleNav from './components/ArticleNav.tsx';
import ArticleHeader from './components/ArticleHeader.tsx';
import ArticleKpiSection from './components/ArticleKpiSection.tsx';
import FullArticleList from './components/FullArticleList.tsx';
import ArticleCharts from './components/ArticleCharts.tsx';
import ArticlePublicationAccordion from './components/ArticlePublicationAccordion.tsx';
import ArticleCategoryAccordion from './components/ArticleCategoryAccordion.tsx';
import ArticleTimeline from './components/ArticleTimeline.tsx';


const App: React.FC = () => {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [isIntroSequenceFinished, setIsIntroSequenceFinished] = useState(false);
    const [view, setView] = useState<'books' | 'articles'>('books');

    // This function is called by Intro.tsx after its CSS transition (1s) is complete.
    const handleAnimationFinish = () => {
        // 1. Start fading in the main content (which takes 500ms).
        setIsContentLoaded(true);
        
        // 2. After the content fade-in is complete, we mark the entire intro
        //    sequence as finished. This will be passed to Intro.tsx to trigger
        //    the CSS change from `position: fixed` to `position: absolute`.
        setTimeout(() => {
            setIsIntroSequenceFinished(true);
        }, 500);
    };


    // Book data processing
    const processedBookData: ProcessedBook[] = useMemo(() => {
        return booksData.map(book => {
            const dateInfo = parseReadDate(book.readYear);
            return { ...book, ...dateInfo };
        }).sort((a, b) => {
            if (a.full.length !== b.full.length) {
                return b.full.length - a.full.length;
            }
            return b.full.localeCompare(a.full);
        });
    }, []);
    
    const bookKpiData = useMemo(() => {
        const uniqueTitles = new Set(processedBookData.map(b => b.title));
        const uniqueAuthors = new Set(processedBookData.map(b => b.author));
        const totalReads = processedBookData.length;
        const currentYearBooks = processedBookData.filter(b => b.year === '1404').length;

        return {
            totalBooks: uniqueTitles.size,
            totalAuthors: uniqueAuthors.size,
            totalReads,
            currentYearBooks,
        };
    }, [processedBookData]);

    // Article data processing
    const processedArticleData: ProcessedArticle[] = useMemo(() => {
        return articlesData.map(article => {
            const dateInfo = parseArticleDate(article.date);
            return { ...article, ...dateInfo };
        }).sort((a, b) => b.sortableDate.getTime() - a.sortableDate.getTime());
    }, []);

    const articleKpiData: ArticleKpiData = useMemo(() => {
        const publications = new Set(processedArticleData.map(a => a.publication));
        const persianCount = processedArticleData.filter(a => a.language === 'فارسی').length;
        const englishCount = processedArticleData.filter(a => a.language === 'انگلیسی').length;
        return {
            totalArticles: processedArticleData.length,
            totalPublications: publications.size,
            persianArticles: persianCount,
            englishArticles: englishCount
        };
    }, [processedArticleData]);


    const renderBookView = () => (
        <>
            <Header navigateToArticles={() => setView('articles')} />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <PageHeader />
                <KpiSection data={bookKpiData} />
                <FullBookList books={processedBookData} />
                <ChartsSection books={processedBookData} />
                <AuthorAccordionList books={processedBookData} />
                <GenreAccordionList books={processedBookData} />
                <Timeline books={processedBookData} />
            </main>
        </>
    );

    const renderArticleView = () => (
        <>
            <ArticleNav navigateToBooks={() => setView('books')} />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <ArticleHeader />
                <ArticleKpiSection data={articleKpiData} />
                <FullArticleList articles={processedArticleData} />
                <ArticleCharts articles={processedArticleData} />
                <ArticlePublicationAccordion articles={processedArticleData} />
                <ArticleCategoryAccordion articles={processedArticleData} />
                <ArticleTimeline articles={processedArticleData} />
            </main>
        </>
    );

    return (
        <>
            <Intro 
                onAnimationFinish={handleAnimationFinish} 
                isSequenceFinished={isIntroSequenceFinished} 
            />
            <div className={!isContentLoaded ? 'content-hidden' : 'content-visible'}>
                {view === 'books' ? renderBookView() : renderArticleView()}
                <Footer />
                <ScrollButton />
            </div>
        </>
    );
};

export default App;