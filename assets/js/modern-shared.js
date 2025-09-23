/**
 * Modern Development Station - Enhanced Shared JavaScript
 * Modular utility classes for modern web application
 */

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.setupToggleListeners();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon(theme);
    localStorage.setItem('theme', theme);
    this.theme = theme;
  }

  toggle() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  setupToggleListeners() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  }
}

// Toast Notification System
class ToastManager {
  constructor() {
    this.container = this.createContainer();
    this.toasts = new Map();
  }

  createContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1080;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    return container;
  }

  show(message, type = 'info', duration = 4000) {
    const id = Date.now() + Math.random();
    const toast = this.createToast(message, type, id);
    
    this.container.appendChild(toast);
    this.toasts.set(id, toast);

    // Trigger show animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => this.hide(id), duration);
    }

    return id;
  }

  createToast(message, type, id) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background-color: var(--bg-card);
      border: 1px solid var(--border-primary);
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      font-size: 0.875rem;
      font-weight: 500;
      max-width: 400px;
      transform: translateX(100%);
      transition: transform 0.3s ease-out;
      pointer-events: auto;
      cursor: pointer;
    `;

    const icon = this.getIcon(type);
    const content = document.createElement('span');
    content.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text-secondary);
      padding: 0;
      margin-left: auto;
    `;

    toast.appendChild(icon);
    toast.appendChild(content);
    toast.appendChild(closeBtn);

    // Event listeners
    toast.addEventListener('click', () => this.hide(id));
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hide(id);
    });

    return toast;
  }

  getIcon(type) {
    const icon = document.createElement('span');
    icon.style.fontSize = '1.25rem';
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    icon.textContent = icons[type] || icons.info;
    return icon;
  }

  hide(id) {
    const toast = this.toasts.get(id);
    if (toast) {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        this.toasts.delete(id);
      }, 300);
    }
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Enhanced Search Manager
class SearchManager {
  constructor(inputSelector = '#searchInput') {
    this.input = document.querySelector(inputSelector);
    this.searchableElements = [];
    this.debounceTimer = null;
    this.init();
  }

  init() {
    if (this.input) {
      this.input.addEventListener('input', (e) => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.search(e.target.value);
        }, 300);
      });
    }
    this.updateSearchableElements();
  }

  updateSearchableElements() {
    this.searchableElements = Array.from(document.querySelectorAll('[data-search]'));
  }

  search(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      this.showAllElements();
      return;
    }

    let visibleCount = 0;
    
    this.searchableElements.forEach(element => {
      const searchText = element.dataset.search.toLowerCase();
      const titleElement = element.querySelector('.card-title, .tool-title, h1, h2, h3');
      const title = titleElement ? titleElement.textContent.toLowerCase() : '';
      
      const matches = searchText.includes(normalizedQuery) || title.includes(normalizedQuery);
      
      if (matches) {
        element.style.display = '';
        element.classList.add('fade-in');
        visibleCount++;
      } else {
        element.style.display = 'none';
        element.classList.remove('fade-in');
      }
    });

    this.updateSearchResults(visibleCount, query);
  }

  showAllElements() {
    this.searchableElements.forEach(element => {
      element.style.display = '';
      element.classList.add('fade-in');
    });
  }

  updateSearchResults(count, query) {
    const existingResult = document.querySelector('.search-results');
    if (existingResult) {
      existingResult.remove();
    }

    if (query.trim()) {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'search-results';
      resultDiv.style.cssText = `
        padding: 1rem;
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.875rem;
      `;
      resultDiv.textContent = `Found ${count} result${count !== 1 ? 's' : ''} for "${query}"`;
      
      const container = document.querySelector('.container') || document.body;
      container.insertBefore(resultDiv, container.firstChild);
    }
  }

  clear() {
    if (this.input) {
      this.input.value = '';
      this.showAllElements();
      const existingResult = document.querySelector('.search-results');
      if (existingResult) {
        existingResult.remove();
      }
    }
  }
}

// Enhanced Clipboard Manager
class ClipboardManager {
  static async copy(text, button = null) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = `
          position: fixed;
          left: -999999px;
          top: -999999px;
          opacity: 0;
        `;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // Visual feedback
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = 'var(--color-success)';
        button.style.color = 'white';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = '';
          button.style.color = '';
        }, 2000);
      }

      ToastManager.instance.success('Copied to clipboard!');
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      ToastManager.instance.error('Failed to copy to clipboard');
      return false;
    }
  }

  static setupCopyButtons() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('copy-btn')) {
        const target = e.target.dataset.target;
        let text = '';
        
        if (target) {
          const element = document.getElementById(target);
          text = element ? element.value || element.textContent : '';
        } else {
          // Look for text in parent result area
          const resultArea = e.target.closest('.result-area');
          if (resultArea) {
            const content = resultArea.querySelector('.result-content, textarea, input');
            text = content ? content.value || content.textContent : '';
          }
        }
        
        if (text) {
          this.copy(text, e.target);
        }
      }
    });
  }
}

