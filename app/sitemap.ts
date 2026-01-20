import { MetadataRoute } from 'next';

export const dynamic = "force-static"; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bullseye-check.vercel.app'; 

  const routes = [
    '',
    '/news',
    '/stock',
    '/dictionary',
    '/recommend',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}