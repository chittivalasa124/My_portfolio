import { Injectable, NgZone, inject } from '@angular/core';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private ngZone = inject(NgZone);
  private lenis: Lenis | null = null;
  private rafId: number | null = null;

  init(): void {
    if (typeof window === 'undefined' || this.lenis) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false
      });

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };

      this.rafId = requestAnimationFrame(raf);
    });
  }

  scrollToTarget(target: string | HTMLElement, offset: number = -40): void {
    if (typeof window === 'undefined') return;

    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset,
        duration: 1.2
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    }
  }

  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }
}

