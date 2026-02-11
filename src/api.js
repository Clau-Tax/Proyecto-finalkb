const API_URL = "https://pjpva7wyue.execute-api.us-east-2.amazonaws.com/ms";

// fucion para recibir el mensaje desde ka peticion del get a un http 
export async function getMessages() {
  const res = await fetch(API_URL);
  return res.json();
}


//funcion para enviar un mensaje nuevo 
export async function addMessage(name, message) {
  const res = await fetch(API_URL, {
    method: "POST",      //metodo a utilizar 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }) // comvierte el mensaje en javascript a json 
  });
  return res.json();
}
