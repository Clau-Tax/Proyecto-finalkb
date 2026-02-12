export const API_URL =
  "https://pjpva7wyue.execute-api.us-east-2.amazonaws.com/ms";

// función para recibir mensajes
export async function getMessages() {
  const res = await fetch(API_URL);
  return res.json();
}

// función para enviar mensaje nuevo
export async function addMessage(name, message, image) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message, image }),
  });

  return res.json();
}
