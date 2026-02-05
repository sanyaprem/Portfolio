import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://medium.com/feed/@sanyapb', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Medium RSS');
    }

    const xmlText = await response.text();
    
    // Parse RSS XML
    const articles = parseRSS(xmlText);
    
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}

function parseRSS(xml: string) {
  const articles = [];
  
  // Extract items from RSS
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const items = xml.match(itemRegex) || [];
  
  for (const item of items.slice(0, 6)) { // Get latest 6 articles
    // Extract title
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract link
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const url = linkMatch ? linkMatch[1] : '';
    
    // Extract description
    const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
    let description = descMatch ? descMatch[1] : '';
    
    // Remove HTML tags from description
    description = description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    
    // Extract publish date
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
    const publishedDate = pubDateMatch ? new Date(pubDateMatch[1]).toISOString().split('T')[0] : '';
    
    // Extract categories/tags
    const categoryRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g;
    const categoryMatches = [...item.matchAll(categoryRegex)];
    const tags = categoryMatches.slice(0, 3).map(match => match[1]);
    
    // Calculate reading time (rough estimate based on content length)
    const contentMatch = item.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/);
    const content = contentMatch ? contentMatch[1] : '';
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200) + ' min read';
    
    // Extract thumbnail if available
    const thumbnailMatch = item.match(/<media:thumbnail.*?url="(.*?)"/);
    const thumbnail = thumbnailMatch ? thumbnailMatch[1] : undefined;
    
    articles.push({
      id: url.split('/').pop() || `article-${articles.length}`,
      title,
      description,
      url,
      publishedDate,
      readingTime,
      tags: tags.length > 0 ? tags : ['Article'],
      thumbnail,
    });
  }
  
  return articles;
}