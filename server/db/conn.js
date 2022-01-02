const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;
