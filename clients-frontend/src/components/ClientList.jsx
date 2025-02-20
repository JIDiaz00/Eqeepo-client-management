import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ClientList = ({ clients, onDeleteClient }) => {
    return (
        <div className="app-container">
            <h2>Clients List</h2>
                        <Link to="/create">
                <button className="btn">Create New Client</button>
            </Link>
            <div className="client-list">
                {clients.map((client) => (
                    <div key={client.id} className="client-card">
                        <img src={client.image} alt={client.first_name} className="client-image" />
                        <div className="client-info">
                            <strong>{client.first_name} {client.last_name}</strong>
                            <p>{client.email}</p>
                        </div>

                        <div className="client-actions">
                            <Link to={`/clients/${client.id}`} className="btn-detail">
                                View Details
                            </Link>
                            <button onClick={() => onDeleteClient(client.id)} className="btn-delete">
                                Delete client
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ClientList.propTypes = {
    clients: PropTypes.array.isRequired,
    onDeleteClient: PropTypes.func.isRequired
};

export default ClientList;
