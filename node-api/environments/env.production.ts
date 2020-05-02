export default {
    API: {
        NAME: 'Micro-Servicio Punto de Venta',
        PORT: 8001,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRETKEY:'PestanasEnInglesesPestanas',
        EXPIRES: 5000    // 4 Horas
    },
    MONGODB: {
         HOST: '192.168.9.136',
         PORT: 27018,
         USER_NAME: 'dbo-operador',
         USER_PASSWORD: 'operador123',
         DEFAULT_DATABASE: 'dbMTWDM'
    }
};