import { useEffect, useState } from "react";
import { getMessages, addMessage } from "./api";
import "./App.css";

function App() {
  // Estado que guarda la lista de mensajes obtenidos del backend
  const [messages, setMessages] = useState([]);

  // Estado para el campo "Nombre"
  const [name, setName] = useState("");

  // Estado para el campo "Mensaje"
  const [message, setMessage] = useState("");

  // Se ejecuta una sola vez cuando el componente se monta
  // Carga los mensajes existentes desde la API
  useEffect(() => {
    loadMessages();
  }, []);

  // Función que hace GET a la API y actualiza el estado
  async function loadMessages() {
    const data = await getMessages();
    setMessages(data);
  }

  // Maneja el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Validación básica: no permitir campos vacíos
    if (!name || !message) return;

    // Envía el nuevo mensaje al backend (POST)
    await addMessage(name, message);

    // Limpia los inputs después de enviar
    setName("");
    setMessage("");

    // Vuelve a cargar los mensajes actualizados
    loadMessages();
  }

  return (
    <div className="container">
      <h1>Mini Guestbook</h1>

      {/* Formulario controlado por React */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={name} // Valor controlado por el estado
          onChange={(e) => setName(e.target.value)} // Actualiza el estado
        />

        <textarea
          placeholder="Mensaje"
          value={message} // Valor controlado por el estado
          onChange={(e) => setMessage(e.target.value)} // Actualiza el estado
        />

        <button type="submit">Enviar</button>
      </form>

      {/* Renderizado dinámico de los mensajes */}
      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            <strong>{m.name}:</strong> {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

