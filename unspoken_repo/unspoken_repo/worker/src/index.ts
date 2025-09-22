export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Only POST', { status: 405 });
    if (env.PROXY_TOKEN) {
      const auth = request.headers.get('authorization');
      if (auth !== `Bearer ${env.PROXY_TOKEN}`) return new Response('unauthorized', { status: 401 });
    }
    const body = await request.json();
    const messages = body.messages || [];
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-5.1-mini', messages, temperature: 0.6, max_tokens: 300 })
    });
    const json = await r.json();
    const reply = json.choices?.[0]?.message?.content || '';
    return new Response(JSON.stringify({ reply }), { headers: { 'Content-Type': 'application/json' } });
  }
};
