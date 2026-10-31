import { Component, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROUD_MOMENT_CERTIFICATES } from '../../core/data';
import { HackerRankService } from '../../core/hackerrank.service';
import { CodingProfilesService } from '../../core/coding-profiles.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section 
      #containerRef
      id="achievements" 
      class="relative w-full bg-[#f4f2ee]"
      [style.height.px]="totalPinnedHeight()"
      aria-label="Key Achievements and Profiles"
    >
      <!-- STICKY VIEWPORT CONTAINER -->
      <div class="sticky top-0 w-full h-[100svh] min-h-[600px] flex flex-col justify-between py-8 md:py-10 overflow-hidden">
        
        <!-- Header with Title & Thin Progress Line -->
        <div class="max-w-7xl mx-auto w-full px-6 md:px-12">
          <div class="flex items-center justify-between mb-4">
            <div class="font-mono text-xs uppercase tracking-widest text-[#77756f]">06 — Achievements & Profiles</div>
            <div class="font-mono text-xs text-[#77756f]">
              <span class="text-[#0d0d0d] font-bold">{{ activeCardIndex() + 1 }}</span> / {{ totalCardsCount }}
            </div>
          </div>

          <div class="flex flex-wrap items-end justify-between gap-4 pb-4">
            <h2 class="text-4xl sm:text-6xl font-bold tracking-tight text-[#0d0d0d] leading-none">
              Proud <span class="font-serif italic text-[#77756f]">moments.</span>
            </h2>
            <div class="font-mono text-xs text-[#77756f] hidden sm:block">
              Scroll down to navigate gallery →
            </div>
          </div>

          <!-- Thin Progress Bar Line -->
          <div class="w-full h-[2px] bg-[rgba(13,13,13,0.08)] rounded-full overflow-hidden mt-2">
            <div 
              class="h-full bg-[#0d0d0d] transition-all duration-150"
              [style.width.%]="scrollRatio() * 100"
            ></div>
          </div>
        </div>

        <!-- HORIZONTAL CARDS TRACK -->
        <div class="w-full flex-1 flex items-center relative overflow-hidden">
          <div 
            #trackRef
            class="flex items-center gap-8 pl-[10vw] pr-[20vw] transition-transform duration-200 ease-out will-change-transform"
            [style.transform]="'translate3d(-' + currentTranslateX() + 'px, 0, 0)'"
          >
            <!-- 01. LIVE HACKERRANK PROFILE CARD -->
            <a
              [href]="hrService.profileUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="card-item shrink-0 w-[420px] sm:w-[480px] h-[270px] sm:h-[310px] p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.08)] flex flex-col justify-between transition-all duration-500 select-none group block cursor-pointer"
              [ngClass]="activeCardIndex() === 0 
                ? 'active-center-card -translate-y-3 shadow-2xl scale-102 border-neutral-300' 
                : 'shadow-md opacity-75'"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-[#00EA64]/10 border border-[#00EA64]/30 flex items-center justify-center p-2.5 shadow-inner">
                    <svg viewBox="0 0 24 24" class="w-full h-full fill-[#00EA64]">
                      <path d="M0 0v24h24V0H0zm8.308 17.5v-11h2.384v4.23h2.616V6.5h2.384v11h-2.384v-4.385h-2.616V17.5H8.308z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-base text-[#0d0d0d] tracking-tight group-hover:text-black">
                        HackerRank
                      </h3>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live
                      </span>
                    </div>
                    <span class="font-mono text-xs text-[#77756f]">&#64;{{ hrService.username }}</span>
                  </div>
                </div>

                <div class="font-mono text-xs text-[#0d0d0d] flex items-center gap-1">
                  <span>View</span>
                  <span class="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </div>
              </div>

              <!-- Badges Display -->
              <div class="grid grid-cols-2 gap-3 my-auto">
                @for (b of hr().badges; track b.badge_name) {
                  <div class="p-3 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex flex-col justify-between">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-bold text-xs text-[#0d0d0d]">{{ b.badge_name }}</span>
                      <div class="flex items-center gap-0.5 text-[#E7A41E]">
                        @for (star of [].constructor(b.stars); track $index) {
                          <span class="text-xs">★</span>
                        }
                      </div>
                    </div>
                    <div class="flex items-center justify-between font-mono text-[10px] text-[#77756f]">
                      <span>{{ b.stars }} of {{ b.total_stars }} Stars</span>
                      <span>{{ b.solved }} Solved</span>
                    </div>
                  </div>
                }
              </div>

              <div class="pt-3 border-t border-[rgba(13,13,13,0.08)] flex items-center justify-between font-mono text-[11px] text-[#77756f]">
                <span>Verified Badges</span>
                <span>Language & Problem Solving ✓</span>
              </div>
            </a>

            <!-- 02. LIVE CODECHEF PROFILE CARD -->
            <a
              [href]="cc().url"
              target="_blank"
              rel="noopener noreferrer"
              class="card-item shrink-0 w-[420px] sm:w-[480px] h-[270px] sm:h-[310px] p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.08)] flex flex-col justify-between transition-all duration-500 select-none group block cursor-pointer"
              [ngClass]="activeCardIndex() === 1 
                ? 'active-center-card -translate-y-3 shadow-2xl scale-102 border-neutral-300' 
                : 'shadow-md opacity-75'"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <!-- CodeChef Chef Hat Icon -->
                  <div class="w-12 h-12 rounded-2xl bg-[#5B4638]/10 border border-[#5B4638]/20 flex items-center justify-center p-2.5 shadow-inner">
                    <svg viewBox="0 0 24 24" class="w-full h-full fill-[#5B4638]">
                      <path d="M12 2C8.69 2 6 4.69 6 8c0 .35.03.69.09 1.03C4.28 9.5 3 11.1 3 13c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4 0-1.9-1.28-3.5-3.09-3.97.06-.34.09-.68.09-1.03 0-3.31-2.69-6-6-6zm-4 17v3h8v-3H8z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-base text-[#0d0d0d] tracking-tight group-hover:text-black">
                        CodeChef
                      </h3>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live
                      </span>
                    </div>
                    <span class="font-mono text-xs text-[#77756f]">&#64;{{ cc().username }}</span>
                  </div>
                </div>

                <div class="font-mono text-xs text-[#0d0d0d] flex items-center gap-1">
                  <span>View</span>
                  <span class="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </div>
              </div>

              <!-- Profile Details -->
              <div class="my-auto space-y-2">
                <div class="p-3.5 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex items-center justify-between">
                  <div>
                    <span class="font-mono text-[10px] text-[#77756f] block uppercase">Platform Status</span>
                    <span class="font-bold text-sm text-[#0d0d0d]">{{ cc().headline }}</span>
                  </div>
                  <span class="px-2.5 py-1 rounded-full bg-white text-xs font-mono font-semibold text-[#0d0d0d] border border-neutral-200">
                    Active
                  </span>
                </div>
                <p class="text-xs text-[#3a3a3a] font-normal leading-relaxed">
                  {{ cc().subline }} • Submissions activity heatmap tracked in profile.
                </p>
              </div>

              <div class="pt-3 border-t border-[rgba(13,13,13,0.08)] flex items-center justify-between font-mono text-[11px] text-[#77756f]">
                <span>Coding Platform</span>
                <span>CodeChef Verified ✓</span>
              </div>
            </a>

            <!-- 03. LIVE GEEKSFORGEEKS PROFILE CARD -->
            <a
              [href]="gfg().url"
              target="_blank"
              rel="noopener noreferrer"
              class="card-item shrink-0 w-[420px] sm:w-[480px] h-[270px] sm:h-[310px] p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.08)] flex flex-col justify-between transition-all duration-500 select-none group block cursor-pointer"
              [ngClass]="activeCardIndex() === 2 
                ? 'active-center-card -translate-y-3 shadow-2xl scale-102 border-neutral-300' 
                : 'shadow-md opacity-75'"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <!-- GFG Green Monogram Icon -->
                  <div class="w-12 h-12 rounded-2xl bg-[#2F8D46]/10 border border-[#2F8D46]/20 flex items-center justify-center p-2.5 shadow-inner">
                    <svg viewBox="0 0 24 24" class="w-full h-full fill-[#2F8D46]">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.48 0-4.5-2.02-4.5-4.5S8.52 7.5 11 7.5c1.17 0 2.23.45 3.03 1.18l-1.42 1.42C12.18 9.71 11.62 9.5 11 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c1.07 0 1.98-.67 2.34-1.62H11V11.5h4.35c.08.31.15.65.15 1 0 2.48-2.02 4.5-4.5 4.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-base text-[#0d0d0d] tracking-tight group-hover:text-black">
                        GeeksforGeeks
                      </h3>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live
                      </span>
                    </div>
                    <span class="font-mono text-xs text-[#77756f]">&#64;{{ gfg().username }}</span>
                  </div>
                </div>

                <div class="font-mono text-xs text-[#0d0d0d] flex items-center gap-1">
                  <span>View</span>
                  <span class="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </div>
              </div>

              <!-- Profile Details -->
              <div class="my-auto space-y-2">
                <div class="p-3.5 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex items-center justify-between">
                  <div>
                    <span class="font-mono text-[10px] text-[#77756f] block uppercase">Engineering Track</span>
                    <span class="font-bold text-sm text-[#0d0d0d]">{{ gfg().headline }}</span>
                  </div>
                  <span class="px-2.5 py-1 rounded-full bg-white text-xs font-mono font-semibold text-[#0d0d0d] border border-neutral-200">
                    Software Engineer
                  </span>
                </div>
                <p class="text-xs text-[#3a3a3a] font-normal leading-relaxed">
                  {{ gfg().subline }} • Data structures, algorithms, and technical documentation.
                </p>
              </div>

              <div class="pt-3 border-t border-[rgba(13,13,13,0.08)] flex items-center justify-between font-mono text-[11px] text-[#77756f]">
                <span>Coding Platform</span>
                <span>GFG Verified ✓</span>
              </div>
            </a>

            <!-- 04. ACCENTURE CERTIFICATE CARDS -->
            @for (certificate of certificates; track certificate.index; let i = $index) {
              <a
                [href]="certificate.path"
                target="_blank"
                rel="noopener noreferrer"
                [attr.title]="certificate.detail"
                [attr.aria-label]="'Open ' + certificate.title + ' PDF in a new tab'"
                class="card-item shrink-0 w-[360px] sm:w-[460px] h-[270px] sm:h-[310px] p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.08)] flex flex-col justify-between transition-all duration-500 select-none group"
                [ngClass]="activeCardIndex() === (i + 3) 
                  ? 'active-center-card -translate-y-3 shadow-2xl scale-102 border-neutral-300' 
                  : 'shadow-md opacity-75'"
              >
                <div class="relative h-[155px] w-full overflow-hidden rounded-xl border border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]">
                  <img
                    [src]="certificate.previewPath"
                    [alt]="certificate.title + ' preview'"
                    class="h-full w-full object-contain"
                    loading="lazy"
                  />
                  <span class="absolute left-2 top-2 rounded-lg bg-white/90 px-2 py-1 font-mono text-[10px] font-bold text-[#0d0d0d] shadow">
                    ACC
                  </span>
                  <span class="absolute right-2 top-2 rounded-lg bg-white/90 px-2 py-1 font-mono text-[10px] text-[#77756f] shadow">
                    {{ certificate.index }}
                  </span>
                </div>

                <div class="flex items-end justify-between gap-4">
                  <div class="min-w-0">
                    <h3 class="font-bold text-base text-[#0d0d0d] tracking-tight leading-tight mb-1 group-hover:underline">
                      {{ certificate.title }}
                    </h3>
                    <p class="font-mono text-xs text-[#77756f]">{{ certificate.issuer }} · Open PDF</p>
                  </div>
                  <div class="text-right font-mono text-xs text-[#77756f] flex items-center gap-1">
                    <span>View PDF</span>
                    <span class="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </div>
                </div>
              </a>
            }

            <!-- End of Track Card -->
            <div class="shrink-0 w-[260px] h-[270px] sm:h-[310px] p-8 rounded-3xl border border-dashed border-neutral-300 bg-white/40 flex flex-col items-center justify-center text-center">
              <span class="text-3xl mb-2 font-mono text-[#0d0d0d]">→</span>
              <span class="font-serif italic text-lg text-[#77756f]">and counting</span>
            </div>
          </div>
        </div>

        <!-- Section Bottom Bar -->
        <div class="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between font-mono text-[11px] text-[#77756f]">
          <span>Track navigation</span>
          <span>Pinned Gallery • Coding Profiles</span>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .active-center-card {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 20px rgba(0, 0, 0, 0.04);
    }
  `]
})
export class AchievementsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild('trackRef') trackRef!: ElementRef<HTMLElement>;

  readonly certificates = PROUD_MOMENT_CERTIFICATES;
  readonly hrService = inject(HackerRankService);
  readonly codingProfiles = inject(CodingProfilesService);

  readonly hr = this.hrService.profile;
  readonly cc = this.codingProfiles.codechef;
  readonly gfg = this.codingProfiles.geeksforgeeks;

  get totalCardsCount(): number {
    return this.certificates.length + 3;
  }

  totalPinnedHeight = signal<number>(3600);
  scrollRatio = signal<number>(0);
  currentTranslateX = signal<number>(0);
  activeCardIndex = signal<number>(0);

  private maxTranslate = 0;
  private onScrollHandler = () => this.handleScroll();

  ngOnInit(): void {
    this.hrService.fetchBadges();
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.calculateDimensions(), 300);
      window.addEventListener('scroll', this.onScrollHandler, { passive: true });
      window.addEventListener('resize', this.onScrollHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScrollHandler);
      window.removeEventListener('resize', this.onScrollHandler);
    }
  }

  calculateDimensions(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;

    const trackWidth = track.scrollWidth;
    const viewWidth = window.innerWidth;
    this.maxTranslate = Math.max(0, trackWidth - viewWidth + 120);
    this.totalPinnedHeight.set(window.innerHeight + this.maxTranslate);
  }

  handleScroll(): void {
    const container = this.containerRef?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollDistance = this.totalPinnedHeight() - window.innerHeight;

    if (scrollDistance <= 0) return;

    const rawProgress = -rect.top / scrollDistance;
    const clampedProgress = Math.min(1, Math.max(0, rawProgress));

    this.scrollRatio.set(clampedProgress);

    const tx = clampedProgress * this.maxTranslate;
    this.currentTranslateX.set(tx);

    const cardWidth = 500;
    const activeIdx = Math.min(
      this.totalCardsCount - 1,
      Math.max(0, Math.round(tx / cardWidth))
    );
    this.activeCardIndex.set(activeIdx);
  }
}
