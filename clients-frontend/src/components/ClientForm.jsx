import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { createClient } from "../services/clientService";

const ClientForm = ({ onClientAdded }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newClient = {
            first_name: firstName,
            last_name: lastName,
            email,
            gender,
            image
        };

        try {
            const createdClient = await createClient(newClient);
            onClientAdded(createdClient);
            navigate("/");
        } catch (error) {
            console.error("Error when creating Client:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Create client</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br></br>

                <label>Last name:</label>
                <input type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required /><br></br>

                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required /><br></br>

                <label>Gender:</label>
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select><br></br>

                <label>Image URL:</label>
                <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} required /><br></br>

                <button type="submit" className="btn">Submit</button>
            </form>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>    );
};

ClientForm.propTypes = {
    onClientAdded: PropTypes.func.isRequired
};

export default ClientForm;
