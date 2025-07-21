# FutureAcademy - JEE/NEET Coaching Platform

## Overview

This is a modern, responsive website for FutureAcademy, a JEE/NEET coaching institute. The project is built as a static frontend application with a focus on user experience, visual appeal, and accessibility. It features a contemporary design with smooth animations, dark/light theme switching, and responsive layout optimized for all devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Type**: Static website (HTML/CSS/JavaScript)
- **Structure**: Single-page application with multiple sections
- **Styling**: Custom CSS with CSS custom properties for theming
- **Animations**: Lottie animations and CSS-based effects
- **Icons**: LordIcon integration for interactive icons

### Theme System
- **Implementation**: CSS custom properties with data attributes
- **Storage**: Browser localStorage for theme persistence
- **Switching**: JavaScript-based theme manager with smooth transitions
- **Themes**: Light and dark mode support

## Key Components

### 1. Navigation System
- Responsive navigation bar with hamburger menu for mobile
- Smooth scrolling to page sections
- Theme toggle button with visual feedback
- Logo with accent styling

### 2. Theme Management
- **ThemeManager Class**: Handles all theme-related functionality
- **Persistence**: Saves user preference in localStorage
- **Visual Feedback**: Animated ripple effect on theme toggle
- **Icon Updates**: Dynamic theme icon changes (moon/sun)

### 3. Hero Section
- **Background Effects**: Animated blob elements for visual appeal
- **Responsive Design**: Adapts to different screen sizes
- **Call-to-Action**: Prominent buttons for user engagement

### 4. Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Scalable typography and spacing
- Touch-friendly interactions

## Data Flow

### Theme Management Flow
1. User clicks theme toggle button
2. ThemeManager detects click event
3. Current theme is evaluated (light/dark)
4. New theme is applied via CSS custom properties
5. Theme preference is saved to localStorage
6. Visual feedback (ripple animation) is triggered
7. Theme icon is updated

### Navigation Flow
1. User interacts with navigation links
2. Smooth scrolling to target sections
3. Mobile menu toggle for smaller screens
4. Active section highlighting (planned)

## External Dependencies

### Third-party Libraries
- **Lottie Player**: For complex animations and micro-interactions
- **LordIcon**: For interactive icon animations
- **Google Fonts**: 
  - Inter (300-800 weights) for body text
  - Orbitron (400, 700, 900) for headers and logo

### CDN Resources
- Lottie Player: `@lottiefiles/lottie-player@latest`
- LordIcon: `lordicon.js`
- Google Fonts: Preconnected for performance

## Deployment Strategy

### Static Hosting
- **Type**: Static file hosting (suitable for GitHub Pages, Netlify, Vercel)
- **Files**: HTML, CSS, JavaScript, and asset files
- **No Backend**: Pure frontend application
- **Performance**: Optimized with font preloading and efficient CSS

### Performance Optimizations
- Font preloading for faster text rendering
- CSS custom properties for efficient theming
- Minimal JavaScript footprint
- Responsive images and assets (when added)

### Browser Compatibility
- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Mobile-responsive design
- Accessibility considerations with ARIA labels

## Future Enhancements

The current architecture supports easy expansion for:
- Contact form integration
- Course enrollment system
- Student portal
- Content management system
- Analytics integration
- Progressive Web App features

The modular CSS and JavaScript structure makes it straightforward to add new features while maintaining the existing design system and user experience.