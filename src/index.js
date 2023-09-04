const http = require('http');
const getUsers = require('./modules/users');

const hostname = '127.0.0.1';
const port = 3003;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    const searchParam = url.searchParams.toString();
    const index = searchParam.indexOf('=');
    const paramValue = searchParam.substring(index + 1);
    const param = searchParam.substring(0, index);

    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, wold.')
    } else if (req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(getUsers());
        res.end('{}')

        return;
    } else if (paramValue) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello, ${paramValue}`)

        return;
    } else if (paramValue === '' && param === 'name') {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Enter a name`)

        return;
    } else if (param !== 'name') {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end();

        return;
    }
})

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
}) 
