import { Injectable, signal } from '@angular/core';

export interface CodingProfile {
  id: string;
  platform: string;
  username: string;
  url: string;
  status: string;
  iconType: 'codechef' | 'geeksforgeeks';
  headline: string;
  subline: string;
  metricLabel: string;
  metricValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodingProfilesService {
  readonly codechef = signal<CodingProfile>({
    id: 'codechef',
    platform: 'CodeChef',
    username: 'uber_wolves_10',
    url: 'https://www.codechef.com/users/uber_wolves_10',
    status: 'Active Profile',
    iconType: 'codechef',
    headline: 'Competitive Programming',
    subline: 'Practice & contest submissions active',
    metricLabel: 'Submissions Track',
    metricValue: 'Active'
  });

  readonly geeksforgeeks = signal<CodingProfile>({
    id: 'geeksforgeeks',
    platform: 'GeeksforGeeks',
    username: 'chittivala9rw',
    url: 'https://www.geeksforgeeks.org/profile/chittivala9rw',
    status: 'Verified Profile',
    iconType: 'geeksforgeeks',
    headline: 'DSA & Core Concepts',
    subline: 'Software Engineer learning journey',
    metricLabel: 'Coding Profile',
    metricValue: 'Verified'
  });
}

