/**
 * Development Station - Analytics Module
 * Enhanced tracking for SEO and user behavior analysis
 * Version: 2.0.0
 */

(function() {
    'use strict';

    // Configuration
    const GA_MEASUREMENT_ID = 'G-E2B65Y4SFW';
    const DEBUG_MODE = false;

    // Initialize Google Analytics 4
    function initGA4() {
        // Load gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize dataLayer and gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            dataLayer.push(arguments);
        };
        
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            'page_path': window.location.pathname,
            'debug_mode': DEBUG_MODE,
            'custom_map': {
                'dimension1': 'tool_name',
                'dimension2': 'tool_category',
                'dimension3': 'user_type',
                'dimension4': 'session_duration_bucket'
            }
        });

        // Track Core Web Vitals
        trackCoreWebVitals();
        
        // Track scroll depth
        trackScrollDepth();
        
        // Track engagement time
        trackEngagementTime();
        
        // Track tool usage
        trackToolUsage();
        
        // Track search queries
        trackSearchQueries();
        
        // Track external links
        trackExternalLinks();
        
        // Track file downloads
        trackFileDownloads();
    }

    // Track Core Web Vitals
    function trackCoreWebVitals() {
        // Use web-vitals library if available
        if (window.webVitals) {
            const vitalsToTrack = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP'];
            
            vitalsToTrack.forEach(metric => {
                window.webVitals[`on${metric}`] && window.webVitals[`on${metric}`](({ name, value, id }) => {
                    gtag('event', 'web_vitals', {
                        'event_category': 'Web Vitals',
                        'event_label': name,
                        'value': Math.round(name === 'CLS' ? value * 1000 : value),
                        'metric_id': id,
                        'metric_value': value,
                        'metric_name': name
                    });
                });
            });
        }

        // Fallback: Basic performance tracking
        window.addEventListener('load', function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                // Track page load time
                gtag('event', 'page_load_time', {
                    'event_category': 'Performance',
                    'value': Math.round(perfData.loadEventEnd - perfData.fetchStart),
                    'page_path': window.location.pathname
                });

                // Track DOM interactive time
                gtag('event', 'dom_interactive', {
                    'event_category': 'Performance',
                    'value': Math.round(perfData.domInteractive - perfData.fetchStart),
                    'page_path': window.location.pathname
                });
            }
        });
    }

    // Track scroll depth
    function trackScrollDepth() {
        let maxScroll = 0;
        const thresholds = [25, 50, 75, 90, 100];
        const triggered = new Set();

        function calculateScrollPercentage() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            return Math.round((scrolled / scrollHeight) * 100);
        }

        function checkScrollDepth() {
            const percentage = calculateScrollPercentage();
            
            if (percentage > maxScroll) {
                maxScroll = percentage;
                
                thresholds.forEach(threshold => {
                    if (percentage >= threshold && !triggered.has(threshold)) {
                        triggered.add(threshold);
                        gtag('event', 'scroll_depth', {
                            'event_category': 'Engagement',
                            'event_label': `${threshold}%`,
                            'value': threshold,
                            'page_path': window.location.pathname
                        });
                    }
                });
            }
        }

        // Debounce scroll tracking
        let scrollTimer;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(checkScrollDepth, 100);
        });

        // Track max scroll on page unload
        window.addEventListener('beforeunload', function() {
            if (maxScroll > 0) {
                gtag('event', 'max_scroll_depth', {
                    'event_category': 'Engagement',
                    'value': maxScroll,
                    'page_path': window.location.pathname
                });
            }
        });
    }

    // Track engagement time
    function trackEngagementTime() {
        let startTime = Date.now();
        let totalEngaged = 0;
        let isEngaged = true;
        let engagementTimer;

        function trackEngagement() {
            if (isEngaged) {
                totalEngaged += Date.now() - startTime;
            }
            startTime = Date.now();
        }

        // Track engagement every 10 seconds
        engagementTimer = setInterval(trackEngagement, 10000);

        // Pause engagement on blur
        window.addEventListener('blur', function() {
            isEngaged = false;
            trackEngagement();
        });

        // Resume engagement on focus
        window.addEventListener('focus', function() {
            isEngaged = true;
            startTime = Date.now();
        });

        // Send final engagement time on unload
        window.addEventListener('beforeunload', function() {
            clearInterval(engagementTimer);
            trackEngagement();
            
            if (totalEngaged > 0) {
                const bucket = getEngagementBucket(totalEngaged);
                gtag('event', 'engagement_time', {
                    'event_category': 'Engagement',
                    'value': Math.round(totalEngaged / 1000), // Convert to seconds
                    'event_label': bucket,
                    'page_path': window.location.pathname
                });
            }
        });
    }

    // Get engagement time bucket
    function getEngagementBucket(milliseconds) {
        const seconds = milliseconds / 1000;
        if (seconds < 10) return '0-10s';
        if (seconds < 30) return '10-30s';
        if (seconds < 60) return '30-60s';
        if (seconds < 180) return '1-3m';
        if (seconds < 600) return '3-10m';
        return '10m+';
    }

    // Track tool usage
    function trackToolUsage() {
        // Track tool button clicks
        document.addEventListener('click', function(e) {
            const toolButton = e.target.closest('[data-tool]');
            if (toolButton) {
                const toolName = toolButton.getAttribute('data-tool');
                gtag('event', 'tool_use', {
                    'event_category': 'Tools',
                    'event_label': toolName,
                    'tool_name': toolName
                });
            }

            // Track copy button clicks
            if (e.target.matches('.copy-btn, [data-copy]')) {
                gtag('event', 'copy_result', {
                    'event_category': 'Tools',
                    'event_label': getCurrentTool(),
                    'tool_name': getCurrentTool()
                });
            }

            // Track download button clicks
            if (e.target.matches('.download-btn, [data-download]')) {
                gtag('event', 'download_result', {
                    'event_category': 'Tools',
                    'event_label': getCurrentTool(),
                    'tool_name': getCurrentTool()
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', function(e) {
            if (e.target.matches('.tool-form, [data-tool-form]')) {
                gtag('event', 'tool_process', {
                    'event_category': 'Tools',
                    'event_label': getCurrentTool(),
                    'tool_name': getCurrentTool()
                });
            }
        });
    }

    // Track search queries
    function trackSearchQueries() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let searchTimer;
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimer);
                searchTimer = setTimeout(() => {
                    if (this.value.length > 2) {
                        gtag('event', 'search', {
                            'event_category': 'Search',
                            'search_term': this.value,
                            'page_path': window.location.pathname
                        });
                    }
                }, 1000);
            });
        }
    }

    // Track external links
    function trackExternalLinks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.startsWith(window.location.origin)) {
                gtag('event', 'external_link', {
                    'event_category': 'Outbound',
                    'event_label': link.href,
                    'transport_type': 'beacon'
                });
            }
        });
    }

    // Track file downloads
    function trackFileDownloads() {
        const downloadExtensions = ['pdf', 'zip', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt'];
        
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href) {
                const extension = link.href.split('.').pop().toLowerCase();
                if (downloadExtensions.includes(extension)) {
                    gtag('event', 'file_download', {
                        'event_category': 'Downloads',
                        'event_label': link.href,
                        'file_extension': extension,
                        'transport_type': 'beacon'
                    });
                }
            }
        });
    }

    // Get current tool name
    function getCurrentTool() {
        // Try to get from URL
        const pathMatch = window.location.pathname.match(/tools\/([^/]+)/);
        if (pathMatch) {
            return pathMatch[1].replace('.html', '').replace(/-/g, ' ');
        }
        
        // Try to get from page title
        const title = document.title.split(' - ')[0];
        if (title) {
            return title;
        }
        
        return 'unknown';
    }

    // Track custom events
    window.trackEvent = function(eventName, parameters = {}) {
        gtag('event', eventName, parameters);
    };

    // Track custom conversions
    window.trackConversion = function(conversionName, value = 0) {
        gtag('event', 'conversion', {
            'send_to': `${GA_MEASUREMENT_ID}/${conversionName}`,
            'value': value,
            'currency': 'USD'
        });
    };

    // Track errors
    window.addEventListener('error', function(e) {
        gtag('event', 'javascript_error', {
            'event_category': 'Errors',
            'event_label': `${e.message} | ${e.filename}:${e.lineno}:${e.colno}`,
            'fatal': false
        });
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGA4);
    } else {
        initGA4();
    }

    // Export for debugging
    if (DEBUG_MODE) {
        window.DevStationAnalytics = {
            trackEvent: window.trackEvent,
            trackConversion: window.trackConversion,
            getCurrentTool: getCurrentTool
        };
    }
})();
