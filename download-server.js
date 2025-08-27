const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/download') {
    const filePath = path.join(__dirname, 'gemini-flash-image-project.zip');
    
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="gemini-flash-image-project.zip"');
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.writeHead(404);
      res.end('File not found');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Download Gemini Flash Image Project</h1>
          <a href="/download" download="gemini-flash-image-project.zip">
            <button style="padding: 10px 20px; font-size: 16px;">
              Download Project ZIP
            </button>
          </a>
        </body>
      </html>
    `);
  }
});

server.listen(3001, () => {
  console.log('Download server running at http://localhost:3001');
  console.log('Click the link to download your project!');
});