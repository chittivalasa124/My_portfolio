import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS, SKILL_GROUPS, SkillElement } from '../../core/data';
import { TechLogoComponent } from '../ui/tech-logo.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TechLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="pt-6 sm:pt-8 pb-8 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Technical Skills">
      <!-- Section Tag & Heading -->
      <div class="mb-6 sm:mb-8 rv">
        <div class="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-2">02 — Skills</div>
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d] mb-3">
          The periodic table of my <span class="font-serif italic text-[#77756f]">stack.</span>
        </h2>
        <p class="text-xs sm:text-sm text-[#77756f] font-mono">
          Elements across full-stack engineering. Hover a tile to see its details, or select a category to highlight.
        </p>
      </div>

      <!-- Family Filter Chips -->
      <div class="rv flex flex-wrap gap-2 mb-6 pb-3 border-b border-[rgba(13,13,13,0.1)]">
        @for (group of skillGroups; track group) {
          <button
            type="button"
            (click)="selectGroup(group)"
            class="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer"
            [ngClass]="activeGroup() === group 
              ? 'bg-[#0d0d0d] text-white shadow-sm' 
              : 'border border-[rgba(13,13,13,0.1)] text-[#3a3a3a] hover:border-[#0d0d0d] hover:text-[#0d0d0d] bg-white/60'"
          >
            {{ group }}
          </button>
        }
      </div>

      <!-- Main Layout: Grid (left) + Sticky Inspector (right) -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        
        <!-- Periodic Element Tiles Grid (7 Columns) with row-by-row black to white gradient fade -->
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2.5">
          @for (skill of skills; track skill.number; let i = $index) {
            <button
              type="button"
              (click)="inspect(skill)"
              (mouseenter)="inspect(skill)"
              (focus)="inspect(skill)"
              class="rv group relative aspect-square p-2.5 rounded-2xl transition-all duration-300 flex flex-col justify-between text-left select-none border cursor-pointer"
              [ngClass]="[
                getShadeClass(i),
                isDimmed(skill) ? 'tile-dimmed' : 'tile-active',
                selectedSkill()?.number === skill.number ? 'tile-selected' : ''
              ]"
              [style.animation-delay]="(i % 7 + Math.floor(i / 7)) * 30 + 'ms'"
            >
              <!-- Top Row: Atomic Number + Dot Indicator -->
              <div class="flex items-center justify-between w-full pointer-events-none">
                <span class="font-mono text-[9px] opacity-70 group-hover:opacity-100">{{ skill.number }}</span>
                <span class="w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 bg-current"></span>
              </div>

              <!-- Center: 2-Letter Symbol -->
              <div class="text-xl sm:text-2xl font-bold font-mono tracking-tight group-hover:scale-110 transition-transform pointer-events-none">
                {{ skill.symbol }}
              </div>

              <!-- Bottom: Skill Name -->
              <div class="text-[10px] font-medium truncate w-full opacity-85 group-hover:opacity-100 pointer-events-none">
                {{ skill.name }}
              </div>
            </button>
          }
        </div>

        <!-- Right Side Sticky Inspector Panel -->
        <aside class="sticky top-24 p-6 rounded-3xl bg-white border border-[rgba(13,13,13,0.1)] shadow-sm">
          @if (selectedSkill(); as skill) {
            <div class="flex flex-col animate-pop">
              <!-- Element Card Header -->
              <div class="flex items-center justify-between pb-4 border-b border-[rgba(13,13,13,0.1)] mb-6">
                <span class="font-mono text-xs text-[#77756f]">ELEMENT #{{ skill.number }}</span>
                <span class="px-2.5 py-0.5 rounded-full bg-[#f4f2ee] text-[10px] font-mono text-[#0d0d0d] font-semibold">
                  {{ skill.family }}
                </span>
              </div>

              <!-- Large Center Logo Visual -->
              <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[#f4f2ee] p-4 text-[#0d0d0d] border border-neutral-200 shadow-inner">
                <app-tech-logo [name]="skill.name" size="large"></app-tech-logo>
              </div>

              <!-- Name & Symbol -->
              <div class="text-center mb-6">
                <div class="font-mono text-2xl font-bold text-[#0d0d0d]">{{ skill.symbol }}</div>
                <h3 class="text-lg font-bold text-[#0d0d0d] tracking-tight">{{ skill.name }}</h3>
              </div>

              <!-- Description -->
              <p class="text-xs text-[#3a3a3a] leading-relaxed mb-6 font-normal">
                {{ skill.description }}
              </p>

              <!-- Associated Projects / Applications -->
              <div class="border-t border-[rgba(13,13,13,0.1)] pt-4">
                <span class="font-mono text-[10px] uppercase tracking-wider text-[#77756f] block mb-2">Used In:</span>
                <div class="flex flex-wrap gap-1.5">
                  @for (proj of skill.projects; track proj) {
                    <span class="px-2 py-1 rounded-md bg-[#f4f2ee] text-[10px] font-mono text-[#0d0d0d]">
                      {{ proj }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </aside>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .tile-dimmed {
      opacity: 0.12 !important;
      transform: scale(0.96) !important;
      filter: grayscale(100%);
    }
    .tile-active {
      opacity: 1 !important;
    }
    .tile-active:hover {
      transform: scale(1.06) !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
    .tile-selected {
      outline: 2px solid #0d0d0d !important;
      outline-offset: 2px !important;
      transform: scale(1.06) !important;
      box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.15) !important;
    }
    @keyframes pop {
      0% { opacity: 0; transform: scale(0.96); }
      100% { opacity: 1; transform: scale(1); }
    }
    .animate-pop {
      animation: pop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class SkillsComponent {
  readonly skills = SKILLS;
  readonly skillGroups = SKILL_GROUPS;
  readonly Math = Math;

  activeGroup = signal<string>('All');
  selectedSkill = signal<SkillElement | null>(SKILLS[6]); // Angular by default

  selectGroup(group: string): void {
    this.activeGroup.set(group);
    // Automatically select the first skill in the selected category for instant inspector update
    if (group !== 'All') {
      const match = this.skills.find((s) => s.family === group);
      if (match) {
        this.selectedSkill.set(match);
      }
    }
  }

  inspect(skill: SkillElement): void {
    this.selectedSkill.set(skill);
  }

  isDimmed(skill: SkillElement): boolean {
    const current = this.activeGroup();
    if (current === 'All') return false;
    return skill.family !== current;
  }

  getShadeClass(index: number): string {
    const row = Math.floor(index / 7);
    switch (row) {
      case 0:
        return 'bg-[#18181b] text-white border-[#27272a]';
      case 1:
        return 'bg-[#3f3f46] text-white border-[#52525b]';
      case 2:
        return 'bg-[#71717a] text-white border-[#a1a1aa]';
      case 3:
        return 'bg-[#a1a1aa] text-[#09090b] border-[#d4d4d8]';
      case 4:
        return 'bg-[#e4e4e7] text-[#09090b] border-[#e4e4e7]';
      case 5:
      default:
        return 'bg-[#ffffff] text-[#09090b] border-[#e4e4e7] shadow-sm';
    }
  }
}
