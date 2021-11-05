const dropboxV2Api = require('dropbox-v2-api');
const path = require('path');
const fs = require('fs')



const dropbox = dropboxV2Api.authenticate({
    token: 'sl.AzFYqGJdjtheczizQzjjLKYMsGaceFNchn0S4beBborirUfWWwTQU0OwMlhr0iokO_rvKbl3pZx2NijIV6TDJioFQQuahCWON7BGvnvzFu5mk8GEClDtycFLzhacJN_egCzFBty1DKOC'
});

dropbox({
    resource: 'file_requests/count'
}, (err, result, response) => {
    if (err) { return console.log('err:', err); }
    console.log(result);
});


const enlace= path.join(__dirname,"/firmado/","fir5.xml");

dropbox({
    resource: 'files/upload',
    parameters: {
        path: '/dropbox/path/to/fir5.xml'
    },
    readStream: fs.createReadStream(enlace)
}, (err, result, response) => {
    //upload completed
    if (err)
    {
        console.log(err)
    }
});