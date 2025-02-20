const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let clients = [
    { 
        id: 1, 
        first_name: "Juan Ignacio", 
        last_name: "Diaz", 
        email: "juanignaciodiazdev@gmail.com", 
        gender: "Male", 
        image: "https://robohash.org/juanignaciodiaz.png?size=50x50&set=set1" 
    },
    { 
        id: 2, 
        first_name: "Guy", 
        last_name: "Jirieck", 
        email: "gjirieck0@over-blog.com", 
        gender: "Male", 
        image: "https://robohash.org/enimautculpa.png?size=50x50&set=set1" 
    },
    { 
        id: 3, 
        first_name: "Michel", 
        last_name: "Yakubov", 
        email: "myakubov1@facebook.com", 
        gender: "Male", 
        image: "https://robohash.org/similiqueipsameaque.png?size=50x50&set=set1" 
    },
    { 
        id: 4, 
        first_name: "Rafaelia", 
        last_name: "Limpkin", 
        email: "rlimpkin2@elpais.com", 
        gender: "Female", 
        image: "https://robohash.org/aliquidquasiassumenda.png?size=50x50&set=set1" 
    }
];

//^ ------------------------------ validations -----------------------------
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidGender = (gender) => {
    return ["Male", "Female", "Other"].includes(gender);
};
//^ --------------------------------------------------------------------------

app.get("/clients", (req, res) => {
    res.json(clients);
});

app.get("/clients/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const client = clients.find(c => c.id === id);
    client ? res.json(client) : res.status(404).json({ error: "Client not found." });
});

app.post("/clients", (req, res) => {
    const { first_name, last_name, email, gender, image } = req.body;
    if (!first_name || !last_name || !email || !gender || !image) {
        return res.status(400).json({ error: "All fields are required." });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }
    if (!isValidGender(gender)) {
        return res.status(400).json({ error: "Please enter a value between Male, Female or Other." });
    }

    const newClient = {
        id: clients.length ? clients[clients.length - 1].id + 1 : 1,
        first_name,
        last_name,
        email,
        gender,
        image
    };
    clients.push(newClient);
    res.status(201).json(newClient);
});

app.delete("/clients/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID must be a number." });

    const clientIndex = clients.findIndex(c => c.id === id);
    if (clientIndex === -1) {
        return res.status(404).json({ error: "Client not found." });
    }
    
    clients.splice(clientIndex, 1);
    res.json({ message: "Client deleted succesfully." });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
