
import React, { useState, useEffect } from 'react';

const AwardsForm = ({ nextPage, prevPage, awards, setAwards }) => {
    const [localAwards, setLocalAwards] = useState(awards);
    const [error, setError] = useState('');

    useEffect(() => {
        setLocalAwards(awards);
    }, [awards]);

    const isAwardEntryComplete = (entry) => {
        return entry.title && entry.date && entry.issuer;
    };

    const validateAwardEntries = () => {
        const hasAtLeastOneCompleteAward = localAwards.some((entry) => isAwardEntryComplete(entry));

        if (!hasAtLeastOneCompleteAward) {
            setError('Please fill at least one award entry completely before proceeding.');
            return false;
        }

        setError('');
        return true;
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedAwards = [...localAwards];
        updatedAwards[index] = { ...updatedAwards[index], [fieldName]: value };
        setLocalAwards(updatedAwards);
    };

    const addAward = () => {
        if (validateAwardEntries()) {
            setLocalAwards([...localAwards, { title: '', date: '', issuer: '' }]);
        }
    };

    const removeAward = (index) => {
        const updatedAwards = [...localAwards];
        updatedAwards.splice(index, 1);
        setLocalAwards(updatedAwards);
    };

    return (
        <div>
            <h2>Awards</h2>

            {localAwards.map((award, index) => (
                <form key={index}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name={`title-${index}`}
                        value={award.title}
                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    />

                    <label>Date:</label>
                    <input
                        type="date"
                        name={`date-${index}`}
                        value={award.date}
                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                    />

                    <label>Issuer:</label>
                    <input
                        type="text"
                        name={`issuer-${index}`}
                        value={award.issuer}
                        onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
                    />

                    <div className="add-remove-buttons">
                        {index === localAwards.length - 1 ? (
                            <button type="button" onClick={addAward}>
                                Add
                            </button>
                        ) : (
                            <button type="button" onClick={() => removeAward(index)}>
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
                <button type="button" onClick={() => { if (validateAwardEntries()) { setAwards(localAwards); nextPage(); } }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AwardsForm;
