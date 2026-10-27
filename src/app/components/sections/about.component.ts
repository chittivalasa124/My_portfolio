import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE } from '../../core/data';
import { LeetCodeService } from '../../core/leetcode.service';
import { GithubService } from '../../core/github.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="pt-12 sm:pt-16 pb-6 sm:pb-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="About Chittivalasa Rakesh">
      <!-- Section Tag & Heading -->
      <div class="mb-8 sm:mb-10 rv">
        <div class="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-2">01 — About</div>
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d]">
          Engineer behind the <span class="font-serif italic text-[#77756f]">surface.</span>
        </h2>
      </div>

      <!-- 3-Column Grid Layout: left bio, center lanyard card, right facts -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-8 items-stretch">
        
        <!-- Left Column: Summary & Bio -->
        <div class="rv flex flex-col justify-between p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.1)] shadow-sm">
          <div>
            <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] mb-4">
              Hi, I'm {{ profile.name }}.
            </h3>
            <p class="text-[#3a3a3a] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {{ profile.resumeSummary }}
            </p>
            <p class="text-[#77756f] text-xs sm:text-sm leading-relaxed border-l-2 border-[rgba(13,13,13,0.1)] pl-4 italic">
              {{ profile.shortQuote }}
            </p>
          </div>

          <div class="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[rgba(13,13,13,0.1)]">
            <a 
              [href]="profile.resumePath" 
              download 
              class="px-4 py-2 rounded-full bg-[#0d0d0d] text-white text-xs font-medium hover:bg-neutral-800 transition-all active:scale-95"
            >
              Résumé ↓
            </a>
            @if (profile.github) {
              <a 
                [href]="profile.github" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="px-4 py-2 rounded-full border border-[rgba(13,13,13,0.1)] text-[#0d0d0d] hover:border-[#0d0d0d] text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>GitHub</span>
                <span class="text-[10px] text-[#77756f]">({{ gh().totalContributions }})</span>
                <span>↗</span>
              </a>
            }
            @if (profile.linkedin) {
              <a 
                [href]="profile.linkedin" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="px-4 py-2 rounded-full border border-[rgba(13,13,13,0.1)] text-[#0d0d0d] hover:border-[#0d0d0d] text-xs font-medium transition-all active:scale-95"
              >
                LinkedIn ↗
              </a>
            }
            <a 
              [href]="leetcodeService.profileUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="px-4 py-2 rounded-full border border-[rgba(13,13,13,0.1)] text-[#0d0d0d] hover:border-[#0d0d0d] text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>LeetCode</span>
              <span class="text-[10px] text-[#77756f]">({{ lc().totalSolved }})</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <!-- Center Column: Hanging Lanyard ID Card -->
        <div class="rv flex flex-col items-center justify-start relative select-none">
          <!-- Lanyard Strap with Scrolling Name -->
          <div class="w-8 h-14 bg-[#0d0d0d] rounded-t-sm relative overflow-hidden flex items-center justify-center shadow-inner">
            <div class="absolute inset-0 flex flex-col justify-around opacity-40 text-[7px] text-white font-mono uppercase tracking-tighter leading-none py-1">
              <span>ENG</span>
              <span>DEV</span>
            </div>
          </div>
          <!-- Metal Clip Connector -->
          <div class="w-10 h-3 bg-neutral-400 rounded-sm mb-1 border border-neutral-500 shadow-sm"></div>

          <!-- Flip Card Container -->
          <div 
            class="card-scene w-[290px] h-[410px] cursor-pointer"
            (mouseenter)="isFlipped.set(true)"
            (mouseleave)="isFlipped.set(false)"
            (click)="toggleFlip()"
            (keydown.enter)="toggleFlip()"
            (keydown.space)="toggleFlip()"
            tabindex="0"
            role="region"
            aria-label="Interactive Developer ID Card. Press enter or click to flip"
          >
            <div class="card-inner w-full h-full relative" [class.is-flipped]="isFlipped()">
              
              <!-- FRONT OF CARD -->
              <div class="card-face card-front absolute inset-0 bg-white rounded-3xl p-5 border border-neutral-200 shadow-xl flex flex-col justify-between">
                <!-- Top Header Band -->
                <div class="bg-[#0d0d0d] text-white text-[10px] font-mono tracking-widest text-center py-1.5 rounded-lg font-bold">
                  DEVELOPER ID • ACCENTURE
                </div>

                <!-- Portrait Photo in frame -->
                <div class="flex flex-col items-center my-auto">
                  <div class="w-28 h-36 rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-inner group">
                    <img 
                      src="portrait-bust.webp" 
                      [alt]="profile.name"
                      class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 class="font-bold text-base text-[#0d0d0d] tracking-tight mt-3 text-center">
                    {{ profile.name }}
                  </h4>
                  <span class="text-[11px] font-mono text-[#77756f] text-center font-medium">
                    {{ profile.cardRole }}
                  </span>
                </div>

                <!-- Info Grid -->
                <div class="border-t border-neutral-100 pt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div>
                    <span class="text-[#77756f] block">ID NO:</span>
                    <span class="font-semibold text-[#0d0d0d]">{{ profile.idNumber }}</span>
                  </div>
                  <div>
                    <span class="text-[#77756f] block">VALID:</span>
                    <span class="font-semibold text-[#0d0d0d]">{{ profile.validFrom }} — {{ profile.validTill }}</span>
                  </div>
                </div>

                <!-- Bottom Barcode & Hologram -->
                <div class="border-t border-neutral-100 pt-2 flex items-center justify-between">
                  <div class="flex items-center gap-[2px] h-5 opacity-70">
                    <span class="w-[2px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[1px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[3px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[1px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[4px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[2px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[1px] h-full bg-[#0d0d0d]"></span>
                    <span class="w-[3px] h-full bg-[#0d0d0d]"></span>
                  </div>
                  <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-neutral-300 via-neutral-100 to-neutral-400 border border-neutral-300 shadow-sm flex items-center justify-center text-[7px] font-mono font-bold text-neutral-600">
                    CR
                  </div>
                </div>
              </div>

              <!-- BACK OF CARD -->
              <div class="card-face card-back absolute inset-0 bg-neutral-900 text-white rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div class="font-mono text-[9px] uppercase tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 mb-3 flex items-center justify-between">
                    <span>Security Credentials</span>
                    <span class="text-neutral-500 font-bold">CR-124</span>
                  </div>
                  <ul class="text-[11px] space-y-2 text-neutral-300 font-sans">
                    <li class="flex items-start gap-1.5">
                      <span class="text-neutral-500 font-mono">01.</span>
                      <span>Frontend Engineer on AT&T Client Engagement</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-neutral-500 font-mono">02.</span>
                      <span>Master of Computer Applications (CGPA: 7.6 / 10)</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-neutral-500 font-mono">03.</span>
                      <span>Core focus: Angular Signals, RxJS, NgRx & Spring Boot</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-neutral-500 font-mono">04.</span>
                      <span>Certified in Microsoft Azure & Accenture Analytics</span>
                    </li>
                  </ul>
                </div>

                <div class="border-t border-neutral-800 pt-3">
                  <div class="flex items-baseline justify-between mb-1.5">
                    <div class="font-bold text-sm tracking-tight text-white font-mono">
                      {{ profile.backName }}
                    </div>
                    <div class="font-mono text-[10px] text-neutral-400">
                      ID: <span class="text-neutral-200 font-semibold">{{ profile.idNumber }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between font-mono text-[9px] text-neutral-400 mb-2">
                    <span>VALID FROM: <strong class="text-neutral-200 font-semibold">{{ profile.validFrom }}</strong></span>
                    <span>VALID TILL: <strong class="text-neutral-200 font-semibold text-sm leading-none">{{ profile.validTill }}</strong></span>
                  </div>
                  <div class="text-[9px] font-mono text-neutral-500 pt-1 border-t border-neutral-800/80">
                    If found, say hello • {{ profile.email }}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Right Column: Quick Facts -->
        <div class="rv flex flex-col justify-between p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.1)] shadow-sm">
          <div>
            <h3 class="text-xs font-mono uppercase tracking-widest text-[#77756f] mb-6">
              Quick Facts
            </h3>
            
            <dl class="space-y-4 text-xs sm:text-sm">
              <div class="border-b border-[rgba(13,13,13,0.1)] pb-3">
                <dt class="text-[#77756f] text-xs font-mono">Current Engagement</dt>
                <dd class="font-semibold text-[#0d0d0d] mt-0.5">{{ profile.clientEngagement }}</dd>
              </div>
              <div class="border-b border-[rgba(13,13,13,0.1)] pb-3">
                <dt class="text-[#77756f] text-xs font-mono">Highest Degree</dt>
                <dd class="font-semibold text-[#0d0d0d] mt-0.5">Master of Computer Applications (7.6 CGPA)</dd>
              </div>
              <div class="border-b border-[rgba(13,13,13,0.1)] pb-3">
                <dt class="text-[#77756f] text-xs font-mono">Undergraduate Degree</dt>
                <dd class="font-semibold text-[#0d0d0d] mt-0.5">B.Sc Computer Science (7.2 CGPA)</dd>
              </div>
              <div class="border-b border-[rgba(13,13,13,0.1)] pb-3">
                <dt class="text-[#77756f] text-xs font-mono">Direct Email</dt>
                <dd class="font-semibold text-[#0d0d0d] mt-0.5 font-mono text-xs">{{ profile.email }}</dd>
              </div>
              <div>
                <dt class="text-[#77756f] text-xs font-mono">Mobile</dt>
                <dd class="font-semibold text-[#0d0d0d] mt-0.5 font-mono text-xs">{{ profile.phone }}</dd>
              </div>
            </dl>
          </div>

          <div class="mt-8 pt-4 text-xs text-[#77756f] font-mono flex items-center justify-between border-t border-[rgba(13,13,13,0.1)]">
            <span>Availability: Available for collaborations</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>

      </div>

      <!-- LIVE LEETCODE ACTIVITY WIDGET -->
      <div class="mt-8 rv">
        <a 
          [href]="leetcodeService.profileUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="group block p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.1)] hover:border-[#0d0d0d] shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <!-- Top Row: LeetCode Brand + Live Status Badge -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(13,13,13,0.1)]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-[#f4f2ee] flex items-center justify-center p-2 shadow-inner">
                <svg viewBox="0 0 24 24" class="w-full h-full text-[#FFA116]" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-base text-[#0d0d0d] tracking-tight group-hover:text-black">
                    LeetCode Live Profile
                  </h4>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Sync
                  </span>
                </div>
                <div class="font-mono text-xs text-[#77756f]">
                  &#64;{{ leetcodeService.username }} • Real-time problem solving activity
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs font-mono text-[#0d0d0d] font-semibold">
              <span>View Profile</span>
              <span class="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </div>
          </div>

          <!-- Middle Metrics Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div class="p-4 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex flex-col justify-between">
              <span class="font-mono text-[10px] uppercase tracking-wider text-[#77756f]">Total Solved</span>
              <div class="my-2">
                <span class="font-mono text-3xl sm:text-4xl font-bold text-[#0d0d0d]">{{ lc().totalSolved }}</span>
                <span class="font-mono text-xs text-[#77756f]"> / {{ lc().totalQuestions }}</span>
              </div>
              <span class="font-mono text-[11px] text-emerald-600 font-medium">✓ Real-time verified</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex flex-col justify-between">
              <span class="font-mono text-[10px] uppercase tracking-wider text-teal-700 font-semibold">Easy</span>
              <div class="my-2">
                <span class="font-mono text-3xl sm:text-4xl font-bold text-[#0d0d0d]">{{ lc().easySolved }}</span>
                <span class="font-mono text-xs text-[#77756f]"> / {{ lc().totalEasy }}</span>
              </div>
              <div class="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div class="bg-teal-500 h-full rounded-full" [style.width.%]="(lc().easySolved / lc().totalEasy) * 100"></div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex flex-col justify-between">
              <span class="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-semibold">Medium</span>
              <div class="my-2">
                <span class="font-mono text-3xl sm:text-4xl font-bold text-[#0d0d0d]">{{ lc().mediumSolved }}</span>
                <span class="font-mono text-xs text-[#77756f]"> / {{ lc().totalMedium }}</span>
              </div>
              <div class="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" [style.width.%]="(lc().mediumSolved / lc().totalMedium) * 100"></div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex flex-col justify-between">
              <span class="font-mono text-[10px] uppercase tracking-wider text-rose-600 font-semibold">Hard</span>
              <div class="my-2">
                <span class="font-mono text-3xl sm:text-4xl font-bold text-[#0d0d0d]">{{ lc().hardSolved }}</span>
                <span class="font-mono text-xs text-[#77756f]"> / {{ lc().totalHard }}</span>
              </div>
              <div class="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div class="bg-rose-500 h-full rounded-full" [style.width.%]="(lc().hardSolved / lc().totalHard) * 100"></div>
              </div>
            </div>
          </div>

          <!-- Heatmap Matrix: 52 Weeks x 7 Days for LeetCode -->
          <div class="pt-6 overflow-x-auto no-scrollbar">
            <div class="min-w-[680px]">
              <div class="flex items-center justify-between text-xs font-mono text-[#77756f] mb-3">
                <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span class="font-semibold text-[#0d0d0d]">{{ lc().submissions }} submissions in the past one year</span>
                  <span class="text-[11px] text-[#77756f] hidden sm:inline">•</span>
                  <span class="text-[11px] text-[#77756f]">Total active days: <strong class="text-[#0d0d0d] font-semibold">{{ lc().totalActiveDays }}</strong></span>
                  <span class="text-[11px] text-[#77756f] hidden sm:inline">•</span>
                  <span class="text-[11px] text-[#77756f]">Max streak: <strong class="text-[#0d0d0d] font-semibold">{{ lc().maxStreak }}</strong></span>
                </div>
                <div class="flex items-center gap-1.5 text-[10px]">
                  <span>Less</span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#ebedf0] border border-[rgba(0,0,0,0.05)]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#9be9a8]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#40c463]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#30a14e]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#216e39]"></span>
                  <span>More</span>
                </div>
              </div>

              <!-- Contribution Squares Grid -->
              <div class="grid grid-flow-col grid-rows-7 gap-1 p-3 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)]">
                @for (day of lc().calendar; track day.date) {
                  <div
                    class="w-2.5 h-2.5 rounded-xs transition-transform duration-200 hover:scale-125 hover:z-10 cursor-pointer"
                    [ngClass]="getDayColorClass(day.level)"
                    [attr.title]="day.date + ': ' + day.count + ' submission' + (day.count === 1 ? '' : 's')"
                  ></div>
                }
              </div>

              <!-- Month Labels -->
              <div class="flex justify-between text-[10px] font-mono text-[#77756f] px-2 pt-2">
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- LIVE GITHUB CONTRIBUTIONS ACTIVITY WIDGET (Under LeetCode) -->
      <div class="mt-6 rv">
        <a 
          [href]="githubService.profileUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="group block p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(13,13,13,0.1)] hover:border-[#0d0d0d] shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <!-- Top Row: GitHub Brand + Live Stats -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(13,13,13,0.1)]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-[#0d0d0d] text-white flex items-center justify-center p-2 shadow-inner">
                <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-base text-[#0d0d0d] tracking-tight group-hover:text-black">
                    GitHub Contributions Activity
                  </h4>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Sync
                  </span>
                </div>
                <div class="font-mono text-xs text-[#77756f]">
                  &#64;{{ githubService.username }} • {{ gh().publicRepos }} public repositories • {{ gh().totalContributions }} contributions
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs font-mono text-[#0d0d0d] font-semibold">
              <span>View GitHub</span>
              <span class="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </div>
          </div>

          <!-- Heatmap Matrix: 52 Weeks x 7 Days -->
          <div class="pt-6 overflow-x-auto no-scrollbar">
            <div class="min-w-[680px]">
              <div class="flex items-center justify-between text-xs font-mono text-[#77756f] mb-3">
                <span class="font-semibold text-[#0d0d0d]">{{ gh().totalContributions }} contributions in the past year</span>
                <div class="flex items-center gap-1.5 text-[10px]">
                  <span>Less</span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#ebedf0] border border-[rgba(0,0,0,0.05)]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#9be9a8]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#40c463]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#30a14e]"></span>
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#216e39]"></span>
                  <span>More</span>
                </div>
              </div>

              <!-- Contribution Squares Grid -->
              <div class="grid grid-flow-col grid-rows-7 gap-1 p-3 rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)]">
                @for (day of gh().contributions; track day.date) {
                  <div
                    class="w-2.5 h-2.5 rounded-xs transition-transform duration-200 hover:scale-125 hover:z-10 cursor-pointer"
                    [ngClass]="getDayColorClass(day.level)"
                    [attr.title]="day.date + ': ' + day.count + ' contributions'"
                  ></div>
                }
              </div>

              <!-- Month Labels -->
              <div class="flex justify-between text-[10px] font-mono text-[#77756f] px-2 pt-2">
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </div>
        </a>
      </div>

    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .card-scene {
      perspective: 1000px;
    }
    .card-inner {
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d;
    }
    .card-inner.is-flipped {
      transform: rotateY(180deg);
    }
    .card-face {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .card-back {
      transform: rotateY(180deg);
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class AboutComponent implements OnInit {
  readonly profile = PROFILE;
  readonly leetcodeService = inject(LeetCodeService);
  readonly githubService = inject(GithubService);

  isFlipped = signal<boolean>(false);
  readonly lc = this.leetcodeService.stats;
  readonly gh = this.githubService.stats;

  ngOnInit(): void {
    this.leetcodeService.fetchStats();
    this.githubService.fetchStats();
  }

  toggleFlip(): void {
    this.isFlipped.update((v) => !v);
  }

  getDayColorClass(level: number): string {
    switch (level) {
      case 1:
        return 'bg-[#9be9a8]';
      case 2:
        return 'bg-[#40c463]';
      case 3:
        return 'bg-[#30a14e]';
      case 4:
        return 'bg-[#216e39]';
      case 0:
      default:
        return 'bg-[#ebedf0] border border-[rgba(0,0,0,0.04)]';
    }
  }
}
