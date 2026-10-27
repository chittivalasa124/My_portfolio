export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  badge?: string;
}

export interface SkillElement {
  number: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Caching & Messaging' | 'Cloud & DevOps' | 'Quality & Testing' | 'Architecture & Concepts';
  isBrand: boolean;
  projects: string[];
  description: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  type: 'work' | 'internship' | 'education';
  detail: string[];
  highlight?: string;
}

export interface Certification {
  index: string;
  title: string;
  issuer: string;
  year?: string;
  url?: string;
}

export interface Achievement {
  index: string;
  metric: string;
  targetNumber: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
  detail: string;
  platform: string;
}

export const PROFILE = {
  name: 'Chittivalasa Rakesh',
  firstName: 'RAKESH',
  role: 'Associate Software Engineer (Angular Developer)',
  cardRole: 'Software Engineer (Developer)',
  headingRole: 'Full Stack Developer.',
  clientEngagement: 'Accenture in India — Client: AT&T',
  email: 'chittivalasa1204@gmail.com',
  phone: '+91 630330870',
  phoneHref: 'tel:+91630330870',
  location: 'India',
  github: 'https://github.com/chittivalasa124',
  githubUser: 'chittivalasa124',
  linkedin: 'https://www.linkedin.com/in/chittivalasa124/',
  linkedinUser: 'chittivalasa124',
  portfolioUrl: 'https://chittivalasa124.github.io/Rakesh_portfolio.com/',
  resumePath: 'resume.pdf',
  graduationYear: '2024',
  idNumber: 'CR-124818-ENG',
  validFrom: '2000',
  validTill: '∞',
  department: 'Frontend Engineering / AT&T',
  resumeSummary:
    'Angular Developer at Accenture, working on the AT&T client, with experience in multi-platform frontend development. Skilled in Angular, TypeScript, JavaScript, responsive UI development, and API integration, with a broader technical foundation across Java/Spring Boot, REST APIs, databases, messaging, cloud, and DevOps. Focused on building maintainable, secure, and scalable applications.',
  shortQuote:
    'Dedicated to building responsive, secure, and accessible multi-platform applications with clean reactive architecture.',
  signature: 'Ch . Rakesh',
  backName: 'Ch . Rakesh'
};

export const NAV = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'certifications', label: 'Certifications', index: '04' },
  { id: 'experience', label: 'Experience', index: '05' },
  { id: 'achievements', label: 'Achievements', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' }
];

export const SKILL_GROUPS = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Caching & Messaging',
  'Cloud & DevOps',
  'Quality & Testing',
  'Architecture & Concepts'
] as const;

