import { Component, ChangeDetectionStrategy, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAV, PROFILE } from '../../core/data';
import { ScrollService } from '../../core/scroll.service';
import { observeScrollProgress } from '../../core/observers';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Top Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-[2px] bg-ink z-50 transition-all duration-75 pointer-events-none"
      [style.width.%]="scrollProgress() * 100"
    ></div>

    <header class="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 pointer-events-none">
      <nav class="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        <!-- Brand / Initials Mark -->
        <a 
          href="#hero" 
          (click)="onNavClick($event, '#hero')"
          class="group flex items-center gap-3 py-2 px-3 rounded-full transition-all duration-300"
          [attr.aria-label]="profile.name + ' - Return to top'"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-500 group-hover:rotate-[360deg]"
            [ngClass]="isScrolled() ? 'bg-ink text-paper shadow-md' : 'border border-ink text-ink bg-transparent'"
          >
            CR
          </div>
          <span 
            class="font-medium text-sm text-ink tracking-tight transition-opacity duration-300 hidden sm:inline"
            [class.opacity-0]="isScrolled()"
            [class.pointer-events-none]="isScrolled()"
          >
            {{ profile.name }}
          </span>
        </a>

        <!-- Desktop Nav Pill -->
        <div class="hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-300"
             [ngClass]="isScrolled() ? 'bg-white/80 backdrop-blur-md shadow-sm border border-line' : 'bg-transparent'">
          @for (item of navItems; track item.id) {
            <a 
              [href]="'#' + item.id"
              (click)="onNavClick($event, '#' + item.id)"
              class="relative px-4 py-1.5 text-xs font-medium tracking-tight rounded-full transition-colors duration-200 z-10"
              [ngClass]="activeSection() === item.id ? 'text-white' : 'text-ink-2 hover:text-ink'"
            >
              @if (activeSection() === item.id) {
                <span class="absolute inset-0 bg-ink rounded-full -z-10 transition-all duration-300"></span>
              }
              {{ item.label }}
            </a>
          }
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="md:hidden">
          <button 
            type="button" 
            (click)="toggleMenu()"
            class="px-4 py-2 rounded-full border border-line bg-card/90 backdrop-blur-md text-xs font-mono font-medium text-ink shadow-sm active:scale-95 transition-all"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Toggle Navigation Menu"
          >
            {{ menuOpen() ? 'Close' : 'Menu' }}
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile Fullscreen Overlay Menu -->
    @if (menuOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-8 animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs text-mute uppercase tracking-widest">Navigation</span>
          <button 
            type="button" 
            (click)="toggleMenu()"
            class="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink text-sm font-mono active:scale-90"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul class="flex flex-col gap-5 my-auto">
          @for (item of navItems; track item.id; let i = $index) {
            <li class="overflow-hidden">
              <a 
                [href]="'#' + item.id"
                (click)="onNavClick($event, '#' + item.id)"
                class="group flex items-baseline gap-4 py-2 text-3xl font-bold tracking-tight text-ink hover:text-ink-2 transition-transform duration-300"
              >
                <span class="font-mono text-xs text-mute tracking-normal">{{ item.index }}</span>
                <span>{{ item.label }}</span>
                <span class="text-sm text-faint ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            </li>
          }
        </ul>

        <div class="border-t border-line pt-6 flex items-center justify-between font-mono text-xs text-mute">
          <span>{{ profile.email }}</span>
          <a [href]="profile.github" target="_blank" rel="noopener noreferrer" class="hover:text-ink">GitHub ↗</a>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class NavigationComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);

  readonly profile = PROFILE;
  readonly navItems = NAV;

  scrollProgress = signal<number>(0);
  isScrolled = signal<boolean>(false);
  activeSection = signal<string>('hero');
  menuOpen = signal<boolean>(false);

  private destroyScroll?: () => void;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.destroyScroll = observeScrollProgress((p) => {
      this.scrollProgress.set(p);
      this.isScrolled.set(window.scrollY > 40);
    });

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );

      const sectionIds = ['hero', ...this.navItems.map((n) => n.id)];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.observer?.observe(el);
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyScroll?.();
    this.observer?.disconnect();
  }

  onNavClick(event: Event, targetId: string): void {
    event.preventDefault();
    this.menuOpen.set(false);
    this.scrollService.scrollToTarget(targetId);
  }

  toggleMenu(): void {
    const nextState = !this.menuOpen();
    this.menuOpen.set(nextState);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = nextState ? 'hidden' : '';
    }
  }
}

