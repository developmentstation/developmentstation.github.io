/**
 * Main SPA Application for Development Station
 * Orchestrates all components and handles app initialization
 */

class SPAApp {
  constructor() {
    this.isInitialized = false;
    this.searchManager = null;
    this.currentSearchQuery = '';
    
    // Bind methods
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  async init() {
    if (this.isInitialized) return;
    
    try {
      // Show loading screen
      this.showLoadingScreen();
      
      // Wait for dependencies to load
      await this.waitForDependencies();
      
      // Initialize search functionality
      this.initializeSearch();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Set up filter functionality
      this.setupFilters();
      
      // Initialize service worker for PWA
      this.initializeServiceWorker();
      
      // Loading screen removed - content loads immediately
      this.hideLoadingScreen();
      
      this.isInitialized = true;
      
      // Dispatch app ready event
      this.dispatchAppReady();
      
    } catch (error) {
      console.error('Failed to initialize SPA app:', error);
      this.handleInitializationError(error);
    }
  }

  async waitForDependencies() {
    // Wait for essential dependencies to be available
    const maxWait = 10000; // 10 seconds
    const startTime = Date.now();
    const checkInterval = 50; // Check every 50ms
    
    const dependencies = ['SPARouter', 'SPAComponents', 'SPATools'];
    
    while (Date.now() - startTime < maxWait) {
      const missingDeps = dependencies.filter(dep => !window[dep]);
      
      if (missingDeps.length === 0) {
        console.log('All dependencies loaded successfully');
        return;
      }
      
      // Log progress every second
      if ((Date.now() - startTime) % 1000 < checkInterval) {
        console.log('Waiting for dependencies:', missingDeps);
      }
      
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }
    
    // Final check with detailed error reporting
    const missingDeps = dependencies.filter(dep => !window[dep]);
    if (missingDeps.length > 0) {
      console.error('Missing dependencies after timeout:', {
        missing: missingDeps,
        available: dependencies.filter(dep => window[dep]),
        timeout: maxWait + 'ms'
      });
      
      // Try to continue with partial dependencies
      if (window.SPARouter && window.SPAComponents) {
        console.warn('Continuing with partial dependencies');
        return;
      }
      
      throw new Error(`Critical dependencies failed to load: ${missingDeps.join(', ')}`);
    }
  }

  showLoadingScreen() {
    // Loading screen removed for performance
    // Content loads directly without splash screen
  }

  hideLoadingScreen() {
    // Loading screen removed for performance
    // No action needed
  }

  handleInitializationError(error) {
    // Display error directly in main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="container">
          <div class="error-container text-center" style="padding: 4rem 2rem;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">⚠️</div>
            <h2>Loading Error</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
              Failed to load Development Station. ${error.message || ''}
            </p>
            <button class="btn btn-primary" onclick="location.reload()">
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }

  initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // Create enhanced search manager
    this.searchManager = {
      input: searchInput,
      debounceTimer: null,
      
      search: (query) => {
        const normalizedQuery = query.toLowerCase().trim();
        this.currentSearchQuery = normalizedQuery;
        
        if (!normalizedQuery) {
          this.clearSearchResults();
          return;
        }

        const results = window.SPATools.searchTools(normalizedQuery);
        this.displaySearchResults(results, normalizedQuery);
      },
      
      clear: () => {
        searchInput.value = '';
        this.currentSearchQuery = '';
        this.clearSearchResults();
      }
    };

    // Set up search input listener
    searchInput.addEventListener('input', (e) => {
      clearTimeout(this.searchManager.debounceTimer);
      this.searchManager.debounceTimer = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 300);
    });

