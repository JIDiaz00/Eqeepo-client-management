const API_URL = "http://localhost:3000/clients";

export const getClients = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error when obtaining clients");
    return response.json();
};

export const getClientById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Cliente not found.");
    return response.json();
};

export const createClient = async (clientData) => {
    try {
        const response = await fetch("http://localhost:3000/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error when creating client");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteClient = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/clients/${id}`, {
            method: "DELETE",
        });
    
        if (!response.ok) {
            throw new Error("Error deleting client");
        }
    
        return await response.json();
    } catch (error) {
        console.error("Error deleting client:", error);
        throw error;
    }
};