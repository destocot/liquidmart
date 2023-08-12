const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));

const QuestionAndAnswersRoutes = require('./server/Routers/qanda-routes');
const productRouter = require('./server/Routers/products-routes');
const reviewsRouter = require('./server/Routers/reviews-routes');

app.use('/qa/questions', QuestionAndAnswersRoutes);
app.use('/products', productRouter);
app.use('/reviews', reviewsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening at port http://localhost:${port}`);
});
