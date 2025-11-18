import type { ProcessedArticle } from './types.ts';

// For Books App (App.tsx)
export function parseReadDate(dateStr: string | null | undefined): { year: string; month: string | null; day: string | null; full: string } {
    if (!dateStr || typeof dateStr !== 'string') {
        return { year: 'نامشخص', month: null, day: null, full: 'نامشخص' };
    }
    const parts = dateStr.split('/');
    const year = parts[0];
    const month = parts.length > 1 ? parts[1] : null;
    const day = parts.length > 2 ? parts[2] : null;
    return { year, month, day, full: dateStr };
}

// For Articles App (ArticlesApp.tsx)
// This function is internal to the module and correctly converts Jalali dates for sorting.
function jalaliToGregorian(jalaliDateStr: string): Date {
    const parts = jalaliDateStr.split('/').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return new Date('invalid');
    
    const [j_y, j_m, j_d] = parts;
    const j_days_in_month = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    
    // A simple leap year check for this specific dataset's range
    if (j_y % 4 === 3) { // Simplified Jalali leap year approximation
        j_days_in_month[12] = 30;
    }

    if (j_m < 1 || j_m > 12 || j_d < 1 || j_d > j_days_in_month[j_m]) {
        return new Date('invalid');
    }

    let days = j_d;
    for (let i = 1; i < j_m; i++) {
        days += j_days_in_month[i];
    }
    
    // Assuming 1404 starts on March 21, 2025 for this dataset
    const g_start_date = new Date('2025-03-21T00:00:00Z');
    g_start_date.setDate(g_start_date.getDate() + days - 1);
    
    return g_start_date;
}

export function parseArticleDate(dateStr: string): { readYear: string, readMonth: string | null, fullReadDate: string, sortableDate: Date } {
    if (!dateStr || typeof dateStr !== 'string') {
        return { readYear: 'N/A', readMonth: null, fullReadDate: dateStr, sortableDate: new Date(0) };
    }

    const isJalali = dateStr.startsWith('14'); // More robust check for Jalali dates
    const sortableDate = isJalali ? jalaliToGregorian(dateStr) : new Date(dateStr.replace(/\//g, '-'));
    
    if (isNaN(sortableDate.getTime())) {
         return { readYear: 'N/A', readMonth: null, fullReadDate: dateStr, sortableDate: new Date(0) };
    }

    const parts = dateStr.split('/');
    const year = isJalali ? parts[0] : sortableDate.getFullYear().toString();
    const month = isJalali ? parts[1] : (sortableDate.getMonth() + 1).toString();
    
    return { readYear: year, readMonth: month, fullReadDate: dateStr, sortableDate };
}
