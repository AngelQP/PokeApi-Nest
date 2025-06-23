
export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: parseInt(process.env.PORT ?? '', 10) || 3002,
    defaultLimit: parseInt(process.env.DEFAULT_LIMIT ?? '', 10) || 7
})