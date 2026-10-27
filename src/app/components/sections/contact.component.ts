import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE } from '../../core/data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="contact" class="pt-12 sm:pt-16 pb-12 bg-white border-t border-line" aria-label="Contact Chittivalasa Rakesh">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Big Interactive Heading -->
        <div class="mb-10 sm:mb-12 rv">
          <div class="font-mono text-xs uppercase tracking-widest text-mute mb-4">07 — Contact</div>
          <h2 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-none">
            <span class="block">Let's build</span>
            <span class="block text-mute font-serif italic mt-2">something together.</span>
          </h2>
        </div>

        <!-- Contact Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pb-16 border-b border-line rv">
          <!-- Left: Direct Copy Email & Phone -->
          <div class="space-y-6">
            <div>
              <span class="font-mono text-xs text-mute block mb-2 uppercase">Direct Email</span>
              <div class="flex items-center gap-3">
                <a 
                  [href]="'mailto:' + profile.email"
                  class="text-xl sm:text-2xl font-bold text-ink underline decoration-1 underline-offset-8 hover:text-neutral-600 transition-colors"
                >
                  {{ profile.email }}
                </a>
                <button
                  type="button"
                  (click)="copyEmail()"
                  class="px-3 py-1 rounded-full border border-line text-xs font-mono text-mute hover:border-ink hover:text-ink transition-all active:scale-95"
                  aria-live="polite"
                >
                  {{ copied() ? 'Copied ✓' : 'Copy' }}
                </button>
              </div>
            </div>

            <div>
              <span class="font-mono text-xs text-mute block mb-2 uppercase">Direct Phone</span>
              <a 
                [href]="profile.phoneHref" 
                class="font-mono text-base sm:text-lg text-ink hover:text-neutral-600 transition-colors"
              >
                {{ profile.phone }}
              </a>
            </div>

            <div class="flex items-center gap-4 pt-2">
              @if (profile.github) {
                <a 
                  [href]="profile.github" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="font-mono text-xs text-ink hover:underline"
                >
                  GitHub ↗
                </a>
              }
              @if (profile.linkedin) {
                <a 
                  [href]="profile.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="font-mono text-xs text-ink hover:underline"
                >
                  LinkedIn ↗
                </a>
              }
            </div>
          </div>

          <!-- Right: Circular Spinning Badge -->
          <div class="flex flex-col items-center md:items-end justify-center h-full">
            <div class="relative w-36 h-36 flex items-center justify-center select-none">
              <!-- Rotating Text Ring -->
              <svg class="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                <path
                  id="textPathCircle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text class="text-[9px] font-mono tracking-[0.2em] uppercase fill-neutral-700">
                  <textPath href="#textPathCircle" startOffset="0%">
                    • SAY HELLO • OPEN TO OPPORTUNITIES •
                  </textPath>
                </text>
              </svg>
              <!-- Center Icon -->
              <div class="absolute inset-0 m-auto w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-mono text-xs">
                CR
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-mute">
          <div>
            © {{ currentYear }} {{ profile.name }}. All rights reserved.
          </div>

          <div class="flex items-center gap-6">
            <span>Built with Angular 22 & TypeScript</span>
            <a href="#hero" class="hover:text-ink transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly currentYear = new Date().getFullYear();
  copied = signal<boolean>(false);

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}

