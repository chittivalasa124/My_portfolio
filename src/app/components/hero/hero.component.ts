import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, signal, OnInit, OnDestroy, inject, NgZone, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE } from '../../core/data';
import { ScrollService } from '../../core/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section 
      id="hero" 
      class="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#f4f2ee] isolate"
      aria-label="Hero Introduction"
    >
      <!-- GIANT OUTLINED / MUTED SOLID NAME BEHIND PERSON -->
      <div 
        class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]"
        aria-hidden="true"
      >
        <span class="font-black tracking-tighter text-[23vw] uppercase text-stroke-ghost leading-none select-none">
          {{ profile.firstName }}
        </span>
      </div>

      <!-- 16:9 WIDESCREEN VIDEO (FULL BLEED / MULTIPLY BLEND DIRECTLY OVER GHOST NAME) -->
      <video
        #introVideo
        class="absolute inset-0 w-full h-full object-contain mix-blend-multiply z-[2] pointer-events-none transition-opacity duration-700"
        playsinline
        loop
        preload="auto"
        [muted]="isMuted()"
        poster="hero/hero-poster.webp"
      >
        <source src="hero/hero.webm" type="video/webm" />
        <source src="hero/hero.mp4" type="video/mp4" />
      </video>

      <!-- UI OVERLAYS (Z-10) -->
      <div class="absolute inset-0 z-[10] pointer-events-none">
        
        <!-- BOTTOM LEFT: ROLE HEADING & SUBTITLE -->
        <div class="absolute bottom-10 sm:bottom-12 left-6 sm:left-12 lg:left-16 max-w-lg pointer-events-auto">
          <div class="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#77756f] mb-2 font-medium">
            {{ profile.name }}
          </div>

          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0d0d0d] leading-[0.95] mb-4">
            Full Stack<br>
            <span class="font-normal font-serif italic text-[#77756f]">Developer.</span>
          </h1>

          <p class="text-xs sm:text-sm text-[#77756f] font-mono tracking-tight">
            Creative developer • Enterprise web technology
          </p>
        </div>

        <!-- BOTTOM RIGHT: EXPLORE WORK, LET'S TALK, RESUME -->
        <div class="absolute bottom-10 sm:bottom-12 right-6 sm:right-12 lg:right-16 flex flex-col items-end gap-3 pointer-events-auto">
          <!-- SOUND TOGGLE BUTTON (FLOATING CIRCLE IN HERO) -->
          <div class="mb-2">
            <button
              type="button"
              (click)="toggleSound()"
              class="w-12 h-12 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-xl active:scale-90 hover:scale-105 transition-all duration-300 group cursor-pointer relative"
              [attr.aria-label]="isMuted() ? 'Turn sound on' : 'Turn sound off'"
            >
              @if (isMuted()) {
                <svg class="w-4 h-4 translate-x-0.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              } @else {
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              }

              @if (showAudioPing()) {
                <span class="absolute inset-0 rounded-full border border-ink animate-ping pointer-events-none"></span>
              }
            </button>
          </div>

          <button 
            type="button" 
            (click)="scrollTo('#work')"
            class="px-6 py-2.5 rounded-full bg-[#0d0d0d] text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Explore work →
          </button>

          <div class="flex items-center gap-4 text-xs font-medium text-[#77756f]">
            <button 
              type="button" 
              (click)="scrollTo('#contact')"
              class="hover:text-[#0d0d0d] transition-colors cursor-pointer"
            >
              Let's talk
            </button>

            <span class="opacity-30">•</span>

            <a 
              [href]="profile.resumePath" 
              download="Chittivalasa_Rakesh_Resume.pdf"
              class="hover:text-[#0d0d0d] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Resume</span>
              <span class="text-[10px]">↓</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    #hero {
      isolation: isolate;
      background-color: #f4f2ee;
    }
    .text-stroke-ghost {
      color: rgba(13, 13, 13, 0.08);
      -webkit-text-stroke: 2px rgba(13, 13, 13, 0.16);
      -webkit-mask-image: linear-gradient(to right, black calc(50% - 190px), transparent calc(50% - 130px), transparent calc(50% + 130px), black calc(50% + 190px));
      mask-image: linear-gradient(to right, black calc(50% - 190px), transparent calc(50% - 130px), transparent calc(50% + 130px), black calc(50% + 190px));
    }
    @media (max-width: 640px) {
      .text-stroke-ghost {
        -webkit-mask-image: linear-gradient(to right, black calc(50% - 120px), transparent calc(50% - 70px), transparent calc(50% + 70px), black calc(50% + 120px));
        mask-image: linear-gradient(to right, black calc(50% - 120px), transparent calc(50% - 70px), transparent calc(50% + 70px), black calc(50% + 120px));
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('introVideo', { static: false }) videoRef?: ElementRef<HTMLVideoElement>;

  readonly profile = PROFILE;
  private scrollService = inject(ScrollService);
  private ngZone = inject(NgZone);

  isMuted = signal<boolean>(true);
  showAudioPing = signal<boolean>(true);
  private observer?: IntersectionObserver;
  private userInteracted = false;

  @HostListener('window:pointerdown')
  @HostListener('window:keydown')
  @HostListener('window:touchend')
  onFirstUserInteraction(): void {
    if (!this.userInteracted) {
      this.userInteracted = true;
      this.showAudioPing.set(false);
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => this.attemptPlay(), 200);

        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const video = this.videoRef?.nativeElement;
              if (!video) return;

              if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                video.play().catch(() => {});
              } else {
                video.pause();
              }
            });
          },
          { threshold: [0, 0.35, 1.0] }
        );

        const heroEl = document.getElementById('hero');
        if (heroEl) this.observer.observe(heroEl);
      });
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  attemptPlay(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      this.isMuted.set(true);
      video.play().catch(() => {});
    });
  }

  toggleSound(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    this.showAudioPing.set(false);
    const nextState = !this.isMuted();
    video.muted = nextState;
    this.isMuted.set(nextState);

    if (!nextState && video.paused) {
      video.play().catch(() => {});
    }
  }

  scrollTo(target: string): void {
    this.scrollService.scrollToTarget(target);
  }
}
