const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const FileStore = require('session-file-store')(session);
const methodOverride = require('method-override');
const { cookiesCleaner } = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/assessment-2-party', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Импорт маршрутов.
const indexRouter = require('./routes/index');
const partiesRouter = require('./routes/parties');

const app = express();

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

// app.use(cookiesCleaner);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
app.use('/parties', partiesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
