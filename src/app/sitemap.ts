import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { SITE_URL } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${SITE_URL}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/portfolio`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${SITE_URL}/industries`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/how-we-work`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${SITE_URL}/contact`, priority: 0.9, changeFrequency: 'monthly' as const },
  ];

  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date().toISOString(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...projectPages,
  ];
}
