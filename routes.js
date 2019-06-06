const fs = require('fs');

const requestHeader = (req, res) => {
    const { url, method } = req;
    if (url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<html>');
        res.write(`<title>This => ${url}</title>`);
        res.write(`<body><form method="POST" action="/message">
                    <input type="text" name="message">
                    <input type="submit" value="===>">
                </form></body>`);
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => { 
            const parsedBody = Buffer.concat(body).toString();
            fs.writeFile('body.txt', body, err => {
                if (!err) {
                    fs.writeFile('parsedBody.txt', parsedBody, err => {
                        if (!err) {
                            res.writeHead(302, {
                                'Location': '/'
                            });
                            return res.end();
                        }
                    });
                }
            });
       
        }); 
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHeader;
