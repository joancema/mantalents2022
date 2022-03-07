const jsreport = require('jsreport');
const fs = require('fs');
const htmlx = fs.readFileSync("./reportes/consulta.html", 'utf-8');
const cabezax = fs.readFileSync("./reportes/cabeza.html", 'utf-8');
const piex = fs.readFileSync("./reportes/footer.html", 'utf-8');


async function generarReporte(consultax)
{
    console.log(consultax)
    let prueba = {
        rut:consultax.rut,
        nombre:consultax.nombre,
        telefono:consultax.telefono,
        direccion:consultax.direccion,
        fechanacimiento:consultax.fechanacimiento,
        previsionsalud:consultax.previsionsalud,
        otrosdatos:consultax.otrosdatos,
        alergia: consultax.alergia,
        sexo:consultax.sexo,
        email:consultax.email,
        nacionalidad: consultax.nacionalidad,
        citas: consultax.citas,
        nusuario :consultax.estadocivil,
        fecha: `${consultax.citas[0].fecha.getFullYear()} - ${consultax.citas[0].fecha.getMonth()+1} - ${consultax.citas[0].fecha.getDate()}`
    }
    try {
        let out = await jsreport.render({
            data: prueba,
            template: {
              content: htmlx,
              engine: 'handlebars',
              recipe: 'chrome-pdf',
              chrome: {
                launchOptions: {
                    args: ["--no-sandbox"],
                },
                displayHeaderFooter: true,
                format: "A4",
                waitForJS:false,
                printBackground:true,
                headerTemplate: cabezax,
                footerTemplate: piex,
                marginTop: "80px",
                marginRight: "20px",
                marginBottom: "80px",
                marginLeft: "20px",
            }
            }
        });
        
        return out;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generarReporte: generarReporte
}
