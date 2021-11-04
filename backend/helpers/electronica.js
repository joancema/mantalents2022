const jsreport = require('jsreport');
const fs = require('fs');
const htmlx = fs.readFileSync("./reportes/prueba.html", 'utf-8');
const cabezax = fs.readFileSync("./reportes/cabeza.html", 'utf-8');
const piex = fs.readFileSync("./reportes/footer.html", 'utf-8');



const path = require('path');
const soap = require('soap');
const forge = require('node-forge');
const btoa = require('btoa')
const moment = require('moment');
var convert = require('xml-js');
var codDoc = {
    'factura':1,
    'comprobanteRetencion':7,
    'guiaRemision':6,
    'notaCredito':4,
    'notaDebito':5,
};

const numero=15;
let claveDeAccesoAuxiliar="";
var secuenciaDocumento= numero;
var firmado="";

async function generarReporte(movimientox)
{

    let prueba = {
        codigo:movimientox.codigo,
        fecha: moment(movimientox.fecha).format('DD/MM/YYYY') ,
        subtotal: movimientox.subtotal,
        iva: movimientox.iva,
        total:movimientox.total,
        claveAcceso: movimientox.claveAcceso,
        cliente:{
            identificacion: movimientox.cliente.identificacion,
            nombre: movimientox.cliente.nombre
        },
        productos: movimientox.productos
    }

    try {
        let out = await jsreport.render({
            data: prueba,
            template: {
              content: htmlx,
              engine: 'handlebars',
              recipe: 'chrome-pdf',
              chrome: {
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
        })
        return out;
    } catch (error) {
        throw error;
    }
}
async function  generarFacturaElectronica (movimientoj)
{
    
    //generar factura
    const urlComprobante = path.join(__dirname,`../salida/xml/gen${numero}.xml`);
    fs.writeFileSync(urlComprobante, p_generar_factura_xml(movimientoj)) ;

    //firmar factura
    const urlFirma= path.join(__dirname, 'firma.p12');
    const comprobante = fs.readFileSync(urlComprobante).toString();
    const firma = fs.readFileSync(urlFirma);
    const resultado= await ( firmarComprobante(firma,"Jacm943356",  comprobante ) );
    const urlFirmado = path.join(__dirname,`../salida/firmado/fir${numero}.xml`);
    fs.writeFileSync(urlFirmado, resultado);
    const bufferFirmado = fs.readFileSync(urlFirmado);
    firmado= Buffer.from(bufferFirmado,"binary").toString("base64");
    //receptar
    let respuesta=  await recepcion();
    if (respuesta[0].RespuestaRecepcionComprobante.estado==="RECIBIDA")
    {
        //autorizar
        respuesta = await autorizar(claveDeAccesoAuxiliar)
    }
    return {respuesta
           ,claveAcceso: claveDeAccesoAuxiliar
           };

}
function p_generar_factura_xml(movimientoj){

    var estructuraFactura = {
        factura:{
            "_attributes":{"id":"comprobante", "version":"1.1.0"},
            infoTributaria:{
                ambiente:null,
                tipoEmision:null,
                razonSocial:null,
                nombreComercial:null,
                ruc:null,
                claveAcceso:null,
                codDoc:null,
                estab:null,
                ptoEmi:null,
                secuencial:null,
                dirMatriz:null,
                agenteRetencion:null,
            },
            infoFactura:{
                fechaEmision:null,
                dirEstablecimiento:null,
                //contribuyenteEspecial:null,
                obligadoContabilidad:null,
                tipoIdentificacionComprador:null,
                //guiaRemision:null,
                razonSocialComprador:null,
                identificacionComprador:null,
                //direccionComprador:null,
                totalSinImpuestos:null,
                totalDescuento:null,
                totalConImpuestos:{
                    totalImpuesto:[
                    {
                        codigo:2,
                        codigoPorcentaje:0,
                        //descuentoAdicional:null,
                        baseImponible:null,
                        valor:null,
                    },
                    {
                        codigo:2,
                        codigoPorcentaje:2,
                        baseImponible:null,
                        valor:null,
                    }
                    ]
                },
                propina:null,
                importeTotal:null,
                moneda:null,
                pagos:{
                    pago:{
                        formaPago:'20',
                        total:'11.20',
                        plazo:'0',
                        unidadTiempo:'dias',
                    }
                }
            },
            detalles:{
                detalle:[
                {
                    codigoPrincipal:null, //opcional
                    codigoAuxiliar:null, //obliatorio cuando corresponda
                    descripcion:null,
                    cantidad:null,
                    precioUnitario:null,
                    descuento:null,
                    precioTotalSinImpuesto:null,
                    //detallesAdicionales:{
                    //    detAdicional:[
                    //        {
                    //            nombre:"Prueba",
                    //            valor:"100"
                    //        }
                            //<detAdicional nombre="Marca Chevrolet" valor="Chevrolet"/>
                    //    ]
                    //},
                        
                    impuestos:{
                        impuesto:[
                        {
                            codigo:2,
                            codigoPorcentaje:2,
                            tarifa:12,
                            baseImponible:null,
                            valor:null
                        }
                        ]
                    }
                }
                ]
            },
            /*
            infoAdicional:{
                campoAdicional:[
                {
                    nombre:"Codigo Impuesto ISD",
                    text:4580
                },
                {
                    nombre:"Impuesto ISD",
                    text:"15.42x"
                }
                    //<campoAdicional nombre="Codigo Impuesto ISD">4580</campoAdicional> //Obligatorio cuando corresponda
                    //<campoAdicional nombre="Impuesto ISD">15.42x</campoAdicional> //Obligatorio cuando corresponda
                ]
            }
            */
        }
    };
    
    var tipoComprobante = 'factura';
    var estab = 1;
    var ptoEmi = 1;

    estructuraFactura[tipoComprobante].infoTributaria.ambiente = 1; //1 pruebas, 2 produccion
    estructuraFactura[tipoComprobante].infoTributaria.tipoEmision = 1; //1 emision normal
    estructuraFactura[tipoComprobante].infoTributaria.razonSocial = 'JOHN ANTONIO CEVALLOS MACIAS';
    estructuraFactura[tipoComprobante].infoTributaria.nombreComercial = 'JOHN ANONIO CEVALLOS MACIAS';
    estructuraFactura[tipoComprobante].infoTributaria.ruc = '1310024359001';
    estructuraFactura[tipoComprobante].infoTributaria.claveAcceso = ''; //se lo llena más abajo
    estructuraFactura[tipoComprobante].infoTributaria.codDoc = pad(codDoc[tipoComprobante], 2); //tipo de comprobante
    estructuraFactura[tipoComprobante].infoTributaria.estab = pad(estab, 3);
    estructuraFactura[tipoComprobante].infoTributaria.ptoEmi = pad(ptoEmi, 3);
    estructuraFactura[tipoComprobante].infoTributaria.secuencial = pad( movimientoj.codigo , 9);
    estructuraFactura[tipoComprobante].infoTributaria.dirMatriz = 'Carapungo Av. Luis Vacarri B9 S29 y Carihuairazo';
    estructuraFactura[tipoComprobante].infoTributaria.agenteRetencion = '00000001';

    
    let fechaAuxiliar =  new Date(movimientoj.fecha.toString());
    estructuraFactura[tipoComprobante].infoFactura.fechaEmision = moment(fechaAuxiliar).format('DD/MM/YYYY');
    estructuraFactura[tipoComprobante].infoFactura.dirEstablecimiento = 'Carapungo B9-S29';
    //estructuraFactura[tipoComprobante].infoFactura.contribuyenteEspecial = '5368';
    estructuraFactura[tipoComprobante].infoFactura.obligadoContabilidad = 'SI';
    estructuraFactura[tipoComprobante].infoFactura.tipoIdentificacionComprador = pad(4, 2);
    //estructuraFactura[tipoComprobante].infoFactura.guiaRemision = '001-001-000000001';
    estructuraFactura[tipoComprobante].infoFactura.razonSocialComprador = 'PRUEBAS SERVICIO DE RENTAS INTERNAS';
    estructuraFactura[tipoComprobante].infoFactura.identificacionComprador = '1713328506001';
    //estructuraFactura[tipoComprobante].infoFactura.direccionComprador = 'salinas y santiago';
    estructuraFactura[tipoComprobante].infoFactura.totalSinImpuestos = (Math.round( Number(movimientoj.subtotal) * 100) / 100).toFixed(2) ;
    estructuraFactura[tipoComprobante].infoFactura.totalDescuento = '0.00';
        

    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[0].baseImponible = '0.00';
    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[0].valor = '0.00';

    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[1].baseImponible = (Math.round( Number(movimientoj.total) * 100) / 100).toFixed(2) ;
    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[1].valor = (Math.round( Number(movimientoj.iva) * 100) / 100).toFixed(2) ;
    
    
    estructuraFactura[tipoComprobante].infoFactura.propina = '0.00';
    estructuraFactura[tipoComprobante].infoFactura.importeTotal = (Math.round( Number(movimientoj.total) * 100) / 100).toFixed(2) ;
    estructuraFactura[tipoComprobante].infoFactura.moneda = 'DOLAR';    
    
    estructuraFactura[tipoComprobante].infoTributaria.claveAcceso = p_obtener_codigo_autorizacion_desde_comprobante(estructuraFactura);

    claveDeAccesoAuxiliar= estructuraFactura[tipoComprobante].infoTributaria.claveAcceso;
    
    
    var indicej=0;
    
    movimientoj.productos.forEach(elemento=>{
        let cantidadj= (Math.round( Number(elemento.cantidad) * 1000000) / 1000000).toFixed(6)
        let precioj= (Math.round( Number(elemento.precio) * 1000000) / 1000000).toFixed(6)
        let totalj= (Math.round( (Number(elemento.precio) * Number(elemento.cantidad)) * 100) / 100).toFixed(2)
        let ivaj= (Math.round( (Number(elemento.precio) * Number(elemento.cantidad) *1.12/100   ) * 100) / 100).toFixed(2)

        estructuraFactura[tipoComprobante].detalles.detalle[indicej].codigoPrincipal = (indicej+1).toString() ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].codigoAuxiliar = (indicej+1).toString() ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].descripcion = elemento.item.nombre ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].cantidad = cantidadj ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].precioUnitario = precioj ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].descuento = '0.00' ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].precioTotalSinImpuesto = totalj ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].impuestos.impuesto[0].baseImponible = totalj ;
        estructuraFactura[tipoComprobante].detalles.detalle[indicej].impuestos.impuesto[0].valor = ivaj ;
        indicej++;


    })

    

    var options = {compact: true, ignoreComment: true, spaces: 4};
    var result = convert.json2xml(estructuraFactura, options);

    var xmlAsStr = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlAsStr += result;


    
    return xmlAsStr;
}
async function firmarComprobante(mi_contenido_p12, mi_pwd_p12, comprobante) {


   
    var arrayUint8 = new Uint8Array(mi_contenido_p12);
    var p12B64 = forge.util.binary.base64.encode(arrayUint8);
    var p12Der = forge.util.decode64(p12B64);
    var p12Asn1 = forge.asn1.fromDer(p12Der);

    var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, mi_pwd_p12);

    var certBags = p12.getBags({bagType:forge.pki.oids.certBag})
    var cert = certBags[forge.oids.certBag][0].cert;
    var pkcs8bags = p12.getBags({bagType:forge.pki.oids.pkcs8ShroudedKeyBag});
    var pkcs8 = pkcs8bags[forge.oids.pkcs8ShroudedKeyBag][0];
    var key = pkcs8.key;

    if( key == null ) {
        key = pkcs8.asn1;
    }

    certificateX509_pem = forge.pki.certificateToPem(cert);

    certificateX509 = certificateX509_pem;
    certificateX509 = certificateX509.substr( certificateX509.indexOf('\n') );
    certificateX509 = certificateX509.substr( 0, certificateX509.indexOf('\n-----END CERTIFICATE-----') );

    certificateX509 = certificateX509.replace(/\r?\n|\r/g, '').replace(/([^\0]{76})/g, '$1\n');

    //Pasar certificado a formato DER y sacar su hash:
    certificateX509_asn1 = forge.pki.certificateToAsn1(cert);
    certificateX509_der = forge.asn1.toDer(certificateX509_asn1).getBytes();
    certificateX509_der_hash = sha1_base64(certificateX509_der);

    //Serial Number
    var X509SerialNumber = parseInt(cert.serialNumber, 16);

    exponent = hexToBase64(key.e.data[0].toString(16));            
    modulus = bigint2base64(key.n);

    var sha1_comprobante = sha1_base64(comprobante.replace('<?xml version="1.0" encoding="UTF-8"?>\n', ''));

    var xmlns = 'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#"';

    var Certificate_number = p_obtener_aleatorio(); 
    var Signature_number = p_obtener_aleatorio(); 
    var SignedProperties_number = p_obtener_aleatorio(); 
    var SignedInfo_number = p_obtener_aleatorio(); 
    var SignedPropertiesID_number = p_obtener_aleatorio(); 
    var Reference_ID_number = p_obtener_aleatorio(); 
    var SignatureValue_number = p_obtener_aleatorio(); 
    var Object_number = p_obtener_aleatorio(); 
    var SignedProperties = '';

    SignedProperties += '<etsi:SignedProperties Id="Signature' + Signature_number + '-SignedProperties' + SignedProperties_number + '">';  //SignedProperties
        SignedProperties += '<etsi:SignedSignatureProperties>';
            SignedProperties += '<etsi:SigningTime>';

                //SignedProperties += '2016-12-24T13:46:43-05:00';//moment().format('YYYY-MM-DD\THH:mm:ssZ');
                SignedProperties += moment().format('YYYY-MM-DD\THH:mm:ssZ');

            SignedProperties += '</etsi:SigningTime>';
            SignedProperties += '<etsi:SigningCertificate>';
                SignedProperties += '<etsi:Cert>';
                    SignedProperties += '<etsi:CertDigest>';
                        SignedProperties += '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
                        SignedProperties += '</ds:DigestMethod>';
                        SignedProperties += '<ds:DigestValue>';

                            SignedProperties += certificateX509_der_hash;

                        SignedProperties += '</ds:DigestValue>';
                    SignedProperties += '</etsi:CertDigest>';
                    SignedProperties += '<etsi:IssuerSerial>';
                        SignedProperties += '<ds:X509IssuerName>';
                            //SignedProperties += 'CN=AC BANCO CENTRAL DEL ECUADOR,L=QUITO,OU=ENTIDAD DE CERTIFICACION DE INFORMACION-ECIBCE,O=BANCO CENTRAL DEL ECUADOR,C=EC';
                            SignedProperties += 'CN=AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA,OU=ENTIDAD DE CERTIFICACION DE INFORMACION,O=SECURITY DATA S.A. 2,C=EC';
                        SignedProperties += '</ds:X509IssuerName>';
                    SignedProperties += '<ds:X509SerialNumber>';

                        SignedProperties += X509SerialNumber;

                    SignedProperties += '</ds:X509SerialNumber>';
                    SignedProperties += '</etsi:IssuerSerial>';
                SignedProperties += '</etsi:Cert>';
            SignedProperties += '</etsi:SigningCertificate>';
        SignedProperties += '</etsi:SignedSignatureProperties>';
        SignedProperties += '<etsi:SignedDataObjectProperties>';
            SignedProperties += '<etsi:DataObjectFormat ObjectReference="#Reference-ID-' + Reference_ID_number + '">';
                SignedProperties += '<etsi:Description>';

                    SignedProperties += 'contenido comprobante';                        

                SignedProperties += '</etsi:Description>';
                SignedProperties += '<etsi:MimeType>';
                    SignedProperties += 'text/xml';
                SignedProperties += '</etsi:MimeType>';
            SignedProperties += '</etsi:DataObjectFormat>';
        SignedProperties += '</etsi:SignedDataObjectProperties>';
    SignedProperties += '</etsi:SignedProperties>'; //fin SignedProperties

    SignedProperties_para_hash = SignedProperties.replace('<etsi:SignedProperties', '<etsi:SignedProperties ' + xmlns);

    var sha1_SignedProperties = sha1_base64(SignedProperties_para_hash);        


    var KeyInfo = '';

    KeyInfo += '<ds:KeyInfo Id="Certificate' + Certificate_number + '">';
        KeyInfo += '\n<ds:X509Data>';
            KeyInfo += '\n<ds:X509Certificate>\n';

                //CERTIFICADO X509 CODIFICADO EN Base64 
                KeyInfo += certificateX509;

            KeyInfo += '\n</ds:X509Certificate>';
        KeyInfo += '\n</ds:X509Data>';
        KeyInfo += '\n<ds:KeyValue>';
            KeyInfo += '\n<ds:RSAKeyValue>';
                KeyInfo += '\n<ds:Modulus>\n';

                    //MODULO DEL CERTIFICADO X509
                    KeyInfo += modulus;

                KeyInfo += '\n</ds:Modulus>';
                KeyInfo += '\n<ds:Exponent>';

                    //KeyInfo += 'AQAB';
                    KeyInfo += exponent;

                KeyInfo += '</ds:Exponent>';
            KeyInfo += '\n</ds:RSAKeyValue>';
        KeyInfo += '\n</ds:KeyValue>';
    KeyInfo += '\n</ds:KeyInfo>';

    KeyInfo_para_hash = KeyInfo.replace('<ds:KeyInfo', '<ds:KeyInfo ' + xmlns);

    var sha1_certificado = sha1_base64(KeyInfo_para_hash);


    var SignedInfo = '';

    SignedInfo += '<ds:SignedInfo Id="Signature-SignedInfo' + SignedInfo_number + '">';
        SignedInfo += '\n<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315">';
        SignedInfo += '</ds:CanonicalizationMethod>';
        SignedInfo += '\n<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1">';
        SignedInfo += '</ds:SignatureMethod>';
        SignedInfo += '\n<ds:Reference Id="SignedPropertiesID' + SignedPropertiesID_number + '" Type="http://uri.etsi.org/01903#SignedProperties" URI="#Signature' + Signature_number + '-SignedProperties' + SignedProperties_number + '">';
            SignedInfo += '\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
            SignedInfo += '</ds:DigestMethod>';
            SignedInfo += '\n<ds:DigestValue>';

                //HASH O DIGEST DEL ELEMENTO <etsi:SignedProperties>';
                SignedInfo += sha1_SignedProperties;

            SignedInfo += '</ds:DigestValue>';
        SignedInfo += '\n</ds:Reference>';
        SignedInfo += '\n<ds:Reference URI="#Certificate' + Certificate_number + '">';
            SignedInfo += '\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
            SignedInfo += '</ds:DigestMethod>';
            SignedInfo += '\n<ds:DigestValue>';

                //HASH O DIGEST DEL CERTIFICADO X509
                SignedInfo += sha1_certificado;

            SignedInfo += '</ds:DigestValue>';
        SignedInfo += '\n</ds:Reference>';
        SignedInfo += '\n<ds:Reference Id="Reference-ID-' + Reference_ID_number + '" URI="#comprobante">';
            SignedInfo += '\n<ds:Transforms>';
                SignedInfo += '\n<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature">';
                SignedInfo += '</ds:Transform>';
            SignedInfo += '\n</ds:Transforms>';
            SignedInfo += '\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
            SignedInfo += '</ds:DigestMethod>';
            SignedInfo += '\n<ds:DigestValue>';

                //HASH O DIGEST DE TODO EL ARCHIVO XML IDENTIFICADO POR EL id="comprobante" 
                SignedInfo += sha1_comprobante;

            SignedInfo += '</ds:DigestValue>';
        SignedInfo += '\n</ds:Reference>';
    SignedInfo += '\n</ds:SignedInfo>';

    SignedInfo_para_firma = SignedInfo.replace('<ds:SignedInfo', '<ds:SignedInfo ' + xmlns);

    var md = forge.md.sha1.create();
    md.update(SignedInfo_para_firma, 'utf8');

    var signature = btoa(key.sign(md)).match(/.{1,76}/g).join("\n");


    var xades_bes = '';

    //INICIO DE LA FIRMA DIGITAL 
    xades_bes += '<ds:Signature ' + xmlns + ' Id="Signature' + Signature_number + '">';
        xades_bes += '\n' + SignedInfo;

        xades_bes += '\n<ds:SignatureValue Id="SignatureValue' + SignatureValue_number + '">\n';

            //VALOR DE LA FIRMA (ENCRIPTADO CON LA LLAVE PRIVADA DEL CERTIFICADO DIGITAL) 
            xades_bes += signature;

        xades_bes += '\n</ds:SignatureValue>';

        xades_bes += '\n' + KeyInfo;

        xades_bes += '\n<ds:Object Id="Signature' + Signature_number + '-Object' + Object_number + '">';
            xades_bes += '<etsi:QualifyingProperties Target="#Signature' + Signature_number + '">';

                //ELEMENTO <etsi:SignedProperties>';
                xades_bes += SignedProperties;

            xades_bes += '</etsi:QualifyingProperties>';
        xades_bes += '</ds:Object>';
    xades_bes += '</ds:Signature>';

    //FIN DE LA FIRMA DIGITAL 

    return  comprobante.replace(/(<[^<]+)$/, xades_bes + '$1');



}
async function  recepcion()
{
    
    //var url = 'https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl'; //produccion
    var url = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl'; //pruebas
    var args = {xml: firmado};

    const client = await soap.createClientAsync(url);

    
    const result =  await client.validarComprobanteAsync(args);
    return result;
    let mensaje=null;
          if (result.RespuestaRecepcionComprobante!== null)
          {
              if (result.RespuestaRecepcionComprobante.comprobantes!== null)
              {
                  if (result.RespuestaRecepcionComprobante.comprobantes.comprobante!== null)
                  {
                      mensaje= result.RespuestaRecepcionComprobante.comprobantes.comprobante.mensajes;
                  }
                  else
                  {
                      mensaje= result.RespuestaRecepcionComprobante.comprobantes;
                  }
              }
              else
              {
                mensaje= result.RespuestaRecepcionComprobante;
              }
          }
          let respuestaJson= {
            status:200,
            message:'mensaje'
          };
          console.log(respuestaJson)
          return respuestaJson;

    
    /*soap.createClient(url, async function(err, client) {
      client.validarComprobante(args, async  function(err, result) {
          if (err)
          {
              console.log(err)
              return {
                  status:404,
                  message:err.message
              }
          }
          
      });
    });
    */
}
async function autorizar(claveAcceso)
{


    //var url = 'https://cel.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl'; //produccion
    var url = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl'; //pruebas
    var args = {claveAccesoComprobante: claveAcceso};


    const client =  await soap.createClientAsync(url);
    const result = await client.autorizacionComprobanteAsync(args);
    return result;
    /*
    soap.createClient(url, function(err, client) {
      client.autorizacionComprobante(args, function(err, result) {
          //console.log(result.RespuestaAutorizacionComprobante);
          console.log(result.RespuestaAutorizacionComprobante.autorizaciones.autorizacion);
      });
     });
     */
}
function sha1_base64(txt) {
    var md = forge.md.sha1.create();
    md.update(txt);
    //console.log('Buffer in: ', Buffer);
    //return new Buffer(md.digest().toHex(), 'hex').toString('base64');
    return Buffer.from(md.digest().toHex(),'hex').toString('base64')
}
function hexToBase64(str) {
    var hex = ('00' + str).slice(0 - str.length - str.length % 2);
    
    return btoa(String.fromCharCode.apply(null,
        hex.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}
function bigint2base64(bigint){
    var base64 = '';
    base64 = btoa(bigint.toString(16).match(/\w{2}/g).map(function(a){return String.fromCharCode(parseInt(a, 16));} ).join(""));
    base64 = base64.match(/.{1,76}/g).join("\n");
    return base64;
}
function p_obtener_aleatorio() {
    return Math.floor(Math.random() * 999000) + 990;    
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function p_obtener_secuencial(tipo_comprobante) {
    
    numfac = secuenciaDocumento;
    tipo_comprobante = tipo_comprobante || 0;
    
    var secuencial = {
        0:numfac,
        1:numfac,
        4:numfac,
        5:numfac,
        6:numfac,
        7:numfac
    };
    return secuencial[tipo_comprobante]++;
};
function p_obtener_codigo_autorizacion(fechaEmision, tipoComprobante, ruc, ambiente, estab, ptoEmi, secuencial, codigo, tipoEmision) {
    fechaEmision = fechaEmision || new Date();
    tipoComprobante = tipoComprobante || 'factura'; //1 factura, 4 nota de crédito, 5 nota de débito, 6 guía de remisión, 7 retención
    ruc = ruc || '9999999999999';
    ambiente = ambiente || 1; // 1 pruebas, 2 produccion
    
    //serie = serie || 0;
    estab = estab || 1;
    ptoEmi = ptoEmi || 1;
    
    
    secuencial = secuencial || p_obtener_secuencial(tipoComprobante);
    codigo = codigo ||  (moment(fechaEmision).format('DDMM') + pad(secuencial, 4).slice(-3) + p_calcular_digito_modulo11(moment(fechaEmision).format('DDMM') + pad(secuencial, 3).slice(-3)));
    tipoEmision = tipoEmision ||  1; //1 emision normal
    
    var codigo_autorizacion = moment(fechaEmision).format('DDMMYYYY') 
                + pad(codDoc[tipoComprobante], 2) 
                + pad(ruc, 13) 
                + pad(ambiente, 1)
                + pad(estab, 3) + pad(ptoEmi, 3)
                + pad(secuencial, 9)
                + pad(codigo, 8)
                + pad(tipoEmision, 1);
                
    var digito_calculado = p_calcular_digito_modulo11(codigo_autorizacion);
    
    if (digito_calculado > -1) {
        return codigo_autorizacion + digito_calculado;
    }
}
function p_calcular_digito_modulo11(numero) {
    var digito_calculado = -1;
    
    if (typeof(numero) == 'string' && /^\d+$/.test(numero)) {
        
        var digitos = numero.split('').map(Number); //arreglo con los dígitos del número

        digito_calculado = 11 - digitos.reduce(function(valorPrevio, valorActual, indice) {
            return valorPrevio + (valorActual * (7 - indice % 6));
        }, 0) % 11;
        
        digito_calculado = (digito_calculado == 11) ? 0 : digito_calculado; //según ficha técnica
        digito_calculado = (digito_calculado == 10) ? 1 : digito_calculado; //según ficha técnica
    }
    return digito_calculado;
}
function p_obtener_codigo_autorizacion_desde_comprobante(comprobante) {
    var tipoComprobante = Object.keys(comprobante)[0];
    
    var codigoAutorizacion = p_obtener_codigo_autorizacion(
        moment(comprobante[tipoComprobante].infoFactura.fechaEmision, 'DD/MM/YYYY'), //fechaEmision
        tipoComprobante,//tipoComprobante
        comprobante[tipoComprobante].infoTributaria.ruc,//ruc
        comprobante[tipoComprobante].infoTributaria.ambiente,//ambiente
        comprobante[tipoComprobante].infoTributaria.estab,//estab
        comprobante[tipoComprobante].infoTributaria.ptoEmi,//ptoEmi
        comprobante[tipoComprobante].infoTributaria.secuencial,//secuencial
        null,//codigo
        comprobante[tipoComprobante].infoTributaria.tipoEmision//tipoEmision
        );
    
    return codigoAutorizacion;
}

module.exports = {
    generar: generarFacturaElectronica,
    autorizar: autorizar,
    generarReporte: generarReporte
}

