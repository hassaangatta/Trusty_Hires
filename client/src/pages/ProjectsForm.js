

import React, { useState, useEffect } from 'react';

const ProjectsForm = ({ nextPage, prevPage, projects, setProjects }) => {
    const [localProjects, setLocalProjects] = useState(projects);
    const [error, setError] = useState('');

    useEffect(() => {
        setLocalProjects(projects);
    }, [projects]);

    const isProjectEntryComplete = (entry) => {
        return entry.title && entry.link && entry.startDate && entry.endDate && entry.description;
    };

    const validateProjectEntries = () => {
        const hasAtLeastOneCompleteProject = localProjects.some((entry) => isProjectEntryComplete(entry));

        if (!hasAtLeastOneCompleteProject) {
            setError('Please fill at least one project entry completely before proceeding.');
            return false;
        }

        setError('');
        return true;
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedProjects = [...localProjects];
        updatedProjects[index] = { ...updatedProjects[index], [fieldName]: value };
        setLocalProjects(updatedProjects);
    };

    const addProject = () => {
        if (validateProjectEntries()) {
            setLocalProjects([...localProjects, { title: '', link: '', startDate: '', endDate: '', description: '' }]);
        }
    };

    const removeProject = (index) => {
        const updatedProjects = [...localProjects];
        updatedProjects.splice(index, 1);
        setLocalProjects(updatedProjects);
    };

    return (
        <div>
            <h2>Projects</h2>

            {localProjects.map((project, index) => (
                <form key={index}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name={`title-${index}`}
                        value={project.title}
                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    />

                    <label>Link:</label>
                    <input
                        type="text"
                        name={`link-${index}`}
                        value={project.link}
                        onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                    />

                    <label>Start Date:</label>
                    <input
                        type="date"
                        name={`startDate-${index}`}
                        value={project.startDate}
                        onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                    />

                    <label>End Date:</label>
                    <input
                        type="date"
                        name={`endDate-${index}`}
                        value={project.endDate}
                        onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                    />

                    <label>Description:</label>
                    <textarea
                        name={`description-${index}`}
                        value={project.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />

                    <div className="add-remove-buttons">
                        {index === localProjects.length - 1 ? (
                            <button type="button" onClick={addProject}>
                                Add
                            </button>
                        ) : (
                            <button type="button" onClick={() => removeProject(index)}>
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
                <button type="button" onClick={() => { if (validateProjectEntries()) { setProjects(localProjects); nextPage(); } }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectsForm;
