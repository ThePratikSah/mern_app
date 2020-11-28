//node core modules
import path from 'path';

//installed modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

//disable in production
dotenv.config();

// PORT
const port = process.env.PORT || 3300;

const app = express();

//All routes imported here
import authRoutes from './routes/auth-routes.js';

//multer file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

//multer file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());

// multer configuration
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('image')
);

//
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'images')));

//cors error function
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//Entry point for routes
app.use('/auth', authRoutes);

app.use(helmet());

app.use(compression());

//central error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

//mongo db connection
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to DB');
    app.listen(port, () => {
      console.log(`listening on port${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
