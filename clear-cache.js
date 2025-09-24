/**
 * Cache Clearing Utility for Development
 * This script helps clear all browser caches for immediate design updates
 */

(function() {
    'use strict';

    // Clear all service worker caches
    if ('serviceWorker' in navigator && 'caches' in window) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('Clearing cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            console.log('All caches cleared successfully');
        }).catch(function(error) {
            console.error('Error clearing caches:', error);
        });
    }

    // Unregister all service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            registrations.forEach(function(registration) {
                console.log('Unregistering service worker:', registration);
                registration.unregister();
            });
        });
    }

    // Clear local storage and session storage
    try {
        localStorage.clear();
        sessionStorage.clear();
        console.log('Storage cleared');
    } catch (e) {
        console.warn('Could not clear storage:', e);
    }

    // Force reload with cache bypass
    setTimeout(function() {
        console.log('Reloading page with cache bypass...');
        window.location.reload(true);
    }, 1000);

})();

// Add to global scope for manual execution
window.clearAllCaches = function() {
    console.log('Manually clearing all caches...');
    
    // Execute the cache clearing
    if ('serviceWorker' in navigator && 'caches' in window) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            console.log('All caches cleared. Reloading...');
            window.location.reload(true);
        });
    } else {
        window.location.reload(true);
    }
};

console.log('Cache clearing utility loaded. Use clearAllCaches() to manually clear cache.');
