// Shared JavaScript functionality for Development Station

// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Initialize theme
        const savedTheme = localStorage.getItem('devtools_theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.setTheme(savedTheme);
        
        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        localStorage.setItem('devtools_theme', theme);
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
        }
    }
    
    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme') || 'light';
        this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
    
    getCurrentTheme() {
        return this.body.getAttribute('data-theme') || 'light';
    }
}

// Toast Notification System
class ToastManager {
    constructor() {
        this.createToastContainer();
    }
    
    createToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }
    
    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            background: ${this.getToastColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            pointer-events: auto;
            font-weight: 500;
        `;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
        
        // Click to dismiss
        toast.addEventListener('click', () => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        });
    }
    
    getToastColor(type) {
        switch (type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'info': return '#3b82f6';
            default: return '#10b981';
        }
    }
}

// Search Functionality
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.init();
    }
    
    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.clearSearch();
                }
            });
        }
    }
    
    handleSearch(query) {
        const cards = document.querySelectorAll('.tool-card, .category-card');
        
        if (!query.trim()) {
            cards.forEach(card => {
                card.style.display = 'block';
                card.classList.remove('search-highlight');
            });
            return;
        }
        
        const queryLower = query.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('.tool-title, .category-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.tool-description, .category-description')?.textContent.toLowerCase() || '';
            const tags = card.querySelector('.tool-tags')?.textContent.toLowerCase() || '';
            const searchData = card.getAttribute('data-search') || '';
            
            const isMatch = title.includes(queryLower) || 
                          description.includes(queryLower) || 
                          tags.includes(queryLower) ||
                          searchData.toLowerCase().includes(queryLower);
            
            if (isMatch) {
                card.style.display = 'block';
                card.classList.add('search-highlight');
            } else {
                card.style.display = 'none';
                card.classList.remove('search-highlight');
            }
        });
    }
    
    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            this.handleSearch('');
        }
    }
}

// Clipboard Utilities
class ClipboardManager {
    static async copy(text, element = null) {
        try {
            await navigator.clipboard.writeText(text);
            toast.show('Copied to clipboard!');
            
            if (element) {
                this.showCopyFeedback(element);
            }
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopy(text);
        }
    }
    
    static fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            toast.show('Copied to clipboard!');
        } catch (err) {
            toast.show('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    static showCopyFeedback(element) {
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.background = '#10b981';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.background = '';
        }, 1000);
    }
    
    static async copyFromElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const text = element.textContent || element.innerText;
            await this.copy(text);
        }
    }
}

// Navigation Utilities
class NavigationManager {
    constructor() {
        this.updateBreadcrumb();
        this.handleActiveNavigation();
    }
    
    updateBreadcrumb() {
        const breadcrumb = document.querySelector('.breadcrumb-current');
        if (breadcrumb) {
            const pathParts = window.location.pathname.split('/').filter(part => part);
            if (pathParts.length > 0) {
                const currentPage = pathParts[pathParts.length - 1].replace('.html', '');
                breadcrumb.textContent = this.formatPageName(currentPage);
            }
        }
    }
    
    formatPageName(name) {
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    handleActiveNavigation() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && currentPath.includes(href.replace('./', ''))) {
                item.classList.add('active');
            }
        });
    }
    
    static goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    }
    
    static goHome() {
        window.location.href = 'index.html';
    }
}

// Form Utilities
class FormManager {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static validateURL(url) {
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
}

// File Utilities
class FileManager {
    static async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
    
    static async readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }
    
    static downloadText(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    static downloadJSON(data, filename) {
        const content = JSON.stringify(data, null, 2);
        this.downloadText(content, filename, 'application/json');
    }
}

// Animation Utilities
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
    
    static slideIn(element, direction = 'left', duration = 300) {
        const keyframes = direction === 'left' 
            ? [
                { transform: 'translateX(-100%)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
              ]
            : [
                { transform: 'translateY(-100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
              ];
        
        element.animate(keyframes, {
            duration,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }
}

// Storage Utilities
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(`devtools_${key}`, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`devtools_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(`devtools_${key}`);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
    
    static clear() {
        try {
            const keys = Object.keys(localStorage).filter(key => key.startsWith('devtools_'));
            keys.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
}

// Initialize global instances
let themeManager;
let toast;
let searchManager;
let navigationManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    toast = new ToastManager();
    searchManager = new SearchManager();
    navigationManager = new NavigationManager();
    
    // Add loading animation to cards
    const cards = document.querySelectorAll('.tool-card, .category-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Ctrl/Cmd + D for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            themeManager.toggleTheme();
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && document.activeElement === searchInput) {
                searchManager.clearSearch();
                searchInput.blur();
            }
        }
    });
    
    // Add click handlers for copy buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
            const targetId = e.target.getAttribute('data-target');
            if (targetId) {
                ClipboardManager.copyFromElement(targetId);
            }
        }
    });
    
    // Add drag and drop support
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragDropArea = e.target.closest('.drag-drop-area');
        if (dragDropArea) {
            dragDropArea.classList.add('dragover');
        }
    });
    
    document.addEventListener('dragleave', (e) => {
        const dragDropArea = e.target.closest('.drag-drop-area');
        if (dragDropArea && !dragDropArea.contains(e.relatedTarget)) {
            dragDropArea.classList.remove('dragover');
        }
    });
    
    document.addEventListener('drop', (e) => {
        e.preventDefault();
        const dragDropArea = e.target.closest('.drag-drop-area');
        if (dragDropArea) {
            dragDropArea.classList.remove('dragover');
            const fileInput = dragDropArea.querySelector('input[type="file"]');
            if (fileInput && e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    });
});

// Utility functions
function copyToClipboard(elementId) {
    ClipboardManager.copyFromElement(elementId);
}

function showToast(message, type = 'success') {
    if (toast) {
        toast.show(message, type);
    }
}

function goBack() {
    NavigationManager.goBack();
}

function goHome() {
    NavigationManager.goHome();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        ToastManager,
        SearchManager,
        ClipboardManager,
        NavigationManager,
        FormManager,
        FileManager,
        AnimationManager,
        StorageManager
    };
}