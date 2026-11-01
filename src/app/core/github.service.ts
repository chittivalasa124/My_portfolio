import { Injectable, signal } from '@angular/core';

export interface GitHubDay {
  date: string;
  count: number;
  level: number; // -1: empty/hidden, 0: blank, 1, 2, 3, 4: active intensities
  row: number; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  col: number; // 0 to 52
  tooltip?: string;
}

export interface MonthLabel {
  name: string;
  colSpan: number;
}

export interface GitHubStats {
  username: string;
  totalContributions: number;
  publicRepos: number;
  followers: number;
  months: MonthLabel[];
  contributions: GitHubDay[];
  loading: boolean;
  error: boolean;
}

/**
 * Dynamically computes 53-week month column spans based on a reference date (defaults to current date).
 * Ensures zero hardcoding of month names or column spans.
 */
export function getDynamicMonthHeaders(referenceDate = new Date()): MonthLabel[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayOfWeek = referenceDate.getUTCDay();
  const endSaturday = new Date(referenceDate.getTime() + (6 - dayOfWeek) * 86400000);
  const baseSunday = new Date(endSaturday.getTime() - (53 * 7 - 1) * 86400000);

  const months: MonthLabel[] = [];
  let currentMonth = -1;
  let currentSpan = 0;

  for (let c = 0; c < 53; c++) {
    const midDate = new Date(baseSunday.getTime() + (c * 7 + 3) * 86400000);
    const m = midDate.getUTCMonth();
    if (m !== currentMonth) {
      if (currentMonth !== -1) {
        months.push({ name: monthNames[currentMonth], colSpan: currentSpan });
      }
      currentMonth = m;
      currentSpan = 1;
    } else {
      currentSpan++;
    }
  }
  if (currentSpan > 0 && currentMonth !== -1) {
    months.push({ name: monthNames[currentMonth], colSpan: currentSpan });
  }
  return months;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  readonly username = 'chittivalasa124';
  readonly profileUrl = 'https://github.com/chittivalasa124';

  private pollInterval?: ReturnType<typeof setInterval>;

  // Zero hardcoded numbers: state starts at 0 and populates purely from live GitHub fetches
  stats = signal<GitHubStats>({
    username: this.username,
    totalContributions: 0,
    publicRepos: 0,
    followers: 0,
    months: getDynamicMonthHeaders(),
    contributions: [],
    loading: true,
    error: false,
  });

  fetchStats(): void {
    if (typeof window === 'undefined') return;

    this.stats.update((s) => ({ ...s, loading: true }));

    // 1. Fetch live user profile stats directly from GitHub public API
    fetch(`https://api.github.com/users/${this.username}?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`User API error ${res.status}`);
        return res.json();
      })
      .then((user) => {
        if (user) {
          this.stats.update((s) => ({
            ...s,
            publicRepos: typeof user.public_repos === 'number' ? user.public_repos : s.publicRepos,
            followers: typeof user.followers === 'number' ? user.followers : s.followers,
          }));
        }
      })
      .catch((err) => console.warn('[GitHubService] API profile fetch warning:', err));

    // 2. Fetch live contributions dynamically directly from live GitHub API (trailing year)
    fetch(`https://github-contributions-api.jogruber.de/v4/${this.username}?y=last&t=${Date.now()}`, {
      cache: 'no-store',
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Direct API status: ${res.status}`);
        return res.json();
      })
      .then((apiData) => {
        if (apiData && Array.isArray(apiData.contributions) && apiData.contributions.length > 0) {
          const activeDays = apiData.contributions.filter((d: any) => d && d.count > 0);
          if (activeDays.length > 0) {
            this.reconstructFromApi(apiData.contributions, apiData.total);
            return;
          }
        }
        throw new Error('No active contributions from direct API');
      })
      .catch(() => {
        // Fallback: load auto-synced local JSON (updated every 30m by GitHub Action)
        this.loadLocalJsonFallback();
      });

    // 3. Keep live by auto-polling every 30 minutes while the browser tab is open
    if (!this.pollInterval) {
      this.pollInterval = setInterval(() => {
        this.fetchStats();
      }, 30 * 60 * 1000); // 30 minutes
    }
  }

  private loadLocalJsonFallback(): void {
    fetch(`github-contributions.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Local JSON status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.contributions) && data.contributions.length > 0) {
          this.stats.update((s) => ({
            ...s,
            totalContributions:
              typeof data.totalContributions === 'number'
                ? data.totalContributions
                : s.totalContributions,
            publicRepos:
              typeof data.publicRepos === 'number' ? data.publicRepos : s.publicRepos,
            followers:
              typeof data.followers === 'number' ? data.followers : s.followers,
            months:
              Array.isArray(data.months) && data.months.length > 0 ? data.months : s.months,
            contributions: data.contributions,
            loading: false,
            error: false,
          }));
        } else {
          throw new Error('Malformed local JSON fallback');
        }
      })
      .catch(() => {
        this.stats.update((s) => ({ ...s, loading: false, error: true }));
      });
  }

  private reconstructFromApi(
    rawContributions: Array<{ date: string; count: number; level: number }>,
    totals?: Record<string, number>,
  ): void {
    const map = new Map<string, { count: number; level: number }>();
    for (const item of rawContributions) {
      if (item && item.date) {
        map.set(item.date, item);
      }
    }

    const validDates = rawContributions
      .map((r) => r.date)
      .filter(Boolean)
      .sort();

    // Dynamically calculate base Sunday from earliest date returned by GitHub
    let baseSunday: Date;
    if (validDates.length > 0) {
      const firstDate = new Date(validDates[0] + 'T00:00:00Z');
      baseSunday = new Date(firstDate.getTime() - firstDate.getUTCDay() * 86400000);
    } else {
      const now = new Date();
      const endSaturday = new Date(now.getTime() + (6 - now.getUTCDay()) * 86400000);
      baseSunday = new Date(endSaturday.getTime() - (53 * 7 - 1) * 86400000);
    }

    const grid: GitHubDay[] = [];
    let countedTotal = 0;

    for (let c = 0; c < 53; c++) {
      for (let r = 0; r < 7; r++) {
        const offset = c * 7 + r;
        const cellDate = new Date(baseSunday.getTime() + offset * 86400000);
        const dateStr = cellDate.toISOString().split('T')[0];

        const match = map.get(dateStr);
        const count = match ? match.count : 0;
        const level = match ? match.level : 0;
        countedTotal += count;

        grid.push({
          date: dateStr,
          count,
          level,
          row: r,
          col: c,
          tooltip:
            count > 0 ? `${count} contribution(s) on ${dateStr}` : `No contributions on ${dateStr}`,
        });
      }
    }

    // Extract live total dynamically without hardcoded year keys
    const totalFromApi =
      (totals && typeof totals['lastYear'] === 'number' ? totals['lastYear'] : undefined) ??
      (totals && typeof totals['total'] === 'number' ? totals['total'] : undefined) ??
      (totals ? Object.values(totals).find((v) => typeof v === 'number') : undefined) ??
      countedTotal;

    this.stats.update((s) => ({
      ...s,
      totalContributions: totalFromApi,
      contributions: grid,
      loading: false,
      error: false,
    }));
  }
}
