import { Injectable, signal } from '@angular/core';

export interface HackerRankBadge {
  badge_name: string;
  category_name?: string;
  stars: number;
  total_stars: number;
  current_points: number;
  solved: number;
  total_challenges: number;
  hacker_rank?: number;
}

export interface HackerRankProfile {
  username: string;
  profileUrl: string;
  badges: HackerRankBadge[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HackerRankService {
  readonly username = 'chittivalasa124';
  readonly profileUrl = 'https://www.hackerrank.com/profile/chittivalasa124';

  profile = signal<HackerRankProfile>({
    username: this.username,
    profileUrl: this.profileUrl,
    badges: [
      {
        badge_name: 'Java',
        category_name: 'Language Proficiency',
        stars: 2,
        total_stars: 5,
        current_points: 68,
        solved: 8,
        total_challenges: 64,
        hacker_rank: 988006
      },
      {
        badge_name: 'Problem Solving',
        category_name: 'Algorithms & Data Structures',
        stars: 1,
        total_stars: 6,
        current_points: 81,
        solved: 9,
        total_challenges: 563,
        hacker_rank: 2204579
      }
    ],
    loading: false
  });

  fetchBadges(): void {
    if (typeof window === 'undefined') return;

    this.profile.update((p) => ({ ...p, loading: true }));

    // Fetch live badges endpoint from HackerRank
    fetch(`https://www.hackerrank.com/rest/hackers/${this.username}/badges`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.models) && data.models.length > 0) {
          const liveBadges: HackerRankBadge[] = data.models.map((m: any) => ({
            badge_name: m.badge_name,
            category_name: m.category_name || 'Proficiency',
            stars: m.stars || 0,
            total_stars: m.total_stars || 5,
            current_points: m.current_points || 0,
            solved: m.solved || 0,
            total_challenges: m.total_challenges || 0,
            hacker_rank: m.hacker_rank
          }));

          // Merge with any cross-domain solved badges
          this.profile.update((prev) => {
            const existingNames = new Set(liveBadges.map((b) => b.badge_name));
            const retained = prev.badges.filter((b) => !existingNames.has(b.badge_name));
            return {
              ...prev,
              badges: [...liveBadges, ...retained],
              loading: false
            };
          });
        }
      })
      .catch(() => {
        this.profile.update((p) => ({ ...p, loading: false }));
      });
  }
}

