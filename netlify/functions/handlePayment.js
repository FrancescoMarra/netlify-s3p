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
      user: process.env.USER_MAIL,
      pass: process.env.USER_PW
    }
  });
  // Setup delle opzioni email
  let mailOptions = {
    from: 's3p2024capri@gmail.com',
    to: 'francesco.marra@unina.it',
    subject: 'Risultato Pagamento',
    text: `Dettagli del pagamento:
Data: ${data}
Orario: ${orario}
Messaggio: ${messaggio}
Cognome: ${cognome}
Nome : ${nome}
Esito: ${esito}
Importo: ${importo}
CodTrans: ${codTrans}
codAut: ${codAut}
`
   
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

if (esito !== 'ANNULLO') {
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
}
  
// Reindirizzamento basato sull'esito
const redirectUrl = esito === 'OK' ? 'http://www.grip.unina.it/s3p2024/ok.html' : 'http://www.grip.unina.it/s3p2024/ko.html';
 
  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl
    }
  };
};
