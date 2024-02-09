

import React, { useState, useEffect } from 'react';

const EducationForm = ({ nextPage, prevPage, educationEntries, setEducationEntries }) => {
    const [localEducationEntries, setLocalEducationEntries] = useState(educationEntries);
    const [error, setError] = useState('');

    useEffect(() => {
        setLocalEducationEntries(educationEntries);
    }, [educationEntries]);

    const isEntryComplete = (entry) => {
        return entry.degree && entry.field && entry.school && entry.startDate && entry.endDate;
    };

    const validateEntries = () => {
        const hasAtLeastOneCompleteEntry = localEducationEntries.some((entry) => isEntryComplete(entry));

        if (!hasAtLeastOneCompleteEntry) {
            setError('Please fill at least one education entry completely before proceeding.');
            return false;
        }

        setError('');
        return true;
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedEntries = [...localEducationEntries];
        updatedEntries[index] = { ...updatedEntries[index], [fieldName]: value };
        setLocalEducationEntries(updatedEntries);
    };

    const addEducationEntry = () => {
        if (validateEntries()) {
            setLocalEducationEntries([...localEducationEntries, { degree: '', field: '', school: '', startDate: '', endDate: '' }]);
        }
    };

    const removeEducationEntry = (index) => {
        const updatedEntries = [...localEducationEntries];
        updatedEntries.splice(index, 1);
        setLocalEducationEntries(updatedEntries);
    };

    return (
        <div>
            <h2>Education</h2>

            {localEducationEntries.map((entry, index) => (
                <form key={index}>
                    <label>Degree:</label>
                    <select
                        name={`degree-${index}`}
                        value={entry.degree}
                        onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                    >
                        <option value="">Select Degree</option>
                        <option value="Matric/O Level">Matric / O Level</option>
                        <option value="Inter/A Level">Inter / A Level</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD/MPhil">PhD / MPhil</option>
                    </select>

                    <label>Field:</label>
                    <input
                        type="text"
                        name={`field-${index}`}
                        value={entry.field}
                        onChange={(e) => handleInputChange(index, 'field', e.target.value)}
                    />

                    <label>School:</label>
                    <input
                        type="text"
                        name={`school-${index}`}
                        value={entry.school}
                        onChange={(e) => handleInputChange(index, 'school', e.target.value)}
                    />

                    <label>Start Date:</label>
                    <input
                        type="date"
                        name={`startDate-${index}`}
                        value={entry.startDate}
                        onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                    />

                    <label>End Date:</label>
                    <input
                        type="date"
                        name={`endDate-${index}`}
                        value={entry.endDate}
                        onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                    />

                    <div className="add-remove-buttons">
                        {index === localEducationEntries.length - 1 ? (
                            <button type="button" onClick={addEducationEntry}>
                                Add
                            </button>
                        ) : (
                            <button type="button" onClick={() => removeEducationEntry(index)}>
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
                <button type="button" onClick={() => { if (validateEntries()) { setEducationEntries(localEducationEntries); nextPage() } }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EducationForm;
