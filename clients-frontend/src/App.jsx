import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";
import ClientDetail from "./components/ClientDetail";
import { getClients, createClient, deleteClient } from "./services/clientService";

const App = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        fetchClients();
    }, []);

    const handleAddClient = async (newClient) => {
        try{
            const createdClient = await createClient(newClient);
            setClients([...clients, createdClient]);
        }catch(error){
            console.error("Error when creating client:", error);
        }
    };

    const handleDeleteClient = async (id) => {
        await deleteClient(id);
        setClients(clients.filter(client => client.id !== id));
    };

    return (
        <>
            <h1>Clients Management</h1>
            <Routes>
                <Route path="/" element={<ClientList clients={clients} onDeleteClient={handleDeleteClient} />} />
                <Route path="/create" element={<ClientForm onClientAdded={handleAddClient} />} />
                <Route path="/clients/:id" element={<ClientDetail />} />
            </Routes>
        </>
    );
};

export default App;
