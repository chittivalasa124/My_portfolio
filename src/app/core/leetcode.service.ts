import { Injectable, signal } from '@angular/core';

export interface LeetCodeDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  submissions: number;
  totalActiveDays: number;
  maxStreak: number;
  calendar: LeetCodeDay[];
  loading: boolean;
  error: boolean;
}

const DEFAULT_SUBMISSION_CALENDAR: Record<string, number> = {
  '1780012800': 1,
  '1780099200': 1,
  '1780272000': 2,
  '1785024000': 2,
  '1785110400': 2,
  '1785369600': 5,
  '1785801600': 7,
  '1785974400': 1,
  '1786060800': 1,
  '1793059200': 2
};

@Injectable({
  providedIn: 'root'
})
export class LeetCodeService {
  readonly username = 'chittivalasa-rakesh';
  readonly profileUrl = 'https://leetcode.com/u/chittivalasa-rakesh/';

  private initialData = this.buildCalendarFromMap(DEFAULT_SUBMISSION_CALENDAR);

  // Initial state initialized with latest verified counts
  stats = signal<LeetCodeStats>({
    totalSolved: 10,
    totalQuestions: 4095,
    easySolved: 7,
    totalEasy: 974,
    mediumSolved: 2,
    totalMedium: 2135,
    hardSolved: 1,
    totalHard: 986,
    submissions: 24,
    totalActiveDays: 10,
    maxStreak: 2,
    calendar: this.initialData.calendar,
    loading: false,
    error: false
  });

  fetchStats(): void {
    if (typeof window === 'undefined') return;

    this.stats.update((s) => ({ ...s, loading: true }));

    // 1. Immediately load local pre-extracted cached file
    fetch('leetcode-contributions.json')
      .then((res) => {
        if (!res.ok) throw new Error('Not loaded');
        return res.json();
      })
      .then((data) => {
        if (data && data.submissionCalendar) {
          const parsed = this.buildCalendarFromMap(data.submissionCalendar);
          this.stats.update((s) => ({
            ...s,
            totalSolved: data.totalSolved ?? s.totalSolved,
            totalQuestions: data.totalQuestions ?? s.totalQuestions,
            easySolved: data.easySolved ?? s.easySolved,
            totalEasy: data.totalEasy ?? s.totalEasy,
            mediumSolved: data.mediumSolved ?? s.mediumSolved,
            totalMedium: data.totalMedium ?? s.totalMedium,
            hardSolved: data.hardSolved ?? s.hardSolved,
            totalHard: data.totalHard ?? s.totalHard,
            submissions: data.submissions ?? parsed.totalSubmissions,
            totalActiveDays: data.totalActiveDays ?? parsed.activeDays,
            maxStreak: data.maxStreak ?? parsed.maxStreak,
            calendar: parsed.calendar
          }));
        }
      })
      .catch(() => {});

    // 2. Fetch live data from LeetCode public API
    const url = `https://leetcode-api-faisalshohag.vercel.app/${this.username}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.totalSolved === 'number') {
          const subCalendar = (data.submissionCalendar && typeof data.submissionCalendar === 'object')
            ? data.submissionCalendar
            : DEFAULT_SUBMISSION_CALENDAR;
          
          const parsed = this.buildCalendarFromMap(subCalendar);
          const subTotal = data.totalSubmissions?.find((x: any) => x.difficulty === 'All')?.submissions || parsed.totalSubmissions;

          this.stats.set({
            totalSolved: data.totalSolved,
            totalQuestions: data.totalQuestions || 4095,
            easySolved: data.easySolved || 0,
            totalEasy: data.totalEasy || 974,
            mediumSolved: data.mediumSolved || 0,
            totalMedium: data.totalMedium || 2135,
            hardSolved: data.hardSolved || 0,
            totalHard: data.totalHard || 986,
            submissions: subTotal,
            totalActiveDays: parsed.activeDays,
            maxStreak: parsed.maxStreak,
            calendar: parsed.calendar,
            loading: false,
            error: false
          });
        }
      })
      .catch(() => {
        this.stats.update((s) => ({ ...s, loading: false, error: false }));
      });
  }

  private buildCalendarFromMap(subCal: Record<string, number>): {
    calendar: LeetCodeDay[];
    totalSubmissions: number;
    activeDays: number;
    maxStreak: number;
  } {
    const dateMap: Record<string, number> = {};
    for (const [ts, count] of Object.entries(subCal)) {
      const d = new Date(parseInt(ts, 10) * 1000);
      const key = d.toISOString().split('T')[0];
      dateMap[key] = (dateMap[key] || 0) + Number(count);
    }

    const today = new Date();
    const calendar: LeetCodeDay[] = [];
    let totalSubmissions = 0;
    let activeDays = 0;
    let currentStreak = 0;
    let maxStreak = 0;

    // 52 weeks = 364 days
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = dateMap[dateStr] || 0;

      if (count > 0) {
        activeDays++;
        totalSubmissions += count;
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }

      let level = 0;
      if (count > 5) level = 4;
      else if (count >= 3) level = 3;
      else if (count === 2) level = 2;
      else if (count === 1) level = 1;

      calendar.push({ date: dateStr, count, level });
    }

    return { calendar, totalSubmissions, activeDays, maxStreak };
  }
}

