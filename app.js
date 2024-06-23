var createError = require('http-errors');
const http = require('http');
const socketIo = require('socket.io');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var mahasiswaRouter = require('./routes/mahasiswa');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var dosenRouter = require('./routes/dosen');
var profileRouter = require('./routes/profile')
var riwayatRouter = require('./routes/riwayat')
var jadwalRouter = require('./routes/jadwal')
var pengajuanRouter = require('./routes/pengajuan')

var session = require('express-session');

var app = express();

// Session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

// view engine setup
app.set('views', [
  path.join(__dirname, 'views/Mahasiswa'),
  path.join(__dirname, 'views/Dosen'),
  path.join(__dirname, 'views'),
]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mahasiswaRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/dosen', dosenRouter);
app.use('/profile', profileRouter);
app.use('/riwayat', riwayatRouter)
app.use('/jadwal', jadwalRouter)
app.use('/pengajuan', pengajuanRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.locals.io = io;
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