// Navigation Manager
class NavigationManager {
  constructor() {
    this.currentPath = window.location.pathname;
    this.init();
  }

  init() {
    this.updateBreadcrumb();
    this.setupBackButton();
    this.highlightActiveNav();
  }

  updateBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb-nav');
    if (!breadcrumb) return;

    const pathSegments = this.currentPath.split('/').filter(segment => segment);
    const breadcrumbItems = [];

    // Home link
    breadcrumbItems.push(`<a href="/index.html" class="breadcrumb-link">Home</a>`);

    // Build breadcrumb from path
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += '/' + segment;
      const isLast = index === pathSegments.length - 1;
      const title = this.formatSegmentTitle(segment);
      
      if (isLast) {
        breadcrumbItems.push(`<span class="breadcrumb-current">${title}</span>`);
      } else {
        breadcrumbItems.push(`<a href="${currentPath}" class="breadcrumb-link">${title}</a>`);
      }
    });

    breadcrumb.innerHTML = breadcrumbItems.join('<span class="breadcrumb-separator">/</span>');
  }

  formatSegmentTitle(segment) {
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\.html$/, '')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  setupBackButton() {
    const backBtn = document.querySelector('.nav-back-btn, [onclick="goBack()"]');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '/index.html';
        }
      });
    }
  }

  highlightActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && this.currentPath.includes(href)) {
        link.classList.add('active');
      }
    });
  }

  goHome() {
    window.location.href = '/index.html';
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.goHome();
    }
  }
}

// Form Validation Manager
class FormManager {
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validateUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static setupFormValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', this.debounce(() => this.validateField(input), 500));
    });
  }

  static validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value && !this.validateEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }

    // URL validation
    if (type === 'url' && value && !this.validateUrl(value)) {
      isValid = false;
      message = 'Please enter a valid URL';
    }

    // Number validation
    if (type === 'number' && value) {
      const min = field.getAttribute('min');
      const max = field.getAttribute('max');
      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) {
        isValid = false;
        message = 'Please enter a valid number';
      } else if (min && numValue < parseFloat(min)) {
        isValid = false;
        message = `Value must be at least ${min}`;
      } else if (max && numValue > parseFloat(max)) {
        isValid = false;
        message = `Value must be no more than ${max}`;
      }
    }

    this.showFieldValidation(field, isValid, message);
    return isValid;
  }

  static showFieldValidation(field, isValid, message) {
    // Remove existing validation
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    field.classList.remove('field-valid', 'field-invalid');

    if (!isValid && message) {
      field.classList.add('field-invalid');
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.style.cssText = `
        color: var(--color-danger);
        font-size: 0.75rem;
        margin-top: 0.25rem;
      `;
      errorDiv.textContent = message;
      
      field.parentNode.appendChild(errorDiv);
    } else if (field.value.trim()) {
      field.classList.add('field-valid');
    }
  }
}

// File Manager
class FileManager {
  static readFile(file, type = 'text') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      
      switch (type) {
        case 'text':
          reader.readAsText(file);
          break;
        case 'dataUrl':
          reader.readAsDataURL(file);
          break;
        case 'arrayBuffer':
          reader.readAsArrayBuffer(file);
          break;
        default:
          reader.readAsText(file);
      }
    });
  }

  static downloadText(content, filename = 'download.txt', mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    this.downloadBlob(blob, filename);
  }

  static downloadJSON(data, filename = 'data.json') {
    const content = JSON.stringify(data, null, 2);
    this.downloadText(content, filename, 'application/json');
  }

  static downloadCSV(data, filename = 'data.csv') {
    let csv = '';
    if (Array.isArray(data) && data.length > 0) {
      // Get headers
      const headers = Object.keys(data[0]);
      csv += headers.join(',') + '\n';
      
      // Add rows
      data.forEach(row => {
        const values = headers.map(header => {
          const value = row[header] || '';
          return `"${value.toString().replace(/"/g, '""')}"`;
        });
        csv += values.join(',') + '\n';
      });
    }
    this.downloadText(csv, filename, 'text/csv');
  }

  static downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  static setupDragDrop(element, callback) {
    if (!element) return;

    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      element.classList.add('drag-over');
    });

    element.addEventListener('dragleave', (e) => {
      e.preventDefault();
      element.classList.remove('drag-over');
    });

    element.addEventListener('drop', (e) => {
      e.preventDefault();
      element.classList.remove('drag-over');
      
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0 && callback) {
        callback(files);
      }
    });

    // Click to upload
    element.addEventListener('click', () => {
      const input = element.querySelector('input[type="file"]');
      if (input) {
        input.click();
      }
    });
  }
}