export const SKILLS: SkillElement[] = [
  // Languages
  { number: 1, symbol: 'Ja', name: 'Java', family: 'Languages', isBrand: true, projects: ['Secure File Storage in the Cloud'], description: 'Java 17/21 enterprise microservices, multithreading, and OOP design.' },
  { number: 2, symbol: 'Ts', name: 'TypeScript', family: 'Languages', isBrand: true, projects: ['AT&T Enterprise Frontend', 'KNSFPCL Company Portfolio'], description: 'Strict typing, modern generics, Signals, and enterprise design patterns.' },
  { number: 3, symbol: 'Js', name: 'JavaScript (ES6+)', family: 'Languages', isBrand: true, projects: ['AT&T Multi-Platform', 'Web Internships'], description: 'Asynchronous event loops, DOM manipulation, ES-next modular architecture.' },
  { number: 4, symbol: 'Sq', name: 'SQL', family: 'Languages', isBrand: true, projects: ['Data Analysis & Microservices'], description: 'Complex relational schemas, query tuning, indexing, and transactional integrity.' },
  { number: 5, symbol: 'H5', name: 'HTML5', family: 'Languages', isBrand: true, projects: ['Enterprise Web UIs', 'KNSFPCL Portfolio'], description: 'Accessible semantics, ARIA attributes, responsive layout structure.' },
  { number: 6, symbol: 'C3', name: 'CSS3', family: 'Languages', isBrand: true, projects: ['Enterprise Design Systems', 'KNSFPCL'], description: 'Responsive layouts, modern animations, utility systems, and CSS variables.' },

  // Frontend
  { number: 7, symbol: 'Ng', name: 'Angular', family: 'Frontend', isBrand: true, projects: ['AT&T Client Engagement', 'KNSFPCL Company Portfolio'], description: 'Enterprise single-page apps, signals, lazy routing, and modular components.' },
  { number: 8, symbol: 'Rx', name: 'RxJS', family: 'Frontend', isBrand: true, projects: ['AT&T Enterprise Frontend'], description: 'Reactive streams, custom operators, memory leak prevention, and state pipelines.' },
  { number: 9, symbol: 'Sg', name: 'Angular Signals', family: 'Frontend', isBrand: true, projects: ['Modern Angular Applications'], description: 'Fine-grained reactivity, computed state, effects, and zero-zone performance.' },
  { number: 10, symbol: 'Nx', name: 'NgRx', family: 'Frontend', isBrand: true, projects: ['AT&T Enterprise Frontend'], description: 'Predictable unidirectional state store, actions, reducers, and effects.' },
  { number: 11, symbol: 'Mt', name: 'Angular Material', family: 'Frontend', isBrand: true, projects: ['AT&T Client Modules'], description: 'Design-compliant component library, data tables, dialogs, and themes.' },
  { number: 12, symbol: 'Rf', name: 'Reactive Forms', family: 'Frontend', isBrand: false, projects: ['AT&T Form Validation Modules'], description: 'Dynamic form arrays, asynchronous validators, and strict typed form groups.' },
  { number: 13, symbol: 'Lz', name: 'Lazy Loading', family: 'Frontend', isBrand: false, projects: ['AT&T Performance Engineering'], description: 'Route-level code splitting, deferred views, and bundle optimization.' },
  { number: 14, symbol: 'Rw', name: 'Responsive Web Design', family: 'Frontend', isBrand: false, projects: ['KNSFPCL Company Portfolio', 'AT&T'], description: 'Mobile-first breakpoints, fluid typography, touch ergonomics, and WCAG accessibility.' },

  // Backend
  { number: 15, symbol: 'Sb', name: 'Spring Boot', family: 'Backend', isBrand: true, projects: ['Enterprise Microservices'], description: 'Production-ready REST APIs, auto-configuration, and Actuator metrics.' },
  { number: 16, symbol: 'Sm', name: 'Spring MVC', family: 'Backend', isBrand: true, projects: ['Web Service Architecture'], description: 'Controller mappings, request handling, validation, and content negotiation.' },
  { number: 17, symbol: 'Ss', name: 'Spring Security', family: 'Backend', isBrand: true, projects: ['Microservices Security'], description: 'JWT authentication filter chains, CORS/CSRF policies, and RBAC.' },
  { number: 18, symbol: 'Jp', name: 'Spring Data JPA', family: 'Backend', isBrand: true, projects: ['Persistence Layers'], description: 'Repository abstraction, custom specifications, pagination, and caching.' },
  { number: 19, symbol: 'Hb', name: 'Hibernate', family: 'Backend', isBrand: true, projects: ['Object-Relational Mapping'], description: 'Entity lifecycle management, query caching, and batch fetch optimization.' },
  { number: 20, symbol: 'Nd', name: 'Node.js', family: 'Backend', isBrand: true, projects: ['API Services & Microservices'], description: 'High-concurrency event-driven runtime and asynchronous microservices.' },
  { number: 21, symbol: 'Ex', name: 'Express.js', family: 'Backend', isBrand: true, projects: ['RESTful Web Services'], description: 'Middleware orchestration, routing, error-handling pipelines, and JSON APIs.' },
  { number: 22, symbol: 'Ms', name: 'Microservices', family: 'Backend', isBrand: false, projects: ['Distributed Architecture'], description: 'Decoupled domain boundaries, service discovery, and resilient API contracts.' },

  // Databases
  { number: 23, symbol: 'Mg', name: 'MongoDB', family: 'Databases', isBrand: true, projects: ['Document Store Workloads'], description: 'Schema design, compound indexes, aggregation pipelines, and replication.' },
  { number: 24, symbol: 'Mo', name: 'Mongoose', family: 'Databases', isBrand: true, projects: ['Node.js Data Modeling'], description: 'Schema validation, pre/post middleware hooks, and population pipelines.' },
  { number: 25, symbol: 'Pg', name: 'PostgreSQL', family: 'Databases', isBrand: true, projects: ['Relational Data Services'], description: 'ACID transactions, JSONB columns, query explain analysis, and indexing.' },
  { number: 26, symbol: 'My', name: 'MySQL', family: 'Databases', isBrand: true, projects: ['Relational Database Systems'], description: 'Storage engine tuning, relational integrity, and join optimization.' },

  // Caching & Messaging
  { number: 27, symbol: 'Rd', name: 'Redis', family: 'Caching & Messaging', isBrand: true, projects: ['High-Speed Caching'], description: 'In-memory key-value caching, session stores, TTL strategies, and Pub/Sub.' },
  { number: 28, symbol: 'Kf', name: 'Apache Kafka', family: 'Caching & Messaging', isBrand: true, projects: ['Event-Driven Architecture'], description: 'Distributed commit log, producers, consumer groups, and high-throughput streams.' },

  // Cloud & DevOps
  { number: 29, symbol: 'Aw', name: 'AWS', family: 'Cloud & DevOps', isBrand: true, projects: ['Secure File Storage in the Cloud'], description: 'EC2, S3, IAM, RDS, ECR, EKS, CloudWatch, load balancing, and auto-scaling.' },
  { number: 30, symbol: 'Dk', name: 'Docker', family: 'Cloud & DevOps', isBrand: true, projects: ['Containerized Workloads'], description: 'Multi-stage Dockerfiles, image minimization, and container security.' },
  { number: 31, symbol: 'K8', name: 'Kubernetes', family: 'Cloud & DevOps', isBrand: true, projects: ['Container Orchestration'], description: 'Deployments, services, ingress routing, rolling updates, and Pod configs.' },
  { number: 32, symbol: 'Jk', name: 'Jenkins', family: 'Cloud & DevOps', isBrand: true, projects: ['CI/CD Pipelines'], description: 'Automated build, test, and release pipeline orchestration.' },
  { number: 33, symbol: 'Ga', name: 'GitHub Actions', family: 'Cloud & DevOps', isBrand: true, projects: ['Automated Workflows'], description: 'Declarative YAML workflows for linting, unit tests, and artifact publishing.' },

  // Quality & Testing
  { number: 34, symbol: 'Js', name: 'Jest', family: 'Quality & Testing', isBrand: true, projects: ['Frontend Unit Testing'], description: 'Fast snapshot testing, mocked services, and test coverage metrics.' },
  { number: 35, symbol: 'Km', name: 'Karma & Jasmine', family: 'Quality & Testing', isBrand: true, projects: ['Angular Unit Testing'], description: 'Browser test runner, spy fixtures, and component harness tests.' },
  { number: 36, symbol: 'Cy', name: 'Cypress', family: 'Quality & Testing', isBrand: true, projects: ['End-to-End Validation'], description: 'Headless browser end-to-end integration and user journey tests.' },
  { number: 37, symbol: 'Pw', name: 'Playwright', family: 'Quality & Testing', isBrand: true, projects: ['Multi-browser E2E'], description: 'Cross-browser automated verification, visual regressions, and accessibility checks.' },
  { number: 38, symbol: 'Sq', name: 'SonarQube', family: 'Quality & Testing', isBrand: true, projects: ['Code Quality & Security'], description: 'Static analysis, code smell detection, vulnerability scanning, and test gates.' },

  // Architecture & Concepts
  { number: 39, symbol: 'Ds', name: 'DSA', family: 'Architecture & Concepts', isBrand: false, projects: ['Algorithmic Efficiency'], description: 'Data structures, algorithm complexity analysis, trees, graphs, and dynamic programming.' },
  { number: 40, symbol: 'Sd', name: 'System Design', family: 'Architecture & Concepts', isBrand: false, projects: ['Scalable Architecture'], description: 'Distributed systems, high availability, rate limiting, and fault tolerance.' },
  { number: 41, symbol: 'Op', name: 'OOP & SOLID', family: 'Architecture & Concepts', isBrand: false, projects: ['Clean Software Architecture'], description: 'Clean architecture principles, design patterns, separation of concerns.' },
  { number: 42, symbol: 'Cr', name: 'Cryptography (AES/RSA)', family: 'Architecture & Concepts', isBrand: false, projects: ['Secure File Storage in the Cloud'], description: 'Hybrid symmetric and asymmetric encryption for confidentiality and data integrity.' }
];

