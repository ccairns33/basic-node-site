const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = 3000;


const server = http.createServer((req,res)=>{

    let filePath = path.join(__dirname, req.url === "/" ? 'index' : req.url)
    let fileExt = path.extname(req.url);
    if (fileExt === ""){
        // if file name has no extension, add default html
        fileExt = ".html"
        filePath += fileExt;
    }
    let contentType = "text/html";

    switch (fileExt){
        case ".js":
            contentType = "text/javascript";
            break;
        case "css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }
    fs.readFile(filePath, 'utf8', (err, content) => {
        if(err){
            if (err.code == "ENOENT") {
                // Page not found
                fs.readFile(path.join(__dirname, "404.html"),(err, content) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(content, "utf8");
                  });
            }
            else {
                //  Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            res.writeHead(200, `Content-Type: ${contentType}`);
            res.end(content);
            console.log(filePath);

        }
    });

});
server.listen(PORT, () => {

    console.log(`Listening at ${PORT}`)

});