    // Global search instance
    window.SPASearch = this.searchManager;
  }

  handleSearch(query) {
    if (this.searchManager) {
      this.searchManager.search(query);
    }
  }

  displaySearchResults(results, query) {
    // Only show search results on tools page or home page
    const currentRoute = window.SPARouter?.getCurrentRoute();
    if (!currentRoute || (currentRoute.path !== '/' && currentRoute.path !== '/tools')) {
      return;
    }

    // Find the appropriate grid to update
    let grid = document.getElementById('allToolsGrid') || document.getElementById('popularToolsGrid');
    if (!grid) return;

    // Create search results header
    const existingHeader = document.querySelector('.search-results-container');
    if (existingHeader) {
      existingHeader.remove();
    }

    if (query) {
      const header = document.createElement('div');
      header.className = 'search-results-container';
      header.innerHTML = `
        <div class="search-results-header">
          <span class="search-results-count">Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</span>
          <button class="search-clear-btn" onclick="window.SPASearch.clear()">Clear Search</button>
        </div>
      `;
      grid.parentNode.insertBefore(header, grid);
    }

    // Update grid content
    if (results.length > 0) {
      grid.innerHTML = results.map(tool => window.SPAComponents.renderToolCard(tool)).join('');
    } else {
      grid.innerHTML = `
        <div class="col-span-full text-center p-8">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3>No tools found</h3>
          <p class="text-secondary">Try a different search term or browse all tools.</p>
          <button class="btn btn-primary mt-4" onclick="window.SPASearch.clear()">Show All Tools</button>
        </div>
      `;
    }

    // Add fade-in animation
    const toolCards = grid.querySelectorAll('.tool-card-enhanced');
    toolCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  clearSearchResults() {
    const existingHeader = document.querySelector('.search-results-container');
    if (existingHeader) {
      existingHeader.remove();
    }

    // Restore original grid content based on current route
    const currentRoute = window.SPARouter?.getCurrentRoute();
    if (!currentRoute) return;

    if (currentRoute.path === '/') {
      const grid = document.getElementById('popularToolsGrid');
      if (grid) {
        grid.innerHTML = window.SPAComponents.renderPopularTools();
      }
    } else if (currentRoute.path === '/tools') {
      const grid = document.getElementById('allToolsGrid');
      if (grid) {
        grid.innerHTML = window.SPAComponents.renderAllTools();
      }
    }
  }

  setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Escape to clear search
      if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput === document.activeElement) {
          this.searchManager?.clear();
          searchInput.blur();
        }
      }
    });

    // Handle dynamic content clicks
    document.addEventListener('click', (e) => {
      // Handle filter buttons
      if (e.target.closest('.filter-btn-enhanced')) {
        e.preventDefault();
        const btn = e.target.closest('.filter-btn-enhanced');
        const category = btn.getAttribute('data-category');
        this.handleFilter(category, btn);
      }

      // Handle category card clicks
      if (e.target.closest('.category-card-enhanced')) {
        e.preventDefault();
        const card = e.target.closest('.category-card-enhanced');
        const href = card.getAttribute('href');
        if (href && window.SPARouter) {
          window.SPARouter.go(href.substring(1)); // Remove #
        }
      }
    });

    // Handle window resize for responsive adjustments
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  handleFilter(category, button) {
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn-enhanced');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter tools
    const grid = document.getElementById('allToolsGrid');
    if (!grid) return;

    let tools;
    if (category === 'all') {
      tools = window.SPATools.getAllTools();
    } else {
      tools = window.SPATools.getToolsByCategory(category);
    }

    // Apply current search filter if active
    if (this.currentSearchQuery) {
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(this.currentSearchQuery) ||
        tool.description.toLowerCase().includes(this.currentSearchQuery)
      );
    }

    // Update grid
    grid.innerHTML = tools.map(tool => window.SPAComponents.renderToolCard(tool)).join('');

    // Add animation
    const toolCards = grid.querySelectorAll('.tool-card-enhanced');
    toolCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 30);
    });

    // Update search results count if searching
    if (this.currentSearchQuery) {
      const header = document.querySelector('.search-results-count');
      if (header) {
        header.textContent = `Found ${tools.length} result${tools.length !== 1 ? 's' : ''} for "${this.currentSearchQuery}" in ${button.textContent}`;
      }
    }
  }

  setupFilters() {
    // Filter functionality is handled in the click event listener
    // This method can be used for additional filter setup if needed
  }

  handleResize() {
    // Handle responsive adjustments
    const width = window.innerWidth;
    
    // Update mobile navigation if needed
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      if (width < 768) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
      }
    }
  }

  async initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  dispatchAppReady() {
    const event = new CustomEvent('spa-app-ready', {
      detail: { app: this }
    });
    document.dispatchEvent(event);
  }

  // Utility method
  debounce(func, wait) {
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

  // Public API
  getSearchManager() {
    return this.searchManager;
  }

  getCurrentSearchQuery() {
    return this.currentSearchQuery;
  }

  clearSearch() {
    if (this.searchManager) {
      this.searchManager.clear();
    }
  }
}

// Initialize the SPA application
try {
  window.SPAApp = new SPAApp();
  console.log('SPAApp initialized successfully');
} catch (error) {
  console.error('Failed to initialize SPAApp:', error);
}

// Export for global access
window.addEventListener('spa-app-ready', (e) => {
  console.log('Development Station SPA is ready!');
  
  // Additional initialization can be added here
  // For example, analytics tracking, user preferences, etc.
});