// Animation Manager
class AnimationManager {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  static slideIn(element, direction = 'up', duration = 300) {
    const transforms = {
      up: 'translateY(30px)',
      down: 'translateY(-30px)',
      left: 'translateX(30px)',
      right: 'translateX(-30px)'
    };

    element.style.transform = transforms[direction];
    element.style.opacity = '0';
    element.style.transition = `all ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'translate(0)';
      element.style.opacity = '1';
    });
  }

  static observeIntersection(elements, callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { ...defaultOptions, ...options });

    elements.forEach(element => observer.observe(element));
  }
}

// Storage Manager
class StorageManager {
  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  static exists(key) {
    return localStorage.getItem(key) !== null;
  }

  static size() {
    return localStorage.length;
  }

  static keys() {
    return Object.keys(localStorage);
  }
}

// Loading Manager
class LoadingManager {
  static show(element, text = 'Loading...') {
    if (!element) return;
    
    element.style.position = 'relative';
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      border-radius: inherit;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    `;

    const spinnerIcon = document.createElement('div');
    spinnerIcon.className = 'loading-spinner';
    
    spinner.appendChild(spinnerIcon);
    spinner.appendChild(document.createTextNode(text));
    overlay.appendChild(spinner);
    element.appendChild(overlay);
  }

