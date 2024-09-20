import 'dotenv/config';
import express from 'express';
import xss from 'xss-clean';

import authMiddleware from './middleware/auth.js';
import { OK } from './utils/statusCodes.js';
import Response from './models/response.js';
import UserRoute from './routes/UserRoute.js';
import CategoryRoute from './routes/CategoryRoutes.js';
import ProductRoute from './routes/ProductRoutes.js';
import MovementRouter from './routes/MovementRouter.js';
import sequelize from './config/dababase.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use((req, res, next) => {
    if (['/', '/user/login'].includes(req.path)) {
        return next();
    }

    authMiddleware(req, res, next);
});

app.get('/', (req, res) => {
    res.status(OK).json(new Response({ success: true, message: 'CHECK SUCCESS' }));
});

app.use('/user', UserRoute);
app.use('/category', CategoryRoute);
app.use('/product', ProductRoute);
app.use('/movement', MovementRouter);


const PORT = process.env.PORT || 3000;

const startServer = async () => {

    // Sincroniza la base de datos
    await sequelize.sync({ force: false });
    console.log('-> DATABASE MOUNT');

    app.listen(PORT, () => {
        console.log(`-> THIS SERVER RUN IN PORT: ${PORT}`);
    });
};

startServer();
