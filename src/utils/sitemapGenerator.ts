import { INITIAL_COURSES } from '../lib/seed';

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // 0.0 to 1.0
}

export interface SitemapGeneratorOptions {
  baseUrl?: string;
  includeCourses?: boolean;
  extraUrls?: SitemapUrlEntry[];
  customDate?: string;
}

// Canonical public routes of Billionaires AI Academy
export const CORE_SITEMAP_ROUTES: Array<{ path: string; changefreq: SitemapUrlEntry['changefreq']; priority: number }> = [
  { path: '', changefreq: 'daily', priority: 1.0 }, // Homepage
  { path: 'academy', changefreq: 'daily', priority: 0.9 }, // 100 Masterclasses
  { path: 'university', changefreq: 'weekly', priority: 0.9 }, // Africa Blockchain University
  { path: 'datacenter', changefreq: 'weekly', priority: 0.9 }, // Universal Autonomous AI Data Center
  { path: 'deal-room', changefreq: 'daily', priority: 0.85 }, // Global Deal Room & Swarm
  { path: 'governance', changefreq: 'weekly', priority: 0.85 }, // PVAIDC Governance Institute
  { path: 'policy-observatory', changefreq: 'daily', priority: 0.85 }, // Global Policy Intelligence
  { path: 'marketplace', changefreq: 'daily', priority: 0.8 }, // Prompt Marketplace 60/40
  { path: 'tools', changefreq: 'weekly', priority: 0.8 }, // AI Autonomous Tools
  { path: 'library', changefreq: 'weekly', priority: 0.8 }, // Sovereign Ebooks
  { path: 'tv', changefreq: 'daily', priority: 0.75 }, // BAA AI TV Live
  { path: 'bounties', changefreq: 'weekly', priority: 0.75 }, // Base L2 & Paystack Bounties
  { path: 'investor-one-pager', changefreq: 'monthly', priority: 0.7 }, // Institutional Deck
  { path: 'about', changefreq: 'monthly', priority: 0.7 }, // About BAA
  { path: 'partners', changefreq: 'monthly', priority: 0.7 }, // Global Ecosystem Partners
  { path: 'free', changefreq: 'weekly', priority: 0.7 } // Free Magnets & Resources
];

/**
 * Returns the default base URL for the application
 */
export function getDefaultBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return 'https://microwork-ai-2-app-production.up.railway.app';
}

/**
 * Formats a Date object or string into standard W3C Datetime (YYYY-MM-DD)
 */
export function formatSitemapDate(date?: Date | string): string {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().split('T')[0];
}

/**
 * Escapes special XML characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates an array of all URLs (core routes + 100 courses)
 */
export function getSitemapUrls(options: SitemapGeneratorOptions = {}): SitemapUrlEntry[] {
  const baseUrl = (options.baseUrl || getDefaultBaseUrl()).replace(/\/+$/, '');
  const currentDate = options.customDate || formatSitemapDate();
  const includeCourses = options.includeCourses !== false;

  const entries: SitemapUrlEntry[] = [];

  // 1. Core Platform Pages
  for (const route of CORE_SITEMAP_ROUTES) {
    const loc = route.path ? `${baseUrl}/${route.path}` : `${baseUrl}/`;
    entries.push({
      loc,
      lastmod: currentDate,
      changefreq: route.changefreq,
      priority: route.priority
    });
  }

  // 2. Dynamic Course Pages (from 100 Seeded Courses)
  if (includeCourses) {
    for (const course of INITIAL_COURSES) {
      // Direct deep link paths for search indexing
      entries.push({
        loc: `${baseUrl}/academy?course=${encodeURIComponent(course.id)}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      });
    }
  }

  // 3. Extra user-supplied URLs
  if (options.extraUrls && options.extraUrls.length > 0) {
    entries.push(...options.extraUrls);
  }

  return entries;
}

/**
 * Generates a valid W3C standard XML sitemap string
 * Compatible with Google Search Console, Bing Webmaster, and major crawlers.
 */
export function generateSitemapXml(options: SitemapGeneratorOptions = {}): string {
  const entries = getSitemapUrls(options);

  const xmlItems = entries
    .map((entry) => {
      const priorityFormatted = typeof entry.priority === 'number' ? entry.priority.toFixed(1) : '0.5';
      const changefreqTag = entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : '';
      const lastmodTag = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmodTag}${changefreqTag}
    <priority>${priorityFormatted}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlItems}
</urlset>
`;
}

/**
 * Helper to download the generated sitemap as a .xml file in the browser
 */
export function downloadSitemapXml(filename: string = 'sitemap.xml', options?: SitemapGeneratorOptions): void {
  if (typeof window === 'undefined' || !window.document) return;

  const xmlContent = generateSitemapXml(options);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
