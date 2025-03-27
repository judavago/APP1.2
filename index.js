import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0WkHPq01mYcLA1IpprmNs5lz1S4L1pq0",
  authDomain: "app1-e4161.firebaseapp.com",
  projectId: "app1-e4161",
  storageBucket: "app1-e4161.firebasestorage.app",
  messagingSenderId: "817539745330",
  appId: "1:817539745330:web:9400c9073f18993ba21e2b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elementos del DOM
const tituloInput = document.getElementById("titulo");
const fechaInput = document.getElementById("fecha");
const agregarBtn = document.getElementById("agregar");
const listaTareas = document.getElementById("lista-tareas");

// Cargar tareas desde Firestore
const cargarTareas = async () => {
    listaTareas.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "tareas"));
    
    querySnapshot.forEach((docSnap) => {
        const tarea = docSnap.data();
        const div = document.createElement("div");
        div.classList.add("tarea-card");
        div.innerHTML = `<strong>${tarea.titulo}</strong><br>${tarea.fecha} 
                         <button data-id="${docSnap.id}">X</button>`;
        
        listaTareas.appendChild(div);

        // Evento para eliminar tarea
        div.querySelector("button").addEventListener("click", async () => {
            await deleteDoc(doc(db, "tareas", docSnap.id));
            cargarTareas();
        });
    });
};

// Agregar tarea a Firebase
agregarBtn.addEventListener("click", async () => {
    const titulo = tituloInput.value.trim();
    const fecha = fechaInput.value;
    
    if (titulo && fecha) {
        await addDoc(collection(db, "tareas"), { titulo, fecha });
        tituloInput.value = "";
        fechaInput.value = "";
        cargarTareas();
    }
});

// Cargar tareas al iniciar
cargarTareas();
