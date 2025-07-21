export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const paymentData = req.body;
        
        // Store in your database (for now just log)
        console.log('Payment stored:', paymentData);
        
        // TODO: Add database storage
        // await db.payments.create(paymentData);
        
        res.json({ success: true });
        
    } catch (error) {
        console.error('Error storing payment:', error);
        res.status(500).json({ error: 'Failed to store payment' });
    }
}