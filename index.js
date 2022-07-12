const http = require('http');
const mongoose = require('mongoose')
const {uploadAndSave, renderPage} = require('./routers/router')

const server = http.createServer();

server.on('listening', function (req, res) {
    console.log('Server running...');
})

server.on('request', function (req, res) {
    if (req.url !== '/upload') {
        renderPage(req, res)
    } else if (req.url === '/upload' && req.method === 'POST') {
        uploadAndSave(req);
        renderPage(req, res)
    }
})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://user:user@cluster0.j0dex.mongodb.net/shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        server.listen(8080)
    } catch (error) {
        console.log(error);
    }
}

start()