export const PROJECTS: Project[] = [
  {
    id: 'dance-academy',
    index: '01',
    title: 'Dance Academy Management System',
    kicker: 'Full-Stack Enterprise & Workflow Architecture',
    description:
      'A full-stack web application connecting prospective members, enrolled students, and academy administrators through role-specific experiences. Features complete admission lifecycle review, student attendance tracking, Razorpay fee checkout, and dedicated role-protected dashboard APIs.',
    features: [
      'Multi-tier role-based access control (Admin, User, Student) with secure transition pipeline',
      'End-to-end admission approval workflow with real-time status tracking',
      'Integrated Razorpay checkout gateway for digital student fee collection & ledger logs',
      'Dedicated dashboard REST APIs built on Spring Boot 3.5, Spring Security, JWT, and MySQL'
    ],
    tech: ['Angular 22', 'TypeScript', 'Java 17', 'Spring Boot 3.5', 'Spring Security', 'JWT', 'Spring Data JPA', 'MySQL', 'PrimeNG', 'Razorpay'],
    github: 'https://github.com/chittivalasa124',
    badge: 'Full-Stack Case Study'
  },
  {
    id: 'crypto-cloud',
    index: '02',
    title: 'Secure File Storage in the Cloud using Hybrid Cryptography',
    kicker: 'Cloud Security & Hybrid Cryptography',
    description:
      'Implemented secure cloud file storage using AES and RSA hybrid cryptography to support data confidentiality and integrity. Collaborated with a team to integrate the system with AWS S3 and Azure Blob Storage.',
    features: [
      'AES & RSA hybrid cryptographic pipeline ensuring end-to-end data confidentiality',
      'Multi-cloud integration across AWS S3 and Microsoft Azure Blob Storage',
      'Strict key management and zero-knowledge data integrity verification',
      'Asynchronous upload streams with chunked cryptographic hashing'
    ],
    tech: ['Java', 'AES / RSA', 'AWS S3', 'Azure Blob', 'Spring Boot', 'REST APIs'],
    github: 'https://github.com/chittivalasa124/secure-file-storage-cloud',
    badge: 'Security Architecture'
  },
  {
    id: 'knsfpcl-portfolio',
    index: '03',
    title: 'KNSFPCL Company Portfolio',
    kicker: 'Performance Engineering & Web Architecture',
    description:
      'Spearheaded the optimization of site performances through the utilization of efficient code practices in page API integration, achieving a notable 25% decrease in page load times; elevated user engagement levels by presenting visually appealing and informative content, resulting in an impressive 50% enhancement in overall user satisfaction.',
    features: [
      '25% reduction in overall page load times through API query and bundle optimization',
      '50% boost in user satisfaction via intuitive and responsive UI layout design',
      'Modern responsive architecture delivering seamless touch and desktop ergonomics',
      'Optimized asset delivery pipeline, tree-shaking, and lazy route loading'
    ],
    tech: ['Angular', 'TypeScript', 'Responsive Design', 'API Integration', 'Performance Tuning'],
    github: 'https://github.com/chittivalasa124',
    badge: 'Production Web App'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    index: '01',
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft • Credential ID: 94B6A34CBF23DB34',
    year: '2026',
    url: 'https://learn.microsoft.com/en-us/users/chittivalasarakesh-7627/credentials/certification/azure-developer?tab=credentials-tab'
  },
  {
    index: '02',
    title: 'Microsoft Certified: Azure AI Engineer Associate',
    issuer: 'Microsoft • Credential ID: B553BC25D619073A',
    year: '2023',
    url: 'https://learn.microsoft.com/en-us/users/chittivalasarakesh-7627/credentials/certification/azure-ai-engineer?tab=credentials-tab'
  },
  {
    index: '03',
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    year: '2022',
    url: 'https://learn.microsoft.com/en-us/users/chittivalasarakesh-7627/credentials?tab=credentials-tab'
  },
  {
    index: '04',
    title: 'Accenture Consultant Job Simulation',
    issuer: 'Forage',
    year: 'Oct 2023',
    url: 'https://www.linkedin.com/posts/chittivalasa124_forage-certificate-activity-7175773631522709504-Z7L2?utm_source=share&utm_medium=member_desktop'
  },
  {
    index: '05',
    title: 'Accenture North America Data Analytics and Visualization Certificate',
    issuer: 'Accenture',
    year: '2024',
    url: 'https://www.linkedin.com/posts/chittivalasa124_connections-accenture-activity-7165644518963306496-d_SD?utm_source=share&utm_medium=member_desktop'
  },
  {
    index: '06',
    title: 'Microsoft and LinkedIn Career Essentials in Software Development',
    issuer: 'Microsoft & LinkedIn',
    year: '2024',
    url: 'https://www.linkedin.com/learning/certificates/8494824213979628c9c815553dcb743569fd073aca4cb2d8eaaf0c7acb115c10?trk=share_certificate'
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    period: 'Present',
    role: 'Associate Software Engineer (Client: AT&T)',
    organization: 'Accenture in India',
    type: 'work',
    highlight: 'Current Enterprise Engagement',
    detail: [
      'Develop and maintain enterprise multi-platform frontend web applications for the AT&T client using Angular, TypeScript, JavaScript (ES6+), HTML5, and CSS3 with responsive web design.',
      'Build reactive, scalable user interfaces using RxJS, Observables, Angular Signals, NgRx state management, Angular Material, and Reactive Forms, implementing route-level lazy loading for fast page loads.',
      'Integrate frontend components with Java 17/21, Spring Boot, and Node.js/Express.js RESTful APIs and microservices using JWT Authentication, OAuth 2.0, and Role-Based Access Control (RBAC).',
      'Ensure application quality and release reliability using Jasmine, Karma, Jest, Cypress, Playwright, SonarQube, and CI/CD pipelines (Jenkins, GitHub Actions, Docker) in an Agile/Scrum environment.'
    ]
  },
  {
    period: 'Nov 2022 – May 2024',
    role: 'Master of Computer Applications (MCA)',
    organization: 'Dr. B.R. Ambedkar University',
    type: 'education',
    highlight: 'CGPA: 7.6 / 10',
    detail: [
      'Advanced computer applications curriculum focusing on software engineering, distributed systems, web architectures, and algorithms.',
      'Graduated with CGPA 7.6 / 10.'
    ]
  },
  {
    period: 'Jan 2024 – Feb 2024',
    role: 'Web Development Intern',
    organization: 'Prodigy InfoTech',
    type: 'internship',
    highlight: '1-Month Intensive Internship',
    detail: [
      'Completed one month internship on web development, building interactive UI components and responsive web applications.'
    ]
  },
  {
    period: 'Jan 2024 – Feb 2024',
    role: 'Web Development Intern',
    organization: 'Oasis Infotech',
    type: 'internship',
    highlight: '1-Month Intensive Internship',
    detail: [
      'Completed one month internship on web development focusing on dynamic front-end development, responsive layouts, and cross-browser consistency.'
    ]
  },
  {
    period: 'Nov 2023 – Dec 2023',
    role: 'Web Development Intern',
    organization: 'Bharat Intern',
    type: 'internship',
    highlight: '1-Month Intensive Internship',
    detail: [
      'Completed one month internship on web development, delivering structured web solutions and frontend modules.'
    ]
  },
  {
    period: 'Jun 2018 – Aug 2021',
    role: 'Bachelor of Computer Science',
    organization: 'Sri Basara Degree College',
    type: 'education',
    highlight: 'CGPA: 7.2 / 10',
    detail: [
      'Foundational degree in Computer Science covering algorithms, data structures, object-oriented programming, and relational database systems.',
      'Graduated with CGPA 7.2 / 10.'
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    index: '01 / 06',
    metric: '25%',
    targetNumber: 25,
    prefix: '-',
    suffix: '%',
    label: 'Page Load Time',
    caption: 'Performance Optimization',
    detail: 'Achieved through code optimization and efficient API integration at KNSFPCL.',
    platform: 'KNSFPCL'
  },
  {
    index: '02 / 06',
    metric: '50%',
    targetNumber: 50,
    prefix: '+',
    suffix: '%',
    label: 'User Satisfaction',
    caption: 'User Engagement & UX',
    detail: 'Enhanced content presentation and intuitive responsive interface design.',
    platform: 'KNSFPCL'
  },
  {
    index: '03 / 06',
    metric: '7.6',
    targetNumber: 7.6,
    suffix: ' / 10',
    label: 'MCA CGPA',
    caption: 'Dr. B.R. Ambedkar University',
    detail: 'Master of Computer Applications academic distinction (2022–2024).',
    platform: 'BRAU'
  },
  {
    index: '04 / 06',
    metric: '7.2',
    targetNumber: 7.2,
    suffix: ' / 10',
    label: 'B.Sc Computer Science CGPA',
    caption: 'Sri Basara Degree College',
    detail: 'Undergraduate distinction in computer science foundational studies (2018–2021).',
    platform: 'Basara'
  },
  {
    index: '05 / 06',
    metric: '3',
    targetNumber: 3,
    suffix: ' Internships',
    label: 'Web Internships Completed',
    caption: 'Industry Experience',
    detail: 'Completed software development internships across Oasis Infotech, Prodigy, and Bharat Intern.',
    platform: 'Experience'
  },
  {
    index: '06 / 06',
    metric: '4',
    targetNumber: 4,
    suffix: ' Certifications',
    label: 'Verified Credentials',
    caption: 'Cloud & Engineering',
    detail: 'Microsoft Azure Fundamentals, Forage Accenture Consultant, Analytics & Career Essentials.',
    platform: 'Certifications'
  }
];

