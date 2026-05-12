/// <reference path="./types/index.d.ts" />

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from 'config/swagger';
import apiRoutes from 'routes/api';

const app = express();
const PORT = process.env.PORT || 8080;

// Config CORS
app.use(cors());

// Config body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
apiRoutes(app);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
