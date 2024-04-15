exports.handler = async function(event, context) {
  // Parse dei parametri GET
  const {
    data, orario, messaggio, cognome, divisa, scadenza_pan, importo, languageId,
    session_id, nazionalita, nome, regione, codTrans, codAut, esito, BRAND,
    tipoProdotto, alias, pan, email
  } = event.queryStringParameters;


// Reindirizzamento basato sull'esito
const redirectUrl = esito === 'OK' ? 'http://www.grip.unina.it/s3p2024/ok.html' : 'http://www.grip.unina.it/s3p2024/ko.html';
 
  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl
    }
  };
};
