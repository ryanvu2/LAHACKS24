import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';  // Import axios for HTTP requests
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [selectedPic, setSelectedPic] = useState(null);
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const profilePics = [
        { value: 'url_to_image_1.jpg', label: 'Player', image: 'https://example.com/image1.jpg' },
        { value: 'url_to_image_2.jpg', label: 'Mickey', image: 'https://example.com/image2.jpg' },
        // More options...
    ];

    const formatOptionLabel = ({ image, label }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={image} alt={label} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />
            <span>{label}</span>
        </div>
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formErrors = {};

        Object.entries(formData).forEach(([key, value]) => {
            if (!value) formErrors[key] = 'This field is required';
        });

        if (!selectedPic) formErrors.selectedPic = 'Please select a profile picture.';
        if (!role) formErrors.role = 'Please select a role.';

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            const userSubmission = {
                ...formData,
                doctorsPatients: ['66240a210a2fda00fd163212'],
                profilePic: selectedPic.image,  // Use the image from the selected profile picture
                isDoctor: role === "Doctor"  // Set isDoctor true if the selected role is "Doctor"
            };

            // Post request to backend to create user
            try {
                const response = await axios.post('http://localhost:4000/api/users', userSubmission);
                console.log('User created:', response.data);
                if(role == "Doctor"){
                    console.log("sending to doctors home");
                    navigate('/doctor');
                }else{
                    navigate('/calendar');
                    console.log("sending to users home");
                }
            } catch (error) {
                console.error('Error creating user:', error.response ? error.response.data : error);
            }
        }
    };

    return (
        <div className="form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="darkHeader">Sign Up</h1>
                <input type="text" name="username" placeholder="Username" required
                       value={formData.username} onChange={handleInputChange} />
                {errors.username && <p>{errors.username}</p>}
                <input type="password" name="password" placeholder="Password" required
                       value={formData.password} onChange={handleInputChange} />
                {errors.password && <p>{errors.password}</p>}
                <input type="text" name="firstName" placeholder="First Name" required
                       value={formData.firstName} onChange={handleInputChange} />
                {errors.firstName && <p>{errors.firstName}</p>}
                <input type="text" name="lastName" placeholder="Last Name" required
                       value={formData.lastName} onChange={handleInputChange} />
                {errors.lastName && <p>{errors.lastName}</p>}
                <div className="selection-with-error">
                    <Select
                        options={profilePics}
                        value={selectedPic}
                        onChange={setSelectedPic}
                        formatOptionLabel={formatOptionLabel}
                        isSearchable={false}
                    />
                    {errors.selectedPic && <p className="error-message">{errors.selectedPic}</p>}
                </div>
                <div className="selection-with-error">
                    <div className="role-selection">
                        <button type="button" className={`role-button ${role === "Doctor" ? "active" : ""}`}
                                onClick={() => setRole("Doctor")}>Doctor</button>
                        <button type="button" className={`role-button ${role === "User" ? "active" : ""}`}
                                onClick={() => setRole("User")}>User</button>
                    </div>
                    {errors.role && <p className="error-message">{errors.role}</p>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
