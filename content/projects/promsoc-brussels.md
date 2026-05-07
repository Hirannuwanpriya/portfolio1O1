---
title: "Promsoc.Brussels"
summary: "Government-affiliated adult education portal for Brussels — continuous development, backend optimisation, and UX overhaul of a live platform managing 250+ courses and 10,000+ registered users."
slug: "promsoc-brussels"
date: "2025-06-01"
order: 3
category: "Government / Education Portal"

techStack:
  - Laravel 9
  - Laravel Nova 3
  - Livewire
  - AlpineJS
  - Tailwind CSS
  - Meilisearch
  - Laravel Forge
  - Flare

coverImage: "/images/projects/promsoc-brussels/cover.png"
coverAlt: "Promsoc.Brussels portal showing a course listing page with search, filters, and registration flow"

gallery:
  - src: "/images/projects/promsoc-brussels/screen-1.png"
    alt: "Course catalogue with Meilisearch-powered instant search and category filters"
  - src: "/images/projects/promsoc-brussels/screen-2.png"
    alt: "Student registration and multi-course enrolment flow"
  - src: "/images/projects/promsoc-brussels/screen-3.png"
    alt: "Laravel Nova admin panel showing student registration management and course detail views"

liveUrl: "https://epa.brussels"
githubUrl: ""

featured: true
published: true
clientName: "Promsoc.Brussels"
clientLocation: "Belgium"
role: "Full Stack Developer"
duration: "3 months"
teamSize: "2"

seo:
  title: "Promsoc.Brussels — Adult Education Portal | Hiran Nuwanpriya"
  description: "Case study: continuous development and UX/performance overhaul of a government-affiliated adult education portal in Brussels. 40% load time improvement, 30% session duration increase, 10,000+ user accounts."
  ogImage: "/images/projects/promsoc-brussels/og.png"

structuredData:
  type: "SoftwareApplication"
  applicationCategory: "EducationApplication"
---

## Overview

Promsoc.Brussels is a government-affiliated online portal serving as the primary
registration and enrolment platform for adult education in the Brussels region.
The system enables learners to discover and enrol in courses across multiple
subject areas, while providing 20+ administrative staff with the tooling to
manage student registrations, course records, and enrolment workflows from a
centralised Laravel Nova backend.

At the time of my engagement, the platform was actively serving over 10,000
registered user accounts and more than 250 live courses — making stability,
performance, and usability the primary engineering concerns throughout the
project.

## The Problem

- The existing platform had accumulated performance debt — page load times were
  noticeably slow, creating friction across the student-facing registration
  journey and reducing session engagement.
- UI and UX patterns in both the student portal and the admin panel were
  inconsistent, reducing accessibility and making common administrative
  workflows more time-consuming than necessary.
- Inherited without a dedicated handover, the system required careful
  self-directed exploration before any development work could begin — with no
  disruption to the live environment serving active users and administrative
  staff.
- The client needed a developer who could independently understand the system,
  document its behaviour, validate those findings with stakeholders, and then
  deliver improvements — without requiring constant supervision.

## My Role

Full Stack Developer, working in a two-person team. I was responsible for:

- Direct client communication throughout the engagement — understanding
  workflow requirements, documenting system behaviour, and confirming
  understanding before development began on each feature area.
- Self-directed system analysis: using available admin and student login
  credentials to explore and document the platform's end-to-end flows before
  writing a single line of code.
- Backend performance optimisation across high-traffic routes.
- UI/UX improvements across the student portal and Laravel Nova admin panel.

## Solution

### Discovery and Documentation First

Rather than beginning development immediately, I first used the provided admin
and student logins to work through the platform as its actual users would.
I mapped the full registration and enrolment flow, documented system behaviour
at each step, and identified inconsistencies and friction points across both
user roles.

Once the documentation was complete, I presented my findings to the client to
confirm accuracy and align on priorities before any code changes were made.
This approach ensured that all subsequent development was grounded in a
verified understanding of the real workflow — not assumptions — and prevented
rework caused by misaligned requirements.

### Backend Optimisation

With the system well understood, backend performance improvements were targeted
at the highest-impact routes:

- Identified and resolved N+1 query patterns across student-facing course
  listing and registration pages.
- Applied Laravel query caching and eager loading across frequently accessed
  data relationships.
- Optimised Meilisearch index configuration for faster full-text course
  search response times.
- Reduced unnecessary database round-trips in the Nova admin panel for
  registration management views used by the 20+ administrative staff.

These changes produced an approximate 40% improvement in page load times
across the core user journeys.

### UI and UX Overhaul

The front-end improvements focused on accessibility, navigation consistency,
and reducing friction in the enrolment flow:

- Rebuilt key Livewire components for the registration and multi-course
  enrolment flow to improve responsiveness and reduce interaction steps.
- Applied consistent Tailwind CSS design patterns across the student portal,
  improving visual hierarchy and accessibility across device sizes.
- Refined AlpineJS interactions for filter panels and form feedback to
  provide clearer, faster UI responses without full page reloads.
- Improved the Nova admin panel layout for the registration management
  workflow — reducing the click depth required for common administrative
  tasks performed daily by the 20+ staff members.

The UX improvements resulted in an approximately 30% increase in session
duration and a 25% reduction in bounce rate across the student-facing portal.

## Outcomes

- Page load times improved by approximately **40%** across core user journeys.
- Session duration increased by approximately **30%** following UX improvements.
- Bounce rate reduced by approximately **25%** on the student portal.
- A consistent, device-responsive UI delivered across a platform serving
  **10,000+ registered users** and **250+ active courses**.
- Administrative workflows streamlined for **20+ staff members** in the Nova
  backend.
- Full system behaviour documented and client-confirmed before development
  commenced — preventing scope misalignment and rework.

## Tech Stack Detail

Livewire was the right choice for the registration flow improvements because
the existing codebase was already built around it, and its server-driven
reactivity model suited the form-heavy enrolment UX without introducing a
full client-side SPA layer. AlpineJS complemented it well for the lightweight
interactive states — filter toggles, validation feedback, and conditional
form sections — that did not require server round-trips.

Meilisearch was already in place for course discovery. The optimisation work
focused on index tuning and query structuring rather than replacement, which
kept the scope contained and the search experience fast for learners browsing
the 250+ course catalogue.

Flare was used for error monitoring throughout the engagement, providing
visibility into production exceptions across the student and admin surfaces
without requiring access to raw server logs.

## Challenges and Learnings

### Understanding a live system with no documentation

When the engagement began, there was no technical documentation and no
colleague familiar with the system's internals available to consult. The only
entry points were an admin login and a student login to the production
environment.

The approach was deliberate: use the system as its users use it before
attempting to change anything. I worked through every flow available to both
user roles, recording how each step behaved, what data it touched, and where
the friction points were. This produced a structured document that captured
the platform's actual behaviour — not what it was intended to do, but what
it was doing in practice.

Presenting this document to the client before development began was one of
the most valuable steps in the engagement. It surfaced two workflow
misunderstandings early, allowed the client to correct my assumptions, and
gave both parties a shared reference point for every subsequent conversation
about requirements. It also gave the client confidence that the system was
understood — which was especially important given that the platform was
actively serving thousands of users throughout the project.

The discipline of documenting first and developing second is something I now
apply as a default on any engagement where the system is not already well
understood.