  static hide(element) {
    if (!element) return;
    
    const overlay = element.querySelector('.loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}

// SEO Manager
class SEOManager {
  constructor(options = {}) {
    this.options = options;
    this.applySEO();
  }

  applySEO() {
    try {
      const title = this.getTitle();
      const description = this.getDescription();
      const url = this.getCanonicalUrl();
      const image = this.getImage();

      // Title/Description
      if (title && !document.title) document.title = title;
      this.ensureMeta('description', description);
      this.ensureMeta('keywords', this.buildKeywords());
      this.ensureLink('canonical', url);

      // Open Graph
      this.ensureOG('og:title', title);
      this.ensureOG('og:description', description);
      this.ensureOG('og:type', this.isHome() ? 'website' : 'article');
      this.ensureOG('og:url', url);
      this.ensureOG('og:image', image);

      // Twitter
      this.ensureMeta('twitter:card', 'summary_large_image');
      this.ensureMeta('twitter:title', title);
      this.ensureMeta('twitter:description', description);
      this.ensureMeta('twitter:image', image);

      // JSON-LD
      this.ensureJsonLd();
    } catch (e) {
      console.warn('SEOManager error', e);
    }
  }

  isHome() {
    const p = window.location.pathname;
    return p === '/' || /\/index\.html?$/.test(p);
  }

  getTitle() {
    const h1 = document.querySelector('.tool-header h1, h1');
    if (h1 && h1.textContent.trim()) return `${h1.textContent.trim()} - Development Station`;
    if (document.title) return document.title;
    return 'Development Station - Free Online Developer Tools';
  }

  getDescription() {
    const meta = document.querySelector('meta[name="description"]');
    if (meta && meta.content && meta.content.trim()) return meta.content.trim();
    const desc = document.querySelector('.tool-description, .section-description, p');
    if (desc && desc.textContent.trim()) return desc.textContent.trim().slice(0, 300);
    return 'Professional, privacy-first developer utilities that work offline. JSON, base64, QR, hash, time, text, images, and more.';
  }

  getCanonicalUrl() {
    try { return new URL(window.location.href).toString(); } catch { return window.location.href; }
  }

  getImage() {
    // Minimal inline emoji SVG as fallback preview image
    return "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛠️</text></svg>";
  }

  buildKeywords() {
    const base = [
      'developer tools','online tools','json','base64','timestamp','password','qr','hash','url','text','image','web','network','system','calculator','converter','formatter','validator','beautifier','minifier'
    ];
    const h1 = document.querySelector('.tool-header h1, h1');
    if (h1 && h1.textContent.trim()) base.unshift(h1.textContent.trim());
    return base.join(', ');
  }

  ensureMeta(name, content) {
    if (!content) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    if (!el.getAttribute('content')) el.setAttribute('content', content);
  }

  ensureOG(property, content) {
    if (!content) return;
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    if (!el.getAttribute('content')) el.setAttribute('content', content);
  }

  ensureLink(rel, href) {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  ensureJsonLd() {
    // Avoid duplicate structured data of the same @type
    const existing = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .map(s => { try { return JSON.parse(s.textContent||'{}'); } catch { return {}; } });
    const hasType = (type) => existing.some(o => o['@type'] === type || (Array.isArray(o['@type']) && o['@type'].includes(type)));

    const url = this.getCanonicalUrl();
    const name = (document.querySelector('.tool-header h1, h1') || {}).textContent || 'Development Station';
    const description = this.getDescription();

    // WebSite on home
    if (this.isHome() && !hasType('WebSite')) {
      this.injectLD({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Development Station',
        url: url,
        potentialAction: {
          '@type': 'SearchAction',
          target: url.replace(/#.*$/, '') + '?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      });
    }

    // WebApplication/SoftwareApplication for tools
    if (!this.isHome() && !hasType('WebApplication')) {
      this.injectLD({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: name,
        url: url,
        description: description,
        applicationCategory: 'DeveloperApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      });
    }

    // Breadcrumbs for tools
    if (!this.isHome() && !hasType('BreadcrumbList')) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const items = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' }
      ];
      if (parts[0]) items.push({ '@type': 'ListItem', position: 2, name: parts[0], item: window.location.origin + '/' + parts[0] + '/' });
      items.push({ '@type': 'ListItem', position: items.length+1, name: (document.querySelector('h1')||{}).textContent || document.title, item: this.getCanonicalUrl() });
      this.injectLD({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
    }
  }

  injectLD(obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
}

// Analytics Manager (GA4 via gtag.js)
class AnalyticsManager {
  static init(measurementId) {
    if (!measurementId || window.__gaInitialized) return;
    window.__gaInitialized = true;
    this.measurementId = measurementId;
    // Load gtag.js
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    s.referrerPolicy = 'no-referrer-when-downgrade';
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true,
      page_path: location.pathname + location.search
    });

    // Track outbound link clicks (best-effort)
    document.addEventListener('click', (e) => {
      const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!link) return;
      try {
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin && window.gtag) {
          gtag('event', 'click', {
            event_category: 'outbound',
            event_label: link.href,
            transport_type: 'beacon'
          });
        }
      } catch {
        // ignore
      }
    }, { capture: true });
  }

  static pageView(path) {
    if (window.gtag && this.measurementId) {
      window.gtag('event', 'page_view', { page_path: path || (location.pathname + location.search) });
    }
  }
}

// Initialize managers
let ThemeManager_instance, ToastManager_instance, SearchManager_instance, NavigationManager_instance;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize core managers
  ThemeManager_instance = new ThemeManager();
  ToastManager_instance = new ToastManager();
  SearchManager_instance = new SearchManager();
  NavigationManager_instance = new NavigationManager();

  // Setup global functionality
  ClipboardManager.setupCopyButtons();

  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('#searchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Ctrl/Cmd + D for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      ThemeManager_instance.toggle();
    }

    // Escape to clear search
    if (e.key === 'Escape') {
      const searchInput = document.querySelector('#searchInput');
      if (searchInput && searchInput === document.activeElement) {
        SearchManager_instance.clear();
        searchInput.blur();
      }
    }
  });

  // Setup intersection observer for animations
  const animatedElements = document.querySelectorAll('.card, .tool-content');
  AnimationManager.observeIntersection(animatedElements, (element) => {
    element.classList.add('slide-in-up');
  });

  // Global error handling
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    ToastManager_instance.error('An unexpected error occurred');
  });

  // Global unhandled promise rejection handling
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    ToastManager_instance.error('An unexpected error occurred');
  });

  // SEO enhancements
  try { new SEOManager(); } catch (e) { console.warn('SEOManager init failed', e); }

  // Google Analytics (set window.GA_MEASUREMENT_ID or meta[name="ga-measurement-id"])
  try {
    const gaIdMeta = document.querySelector('meta[name="ga-measurement-id"]');
    const gaId = (window.GA_MEASUREMENT_ID && String(window.GA_MEASUREMENT_ID)) || (gaIdMeta && gaIdMeta.content);
    if (gaId) AnalyticsManager.init(gaId);
  } catch (e) { console.warn('Analytics init failed', e); }
});

// Export for global access
window.ThemeManager = ThemeManager;
window.ToastManager = ToastManager_instance;
window.SearchManager = SearchManager_instance;
window.NavigationManager = NavigationManager_instance;
window.ClipboardManager = ClipboardManager;
window.FormManager = FormManager;
window.FileManager = FileManager;
window.AnimationManager = AnimationManager;
window.StorageManager = StorageManager;
window.LoadingManager = LoadingManager;
window.SEOManager = SEOManager;
window.AnalyticsManager = AnalyticsManager;

// Legacy support functions
function showToast(message, type = 'info') {
  ToastManager_instance.show(message, type);
}

function copyToClipboard(text, button = null) {
  ClipboardManager.copy(text, button);
}

function goBack() {
  NavigationManager_instance.goBack();
}

function goHome() {
  NavigationManager_instance.goHome();
}
