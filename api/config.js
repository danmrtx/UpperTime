export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    CHAVE_URL: process.env.CHAVE_URL || process.env.VITE_CHAVE_URL || '3009'
  };

  const accept = req.headers['accept'] || '';
  if (accept.includes('application/json') || (req.query && req.query.format === 'json')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json(env);
  }

  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  return res.status(200).send(`window.__UPPERTIME_ENV__ = ${JSON.stringify(env)};`);
}
