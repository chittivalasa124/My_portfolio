import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS, Project } from '../../core/data';
import { TechLogoComponent } from '../ui/tech-logo.component';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, TechLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="work" class="pt-6 sm:pt-8 pb-8 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Selected Projects">
      <!-- Section Tag & Heading -->
      <div class="mb-8 sm:mb-10 rv">
        <div class="font-mono text-xs uppercase tracking-widest text-mute mb-2">03 — Selected Work</div>
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          Things I've <span class="font-serif italic text-mute">built.</span>
        </h2>
      </div>

      <!-- Expanding Accordion Gallery (Desktop: Horizontal Flex, Mobile: Vertical) -->
      <div class="hidden lg:flex gap-4 min-h-[580px] w-full items-stretch">
        @for (project of projects; track project.id; let i = $index) {
          <div
            (mouseenter)="activeProjectIndex.set(i)"
            (focus)="activeProjectIndex.set(i)"
            tabindex="0"
            class="relative rounded-3xl border border-line bg-card overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            [ngClass]="activeProjectIndex() === i ? 'flex-[8] shadow-lg border-neutral-300' : 'flex-[1] hover:flex-[1.2] opacity-80'"
            role="region"
            [attr.aria-label]="project.title"
          >
            <!-- FOLDED SPINE VIEW (When not active) -->
            @if (activeProjectIndex() !== i) {
              <div class="h-full w-full py-8 px-4 flex flex-col justify-between items-center select-none">
                <span class="font-mono text-sm font-bold text-mute">{{ project.index }}</span>
                <span class="font-bold text-sm tracking-tight text-ink [writing-mode:vertical-rl] rotate-180 truncate">
                  {{ project.title }}
                </span>
                <div class="w-8 h-8 rounded-full border border-line flex items-center justify-center font-mono text-xs text-ink">
                  +
                </div>
              </div>
            }

            <!-- OPEN EXPANDED VIEW -->
            @if (activeProjectIndex() === i) {
              <div class="h-full w-full p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
                <!-- Left Details -->
                <div class="flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span class="font-mono text-xs text-mute">{{ project.index }}</span>
                      <span class="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                      <span class="font-mono text-xs uppercase tracking-wider text-mute">{{ project.kicker }}</span>
                    </div>

                    <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-4">
                      {{ project.title }}
                    </h3>

                    <p class="text-xs sm:text-sm text-ink-2 leading-relaxed mb-6">
                      {{ project.description }}
                    </p>

                    <div class="space-y-2 mb-6">
                      <span class="font-mono text-[10px] uppercase tracking-wider text-mute block">Key Highlights</span>
                      <ul class="text-xs text-neutral-700 space-y-1.5">
                        @for (feature of project.features; track feature) {
                          <li class="flex items-start gap-2">
                            <span class="font-mono text-neutral-400 mt-0.5">•</span>
                            <span>{{ feature }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div class="flex flex-wrap gap-1.5 mb-6">
                      @for (t of project.tech; track t) {
                        <span class="px-2.5 py-1 rounded-full bg-[#f4f2ee] text-[11px] font-mono text-ink flex items-center gap-1.5">
                          <app-tech-logo [name]="t" size="small"></app-tech-logo>
                          <span>{{ t }}</span>
                        </span>
                      }
                    </div>

                    @if (project.github) {
                      <a 
                        [href]="project.github" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-xs font-medium hover:bg-ink-2 transition-all active:scale-95"
                      >
                        <span>View on GitHub</span>
                        <span>↗</span>
                      </a>
                    }
                  </div>
                </div>

                <!-- Right Side: Illustrative Mini-UI -->
                <div class="relative w-full h-[360px] rounded-2xl bg-[#f4f2ee] border border-line p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                  <div class="flex items-center justify-between pb-3 border-b border-line">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
                    </div>
                    <span class="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Illustrative UI</span>
                  </div>

                  <!-- Project-specific Mock UI Diagram -->
                  @if (project.id === 'dance-academy') {
                    <div class="my-auto space-y-2.5 font-mono text-[11px]">
                      <div class="p-2.5 rounded-xl bg-white border border-line flex items-center justify-between">
                        <span class="text-neutral-500">Public Applicant → User</span>
                        <span class="text-emerald-700 font-semibold">[APPLIED]</span>
                      </div>
                      <div class="flex items-center justify-center text-neutral-400 text-[10px]">
                        ↓ Admin Review & Role Transition
                      </div>
                      <div class="p-2.5 rounded-xl bg-white border border-line flex items-center justify-between">
                        <span class="text-neutral-500">Student Portal + Attendance</span>
                        <span class="text-blue-700 font-semibold">[ENROLLED]</span>
                      </div>
                      <div class="p-2.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between text-[10px]">
                        <span class="text-neutral-300">Razorpay Fee Gateway</span>
                        <span class="text-emerald-400 font-mono">200 OK</span>
                      </div>
                    </div>
                  } @else if (project.id === 'crypto-cloud') {
                    <div class="my-auto space-y-3 font-mono text-[11px]">
                      <div class="p-3 rounded-xl bg-white border border-line flex items-center justify-between">
                        <span class="text-neutral-500">AES-256 Symmetric Stream</span>
                        <span class="text-neutral-800 font-semibold">[ENCRYPTED]</span>
                      </div>
                      <div class="flex justify-center text-neutral-400">↓ RSA-4096 Key Wrapping</div>
                      <div class="p-3 rounded-xl bg-white border border-line flex items-center justify-between">
                        <span class="text-neutral-500">Destination Store</span>
                        <span class="text-neutral-800 font-semibold">AWS S3 / Azure Blob</span>
                      </div>
                    </div>
                  } @else {
                    <div class="my-auto space-y-3 font-mono text-[11px]">
                      <div class="p-3 rounded-xl bg-white border border-line flex items-center justify-between">
                        <span class="text-neutral-500">Page Latency</span>
                        <span class="text-neutral-800 font-semibold">-25% Reduction</span>
                      </div>
                      <div class="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                        <div class="h-full bg-ink w-3/4 rounded-full"></div>
                      </div>
                      <div class="p-3 rounded-xl bg-white border border-line flex items-center justify-between">
                        <span class="text-neutral-500">UX Engagement</span>
                        <span class="text-neutral-800 font-semibold">+50% Satisfaction</span>
                      </div>
                    </div>
                  }

                  <div class="pt-3 border-t border-line text-[10px] font-mono text-mute flex justify-between">
                    <span>STATUS: DEPLOYED</span>
                    <span>ARCHITECTURE: STABLE</span>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- Mobile Stacked Layout -->
      <div class="lg:hidden space-y-6">
        @for (project of projects; track project.id) {
          <div class="p-6 rounded-3xl bg-card border border-line shadow-sm">
            <div class="flex items-center gap-2 mb-3">
              <span class="font-mono text-xs text-mute">{{ project.index }}</span>
              <span class="text-mute font-mono text-xs uppercase tracking-wider">{{ project.kicker }}</span>
            </div>

            <h3 class="text-xl font-bold tracking-tight text-ink mb-3">{{ project.title }}</h3>
            <p class="text-xs text-ink-2 leading-relaxed mb-4">{{ project.description }}</p>

            <div class="flex flex-wrap gap-1.5 mb-6">
              @for (t of project.tech; track t) {
                <span class="px-2 py-0.5 rounded-full bg-[#f4f2ee] text-[10px] font-mono text-ink">
                  {{ t }}
                </span>
              }
            </div>

            @if (project.github) {
              <a 
                [href]="project.github" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-white text-xs font-medium"
              >
                <span>View on GitHub</span>
                <span>↗</span>
              </a>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class WorkComponent {
  readonly projects = PROJECTS;
  activeProjectIndex = signal<number>(0);
}

