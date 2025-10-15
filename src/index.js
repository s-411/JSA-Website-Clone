/**
 * Cloudflare Worker to serve static HTML/CSS site
 */

import html from './template.html';
import css from '../public/css/styles.css';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Import JS as raw text to avoid execution in Worker context
const mainJs = `/**
 * Main JavaScript file for interactive functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('JSA Website Clone loaded');

    // Initialize functionality
    init();
});

function init() {
    // Navigation functionality will be added
    // Scroll effects will be added
    // Interactive elements will be added section by section
}

// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add more functions as needed for interactive elements
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve CSS
    if (path === '/css/styles.css') {
      return new Response(css, {
        headers: {
          'content-type': 'text/css;charset=UTF-8',
          'cache-control': 'public, max-age=3600',
        },
      });
    }

    // Serve JavaScript
    if (path === '/js/main.js') {
      return new Response(mainJs, {
        headers: {
          'content-type': 'application/javascript;charset=UTF-8',
          'cache-control': 'public, max-age=3600',
        },
      });
    }

    // Serve images from KV static content
    if (path.startsWith('/images/')) {
      try {
        return await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: {},
          }
        );
      } catch (e) {
        return new Response(`Image not found: ${path}`, { status: 404 });
      }
    }

    // Serve main HTML for all other routes
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=3600',
      },
    });
  },
};
