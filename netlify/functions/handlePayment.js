const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Parse dei parametri GET
  const {
    data, orario, messaggio, cognome, divisa, scadenza_pan, importo, languageId,
    session_id, nazionalita, nome, regione, codTrans, codAut, esito, BRAND,
    tipoProdotto, alias, pan, email
  } = event.queryStringParameters;

  // Setup del transporter per nodemailer, sostituisci con i tuoi dati di configurazione
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'francesco.marra84@gmail.com',
      pass: 'vcbo pnkg kycd qhtd'
    }
  });

  
// Reindirizzamento basato sull'esito
const redirectUrl = esito === 'OK' ? 'http://www.grip.unina.it/s3p2024/ok.html' : 'http://www.grip.unina.it/s3p2024/ko.html';
 
  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl
    }
  };
};
