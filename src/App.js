import { useEffect, useState, useRef } from "react";
import { getMessages, addMessage, API_URL } from "./api";
import "./App.css";

function App() {
  // Estado que guarda la lista de mensajes obtenidos del backend
  const [messages, setMessages] = useState([]);

  // Estado para el campo "Nombre"
  const [name, setName] = useState("");

  // Estado para el campo "Mensaje"
  const [message, setMessage] = useState("");

  // Estado para guardar la imagen seleccionada
  const [image, setImage] = useState(null);

  // Referencia para abrir el explorador de archivos
  const fileInputRef = useRef(null);

  // Se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    loadMessages();
  }, []);

  // Función que hace GET a la API y actualiza el estado
  async function loadMessages() {
    const data = await getMessages();
    setMessages(data);
  }

  // Maneja la selección de imagen
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  // Función para poner texto en negrita
  function handleBold() {
    setMessage((prev) => `**${prev}**`);
  }

  // Función para poner texto en cursiva
  function handleItalic() {
    setMessage((prev) => `*${prev}*`);
  }

  // Maneja el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || (!message && !image)) return;

    await addMessage(name, message, image);

    setName("");
    setMessage("");
    setImage(null);

    loadMessages();
  }

  // Función para eliminar mensaje
  async function handleDelete(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    loadMessages();
  }

  // Función para editar mensaje
  async function handleEdit(id, currentMessage) {
    const newMessage = prompt("Editar mensaje:", currentMessage);

    if (!newMessage) return;

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage }),
    });

    loadMessages();
  }

  return (
    <div className="container">
      <h1>DEJA AQUÍ TU MENSAJE</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="toolbar">
          <button type="button" onClick={handleBold}>B</button>
          <button type="button" onClick={handleItalic}>I</button>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            📷
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {image && (
          <div className="image-preview">
            <img src={image} alt="preview" />
          </div>
        )}

        <textarea
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>

      <ul>
        {messages.map((m) => (
          <li key={m.id} className="message-item">
            <div className="message-header">
              <strong>{m.name}:</strong>

              <div className="message-actions">
                <span onClick={() => handleEdit(m.id, m.message)}>✏️</span>
                <span onClick={() => handleDelete(m.id)}>🗑️</span>
              </div>
            </div>

            <p>{m.message}</p>

            {m.image && <img src={m.image} alt="mensaje" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

