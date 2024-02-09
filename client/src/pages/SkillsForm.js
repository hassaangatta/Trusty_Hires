

import React, { useState, useEffect } from 'react';

const SkillsForm = ({ nextPage, prevPage, skills, setSkills, saveData }) => {
    const [localSkills, setLocalSkills] = useState(skills);
    const [error, setError] = useState('');

    useEffect(() => {
        setLocalSkills(skills);
    }, [skills]);

    const isSkillEntryComplete = (entry) => {
        return entry.name && entry.level;
    };

    const validateSkillEntries = () => {
        const hasAtLeastOneCompleteSkill = localSkills.some((entry) => isSkillEntryComplete(entry));

        if (!hasAtLeastOneCompleteSkill) {
            setError('Please fill at least one skill entry completely before proceeding.');
            return false;
        }

        setError('');
        return true;
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedSkills = [...localSkills];
        updatedSkills[index] = { ...updatedSkills[index], [fieldName]: value };
        setLocalSkills(updatedSkills);
    };

    const addSkill = () => {
        if (validateSkillEntries()) {
            setLocalSkills([...localSkills, { name: '', level: '' }]);
        }
    };

    const removeSkill = (index) => {
        const updatedSkills = [...localSkills];
        updatedSkills.splice(index, 1);
        setLocalSkills(updatedSkills);
    };

    return (
        <div>
            <h2>Skills</h2>

            {localSkills.map((skill, index) => (
                <form key={index}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name={`name-${index}`}
                        value={skill.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />

                    <label>Level:</label>
                    <input
                        type="text"
                        name={`level-${index}`}
                        value={skill.level}
                        onChange={(e) => handleInputChange(index, 'level', e.target.value)}
                    />

                    <div className="add-remove-buttons">
                        {index === localSkills.length - 1 ? (
                            <button type="button" onClick={addSkill}>
                                Add
                            </button>
                        ) : (
                            <button type="button" onClick={() => removeSkill(index)}>
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
                <button type="button" onClick={() => { if (validateSkillEntries()) { setSkills(localSkills); nextPage(); } }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SkillsForm;
