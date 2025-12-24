# Design Guidelines: 2026 Southeastern Regional Women's & Girls' Chess Championship

## Design Approach
**System-Based with Chess Tournament Context**: Following Apple HIG's content-focused minimalism combined with traditional chess tournament conventions. The design prioritizes clarity, authority, and trust over visual experimentation.

## Core Design Principles
1. **Authoritative Calm**: Traditional, professional aesthetic that conveys credibility
2. **Information Clarity**: Scannable hierarchy for dense tournament data
3. **Mobile-First Accessibility**: Critical information readable without zooming
4. **Purposeful Restraint**: Every element serves the user's need to understand tournament details

## Typography System

**Font Families** (Google Fonts):
- Primary: Inter (headings, UI elements) - weights: 400, 600, 700
- Secondary: Georgia (body text, descriptions) - weights: 400, 600

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl, font-bold
- Page Titles: text-4xl md:text-5xl, font-bold
- Section Headers: text-2xl md:text-3xl, font-semibold
- Subsections: text-xl, font-semibold
- Body: text-base md:text-lg
- Small/Meta: text-sm

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24**
- Component padding: p-6 to p-8
- Section spacing: py-12 md:py-20
- Card gaps: gap-6 md:gap-8
- Container max-width: max-w-6xl

**Grid Strategy**:
- Single column on mobile
- 2-column layouts for tablet/desktop where appropriate (venue/hotel, contact info)
- Tables remain single-scroll on mobile, expand naturally on desktop

## Component Library

### Navigation
- Sticky top bar with logo/title left, menu items right
- Desktop: Full horizontal menu
- Mobile: Hamburger menu with slide-out/dropdown
- "Register Now" button: Visually distinct (filled, accent color)

### Hero Section (Home Page)
- Large background image: Chess pieces or tournament hall (professional stock photo)
- Centered content overlay with semi-transparent dark backdrop (bg-black/50)
- Hierarchy: Tournament name → Date → Prize fund → Registration cap → CTA button
- CTA button with backdrop-blur-md bg-white/10 border border-white/20

### Cards & Content Blocks
- Clean white cards with subtle shadow (shadow-sm)
- Rounded corners: rounded-lg
- Minimal borders where needed: border border-gray-200

### Tables (Schedule, Prizes, Fees)
- Full-width responsive tables
- Alternating row backgrounds: even:bg-gray-50
- Bold headers with bottom border
- Mobile: Horizontal scroll wrapper OR stacked card layout for complex tables

### Buttons
- Primary CTA: Filled, accent color, px-8 py-3, rounded-lg, font-semibold
- Secondary: Outline style, border-2
- Buttons on images: backdrop-blur-md, semi-transparent background

### Forms (Contact Page)
- Input fields: border, rounded-md, px-4 py-3
- Labels above inputs, text-sm font-medium
- Placeholder stub with "Contact form coming soon" message

### Maps
- Embedded Google Maps iframe: w-full h-96, rounded-lg
- Venue address displayed prominently above map

### Footer
- Two-line layout: Credit text + Grant acknowledgment
- Center-aligned, py-8, text-sm, muted text color

## Images

**Required Images**:
1. **Hero Image (Home)**: Professional chess tournament scene - players competing, focused atmosphere. Full-width, approximately 70vh height. Overlay with semi-transparent dark gradient for text readability.

2. **Section Headers (Optional)**: Small chess-themed accent images (chess pieces, board patterns) used sparingly as decorative elements - 100-150px square, subtle opacity.

3. **Venue Page**: Exterior photo of Atlanta Chinese Christian Church if available, otherwise skip.

**Image Treatment**: All images use rounded-lg corners, maintain aspect ratios, optimize for web performance.

## Visual Hierarchy Patterns

**Page Structure**:
- Page title (top, centered or left-aligned)
- Brief intro paragraph (max-w-3xl, centered)
- Content sections with clear headings
- Generous whitespace between sections (py-12 to py-20)

**Data Presentation**:
- Use tables for schedules, fees, prizes
- Use definition lists (dt/dd) for key-value pairs
- Use bullet points for policies
- Icons (Heroicons) for contact methods, locations

## Responsive Behavior

**Breakpoints**:
- Mobile: base (< 768px)
- Tablet: md (768px+)
- Desktop: lg (1024px+)

**Adaptations**:
- Navigation: Hamburger on mobile, full menu on desktop
- Tables: Scroll or card-stack on mobile
- Multi-column grids: Stack to single column on mobile
- Hero text: Reduce size, maintain readability

## Accessibility Standards
- WCAG AA contrast ratios
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Semantic HTML5 (nav, main, section, article)
- Alt text for all images
- Proper heading hierarchy (h1 → h2 → h3)

## Performance Considerations
- Optimize hero image (WebP format, ~200KB)
- Use icon library CDN (Heroicons)
- Minimize custom fonts (2 families only)
- Lazy-load images below fold

**No Animations**: Static, calm interface. Subtle hover states only (opacity change, slight scale).