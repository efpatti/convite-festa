// Configuração do Firebase
const firebaseConfig = {
 apiKey: "AIzaSyAcbnAdJmEdV60aaYavhwgQR5s5BZadoZo",
 authDomain: "enzo-party.firebaseapp.com",
 databaseURL: "https://enzo-party-default-rtdb.firebaseio.com",
 projectId: "enzo-party",
 storageBucket: "enzo-party.firebasestorage.app",
 messagingSenderId: "750525307011",
 appId: "1:750525307011:web:aebcdb16422c37ac6723b6",
 measurementId: "G-7JJ4DDZQ3Y",
};

// Inicializa Firebase
try {
 firebase.initializeApp(firebaseConfig);
 const db = firebase.database();
 console.log("Firebase inicializado com sucesso!");
} catch (error) {
 console.error("Erro ao inicializar Firebase:", error);
}
