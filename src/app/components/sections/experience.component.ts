import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE_TIMELINE } from '../../core/data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="pt-10 sm:pt-14 pb-8 sm:pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Experience and Education Timeline">
      <!-- Section Tag & Heading -->
      <div class="mb-8 sm:mb-10 rv">
        <div class="font-mono text-xs uppercase tracking-widest text-mute mb-2">05 — Experience & Education</div>
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          One continuous <span class="font-serif italic text-mute">path.</span>
        </h2>
      </div>

      <!-- Timeline with Drawn Vertical Spine -->
      <div class="relative pl-6 sm:pl-10 border-l border-line space-y-8 sm:space-y-10">
        @for (item of timeline; track item.role + item.period; let i = $index) {
          <div class="relative rv group">
            <!-- Timeline Stop Indicator Dot -->
            <div class="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-line group-hover:border-ink group-hover:bg-ink transition-colors duration-300"></div>

            <div class="p-6 sm:p-8 rounded-3xl bg-card border border-line shadow-sm hover:border-neutral-400 transition-all">
              <div class="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <span class="font-mono text-xs text-mute font-medium">{{ item.period }}</span>
                @if (item.highlight) {
                  <span class="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono text-ink">
                    {{ item.highlight }}
                  </span>
                }
              </div>

              <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-1">
                {{ item.role }}
              </h3>
              <div class="text-xs sm:text-sm font-mono text-mute mb-4">
                {{ item.organization }}
              </div>

              <ul class="space-y-2 text-xs sm:text-sm text-ink-2">
                @for (d of item.detail; track d) {
                  <li class="flex items-start gap-2">
                    <span class="text-neutral-400 font-mono mt-0.5">•</span>
                    <span class="leading-relaxed">{{ d }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        }

        <!-- Next Step Future Card -->
        <div class="relative rv">
          <div class="absolute -left-[31px] sm:-left-[47px] top-4 w-3.5 h-3.5 rounded-full bg-[#f4f2ee] border-2 border-dashed border-neutral-400"></div>
          <div class="p-6 sm:p-8 rounded-3xl border border-dashed border-neutral-300 bg-transparent flex items-center justify-between">
            <div>
              <span class="font-mono text-xs uppercase tracking-widest text-mute block mb-1">Upcoming</span>
              <div class="text-lg font-bold text-ink tracking-tight">Next — Your team?</div>
            </div>
            <a 
              href="#contact" 
              class="px-5 py-2.5 rounded-full bg-ink text-white text-xs font-medium hover:bg-ink-2 transition-all active:scale-95"
            >
              Start Conversation
            </a>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ExperienceComponent {
  readonly timeline = EXPERIENCE_TIMELINE;
}

