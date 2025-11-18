
export interface Book {
    id: number | string;
    title: string;
    author: string;
    originalPubDate: string;
    readYear: string;
    genre: string;
    translator: string;
    nationality: string;
}

export interface ProcessedBook extends Book {
    year: string;
    month: string | null;
    day: string | null;
    full: string;
}

export interface KpiData {
    totalBooks: number;
    totalAuthors: number;
    totalReads: number;
    currentYearBooks: number;
}

export interface Article {
    id: number;
    title: string;
    publication: string;
    date: string;
    language: 'فارسی' | 'انگلیسی';
    link?: string;
    category: string;
    keywords: string[];
}

export interface ProcessedArticle extends Article {
    readYear: string;
    readMonth: string | null;
    fullReadDate: string; // The original date string
    sortableDate: Date; // A converted Date object for sorting
}

export interface ArticleKpiData {
    totalArticles: number;
    totalPublications: number;
    persianArticles: number;
    englishArticles: number;
}
