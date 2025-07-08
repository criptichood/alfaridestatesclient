# **App Name**: Alfarid Estates Showcase

## Core Features:

- Homepage Hero: Displays a hero section with the Alfarid Estates brand message and introductory content.
- Image Gallery: Showcase real estate projects via Cloudinary image URLs fetched from Firebase Firestore, displayed in a grid layout on the gallery page with lazy loading.
- YouTube Video Embeds: Embed and display YouTube videos fetched from Firebase Firestore on the videos page.
- Service Descriptions: Describe offered real estate services with a "Book a Consultation" button that links to a specified calendly URL.
- Loading Indicators: Implements loading skeletons and placeholders for images and videos during content fetching from Cloudinary, YouTube, and Firestore.
- Smooth Loading: Add fade-in animations for images and videos as they load to enhance visual appeal.
- Listing Description Generator: AI tool: Upon request by the user, generate relevant and concise descriptions of the real estate listings in both english and spanish.

## Style Guidelines:

- Primary color: Deep navy blue (#1A237E) for professionalism and trust.
- Background color: Very light blue-gray (#F0F4F8), almost white.
- Accent color: Soft gold (#D4AC0D) for highlights and call-to-actions to evoke luxury and prestige.
- Body font: 'Inter', sans-serif, modern and clean, suitable for body text
- Headline font: 'Playfair', modern serif, elegant and high-end, suitable for headlines.  Use 'Inter' for body text.
- Use elegant, minimalist icons sourced from a @shadcn/ui library or a similar professional set.
- Clean and modern layout with clear visual hierarchy. Utilize white space effectively to provide a sense of luxury and sophistication. The grid of the Gallery page must reflow responsively.
- Smooth transitions using Framer Motion, including fade-in effects and subtle hover animations.