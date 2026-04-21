export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { q = 'technology' } = req.query;
  const encodedQ = encodeURIComponent(q);

  // 1. Try NewsAPI (Works on server!)
  if (process.env.VITE_NEWSAPI_KEY) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodedQ}&language=en&pageSize=12&sortBy=publishedAt&apiKey=${process.env.VITE_NEWSAPI_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          return res.status(200).json({ source: 'NewsAPI', articles: data.articles });
        }
      }
    } catch (e) {
      console.error('NewsAPI failed on server', e);
    }
  }

  // 2. Try APITube
  if (process.env.VITE_APITUBE_API_KEY) {
    try {
      const response = await fetch(
        `https://api.apitube.io/v1/news/everything?title=${encodedQ}&language.code=en&limit=12`,
        { headers: { 'X-API-Key': process.env.VITE_APITUBE_API_KEY } }
      );
      if (response.ok) {
        const data = await response.json();
        const articles = data.articles || data.data || [];
        if (articles.length > 0) {
          return res.status(200).json({ source: 'APITube', articles });
        }
      }
    } catch (e) {
      console.error('APITube failed on server', e);
    }
  }

  // 3. Try Polygon
  if (process.env.VITE_POLYGON_API_KEY) {
    try {
      const response = await fetch(
        `https://api.polygon.io/v1/reference/news?q=${encodedQ}&limit=12&apikey=${process.env.VITE_POLYGON_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return res.status(200).json({ source: 'Polygon', articles: data.results });
        }
      }
    } catch (e) {
      console.error('Polygon failed on server', e);
    }
  }

  return res.status(404).json({ error: 'No news found from any source' });
}
