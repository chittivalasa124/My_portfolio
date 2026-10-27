import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-tech-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isBrand()) {
      <div class="tech-icon-brand" [class.tech-icon-large]="size() === 'large'" [class.tech-icon-small]="size() === 'small'">
        <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor" [attr.aria-label]="name()">
          <path [attr.d]="getPath()" />
        </svg>
      </div>
    } @else {
      <div class="tech-icon-concept" [class.tech-icon-large]="size() === 'large'" [class.tech-icon-small]="size() === 'small'">
        <svg viewBox="0 0 24 24" class="w-full h-full stroke-current" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path [attr.d]="getConceptPath()" />
        </svg>
      </div>
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .tech-icon-brand, .tech-icon-concept {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .tech-icon-small {
      width: 16px;
      height: 16px;
    }
    .tech-icon-large {
      width: 80px;
      height: 80px;
    }
  `]
})
export class TechLogoComponent {
  name = input.required<string>();
  size = input<'small' | 'medium' | 'large'>('medium');

  isBrand(): boolean {
    const brandKeys = ['Java', 'TypeScript', 'JavaScript', 'Angular', 'RxJS', 'NgRx', 'Spring Boot', 'Node.js', 'MongoDB', 'PostgreSQL', 'Redis', 'Apache Kafka', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Jest', 'Cypress', 'Playwright', 'SonarQube'];
    return brandKeys.some((b) => this.name().toLowerCase().includes(b.toLowerCase()));
  }

  getPath(): string {
    const n = this.name().toLowerCase();
    if (n.includes('angular')) {
      return 'M12 2L2 5.5l1.6 12.8L12 22l8.4-3.7L22 5.5 12 2zm0 3.7l5.3 11.8h-2.2l-1.1-2.7H10l-1.1 2.7H6.7L12 5.7zm1.2 7.2l-1.2-3-1.2 3h2.4z';
    }
    if (n.includes('typescript')) {
      return 'M3 3h18v18H3V3zm14.5 11.2c-.4-.7-1.1-1.2-2.1-1.5-.7-.2-1.1-.4-1.1-.8 0-.4.3-.6.8-.6.5 0 .9.2 1.2.5l1.3-1.3c-.6-.7-1.4-1-2.5-1-1.7 0-2.8 1-2.8 2.5 0 1.1.7 1.8 1.9 2.1.8.2 1.3.4 1.3.9 0 .4-.4.7-1 .7-.7 0-1.2-.3-1.7-.8l-1.3 1.3c.7.9 1.8 1.3 3 1.3 1.9 0 3-1 3-2.6 0-.2 0-.5-.1-.7zM6.5 9.5h5v1.8h-1.6v6.2h-1.8v-6.2H6.5V9.5z';
    }
    if (n.includes('javascript')) {
      return 'M3 3h18v18H3V3zm13.8 13.5c-.7.8-1.7 1.2-2.8 1.2-1.9 0-3.1-1.1-3.1-3.1 0-.3 0-.5.1-.8l1.7.3c-.1.3-.1.4-.1.6 0 1 .6 1.5 1.5 1.5.7 0 1.2-.3 1.2-.9 0-.6-.5-.9-1.3-1.2l-.7-.3c-1.3-.5-2.1-1.3-2.1-2.6 0-1.7 1.3-2.7 3.1-2.7 1.2 0 2.2.4 2.8 1.2l-1.3 1.2c-.4-.5-.9-.7-1.5-.7-.8 0-1.3.4-1.3 1 0 .5.4.8 1.1 1l.7.3c1.5.6 2.3 1.4 2.3 2.8 0 .5-.1 1-.4 1.5zM7.5 13.5l1.8-.3c.1 1.2.7 1.8 1.7 1.8.8 0 1.3-.5 1.3-1.3V8h2v5.8c0 2.1-1.4 3.3-3.3 3.3-1.9 0-3.2-1.1-3.5-3.6z';
    }
    if (n.includes('java')) {
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.5 0-4.5-.8-4.5-.8s1.2-.8 3.5-.8c2.8 0 4 .8 4 .8s-.5.8-3 0.8zm2.5-3.5c-3.5.5-6.5-.5-6.5-.5s1.5-.8 4.5-.8c3.5 0 5 .8 5 .8s-1 .5-3 .5zm-1-4c-2.5.3-4.5-.3-4.5-.3s1-.6 3.5-.6c2.5 0 3.5.6 3.5.6s-1 .3-2.5.3z';
    }
    if (n.includes('docker')) {
      return 'M13.9 8.2h2.2v2.2h-2.2V8.2zm-2.8 0h2.2v2.2h-2.2V8.2zm-2.8 0h2.2v2.2H8.3V8.2zm-2.8 0h2.2v2.2H5.5V8.2zm5.6-2.8h2.2v2.2h-2.2V5.4zm-2.8 0h2.2v2.2H8.3V5.4zm-2.8 0h2.2v2.2H5.5V5.4zm14.8 6.2c-.4-.3-1.1-.5-2-.3-.2-.5-.5-.9-.9-1.2l-.7.6c.3.3.5.6.6 1-.7.4-1.2 1-1.3 1.7H2.2c-.1.5-.2 1.1-.2 1.7 0 3.9 3.2 7 7.2 7 4.2 0 7.6-3 8-7.1 1.2 0 2.3-.5 3-1.4l-.8-.8z';
    }
    if (n.includes('aws')) {
      return 'M18.8 14.5c-2.3 1.7-5.5 2.6-8.4 2.6-4 0-7.5-1.5-10.2-4-.2-.2 0-.5.2-.3 2.6 1.5 5.7 2.4 8.9 2.4 2.6 0 5.4-.7 7.9-2.1.4-.2.7.2.3.5l1.3.9zm1.4-1.3c-.3-.4-1.9-.2-2.6-.1-.2 0-.3-.2-.1-.3.9-.7 2.4-.5 2.7-.1.3.4-.2 1.9-1 2.7-.2.2-.4.1-.3-.1.3-.6.6-1.7.3-2.1zM6.8 9.3l1.8-.3c.4 1.2 1.3 1.7 2.6 1.7 1.2 0 2.1-.5 2.1-1.4 0-.8-.7-1.2-1.9-1.4l-1.1-.2c-1.8-.3-2.8-1.2-2.8-2.6 0-1.8 1.5-2.9 3.7-2.9 1.8 0 3.2.7 3.7 2.1l-1.7.5c-.3-.8-.9-1.2-2-1.2-1.1 0-1.8.5-1.8 1.2 0 .7.6 1 1.7 1.2l1.1.2c2.1.4 3.1 1.3 3.1 2.8 0 2-1.7 3.1-4 3.1-2.2 0-3.8-1.1-4.4-2.8z';
    }
    // Generic Brand fallback
    return 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5';
  }

  getConceptPath(): string {
    const n = this.name().toLowerCase();
    if (n.includes('dsa') || n.includes('algorithm')) {
      return 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83M12 7a5 5 0 100 10 5 5 0 000-10z';
    }
    if (n.includes('system design') || n.includes('microservices')) {
      return 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6zM10 7h4m-7 7v-4m10 4v-4m-7 7h4';
    }
    if (n.includes('cryptography') || n.includes('security')) {
      return 'M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 5a3 3 0 016 0v3H9V7zm3 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z';
    }
    // Generic concept
    return 'M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5zm0 6a3 3 0 110 6 3 3 0 010-6z';
  }
}

