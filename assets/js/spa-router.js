/**
 * SPA Router for Development Station
 * Pure JavaScript router with SEO-friendly features
 */

class SPARouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.basePath = '';
    this.isInitialized = false;
    
    // Bind methods
    this.handlePopState = this.handlePopState.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    if (this.isInitialized) return;
    
    // Set up event listeners
    window.addEventListener('popstate', this.handlePopState);
    document.addEventListener('click', this.handleLinkClick);
    
    // Define routes
    this.defineRoutes();
    
    // Handle initial route
    this.handleInitialRoute();
    
    this.isInitialized = true;
  }

  defineRoutes() {
    // Home route
    this.addRoute('/', {
      title: 'Development Station - 50+ Free Online Developer Tools',
      description: 'Professional developer utilities that work offline. Privacy-focused and completely free.',
      component: 'HomePage',
      template: 'home'
    });

    // Tools listing
    this.addRoute('/tools', {
      title: 'All Tools - Development Station',
      description: 'Complete collection of 50+ developer utilities and tools',
      component: 'ToolsPage',
      template: 'tools'
    });

    // Categories listing
    this.addRoute('/categories', {
      title: 'Tool Categories - Development Station',
      description: 'Browse tools organized by functionality',
      component: 'CategoriesPage',
      template: 'categories'
    });

    // Category view
    this.addRoute('/category/:id', {
      title: 'Category Tools - Development Station',
      description: 'Tools in this category',
      component: 'CategoryPage',
      template: 'category'
    });

    // Individual tool
    this.addRoute('/tool/:id', {
      title: 'Tool - Development Station',
      description: 'Professional developer tool',
      component: 'ToolPage',
      template: 'tool'
    });

    // About page
    this.addRoute('/about', {
      title: 'About - Development Station',
      description: 'Learn more about Development Station and our mission',
      component: 'AboutPage',
      template: 'about'
    });

    // 404 route
    this.addRoute('/404', {
      title: '404 - Page Not Found - Development Station',
      description: 'The page you are looking for could not be found',
      component: 'NotFoundPage',
      template: '404'
    });
  }

  addRoute(path, config) {
    this.routes.set(path, config);
  }

  handleInitialRoute() {
    const path = this.getCurrentPath();
    this.navigateTo(path, false);
  }

  handlePopState(event) {
    const path = this.getCurrentPath();
    this.navigateTo(path, false);
  }

  handleLinkClick(event) {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    
    // Skip external links
    if (href.startsWith('http') || href.startsWith('//')) return;
    
    // Skip non-hash links
    if (!href.startsWith('#/')) return;

    event.preventDefault();
    
    const path = href.substring(1); // Remove #
    this.navigateTo(path, true);
  }

  getCurrentPath() {
    const hash = window.location.hash;
    return hash.startsWith('#') ? hash.substring(1) : '/';
  }

  async navigateTo(path, updateHistory = true) {
    // Normalize path
    if (!path || path === '') path = '/';
    if (!path.startsWith('/')) path = '/' + path;

    // Find matching route
    const route = this.findRoute(path);
    if (!route) {
      // Redirect to 404
      if (path !== '/404') {
        this.navigateTo('/404', updateHistory);
        return;
      }
    }

    // Update history
    if (updateHistory) {
      const url = window.location.pathname + window.location.search + '#' + path;
      window.history.pushState({ path }, '', url);
    }

    // Update current route
    this.currentRoute = { path, ...route };

    // Update page metadata
    this.updatePageMeta();

    // Update navigation
    this.updateNavigation();

    // Load component
    await this.loadComponent();

    // Update body classes
    this.updateBodyClasses();

    // Scroll to top
    window.scrollTo(0, 0);

    // Analytics
    this.trackPageView(path);
  }

  findRoute(path) {
    // Try exact match first
    if (this.routes.has(path)) {
      return { ...this.routes.get(path), params: {} };
    }

    // Try parameterized routes
    for (const [routePath, config] of this.routes.entries()) {
      const params = this.matchRoute(routePath, path);
      if (params !== null) {
        return { ...config, params };
      }
    }

    return null;
  }

  matchRoute(routePath, actualPath) {
    const routeParts = routePath.split('/');
    const actualParts = actualPath.split('/');

    if (routeParts.length !== actualParts.length) {
      return null;
    }

    const params = {};
    
    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const actualPart = actualParts[i];

      if (routePart.startsWith(':')) {
        // Parameter
        const paramName = routePart.substring(1);
        params[paramName] = decodeURIComponent(actualPart);
      } else if (routePart !== actualPart) {
        // Mismatch
        return null;
      }
    }

    return params;
  }

  updatePageMeta() {
    if (!this.currentRoute) return;

    const { title, description, params } = this.currentRoute;

    // Update title
    let pageTitle = title;
    if (params && params.id) {
      // Customize title based on tool/category
      const toolData = window.SPATools?.getToolById(params.id);
      const categoryData = window.SPATools?.getCategoryById(params.id);
      
      if (toolData) {
        pageTitle = `${toolData.name} - Development Station`;
      } else if (categoryData) {
        pageTitle = `${categoryData.name} Tools - Development Station`;
      }
    }
    
    document.title = pageTitle;

    // Update meta description
    this.updateMetaTag('description', description);
    
    // Update Open Graph tags
    this.updateMetaProperty('og:title', pageTitle);
    this.updateMetaProperty('og:description', description);
    this.updateMetaProperty('og:url', window.location.href);
    
    // Update Twitter tags
    this.updateMetaTag('twitter:title', pageTitle);
    this.updateMetaTag('twitter:description', description);
    
    // Update canonical URL
    this.updateCanonicalUrl();
    
    // Update structured data
    this.updateStructuredData();
  }

  updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  updateMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  updateCanonicalUrl() {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }

  updateStructuredData() {
    const script = document.getElementById('structured-data');
    if (!script) return;

    try {
      const data = JSON.parse(script.textContent);
      
      // Update based on current route
      if (this.currentRoute.path.startsWith('/tool/') && this.currentRoute.params.id) {
        const toolData = window.SPATools?.getToolById(this.currentRoute.params.id);
        if (toolData) {
          data['@type'] = 'WebApplication';
          data.name = toolData.name;
          data.description = toolData.description;
          data.url = window.location.href;
        }
      }
      
      script.textContent = JSON.stringify(data);
    } catch (e) {
      console.warn('Failed to update structured data:', e);
    }
  }

  updateNavigation() {
    // Update active nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      if (href === '#' + this.currentRoute.path) {
        link.classList.add('active');
      } else if (href === '#/' && this.currentRoute.path === '/') {
        link.classList.add('active');
      }
    });

    // Update back button visibility
    const backButton = document.getElementById('back-button');
    if (backButton) {
      if (this.currentRoute.path === '/') {
        backButton.style.display = 'none';
      } else {
        backButton.style.display = 'inline-flex';
        backButton.onclick = () => window.history.back();
      }
    }

    // Update breadcrumb
    this.updateBreadcrumb();
  }

  updateBreadcrumb() {
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    const breadcrumbNav = document.getElementById('breadcrumb-nav');
    
    if (!breadcrumbContainer || !breadcrumbNav) return;

    if (this.currentRoute.path === '/') {
      breadcrumbContainer.style.display = 'none';
      return;
    }

    const breadcrumbs = this.generateBreadcrumbs();
    if (breadcrumbs.length <= 1) {
      breadcrumbContainer.style.display = 'none';
      return;
    }

    breadcrumbContainer.style.display = 'block';
    breadcrumbNav.innerHTML = breadcrumbs.map((crumb, index) => {
      if (index === breadcrumbs.length - 1) {
        return `<span class="breadcrumb-current">${crumb.title}</span>`;
      } else {
        return `<a href="#${crumb.path}" class="breadcrumb-link">${crumb.title}</a>`;
      }
    }).join('<span class="breadcrumb-separator">/</span>');
  }

  generateBreadcrumbs() {
    const breadcrumbs = [{ title: 'Home', path: '/' }];
    
    const path = this.currentRoute.path;
    const params = this.currentRoute.params;

    if (path.startsWith('/tool/') && params.id) {
      breadcrumbs.push({ title: 'Tools', path: '/tools' });
      
      const toolData = window.SPATools?.getToolById(params.id);
      if (toolData) {
        breadcrumbs.push({ title: toolData.name, path: path });
      }
    } else if (path.startsWith('/category/') && params.id) {
      breadcrumbs.push({ title: 'Categories', path: '/categories' });
      
      const categoryData = window.SPATools?.getCategoryById(params.id);
      if (categoryData) {
        breadcrumbs.push({ title: categoryData.name, path: path });
      }
    } else if (path === '/tools') {
      breadcrumbs.push({ title: 'All Tools', path: path });
    } else if (path === '/categories') {
      breadcrumbs.push({ title: 'Categories', path: path });
    } else if (path === '/about') {
      breadcrumbs.push({ title: 'About', path: path });
    }

    return breadcrumbs;
  }

  async loadComponent() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Show loading state
    mainContent.innerHTML = `
      <div class="loading-container" style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
        <div class="loading">
          <div class="loading-spinner"></div>
          <span>Loading...</span>
        </div>
      </div>
    `;

    try {
      // Load component
      const componentName = this.currentRoute.component;
      const component = window.SPAComponents?.[componentName];
      
      if (component) {
        const html = await component(this.currentRoute.params);
        
        // Add page transition
        mainContent.innerHTML = `<div class="page-transition">${html}</div>`;
        
        // Trigger transition
        requestAnimationFrame(() => {
          const transition = mainContent.querySelector('.page-transition');
          if (transition) {
            transition.classList.add('active');
          }
        });
      } else {
        throw new Error(`Component ${componentName} not found`);
      }
    } catch (error) {
      console.error('Failed to load component:', error);
      mainContent.innerHTML = `
        <div class="container">
          <div class="error-container text-center p-8">
            <h2>Error Loading Page</h2>
            <p class="text-secondary">Sorry, there was an error loading this page. Please try again.</p>
            <button class="btn btn-primary mt-4" onclick="location.reload()">Reload Page</button>
          </div>
        </div>
      `;
    }
  }

  updateBodyClasses() {
    // Remove existing route classes
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('route-'))
      .join(' ');

    // Add current route class
    const routeClass = this.getRouteClass();
    if (routeClass) {
      document.body.classList.add(routeClass);
    }
  }

  getRouteClass() {
    const path = this.currentRoute.path;
    
    if (path === '/') return 'route-home';
    if (path === '/tools') return 'route-tools';
    if (path === '/categories') return 'route-categories';
    if (path === '/about') return 'route-about';
    if (path.startsWith('/tool/')) return 'route-tool';
    if (path.startsWith('/category/')) return 'route-category';
    
    return 'route-other';
  }

  trackPageView(path) {
    // Google Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title
      });
    }
    
    // Custom analytics can be added here
  }

  // Public API methods
  go(path) {
    this.navigateTo(path, true);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Initialize router
window.SPARouter = new SPARouter();
