

import React, { useState } from 'react';
const PersonalDetails = ({ formData, setFormData, nextPage }) => {
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, profilePicture: file }));
    };

    const renderProfilePicture = () => {
        if (formData.profilePicture) {
            const imageUrl = URL.createObjectURL(formData.profilePicture);
            return <img className="pic" src={imageUrl} alt="Profile" />;
        }
        return null;
    };

    const validateFields = () => {
        const newErrors = {};


        const requiredFields = ['name', 'username', 'password', 'email', 'contact', 'linkedin', 'city', 'state', 'country', 'profilePicture'];
        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required.';
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleNextClick = () => {
        if (validateFields()) {
            nextPage();
            console.log(formData)
        }

    };

    return (
        <div>
            <h2>Personal Details</h2>
            <form>

                <div className="form-group">
                    <label htmlFor="name">
                        Name <span className="required">*</span>:
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="username">
                        Username <span className="required">*</span>:
                    </label>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password <span className="required">*</span>:
                    </label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">
                        Email <span className="required">*</span>:
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="contact">
                        Contact <span className="required">*</span>:
                    </label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleInputChange} required />
                    {errors.contact && <p className="error">{errors.contact}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="linkedin">
                        LinkedIn <span className="required">*</span>:
                    </label>
                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} required />
                    {errors.linkedin && <p className="error">{errors.linkedin}</p>}
                </div>

                <div className="form-group location-fields">
                    <label htmlFor="city">
                        City <span className="required">*</span>:
                    </label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                    {errors.city && <p className="error">{errors.city}</p>}
                </div>

                <div className="form-group location-fields">
                    <label htmlFor="state">
                        State <span className="required">*</span>:
                    </label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>

                <div className="form-group location-fields">
                    <label htmlFor="country">
                        Country <span className="required">*</span>:
                    </label>
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>


                <div className="form-group">
                    <label htmlFor="profilePicture">
                        Profile Picture <span className="required">*</span>:
                    </label>
                    <input type="file" name="profilePicture" accept="image/png" onChange={handleFileChange} required />
                    {errors.profilePicture && <p className="error">{errors.profilePicture}</p>}
                    {renderProfilePicture()}
                </div>


                <button type="button" onClick={handleNextClick}>
                    Next
                </button>
            </form>

            <style>
                {`
                    .pic {
                        width: 100px;
                        max-height: 100px;
                        overflow: hidden;
                        margin-top: 10px;
                        object-fit: cover;
                    }
                    /* Add any additional styles here */
                `}
            </style>

        </div>
    );
};

export default PersonalDetails;