const http = require('http');
const jsreport = require('jsreport');

const fs = require("fs");
const htmlx = fs.readFileSync("./prueba.html", 'utf-8');
const cabezax = fs.readFileSync("./cabeza.html", 'utf-8');
const piex = fs.readFileSync("./footer.html", 'utf-8');
let rawdata = fs.readFileSync('datos.json');
let student = JSON.parse(rawdata);


http.createServer((req, res) => {
  jsreport.render({
    data: student,
    template: {
      content: htmlx,
      engine: 'handlebars',
      recipe: 'chrome-pdf',
      chrome: {
        displayHeaderFooter: true,
        format: "A4",
        //scale:1,
        waitForJS:false,
        //waitForNetworkIddle:false,
        printBackground:true,
        headerTemplate: cabezax,
        footerTemplate: piex,
        //width: '300px',
        //height: '300px',
        marginTop: "80px",
        marginRight: "20px",
        marginBottom: "80px",
        marginLeft: "20px",
    }
    }
  }).then((out)  => {
    out.stream.pipe(res);
    //out.stream.pipe(fs.createWriteStream('helloworld.pdf')) 
  }).catch((e) => {
    res.end(e.message);
  })
  //.render("<html><body>{{#each $pdf.pages}}{{#if @index}}<div style='page-break-before: always;'></div>{{/if}}<main class='main'> <header class='header'>Headero</header><footer class='footer'><span>Pagina {{getPageNumber @index}} of {{getTotalPages ../$pdf.pages}}</span></footer></main>{{/each}}</body></html>")

}).listen(1337, '127.0.0.1');