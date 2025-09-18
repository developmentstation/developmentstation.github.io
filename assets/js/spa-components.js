/**
 * SPA Components for Development Station
 * Pure JavaScript components for rendering different pages
 */

window.SPAComponents = {
  
  // Home Page Component
  async HomePage() {
    return `
      <!-- Hero Section -->
      <section class="hero-enhanced">
        <div class="container">
          <div class="hero-content text-center">
            <h1 class="hero-title">Development Station</h1>
            <p class="hero-subtitle">Professional Developer Tools</p>
            <p class="hero-description">
              50+ free online developer utilities that work offline. No registration, no tracking, completely free.
              All processing is done in your browser — your data never leaves your device.
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Tools</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">9</div>
                <div class="stat-label">Categories</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Free</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">Offline</div>
                <div class="stat-label">Ready</div>
              </div>
            </div>
            <div class="hero-actions">
              <a href="#/tools" class="btn btn-primary btn-lg">Explore Tools</a>
              <a href="#/categories" class="btn btn-outline btn-lg">Browse Categories</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Tools Section -->
      <section id="popular-tools" class="section">
        <div class="container">
          <div class="section-header text-center">
            <h2>Popular Developer Tools</h2>
            <p class="section-description">Quick access to our most used tools</p>
          </div>
          
          <div class="grid grid-4" id="popularToolsGrid">
            ${this.renderPopularTools()}
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section id="categories" class="section bg-secondary">
        <div class="container">
          <div class="section-header text-center">
            <h2>Tool Categories</h2>
            <p class="section-description">Organized by functionality for easy discovery</p>
          </div>
          
          <div class="grid grid-3" id="categoriesGrid">
            ${this.renderCategories()}
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="section">
        <div class="container">
          <div class="section-header text-center">
            <h2>Why Choose Development Station?</h2>
            <p class="section-description">Built with privacy and performance in mind</p>
          </div>
          
          <div class="grid grid-3">
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>All processing happens locally in your browser. No data is sent to our servers.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Works Offline</h3>
              <p>Progressive Web App that works without an internet connection after initial load.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Optimized for speed with instant results and smooth user experience.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💰</div>
              <h3>Always Free</h3>
              <p>No subscriptions, no hidden costs, no registration required. Completely free forever.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Modern Design</h3>
              <p>Clean, intuitive interface with dark/light theme support and mobile-first design.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔧</div>
              <h3>Developer Focused</h3>
              <p>Built by developers, for developers. Every tool is crafted for maximum productivity.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // Tools Page Component
  async ToolsPage() {
    return `
      <div class="container">
        <div class="section-header text-center" style="padding: 2rem 0;">
          <h1>All Developer Tools</h1>
          <p class="section-description">Complete collection of 50+ developer utilities</p>
        </div>
        
        <!-- Filter Buttons -->
        <div class="filter-buttons-enhanced" id="toolFilters">
          ${this.renderFilterButtons()}
        </div>
        
        <!-- Tools Grid -->
        <div class="grid grid-4" id="allToolsGrid">
          ${this.renderAllTools()}
        </div>
      </div>
    `;
  },

  // Categories Page Component
  async CategoriesPage() {
    return `
      <div class="container">
        <div class="section-header text-center" style="padding: 2rem 0;">
          <h1>Tool Categories</h1>
          <p class="section-description">Browse tools organized by functionality</p>
        </div>
        
        <div class="grid grid-3" id="categoriesGrid">
          ${this.renderCategories()}
        </div>
      </div>
    `;
  },

  // Category Page Component
  async CategoryPage(params) {
    const categoryData = window.SPATools?.getCategoryById(params.id);
    if (!categoryData) {
      return this.NotFoundPage();
    }

    const tools = window.SPATools?.getToolsByCategory(params.id) || [];

    return `
      <div class="container">
        <div class="section-header text-center" style="padding: 2rem 0;">
          <div class="category-icon" style="font-size: 3rem; margin-bottom: 1rem;">${categoryData.icon}</div>
          <h1>${categoryData.name}</h1>
          <p class="section-description">${categoryData.description}</p>
          <div class="text-sm text-secondary">
            <strong>${tools.length}</strong> tools in this category
          </div>
        </div>
        
        <div class="grid grid-4" id="categoryToolsGrid">
          ${tools.map(tool => this.renderToolCard(tool)).join('')}
        </div>
      </div>
    `;
  },

  // Individual Tool Page Component
  async ToolPage(params) {
    const toolData = window.SPATools?.getToolById(params.id);
    if (!toolData) {
      return this.NotFoundPage();
    }

    // Load tool-specific component if available
    const toolComponent = window.SPATools?.getToolComponent(params.id);
    const toolContent = toolComponent ? await toolComponent() : this.renderDefaultToolContent(toolData);

    return `
      <div class="container">
        <div class="tool-page-layout">
          <!-- Main Tool Content -->
          <div class="tool-content-enhanced">
            <!-- Tool Header -->
            <div class="tool-header-enhanced">
              <div class="tool-icon-enhanced">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div class="tool-info-enhanced">
                <h1>${toolData.name}</h1>
                <p class="tool-description-enhanced">${toolData.description}</p>
              </div>
            </div>

            ${toolContent}
          </div>

          <!-- Sidebar -->
          <div class="tool-sidebar">
            ${this.renderToolSidebar(toolData)}
          </div>
        </div>
      </div>
    `;
  },

  // About Page Component
  async AboutPage() {
    return `
      <div class="container">
        <div class="section-header text-center" style="padding: 2rem 0;">
          <h1>About Development Station</h1>
          <p class="section-description">Professional developer tools that work offline</p>
        </div>
        
        <div class="grid grid-1" style="max-width: 800px; margin: 0 auto;">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div>
                <h3 class="card-title">Our Mission</h3>
              </div>
            </div>
            <div class="space-y-4">
              <p>Development Station is a comprehensive collection of professional developer tools designed to enhance your productivity while respecting your privacy.</p>
              <p>Every tool runs entirely in your browser, ensuring your data never leaves your device. No registration required, no tracking, no hidden costs - just powerful tools when you need them.</p>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="card-title">Features</h3>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="text-success">✓</span>
                <span>50+ professional developer tools</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-success">✓</span>
                <span>Works completely offline</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-success">✓</span>
                <span>No data collection or tracking</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-success">✓</span>
                <span>Mobile-friendly responsive design</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-success">✓</span>
                <span>Dark/light theme support</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-success">✓</span>
                <span>Progressive Web App (PWA)</span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <div>
                <h3 class="card-title">Tool Categories</h3>
              </div>
            </div>
            <div class="grid grid-2 gap-4">
              <div>
                <h4 class="font-semibold mb-2">Data & Format</h4>
                <ul class="text-sm text-secondary space-y-1">
                  <li>JSON Formatter & Validator</li>
                  <li>XML Formatter</li>
                  <li>YAML Converter</li>
                  <li>CSV Converter</li>
                  <li>SQL Formatter</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Security & Encoding</h4>
                <ul class="text-sm text-secondary space-y-1">
                  <li>Base64 Encoder/Decoder</li>
                  <li>URL Encoder/Decoder</li>
                  <li>Hash Generator</li>
                  <li>Password Generator</li>
                  <li>JWT Decoder</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Text & Processing</h4>
                <ul class="text-sm text-secondary space-y-1">
                  <li>Case Converter</li>
                  <li>Word Counter</li>
                  <li>Text Formatter</li>
                  <li>Regex Tester</li>
                  <li>Lorem Generator</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Time & Utilities</h4>
                <ul class="text-sm text-secondary space-y-1">
                  <li>Unix Timestamp Converter</li>
                  <li>World Clock</li>
                  <li>QR Code Generator</li>
                  <li>Color Picker</li>
                  <li>Unit Converter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 404 Not Found Component
  async NotFoundPage() {
    return `
      <div class="container">
        <div class="text-center" style="padding: 4rem 0;">
          <div style="font-size: 6rem; margin-bottom: 2rem;">🔧</div>
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">404 - Tool Not Found</h1>
          <p class="section-description" style="margin-bottom: 2rem;">
            The tool or page you're looking for doesn't exist or has been moved.
          </p>
          <div class="hero-actions">
            <a href="#/" class="btn btn-primary btn-lg">Go Home</a>
            <a href="#/tools" class="btn btn-outline btn-lg">Browse Tools</a>
          </div>
        </div>
      </div>
    `;
  },

  // Helper Methods
  renderPopularTools() {
    const popularTools = window.SPATools?.getPopularTools() || [];
    return popularTools.map(tool => this.renderToolCard(tool)).join('');
  },

  renderAllTools() {
    const allTools = window.SPATools?.getAllTools() || [];
    return allTools.map(tool => this.renderToolCard(tool)).join('');
  },

  renderCategories() {
    const categories = window.SPATools?.getAllCategories() || [];
    return categories.map(category => this.renderCategoryCard(category)).join('');
  },

  renderToolCard(tool) {
    return `
      <a href="#/tool/${tool.id}" class="tool-card-enhanced" data-search="${tool.name.toLowerCase()} ${tool.description.toLowerCase()}" data-category="${tool.category}">
        <div class="card-header">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div>
            <h3 class="card-title">${tool.name}</h3>
            <p class="card-description">${tool.description}</p>
          </div>
        </div>
        ${tool.popular ? '<div class="popular-badge">Popular</div>' : ''}
      </a>
    `;
  },

  renderCategoryCard(category) {
    return `
      <a href="#/category/${category.id}" class="category-card-enhanced">
        <div class="card-header">
          <div class="category-icon">${category.icon}</div>
          <div>
            <h3 class="card-title">${category.name}</h3>
            <p class="card-description">${category.description}</p>
          </div>
        </div>
        <div class="card-footer">
          <span class="tool-count">${category.count} tools</span>
          <span class="btn btn-sm btn-primary">View Tools</span>
        </div>
      </a>
    `;
  },

  renderFilterButtons() {
    const categories = window.SPATools?.getAllCategories() || [];
    let buttons = `<button class="filter-btn-enhanced active" data-category="all"><span>All Tools</span></button>`;
    
    categories.forEach(category => {
      buttons += `<button class="filter-btn-enhanced" data-category="${category.id}"><span>${category.name}</span></button>`;
    });
    
    return buttons;
  },

  renderDefaultToolContent(toolData) {
    return `
      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <div>
            <h3 class="card-title">Tool Interface</h3>
            <p class="card-description">This tool is being loaded...</p>
          </div>
        </div>
        
        <div class="text-center p-8">
          <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
          <p class="text-secondary">Loading ${toolData.name}...</p>
        </div>
      </div>
    `;
  },

  renderToolSidebar(toolData) {
    const relatedTools = window.SPATools?.getRelatedTools(toolData.id) || [];
    
    return `
      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="6" x2="12" y2="12"/>
              <line x1="16" y1="10" x2="12" y2="12"/>
            </svg>
          </div>
          <div>
            <h3 class="card-title">About This Tool</h3>
          </div>
        </div>
        <div class="space-y-3">
          <p class="text-sm text-secondary">${toolData.description}</p>
          <div class="flex justify-between text-sm">
            <span class="text-secondary">Category:</span>
            <a href="#/category/${toolData.category}" class="text-primary">${window.SPATools?.getCategoryById(toolData.category)?.name || toolData.category}</a>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-secondary">Privacy:</span>
            <span class="text-success">Local Processing</span>
          </div>
        </div>
      </div>

      ${relatedTools.length > 0 ? `
      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div>
            <h3 class="card-title">Related Tools</h3>
          </div>
        </div>
        <div class="space-y-2">
          ${relatedTools.map(tool => `
            <a href="#/tool/${tool.id}" class="block p-3 rounded-lg hover:bg-secondary transition-colors">
              <div class="font-medium text-sm">${tool.name}</div>
              <div class="text-xs text-secondary">${tool.description}</div>
            </a>
          `).join('')}
        </div>
      </div>
      ` : ''}
    `;
  }
};
