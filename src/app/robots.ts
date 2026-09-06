/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/navkriti-26', '/navkriti-26/', '/navkriti26', '/navkriti26/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/navkriti-26', '/navkriti-26/', '/navkriti26', '/navkriti26/'],
      },
    ],
    sitemap: 'https://rawwebsite-seven.vercel.app/sitemap.xml',
  }
}
