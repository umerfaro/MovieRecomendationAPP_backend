// index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./utils/errorHandler');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const listRoutes = require('./routes/listRoutes');
const searchRoutes = require('./routes/searchRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const newsRoutes = require('./routes/newsRoutes');
const directorRoutes = require('./routes/directorRoutes'); 
const actorRoutes = require('./routes/actorRoutes'); 
const discussionRoutes = require('./routes/discussionRoutes');

// Use routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/recommendations', recommendationRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/directors', directorRoutes); 
app.use('/api/v1/actors', actorRoutes);
app.use('/api/v1/discussions', discussionRoutes);

// Swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Movie API',
        version: '1.0.0',
        description: 'API Documentation for Movie Database',
      },
      servers: [{ url: 'http://localhost:5000' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
  };
  
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
