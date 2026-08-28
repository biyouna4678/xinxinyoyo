const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // map /js/ to /public/js/
    if (filePath.startsWith('/js/')) {
        filePath = '/public' + filePath;
    }
    // map /css/ to /public/css/
    if (filePath.startsWith('/css/')) {
        filePath = '/public' + filePath;
    }
    
    filePath = '.' + filePath;
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
    }
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end('Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(8126, async () => {
    console.log("Server started on 8126");
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:8126/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    
    await browser.close();
    server.close();
});
