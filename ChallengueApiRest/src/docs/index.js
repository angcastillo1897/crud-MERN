import swaggerJsdoc from 'swagger-jsdoc';
import './authentication.docs.js';
import './users.docs.js';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Grow Analytics API',
            version: '1.0.0',
            description: 'A simple express API rest for Grow Analytics',
            contact: {
                name: 'Angelo Castillo',
                url: 'www.linkedin.com/in/angelo-castillo-falcon-3715b319a',
                email: 'angcastillo18@gmail.com'
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local server'
            }
        ],
    },
    apis: ['./src/docs/*.js']
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);


