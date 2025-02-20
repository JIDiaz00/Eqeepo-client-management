import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById as getClient } from "../services/clientService";

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClient(id);
                setClient(data);
            } catch (err) {
                setError("Error loading client:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    if (loading) return <p>Loading client information...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="client-detail-container">
            <div className="client-card">
                <h2>Client Details</h2>
                <img src={client.image} alt={client.first_name} />
                <p><strong>Name:</strong> {client.first_name} {client.last_name}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Gender:</strong> {client.gender}</p>
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>    );
};

export default ClientDetail;
