
import React, { useState } from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import AwardsForm from './AwardsForm';
import ProjectsForm from './ProjectsForm';
import WorkExperienceForm from './WorkExperienceForm';

const ApplicantSignup = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        linkedin: '',
        location: '',
        profilePicture: null,
    });

    const [educationEntries, setEducationEntries] = useState([
        {
            degree: '',
            field: '',
            school: '',
            startDate: '',
            endDate: '',
        },
    ]);

    const [skills, setSkills] = useState([
        {
            name: '',
            level: '',
        },
    ]);

    const [awards, setAwards] = useState([
        {
            title: '',
            date: '',
            issuer: '',
        },
    ]);

    const [projects, setProjects] = useState([
        {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
        },
    ]);

    const [workExperiences, setWorkExperiences] = useState([
        {
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
        },
    ]);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const updateEducationEntries = (updatedEntries) => {
        setEducationEntries(updatedEntries);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return <PersonalDetailsForm formData={formData} setFormData={setFormData} nextPage={nextPage} />;
            case 2:
                return <EducationForm educationEntries={educationEntries} setEducationEntries={updateEducationEntries} nextPage={nextPage} prevPage={prevPage} />;
            case 3:
                return <SkillsForm skills={skills} setSkills={setSkills} nextPage={nextPage} prevPage={prevPage} />;
            case 4:
                return <AwardsForm awards={awards} setAwards={setAwards} nextPage={nextPage} prevPage={prevPage} />;
            case 5:
                return <ProjectsForm projects={projects} setProjects={setProjects} nextPage={nextPage} prevPage={prevPage} />;
            case 6:
                return <WorkExperienceForm 
                formData={formData}
                educationEntries={educationEntries}
                skills={skills}
                awards={awards}
                projects={projects} 
                workExperiences={workExperiences} 
                setWorkExperiences={setWorkExperiences} nextPage={nextPage} prevPage={prevPage} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderPage()}

            <style>
                {`
                    body {
                        font-family: 'Arial', sans-serif;
                    }

                    h1,
                    h2 {
                        text-align: center;
                    }

                    form {
                        max-width: 400px;
                        margin: 0 auto;
                    }

                    label {
                        display: block;
                        margin-bottom: 5px;
                    }

                    input {
                        width: 100%;
                        padding: 8px;
                        margin-bottom: 15px;
                    }

                    .button-container {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 16px;
                    }

                    .button-container button {
                        cursor: pointer;
                        color: white;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }

                    .button-container button:hover {
                        background-color: #45a049;
                    }

                    .add-remove-buttons {
                        display: flex;
                        justify-content: space-between;
                    }

                    .add-remove-buttons button {
                        cursor: pointer;
                        margin-left: 8px;
                        color: white;
                    }

                    /* Additional styles for edit-delete-buttons */
                    .edit-delete-buttons {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 8px;
                    }

                    .edit-button,
                    .delete-button {
                        cursor: pointer;
                        margin-left: 8px;
                        color: white;
                    }

                    .signup-options {
                        display: flex;
                        justify-content: center;
                    }

                    .signup-options a {
                        margin: 0 10px;
                        padding: 10px 15px;
                        text-decoration: none;
                        color: #333;
                        border: 1px solid #333;
                        border-radius: 5px;
                    }

                    .signup-options a:hover {
                        background-color: #333;
                        color: white;
                    }

                    .error {
                        color: red;
                    }

                    .required {
                        color: red;
                    }
                `}
            </style>

        </div>
    );
};

export default ApplicantSignup;
