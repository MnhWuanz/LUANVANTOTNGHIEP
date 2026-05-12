import express, { Express } from 'express';

const router = express.Router();

const apiRoutes = (app: Express) => {
  // TODO: thêm các routes ở đây
  // Ví dụ:
  // router.get('/users', UserController.getAll);
  router.get('/', (req, res) => {
    res.json({ message: 'Hello from API!' });
  });

  app.use('/api', router);
};

export default apiRoutes;
