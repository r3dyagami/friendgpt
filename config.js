// Environment configuration
// These will be injected by Vercel environment variables in production
const config = {
    STRIPE_PUBLISHABLE_KEY: (typeof process !== 'undefined' && process.env) ? process.env.STRIPE_PUBLISHABLE_KEY : '', // Set in Vercel dashboard
    OPENAI_API_KEY: (typeof process !== 'undefined' && process.env) ? process.env.OPENAI_API_KEY : '', // Set in Vercel dashboard  
    BACKEND_URL: (typeof window !== 'undefined') ? window.location.origin : 'http://localhost:3000'
};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.CONFIG = config;
}