# Complete Developer Tools Webapp Generation Prompt

Create a comprehensive, fully responsive developer tools webapp using HTML5, CSS3, and vanilla JavaScript. The webapp should be a single-page application with the following specifications:

## Core Requirements:

### 1. **Architecture & Structure**
- Single HTML file with embedded CSS and JavaScript
- Responsive design that works on desktop, tablet, and mobile
- Dark/light theme toggle
- Clean, modern UI with card-based layout
- Search functionality to find tools quickly
- Category-based navigation with smooth scrolling
- Progressive Web App (PWA) capabilities with service worker
- Offline functionality where possible

### 2. **SEO Optimization**
- Complete meta tags including Open Graph and Twitter Cards
- Structured data (JSON-LD) for better search engine understanding
- Semantic HTML5 elements (header, nav, main, section, article, footer)
- Descriptive alt tags for images
- Proper heading hierarchy (h1, h2, h3)
- Fast loading with optimized assets
- Mobile-first responsive design
- Accessibility compliance (ARIA labels, keyboard navigation)

### 3. **Tools to Include** (Organized by Categories):

#### **Time & Date Tools**
- Unix Timestamp Converter (current time, custom conversion)
- Time Zone Converter with major cities
- Date Calculator (difference, add/subtract days)
- World Clock with multiple zones
- Countdown Timer with custom alerts
- Cron Expression Builder and explainer

#### **Text & String Processing**
- Base64 Encoder/Decoder
- URL Encoder/Decoder
- HTML Entity Encoder/Decoder
- Hash Generator (MD5, SHA1, SHA256, SHA512)
- Text Diff/Compare with side-by-side view
- Word/Character/Line Counter
- Text Case Converter (upper, lower, title, camel, snake, kebab)
- Lorem Ipsum Generator with custom parameters
- Regex Tester with explanation and flags
- String Escape/Unescape for various languages

#### **Data Format Tools**
- JSON Formatter/Validator/Minifier with syntax highlighting
- XML Formatter/Validator with error reporting
- YAML Validator and JSON converter
- CSV to JSON/XML converter with preview
- SQL Formatter with syntax highlighting
- HTML/CSS/JS Beautifier and Minifier
- Markdown to HTML Converter with preview

#### **Number & Conversion Tools**
- Number Base Converter (binary, octal, decimal, hex)
- Unit Converter (length, weight, volume, area, temperature)
- Color Picker/Converter (RGB, HEX, HSL, CMYK) with palette
- Percentage Calculator with multiple formats
- Math Expression Evaluator
- Random Number Generator with range options

#### **Security & Encoding**
- Secure Password Generator with customizable criteria
- QR Code Generator with custom size/error correction
- JWT Token Decoder with header/payload display
- Random Data Generator (UUIDs, API keys, etc.)
- Text Encryption/Decryption (simple Caesar cipher)

#### **Web Development**
- Meta Tag Generator for SEO
- Open Graph Meta Generator
- Twitter Card Meta Generator
- Robots.txt Generator
- Sitemap.xml Generator
- CSS Selector Tester
- HTTP Status Code Reference with descriptions
- MIME Type Checker
- User Agent Parser

#### **Network & System**
- IP Address Information Display
- Browser Information Detector
- Screen Resolution & Device Info
- Geolocation Display (with permission)
- Network Speed Test Simulator
- Port Number Reference

#### **Image & Media**
- Image Resizer with drag-drop upload
- Base64 Image Encoder/Decoder
- Favicon Generator from uploaded image
- Color Palette Extractor from images
- Image Format Information

#### **Productivity Tools**
- Pomodoro Timer with customizable intervals
- Simple Note Taking with local storage
- To-Do List with persistence
- Stopwatch with lap times
- Scientific Calculator
- Habit Tracker with streak counting

### 4. **Technical Implementation Details**

#### **User Interface**
- Use modern CSS Grid and Flexbox for layouts
- Implement CSS custom properties for theming
- Smooth animations and transitions
- Loading states for async operations
- Error handling with user-friendly messages
- Copy-to-clipboard functionality for outputs
- Drag-and-drop file upload where applicable
- Real-time updates/previews where possible

#### **JavaScript Features**
- Modular code structure with ES6+ features
- Local Storage for user preferences and data persistence
- Service Worker for PWA functionality
- Efficient DOM manipulation
- Input validation and sanitization
- Keyboard shortcuts for power users
- Export/import functionality for settings

#### **Performance & Optimization**
- Lazy loading for non-critical tools
- Efficient algorithms for computations
- Minimal external dependencies
- Compressed and optimized code
- Fast initial load time
- Smooth 60fps animations

### 5. **Specific Features**

#### **Navigation & UX**
- Sticky header with search and theme toggle
- Breadcrumb navigation
- Recently used tools section
- Favorites/bookmarking system
- Keyboard navigation support
- Help tooltips and documentation

#### **Data Handling**
- Client-side only processing (no server required)
- Secure handling of sensitive data
- Multiple input/output formats
- Batch processing capabilities where applicable
- Undo/Redo functionality for text tools

### 6. **SEO & Performance Specifics**
- Title: "DevTools Hub - Free Online Developer Tools & Utilities"
- Meta description highlighting the comprehensive nature
- Canonical URL structure
- robots.txt friendly
- Sitemap integration
- Fast Core Web Vitals scores
- Schema.org markup for SoftwareApplication

### 7. **Additional Requirements**
- Privacy-focused (no tracking, no external API calls for sensitive data)
- Works completely offline after initial load
- Print-friendly stylesheets
- High contrast mode support
- Font size adjustment options
- Export results in multiple formats (JSON, CSV, TXT)

### 8. **Code Quality**
- Clean, commented code
- Consistent naming conventions
- Error boundaries and graceful degradation
- Cross-browser compatibility (modern browsers)
- No console errors or warnings
- Proper event cleanup and memory management

## Expected Output:
Generate a complete, production-ready HTML file that includes:
1. All the specified tools with full functionality
2. Professional styling with both dark and light themes
3. Complete SEO optimization
4. PWA manifest and service worker
5. Comprehensive error handling
6. Mobile-responsive design
7. Accessibility features

The final webapp should be deployable to any static hosting service and work perfectly without any backend dependencies.