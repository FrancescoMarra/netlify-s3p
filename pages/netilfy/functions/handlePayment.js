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
    service: 'gmail', // o altro servizio
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'francesco.marra84@gmail.com',
      pass: 'vcbo pnkg kycd qhtd'
    }
  });

  // Setup delle opzioni email
  let mailOptions = {
    from: 'francesco.marra84@gmail.com',
    to: 'francesco.marra@unina.it',
    subject: 'Risultato Pagamento',
    text: "Dettagli del pagamento:
Data: ${data}
Orario: ${orario}
Messaggio: ${messaggio}
Cognome: ${cognome}
Nome : ${nome}
Esito: ${esito}
Importo: ${importo}
Codice: ${codTrans}'
   
  };

  // Invio dell'email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email inviata con successo');
  } catch (error) {
    console.error('Errore nell\'invio email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Errore nell'invio dell'email" })
    };
  }

// Reindirizzamento basato sull'esito
const redirectUrl = esito === 'OK' ? 'http://www.grip.unina.it/s3p2024/ok.html' : 'http://www.grip.unina.it/s3p2024/ko.html';
 
  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl
    }
  }
};
