const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case '':
            //res.writeHead(200, {'Content-Type': 'text/plain'})
            //res.end('Main site')
            serveStaticFile(res,'/public/home.html','text/html')
            break
        case '/about':
            //res.writeHead(200, {'Content-Type': 'text/plain'})
            //res.end('about us')
            serveStaticFile(res,'/public/about.html','text/html')
            break
        default:
            //res.writeHead(400, {'Content-Type': 'text/plain'})
            //res.end('Not Found')
            serveStaticFile(res,'/public/404.html','text/html',404)
            break
    }
})

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, ((err, data) => {
        if (err){
            res.writeHead(500,{'Content-Type': 'text/plain'})
            return res.end('500 - internal error')
        }
        res.writeHead(responseCode,{'Content-Type':contentType})
        res.end(data)
    }))
}

server.listen(port, () => {
    console.log(`server was launched at ${port}`)
})