/**
 * SPA Tools Data and Management for Development Station
 * Centralized tool definitions and management
 */

window.SPATools = {
  // Tool definitions
  tools: [
    // Time & Date Tools
    { id: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', description: 'Convert Unix timestamps to dates and vice versa', category: 'time', popular: true },
    { id: 'world-clock', name: 'World Clock', description: 'Display time in multiple timezones', category: 'time' },
    { id: 'date-calculator', name: 'Date Calculator', description: 'Calculate date differences and add/subtract days', category: 'time' },
    { id: 'countdown-timer', name: 'Countdown Timer', description: 'Create countdown timers to specific dates', category: 'time' },
    { id: 'cron-builder', name: 'Cron Expression Builder', description: 'Build and validate cron expressions', category: 'time' },
    
    // Text Processing Tools
    { id: 'case-converter', name: 'Case Converter', description: 'Convert text between different cases', category: 'text' },
    { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and reading time', category: 'text' },
    { id: 'text-formatter', name: 'Text Formatter', description: 'Clean and format text content', category: 'text' },
    { id: 'text-diff', name: 'Text Diff Checker', description: 'Compare two texts and highlight differences', category: 'text' },
    { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions with live preview', category: 'text' },
    { id: 'string-manipulator', name: 'String Manipulator', description: 'Reverse, sort, and manipulate strings', category: 'text' },
    { id: 'lorem-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text content', category: 'text' },
    
    // Data Format Tools
    { id: 'json-formatter', name: 'JSON Formatter', description: 'Format, validate, and minify JSON data', category: 'data', popular: true },
    { id: 'csv-converter', name: 'CSV Converter', description: 'Convert between CSV, JSON, and HTML', category: 'data' },
    { id: 'xml-formatter', name: 'XML Formatter', description: 'Format and validate XML documents', category: 'data' },
    { id: 'yaml-converter', name: 'YAML Converter', description: 'Convert between YAML and JSON', category: 'data' },
    { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format and beautify SQL queries', category: 'data' },
    { id: 'binary-encoder', name: 'Binary Encoder/Decoder', description: 'Convert text to binary and binary to text', category: 'data', popular: true },
    { id: 'hex-encoder', name: 'Hex Encoder/Decoder', description: 'Convert text to hexadecimal and back', category: 'data', popular: true },
    { id: 'markdown-to-html', name: 'Markdown → HTML', description: 'Convert Markdown to HTML', category: 'data' },
    { id: 'html-to-markdown', name: 'HTML → Markdown', description: 'Convert HTML to Markdown', category: 'data' },
    
    // Number & Math Tools
    { id: 'base-converter', name: 'Base Converter', description: 'Convert between binary, octal, decimal, hex', category: 'number' },
    { id: 'calculator', name: 'Math Calculator', description: 'Scientific calculator with advanced functions', category: 'number' },
    { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages and changes', category: 'number' },
    { id: 'number-formatter', name: 'Number Formatter', description: 'Format numbers with custom separators', category: 'number' },
    { id: 'random-generator', name: 'Random Number Generator', description: 'Generate random numbers with options', category: 'number' },
    { id: 'statistics', name: 'Statistics Calculator', description: 'Calculate mean, median, mode, and more', category: 'number' },
    
    // Security Tools
    { id: 'password-generator', name: 'Password Generator', description: 'Generate secure, random passwords', category: 'security', popular: true },
    { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes', category: 'security' },
    { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings online free', category: 'security', popular: true },
    { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode and analyze JWT tokens', category: 'security' },
    { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'security' },
    { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode and decode URL components safely', category: 'security', popular: true },
    { id: 'html-encoder', name: 'HTML Entity Encoder/Decoder', description: 'Encode and decode HTML entities', category: 'security', popular: true },
    { id: 'aes-encrypt', name: 'AES Encrypt/Decrypt', description: 'Encrypt and decrypt text using AES encryption', category: 'security', popular: true },
    { id: 'rsa-keygen', name: 'RSA Key Generator', description: 'Generate RSA public and private key pairs', category: 'security', popular: true },
    { id: 'hmac-generator', name: 'HMAC Generator', description: 'Generate and verify HMAC for message authentication', category: 'security', popular: true },
    { id: 'totp-generator', name: 'TOTP Generator', description: 'Generate Time-based One-Time Passwords for 2FA', category: 'security', popular: true },
    
    // Web Development Tools
    { id: 'html-formatter', name: 'HTML Formatter', description: 'Format, beautify, and minify HTML', category: 'web' },
    { id: 'css-minifier', name: 'CSS Minifier', description: 'Minify and optimize CSS code', category: 'web' },
    { id: 'js-beautifier', name: 'JavaScript Beautifier', description: 'Format and beautify JavaScript code', category: 'web' },
    { id: 'seo-analyzer', name: 'SEO Analyzer', description: 'Analyze webpage SEO elements', category: 'web' },
    { id: 'meta-generator', name: 'Meta Tags Generator', description: 'Generate SEO-optimized meta tags', category: 'web' },
    { id: 'url-analyzer', name: 'URL Analyzer', description: 'Parse and analyze URL components', category: 'web' },
    { id: 'favicon-generator', name: 'Favicon Generator', description: 'Generate favicon HTML code', category: 'web' },
    { id: 'performance-analyzer', name: 'Performance Analyzer', description: 'Analyze webpage performance', category: 'web' },
    { id: 'dns-lookup', name: 'DNS Lookup', description: 'Resolve DNS records via DoH', category: 'web' },
    { id: 'ssl-checker', name: 'SSL Certificate Checker', description: 'Check HTTPS status and headers', category: 'web' },
    { id: 'validators', name: 'Validators', description: 'Email, Credit Card, Phone validators', category: 'web' },
    
    // Network & System Tools
    { id: 'ip-info', name: 'IP Address Info', description: 'Get information about IP addresses', category: 'network' },
    { id: 'user-agent', name: 'User Agent Analyzer', description: 'Analyze user agent strings', category: 'network' },
    { id: 'port-info', name: 'Port Information', description: 'Get information about network ports', category: 'network' },
    { id: 'browser-info', name: 'Browser Information', description: 'Display detailed browser info', category: 'network' },
    { id: 'mime-lookup', name: 'MIME Type Lookup', description: 'Find MIME types for file extensions', category: 'network' },
    { id: 'system-info', name: 'System Information', description: 'Display system and device info', category: 'network' },
    { id: 'whois-lookup', name: 'WHOIS Lookup', description: 'Lookup domain registration and DNS information', category: 'network', popular: true },
    { id: 'speed-test', name: 'Website Speed Test', description: 'Test website loading speed and performance', category: 'network', popular: true },
    
    // Image & Media Tools
    { id: 'image-base64', name: 'Image to Base64', description: 'Convert images to Base64 data URLs', category: 'image' },
    { id: 'image-info', name: 'Image Information', description: 'Get detailed image file information', category: 'image' },
    { id: 'color-extractor', name: 'Color Palette Extractor', description: 'Extract colors from images', category: 'image' },
    { id: 'image-formats', name: 'Image Format Info', description: 'Information about image formats', category: 'image' },
    { id: 'placeholder-generator', name: 'Placeholder Generator', description: 'Generate placeholder images', category: 'image' },
    { id: 'color-converter', name: 'Color Converter', description: 'Convert colors between HEX, RGB, HSL', category: 'image' },
    { id: 'image-resizer', name: 'Image Resizer & Compressor', description: 'Resize and compress images', category: 'image' },
    { id: 'svg-optimizer', name: 'SVG Optimizer', description: 'Clean and minify SVG markup', category: 'image' },
    
    // Productivity Tools
    { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes for text and URLs', category: 'productivity', popular: true },
    { id: 'color-picker', name: 'Color Picker', description: 'Pick and convert colors between formats', category: 'productivity' },
    { id: 'notes', name: 'Note Taking', description: 'Simple note-taking with local storage', category: 'productivity' },
    { id: 'todo', name: 'Todo List', description: 'Task management with priorities', category: 'productivity' },
    { id: 'clipboard', name: 'Clipboard Manager', description: 'Manage multiple clipboard entries', category: 'productivity' },
    { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units', category: 'productivity' }
  ],

  // Category definitions
  categories: [
    { id: 'time', name: 'Time & Date', icon: '⏰', description: 'Timestamp converters, world clock, date calculators', count: 5 },
    { id: 'text', name: 'Text Processing', icon: '📝', description: 'Text manipulation, formatting, and analysis tools', count: 7 },
    { id: 'data', name: 'Data Format', icon: '📄', description: 'JSON, XML, CSV, YAML formatters and converters', count: 9 },
    { id: 'number', name: 'Number & Math', icon: '🔢', description: 'Calculators, converters, and math utilities', count: 6 },
    { id: 'security', name: 'Security', icon: '🔒', description: 'Password generators, hash tools, encoders', count: 11 },
    { id: 'web', name: 'Web Development', icon: '🌐', description: 'HTML, CSS, JavaScript tools and SEO analyzers', count: 11 },
    { id: 'network', name: 'Network & System', icon: '🖥️', description: 'IP tools, browser info, system analysis', count: 8 },
    { id: 'image', name: 'Image & Media', icon: '🖼️', description: 'Image processing and media utilities', count: 8 },
    { id: 'productivity', name: 'Productivity', icon: '📋', description: 'QR codes, notes, todo lists, and utilities', count: 6 }
  ],

  // Tool components registry
  toolComponents: new Map(),

  // Get all tools
  getAllTools() {
    return this.tools;
  },

  // Get popular tools
  getPopularTools() {
    return this.tools.filter(tool => tool.popular);
  },

  // Get tool by ID
  getToolById(id) {
    return this.tools.find(tool => tool.id === id);
  },

  // Get tools by category
  getToolsByCategory(categoryId) {
    return this.tools.filter(tool => tool.category === categoryId);
  },

  // Get all categories
  getAllCategories() {
    return this.categories;
  },

  // Get category by ID
  getCategoryById(id) {
    return this.categories.find(category => category.id === id);
  },

  // Get related tools (same category, excluding current tool)
  getRelatedTools(toolId, limit = 3) {
    const tool = this.getToolById(toolId);
    if (!tool) return [];

    return this.tools
      .filter(t => t.category === tool.category && t.id !== toolId)
      .slice(0, limit);
  },

  // Search tools
  searchTools(query) {
    if (!query) return this.tools;

    const normalizedQuery = query.toLowerCase().trim();
    return this.tools.filter(tool => 
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery) ||
      tool.category.toLowerCase().includes(normalizedQuery)
    );
  },

  // Register tool component
  registerToolComponent(toolId, component) {
    this.toolComponents.set(toolId, component);
  },

  // Get tool component
  getToolComponent(toolId) {
    return this.toolComponents.get(toolId);
  },

  // Update tool counts in categories
  updateCategoryCounts() {
    this.categories.forEach(category => {
      category.count = this.tools.filter(tool => tool.category === category.id).length;
    });
  },

  // Initialize
  init() {
    this.updateCategoryCounts();
    this.registerDefaultComponents();
  },

  // Register default tool components
  registerDefaultComponents() {
    // JSON Formatter Component
    this.registerToolComponent('json-formatter', () => {
      return `
        <div class="card mb-6">
          <div class="card-header">
            <div class="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="card-title">JSON Input</h3>
              <p class="card-description">Paste your JSON data here</p>
            </div>
          </div>
          
          <div class="form-group">
            <label for="jsonInput" class="form-label">JSON Data</label>
            <textarea 
              id="jsonInput" 
              placeholder='{"name": "John", "age": 30, "city": "New York"}' 
              class="form-textarea font-mono" 
              rows="12"
            ></textarea>
          </div>

          <div class="btn-group">
            <button onclick="formatJSON()" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Format JSON
            </button>
            <button onclick="minifyJSON()" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              Minify JSON
            </button>
            <button onclick="validateJSON()" class="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Validate Only
            </button>
            <button onclick="clearJSON()" class="btn btn-ghost">Clear</button>
          </div>

          <div id="jsonStatus" class="mt-4"></div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <div>
              <h3 class="card-title">Formatted JSON</h3>
              <p class="card-description">Formatted and validated output</p>
            </div>
          </div>
          
          <div class="form-group">
            <label for="jsonOutput" class="form-label">Output</label>
            <div class="result-area">
              <textarea 
                id="jsonOutput" 
                placeholder="Formatted JSON will appear here..." 
                class="form-textarea font-mono" 
                rows="12"
                readonly
              ></textarea>
              <button class="copy-btn" data-target="jsonOutput">Copy</button>
            </div>
          </div>

          <div class="btn-group">
            <button onclick="downloadJSON()" class="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download JSON
            </button>
          </div>
        </div>

        <script>
          // JSON Formatter Functions
          function formatJSON() {
            const input = document.getElementById('jsonInput').value.trim();
            if (!input) {
              if (window.ToastManager) window.ToastManager.error('Please enter JSON data to format');
              return;
            }

            try {
              const parsed = JSON.parse(input);
              const formatted = JSON.stringify(parsed, null, 2);
              document.getElementById('jsonOutput').value = formatted;
              showValidationStatus(true, 'JSON is valid and formatted successfully');
              if (window.ToastManager) window.ToastManager.success('JSON formatted successfully');
            } catch (error) {
              showValidationStatus(false, error.message);
              if (window.ToastManager) window.ToastManager.error('Invalid JSON: ' + error.message);
            }
          }

          function minifyJSON() {
            const input = document.getElementById('jsonInput').value.trim();
            if (!input) {
              if (window.ToastManager) window.ToastManager.error('Please enter JSON data to minify');
              return;
            }

            try {
              const parsed = JSON.parse(input);
              const minified = JSON.stringify(parsed);
              document.getElementById('jsonOutput').value = minified;
              showValidationStatus(true, 'JSON is valid and minified successfully');
              if (window.ToastManager) window.ToastManager.success('JSON minified successfully');
            } catch (error) {
              showValidationStatus(false, error.message);
              if (window.ToastManager) window.ToastManager.error('Invalid JSON: ' + error.message);
            }
          }

          function validateJSON() {
            const input = document.getElementById('jsonInput').value.trim();
            if (!input) {
              if (window.ToastManager) window.ToastManager.error('Please enter JSON data to validate');
              return;
            }

            try {
              JSON.parse(input);
              showValidationStatus(true, 'JSON is valid');
              if (window.ToastManager) window.ToastManager.success('JSON is valid');
            } catch (error) {
              showValidationStatus(false, error.message);
              if (window.ToastManager) window.ToastManager.error('Invalid JSON: ' + error.message);
            }
          }

          function clearJSON() {
            document.getElementById('jsonInput').value = '';
            document.getElementById('jsonOutput').value = '';
            clearValidationStatus();
          }

          function downloadJSON() {
            const output = document.getElementById('jsonOutput').value;
            if (!output) {
              if (window.ToastManager) window.ToastManager.error('No JSON to download');
              return;
            }

            if (window.FileManager) {
              window.FileManager.downloadText(output, 'formatted.json', 'application/json');
            }
          }

          function showValidationStatus(isValid, message) {
            const statusDiv = document.getElementById('jsonStatus');
            statusDiv.innerHTML = \`
              <div class="flex items-center gap-3 p-4 rounded-lg \${isValid ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}">
                <div class="flex-shrink-0">
                  \${isValid 
                    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
                    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
                  }
                </div>
                <div class="flex-1">
                  <div class="font-medium">\${isValid ? 'Valid JSON' : 'Invalid JSON'}</div>
                  <div class="text-sm mt-1">\${message}</div>
                </div>
              </div>
            \`;
          }

          function clearValidationStatus() {
            document.getElementById('jsonStatus').innerHTML = '';
          }

          // Load example
          document.addEventListener('DOMContentLoaded', () => {
            const example = {
              "name": "John Doe",
              "age": 30,
              "email": "john@example.com",
              "active": true,
              "skills": ["JavaScript", "Python", "React"],
              "address": {
                "street": "123 Main St",
                "city": "New York",
                "zipCode": "10001"
              }
            };
            document.getElementById('jsonInput').value = JSON.stringify(example, null, 2);
          });
        </script>
      `;
    });

    // Base64 Encoder Component
    this.registerToolComponent('base64-encoder', () => {
      return `
        <div class="card mb-6">
          <div class="card-header">
            <div class="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="card-title">Text Encoding/Decoding</h3>
              <p class="card-description">Encode or decode Base64 strings</p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="inputText" class="form-label">Input</label>
              <textarea id="inputText" class="form-textarea" rows="8" placeholder="Enter text or Base64 here..."></textarea>
              <div class="btn-group">
                <button class="btn btn-primary" onclick="encodeBase64()">Encode →</button>
                <button class="btn btn-secondary" onclick="decodeBase64()">← Decode</button>
                <button class="btn btn-outline" onclick="clearText()">Clear</button>
              </div>
            </div>
            <div class="form-group">
              <label for="outputText" class="form-label">Output</label>
              <div class="result-area">
                <textarea id="outputText" class="form-textarea" rows="8" readonly placeholder="Result will appear here..."></textarea>
                <button class="copy-btn" data-target="outputText">Copy</button>
              </div>
            </div>
          </div>
        </div>

        <script>
          function encodeBase64() {
            const text = document.getElementById('inputText').value;
            if (!text) {
              if (window.ToastManager) window.ToastManager.error('Please enter text to encode');
              return;
            }

            try {
              const result = btoa(unescape(encodeURIComponent(text)));
              document.getElementById('outputText').value = result;
              if (window.ToastManager) window.ToastManager.success('Text encoded successfully');
            } catch (error) {
              if (window.ToastManager) window.ToastManager.error('Failed to encode text');
            }
          }

          function decodeBase64() {
            const text = document.getElementById('inputText').value.trim();
            if (!text) {
              if (window.ToastManager) window.ToastManager.error('Please enter Base64 to decode');
              return;
            }

            try {
              const result = decodeURIComponent(escape(atob(text)));
              document.getElementById('outputText').value = result;
              if (window.ToastManager) window.ToastManager.success('Base64 decoded successfully');
            } catch (error) {
              if (window.ToastManager) window.ToastManager.error('Invalid Base64 input');
            }
          }

          function clearText() {
            document.getElementById('inputText').value = '';
            document.getElementById('outputText').value = '';
          }
        </script>
      `;
    });
  }
};

// Initialize tools
try {
  window.SPATools.init();
  console.log('SPATools initialized successfully');
} catch (error) {
  console.error('Failed to initialize SPATools:', error);
}
