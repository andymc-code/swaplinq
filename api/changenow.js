// Basic in-memory rate limiter
const rateLimitMap = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 30; // Max requests per minute per IP

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + WINDOW_MS };

    if (now > entry.resetTime) {
        entry.count = 1;
        entry.resetTime = now + WINDOW_MS;
    } else {
        entry.count++;
    }

    rateLimitMap.set(ip, entry);
    
    // Periodically cleanup old entries randomly to avoid memory leak
    if (Math.random() < 0.05) {
        for (const [key, val] of rateLimitMap.entries()) {
            if (now > val.resetTime) rateLimitMap.delete(key);
        }
    }

    return entry.count > MAX_REQUESTS;
}

export default async function handler(req, res) {
    // CORS Preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // IP Extraction for Rate Limiting
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    if (checkRateLimit(ip)) {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    // Rely securely on server environment configuration
    const apiKey = process.env.CHANGENOW_API_KEY || process.env.VITE_CHANGENOW_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured on server.' });
    }

    const { action, payload } = req.body;
    const BASE_URL = 'https://api.changenow.io/v1';
    let url = '';
    let method = 'GET';
    let body = undefined;

    switch (action) {
        case 'min-amount':
            url = `${BASE_URL}/min-amount/${payload.from}_${payload.to}?api_key=${apiKey}`;
            break;
        case 'exchange-amount':
            url = `${BASE_URL}/exchange-amount/${payload.amount}/${payload.from}_${payload.to}?api_key=${apiKey}`;
            break;
        case 'create-transaction':
            url = `${BASE_URL}/transactions/${apiKey}`;
            method = 'POST';
            body = JSON.stringify(payload.data);
            break;
        case 'transaction-status':
            url = `${BASE_URL}/transactions/${payload.id}/${apiKey}`;
            break;
        default:
            return res.status(400).json({ error: 'Invalid action' });
    }

    try {
        const response = await fetch(url, {
            method,
            headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
            body
        });
        
        const data = await response.json();
        
        // Strip sensitive/informational origin server headers (Envoy banner)
        res.removeHeader('Server');
        res.setHeader('Server', 'Swaplinq Secure Gateway');

        // Note: ChangeNow API might return 200 with an error object, 
        // passing through their HTTP status is appropriate.
        res.status(response.status).json(data);
    } catch (error) {
        res.removeHeader('Server');
        res.setHeader('Server', 'Swaplinq Secure Gateway');
        res.status(500).json({ error: 'Internal server error while calling exchange provider.' });
    }
}
