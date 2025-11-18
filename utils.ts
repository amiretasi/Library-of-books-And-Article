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

// Converts a Gregorian date to its Jalali equivalent parts.
// This is a simplified version sufficient for the 2025 dates in the dataset.
function gregorianToJalaliParts(gDate: Date): { year: string, month: string } {
    // All English articles in the dataset are in 2025, after March 21, so they are in Jalali year 1404.
    const JALALI_YEAR_START = new Date('2025-03-21T00:00:00Z');
    const jalaliYear = '1404';

    const diff = gDate.getTime() - JALALI_YEAR_START.getTime();
    if (diff < 0) {
        return { year: '1403', month: '12' }; // Simplified fallback
    }
    const daysSinceNewYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Days in each Jalali month (non-leap year)
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    let days = daysSinceNewYear;
    let month = 0;

    for (let i = 0; i < j_days_in_month.length; i++) {
        if (days < j_days_in_month[i]) {
            month = i + 1;
            break;
        }
        days -= j_days_in_month[i];
    }
    
    if (month === 0 && daysSinceNewYear < 365) {
        month = 12;
    } else if (month === 0) {
        return { year: jalaliYear, month: '12' };
    }

    return { year: jalaliYear, month: String(month).padStart(2, '0') };
}

// Converts an approximate Jalali date string to a Gregorian Date object for sorting.
function jalaliToGregorian(jalaliDateStr: string): Date {
    const parts = jalaliDateStr.split('/').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return new Date(0);
    
    const [j_y, j_m, j_d] = parts;
    const j_days_in_month = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    
    if (j_y % 4 === 3) {
        j_days_in_month[12] = 30;
    }

    if (j_m < 1 || j_m > 12 || j_d < 1 || j_d > j_days_in_month[j_m]) {
        return new Date(0);
    }

    let days = j_d;
    for (let i = 1; i < j_m; i++) {
        days += j_days_in_month[i];
    }
    
    const g_start_date = new Date('2025-03-21T00:00:00Z');
    g_start_date.setUTCDate(g_start_date.getUTCDate() + days - 1);
    
    return g_start_date;
}

// Parses both Jalali and Gregorian date strings into a consistent structure with Jalali year/month.
export function parseArticleDate(dateStr: string): { readYear: string, readMonth: string | null, fullReadDate: string, sortableDate: Date } {
    if (!dateStr || typeof dateStr !== 'string') {
        return { readYear: 'N/A', readMonth: null, fullReadDate: dateStr, sortableDate: new Date(0) };
    }

    const isJalali = /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateStr) && dateStr.startsWith('14');
    
    let readYear: string;
    let readMonth: string | null;
    let sortableDate: Date;
    
    if (isJalali) {
        sortableDate = jalaliToGregorian(dateStr);
        const parts = dateStr.split('/');
        readYear = parts[0];
        readMonth = parts.length > 1 ? parts[1].padStart(2, '0') : null;
    } else { // Assume Gregorian
        sortableDate = new Date(dateStr.replace(/\//g, '-'));
        const jalaliParts = gregorianToJalaliParts(sortableDate);
        readYear = jalaliParts.year;
        readMonth = jalaliParts.month;
    }
    
    if (isNaN(sortableDate.getTime())) {
         return { readYear: 'N/A', readMonth: null, fullReadDate: dateStr, sortableDate: new Date(0) };
    }
    
    return { readYear, readMonth, fullReadDate: dateStr, sortableDate };
}
