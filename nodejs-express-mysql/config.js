const env = process.env;

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || 'bar-voyage.cglpszvrmrqj.us-east-2.rds.amazonaws.com',
        user: env.DB_USER || 'admin',
        password: env.DB_PASSWORD || 'amrinder',
        database: env.DB_NAME || 'bar-voyage-v1',
    },
};


module.exports = config;