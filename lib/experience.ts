/**
 * Single source of truth for the `/experience` page timeline and the
 * `ProfilePage` JSON-LD generator. Keep entries in reverse-chronological
 * order (most recent first).
 */

export interface ExperienceEntry {
  /** Stable slug for `key` props and anchor links. */
  id: string;
  company: string;
  /** Optional location displayed alongside the company name. */
  location?: string;
  /** Display period — e.g. "2023 – 2025" or "2025 – present". */
  period: string;
  /** ISO start year, used by JSON-LD `worksFor.startDate`. */
  startYear: string;
  /** ISO end year (or `undefined` for current role). */
  endYear?: string;
  role: string;
  /** Lead paragraph describing the role at a glance. */
  summary: string;
  /** Bullet list of achievements / responsibilities. */
  achievements: string[];
}

export interface PreviousExperienceEntry {
  id: string;
  company: string;
  period: string;
  role: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "creative-software",
    company: "Creative Software",
    location: "Sri Lanka",
    period: "2025 – present",
    startYear: "2025",
    role: "Associate Technical Lead / Full Stack Engineer",
    summary:
      "Served as Associate Technical Lead and Full Stack Engineer, owning the end-to-end migration of a legacy web platform to a modern server environment. Led infrastructure setup, deployment workflows, and application upgrades while modernizing outdated PHP and JavaScript codebases and third-party libraries. Stabilized and scaled a high-availability travel aggregator by resolving critical legacy issues, improving performance, and strengthening system reliability. Actively mentored junior developers, enforced engineering best practices, and contributed hands-on to complex problem solving across the platform.",
    achievements: [
      "Led full server and infrastructure migration, including environment setup, source code transfer, database migration, and system reconfiguration.",
      "Designed and implemented reliable deployment workflows, improving release stability and operational efficiency.",
      "Reduced website load time by 66% (from 12 sec to 4 sec) through code optimisation, caching strategies, API performance tuning, and frontend rendering improvements.",
      "Identified, fixed, and refactored pre-existing bugs inherited at takeover, significantly improving platform stability.",
      "Provided technical leadership and mentorship to junior developers through code reviews, guidance, and best-practice enforcement.",
      "Collaborated closely with stakeholders to ensure smooth delivery during migration and upgrade phases.",
      "Reinforced data protection and compliance by adopting encryption best practices, running security audits, and maintaining GDPR-compliant data governance.",
    ],
  },
  {
    id: "bws-brussels",
    company: "BWS Brussels / Eurokom SPRL",
    location: "Belgium",
    period: "2023 – 2025",
    startYear: "2023",
    endYear: "2025",
    role: "Team Lead / Full Stack Developer",
    summary:
      "Served as Team Lead / Senior Full Stack Developer, driving the architecture, development, and optimization of high-availability enterprise applications using Laravel, Vue.js, and React.js. Directed a globally distributed development team and ensured scalable system design, secure integrations, and efficient DevOps practices. Spearheaded the modernization of legacy systems, introduced cutting-edge open-source tools, and implemented AI-driven automation to streamline business operations across various sectors in Europe.",
    achievements: [
      "Deployed Scalable SaaS Platforms for industries including Real estate, Healthcare, and E-Commerce sectors, boosting client operational efficiency by 30% and reducing time-to-market by 50%.",
      "Led International Development Teams across Europe and Asia, ensuring timely project delivery, adherence to coding standards, and optimal resource utilization through Agile and CI/CD practices.",
      "Implemented Robust DevOps Workflows using tools such as Docker, Forge, Envoyer, and Horizon, enhancing deployment efficiency and system observability.",
      "Optimized System Performance by integrating Redis, Elasticsearch, and asynchronous job queues, resulting in a 50%+ improvement in response times and performance under load.",
      "Maintained 99.9% Uptime for high-traffic platforms through proactive monitoring (Flare, Ohdear) and rigorous testing (PHPUnit, PEST), reinforcing platform stability.",
      "Mentored Junior Engineers and provided leadership in best practices, clean code principles, and new technology adoption across Laravel's ecosystem (Nova, Vapor, Scout, Pennant).",
      "Enhanced Security & Compliance by enforcing encryption standards, conducting vulnerability assessments, and maintaining GDPR-aligned data handling processes.",
    ],
  },
  {
    id: "adlux-software",
    company: "Adlux Software (Pvt) Ltd",
    period: "2020 – 2023",
    startYear: "2020",
    endYear: "2023",
    role: "Senior Software Engineer / Full Stack Developer",
    summary:
      "Served as a Senior Software Engineer, specializing in Laravel and open-source technologies, with a focus on delivering scalable, secure, and high-availability applications for clients across Sri Lanka, the USA, Australia, and Europe. Oversaw the full software development lifecycle, from system integration to deployment and performance optimization. Actively contributed to business growth by supporting requirement gathering, and client communication, while fostering technical excellence within the team.",
    achievements: [
      "Designed & Delivered Custom Laravel Applications tailored to diverse industry needs including Education, Engineering, E-Commerce, and Sports ensuring maintainable, modular codebases.",
      "Led Complex Integration Projects, including third-party API services (e.g., Mailchimp, Twilio, Stripe), CRM systems, and marketing automation tools to streamline digital operations.",
      "Optimized system performance by restructuring MySQL queries, implementing Redis caching, and leveraging Laravel queues reducing average page load time from 4.2s to under 1.5s.",
      "Fostered Agile Development Practices, enhancing delivery speed and collaboration through tools like GitHub, Jira, and Docker-based environments.",
      "Played a Key Role in DevOps & Deployment, utilizing tools such as Forge, Envoyer, and DigitalOcean for smooth CI/CD workflows and scalable infrastructure setups.",
    ],
  },
  {
    id: "itelligence-services",
    company: "Itelligence Services (Pvt) Ltd",
    period: "2017 – 2020",
    startYear: "2017",
    endYear: "2020",
    role: "Senior Software Engineer / Full Stack Developer",
    summary:
      "Served as a Senior Software Engineer, specializing in Symfony, CakePHP, and open-source solutions, delivering robust, high-availability applications for European clients. Played a pivotal role in system architecture, technical execution, and performance optimization. Led end-to-end development cycles, from requirements analysis to deployment, ensuring scalable, secure, and maintainable software. Fostered technical growth within the team and drove innovation in backend development workflows.",
    achievements: [
      "Designed & Delivered Complex Symfony and CakePHP Applications addressing advanced business logic and integration needs for multi-regional platforms.",
      "Engineered a Scalable Multi-Vendor SaaS Platform, ensuring high performance, seamless UX, and extensibility for future growth.",
      "Enhanced Development Workflows using Git-based version control, Docker, and CI pipelines, reducing deployment time and increasing delivery velocity.",
      "Improved Application Performance through optimized SQL queries, asynchronous processing, and caching strategies with Redis.",
      "Integrated Secure Payment Gateways (Stripe, PayPal, Bancontact) and external services (Mailchimp), improving transactional efficiency and marketing automation.",
      "Led Troubleshooting and Refactoring Initiatives to maintain code quality, reduce technical debt, and align legacy systems with modern standards.",
      "Collaborated Closely with European Stakeholders to gather complex requirements, translate them into technical specifications, and ensure timely delivery.",
      "Mentored Peers and Promoted Best Practices, building a collaborative team culture focused on high-quality, secure, and performant software delivery.",
    ],
  },
  {
    id: "247techies",
    company: "247techies",
    period: "2015 – 2017",
    startYear: "2017",
    endYear: "2020",
    role: "Software Engineer",
    summary:
      "Served as a Senior Software Engineer, specializing in Symfony, CakePHP, and open-source solutions, delivering robust, high-availability applications for European clients. Played a pivotal role in system architecture, technical execution, and performance optimization. Led end-to-end development cycles, from requirements analysis to deployment, ensuring scalable, secure, and maintainable software. Fostered technical growth within the team and drove innovation in backend development workflows.",
    achievements: [
      "Designed & Delivered Complex Symfony and CakePHP Applications addressing advanced business logic and integration needs for multi-regional platforms.",
      "Engineered a Scalable Multi-Vendor SaaS Platform, ensuring high performance, seamless UX, and extensibility for future growth.",
      "Enhanced Development Workflows using Git-based version control, Docker, and CI pipelines, reducing deployment time and increasing delivery velocity.",
      "Improved Application Performance through optimized SQL queries, asynchronous processing, and caching strategies with Redis.",
      "Integrated Secure Payment Gateways (Stripe, PayPal, Bancontact) and external services (Mailchimp), improving transactional efficiency and marketing automation.",
      "Led Troubleshooting and Refactoring Initiatives to maintain code quality, reduce technical debt, and align legacy systems with modern standards.",
      "Collaborated Closely with European Stakeholders to gather complex requirements, translate them into technical specifications, and ensure timely delivery.",
      "Mentored Peers and Promoted Best Practices, building a collaborative team culture focused on high-quality, secure, and performant software delivery.",
    ],
  },
  {
    id: "fidenz",
    company: "fidenz",
    period: "2013 – 2015",
    startYear: "2017",
    endYear: "2020",
    role: "Associate Software Engineer",
    summary:
      "Served as a Senior Software Engineer, specializing in Symfony, CakePHP, and open-source solutions, delivering robust, high-availability applications for European clients. Played a pivotal role in system architecture, technical execution, and performance optimization. Led end-to-end development cycles, from requirements analysis to deployment, ensuring scalable, secure, and maintainable software. Fostered technical growth within the team and drove innovation in backend development workflows.",
    achievements: [
      "Designed & Delivered Complex Symfony and CakePHP Applications addressing advanced business logic and integration needs for multi-regional platforms.",
      "Engineered a Scalable Multi-Vendor SaaS Platform, ensuring high performance, seamless UX, and extensibility for future growth.",
      "Enhanced Development Workflows using Git-based version control, Docker, and CI pipelines, reducing deployment time and increasing delivery velocity.",
      "Improved Application Performance through optimized SQL queries, asynchronous processing, and caching strategies with Redis.",
      "Integrated Secure Payment Gateways (Stripe, PayPal, Bancontact) and external services (Mailchimp), improving transactional efficiency and marketing automation.",
      "Led Troubleshooting and Refactoring Initiatives to maintain code quality, reduce technical debt, and align legacy systems with modern standards.",
      "Collaborated Closely with European Stakeholders to gather complex requirements, translate them into technical specifications, and ensure timely delivery.",
      "Mentored Peers and Promoted Best Practices, building a collaborative team culture focused on high-quality, secure, and performant software delivery.",
    ],
  },
  {
    id: "prime-engineering-lanka",
    company: "Prime Engineering Lanka (Pvt) Ltd",
    period: "2011 – 2013",
    startYear: "2011",
    endYear: "2013",
    role: "Web developer",
    summary:
      "Served as a Senior Software Engineer, specializing in Symfony, CakePHP, and open-source solutions, delivering robust, high-availability applications for European clients. Played a pivotal role in system architecture, technical execution, and performance optimization. Led end-to-end development cycles, from requirements analysis to deployment, ensuring scalable, secure, and maintainable software. Fostered technical growth within the team and drove innovation in backend development workflows.",
    achievements: [
      "Designed & Delivered Complex Symfony and CakePHP Applications addressing advanced business logic and integration needs for multi-regional platforms.",
      "Engineered a Scalable Multi-Vendor SaaS Platform, ensuring high performance, seamless UX, and extensibility for future growth.",
      "Enhanced Development Workflows using Git-based version control, Docker, and CI pipelines, reducing deployment time and increasing delivery velocity.",
      "Improved Application Performance through optimized SQL queries, asynchronous processing, and caching strategies with Redis.",
      "Integrated Secure Payment Gateways (Stripe, PayPal, Bancontact) and external services (Mailchimp), improving transactional efficiency and marketing automation.",
      "Led Troubleshooting and Refactoring Initiatives to maintain code quality, reduce technical debt, and align legacy systems with modern standards.",
      "Collaborated Closely with European Stakeholders to gather complex requirements, translate them into technical specifications, and ensure timely delivery.",
      "Mentored Peers and Promoted Best Practices, building a collaborative team culture focused on high-quality, secure, and performant software delivery.",
    ],
  },
];
