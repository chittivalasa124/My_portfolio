import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CERTIFICATIONS } from '../../core/data';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications" class="py-12 sm:py-16 bg-white border-y border-line" aria-label="Certifications">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          <!-- Left Sticky Column -->
          <div class="lg:sticky lg:top-32 rv">
            <div class="font-mono text-xs uppercase tracking-widest text-mute mb-2">04 — Certifications</div>
            <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
              Always <span class="font-serif italic text-mute">learning.</span>
            </h2>
            <p class="text-xs sm:text-sm text-mute leading-relaxed font-mono">
              {{ certs.length }} Professional industry & enterprise certifications completed.
            </p>
          </div>

          <!-- Right: Ink-Flood Rows List -->
          <div class="divide-y divide-line border-y border-line rv">
            @for (cert of certs; track cert.index) {
              <a
                [href]="cert.url || '#'"
                [attr.target]="cert.url ? '_blank' : null"
                [attr.rel]="cert.url ? 'noopener noreferrer' : null"
                class="group relative flex items-center justify-between py-6 sm:py-8 px-4 sm:px-6 overflow-hidden transition-colors duration-300 block select-none"
              >
                <!-- Flood Layer Background (Left-to-Right Ink Flood) -->
                <div class="flood-layer absolute inset-0 bg-ink transform origin-left -translate-x-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-focus:translate-x-0 -z-0"></div>

                <!-- Text Content -->
                <div class="relative z-10 flex items-baseline gap-4 sm:gap-6">
                  <span class="font-mono text-xs text-mute group-hover:text-neutral-400 transition-colors">
                    {{ cert.index }}
                  </span>
                  <div>
                    <h3 class="text-base sm:text-lg font-bold tracking-tight text-ink group-hover:text-white transition-colors">
                      {{ cert.title }}
                    </h3>
                    <div class="font-mono text-xs text-mute group-hover:text-neutral-400 mt-1 transition-colors">
                      {{ cert.issuer }} @if (cert.year) { • {{ cert.year }} }
                    </div>
                  </div>
                </div>

                <!-- Right Arrow -->
                <div class="relative z-10 font-mono text-base text-ink group-hover:text-white transform group-hover:translate-x-1 transition-all">
                  ↗
                </div>
              </a>
            }
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .flood-layer {
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `]
})
export class CertificationsComponent {
  readonly certs = CERTIFICATIONS;
}

