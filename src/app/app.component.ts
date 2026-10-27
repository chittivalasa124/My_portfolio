import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/sections/about.component';
import { SkillsComponent } from './components/sections/skills.component';
import { WorkComponent } from './components/sections/work.component';
import { CertificationsComponent } from './components/sections/certifications.component';
import { ExperienceComponent } from './components/sections/experience.component';
import { AchievementsComponent } from './components/sections/achievements.component';
import { ContactComponent } from './components/sections/contact.component';
import { ScrollService } from './core/scroll.service';
import { initRevealObserver } from './core/observers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    WorkComponent,
    CertificationsComponent,
    ExperienceComponent,
    AchievementsComponent,
    ContactComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full min-h-screen bg-[#f4f2ee] text-ink selection:bg-ink selection:text-white">
      <!-- Global Navigation -->
      <app-navigation></app-navigation>

      <main class="w-full">
        <!-- 01. Hero -->
        <app-hero></app-hero>

        <!-- 02. About (Hanging Lanyard ID Card) -->
        <app-about></app-about>

        <!-- 03. Skills (Periodic Table of Stack) -->
        <app-skills></app-skills>

        <!-- 04. Work (Expanding Accordion Gallery) -->
        <app-work></app-work>

        <!-- 05. Certifications (Ink Flood Index) -->
        <app-certifications></app-certifications>

        <!-- 06. Experience (Timeline Spine) -->
        <app-experience></app-experience>

        <!-- 07. Achievements (Horizontal Gallery) -->
        <app-achievements></app-achievements>
      </main>

      <!-- 08. Contact & Footer -->
      <app-contact></app-contact>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.scrollService.init();
  }

  ngAfterViewInit(): void {
    initRevealObserver();
  }
}

