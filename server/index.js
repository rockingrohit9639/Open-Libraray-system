const dotenv = require("dotenv");
dotenv.config({path: './.env'});
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const debug = require('debug')('server:server');
const multer = require("multer")
const corsOptions = {
    origin: true,
    credential: true
}
const port = process.env.PORT || '8000';
// db connection
require('./db/conn')
const User = require("./models/User");
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.static("public"));

app.post("/test", multer().none(), async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(await bcrypt.compare(password,user.password))
        return res.status(200).json({message: 'success'})
    else
        return res.status(400).json({message: 'error'})
})

//routes
app.use('/accounts', require("./routes/user"));


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
