

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkExperienceForm = ({ formData,educationEntries,skills,awards,projects ,nextPage, prevPage, workExperiences, setWorkExperiences }) => {
    const [localWorkExperiences, setLocalWorkExperiences] = useState(workExperiences);
    const [error, setError] = useState('');
    const [url, setUrl] = useState("");

    useEffect(() => {
        setLocalWorkExperiences(workExperiences);
    }, [workExperiences]);

    const isWorkExperienceEntryComplete = (entry) => {
        return entry.jobTitle && entry.companyName && entry.startDate && entry.endDate && entry.description;
    };

    const validateWorkExperienceEntries = () => {
        const hasAtLeastOneCompleteWorkExperience = localWorkExperiences.some((entry) => isWorkExperienceEntryComplete(entry));

        if (!hasAtLeastOneCompleteWorkExperience) {
            setError('Please fill at least one work experience entry completely before proceeding.');
            return false;
        }

        setError('');
        return true;
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedWorkExperiences = [...localWorkExperiences];
        updatedWorkExperiences[index] = { ...updatedWorkExperiences[index], [fieldName]: value };
        setLocalWorkExperiences(updatedWorkExperiences);
    };

    const addWorkExperience = () => {
        if (validateWorkExperienceEntries()) {
            setLocalWorkExperiences([...localWorkExperiences, { jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }]);
        }
    };

    const removeWorkExperience = (index) => {
        const updatedWorkExperiences = [...localWorkExperiences];
        updatedWorkExperiences.splice(index, 1);
        setLocalWorkExperiences(updatedWorkExperiences);
    };

    const uploadImage = async(image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "trustyhires");
        data.append("cloud_name", "dnxl2t6br");

        await fetch("https://api.cloudinary.com/v1_1/dnxl2t6br/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                formData.url = data.url
                setUrl(data.url);
                console.log(data.url);
            })
            .catch(err => console.log(err));
    }

    const navigate = useNavigate();

    const uploadPersonalDetails = async() => {
        try {
            // console.log(username)
            const body = formData;
            console.log(body);
            const responce = await fetch("http://localhost:5000/applicantdetails", {
              method : "POST",
              headers: { "Content-Type":"application/json" } ,
              body : JSON.stringify(body)
          });
          console.log(responce);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleSubmit = async() => {
        // console.log('formData:', formData);
        if (validateWorkExperienceEntries()) {
            setWorkExperiences(localWorkExperiences);

            const profilePicture = formData.profilePicture;

            await uploadImage(profilePicture);

            // formData.url = url.url;
            // console.log(url.url);
            console.log(formData)

            await uploadPersonalDetails();

            navigate('/login');
        }
    };

    return (
        <div>
            <h2>Work Experience</h2>

            {localWorkExperiences.map((experience, index) => (
                <form key={index}>
                    <label>Job Title:</label>
                    <input
                        type="text"
                        name={`jobTitle-${index}`}
                        value={experience.jobTitle}
                        onChange={(e) => handleInputChange(index, 'jobTitle', e.target.value)}
                    />

                    <label>Company Name:</label>
                    <input
                        type="text"
                        name={`companyName-${index}`}
                        value={experience.companyName}
                        onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                    />

                    <label>Start Date:</label>
                    <input
                        type="date"
                        name={`startDate-${index}`}
                        value={experience.startDate}
                        onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                    />

                    <label>End Date:</label>
                    <input
                        type="date"
                        name={`endDate-${index}`}
                        value={experience.endDate}
                        onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                    />

                    <label>Description:</label>
                    <textarea
                        name={`description-${index}`}
                        value={experience.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />

                    <div className="add-remove-buttons">
                        {index === localWorkExperiences.length - 1 ? (
                            <button type="button" onClick={addWorkExperience}>
                                Add
                            </button>
                        ) : (
                            <button type="button" onClick={() => removeWorkExperience(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                </form>
            ))}

            {error && <p className="error">{error}</p>}

            <div className="button-container">
                <button type="button" onClick={prevPage}>
                    Back
                </button>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default WorkExperienceForm;
