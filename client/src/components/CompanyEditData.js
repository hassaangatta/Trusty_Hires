import React from 'react';
import { useState, useEffect, useCallback } from 'react'

const CompanyEditData = ({ heading,prevtext,username,setEdit1 }) => {
    const [text, settext] = useState(prevtext);
    const [errors, setErrors] = useState('');
    
    const validateForm = () => {
        const newErrors = text.trim() === '' ? 'This field is required ' : '';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const updateprofile = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/updatecompanyprofiletext", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setEdit1(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = useCallback(async(e) => {
        e.preventDefault()
        if (validateForm())
        {
            const updated = {
                username:username,
                data:text,
            }
            if (heading === 'mission')
            {
                updated.text = 'mission';
            }
            else if (heading === 'vision')
            {
                updated.text = 'vision';
            }
            else
            {
                updated.text = 'environment';
            }
            setEdit1(false);
            await updateprofile(updated);
        }
    },[text,heading,setEdit1,updateprofile,username,validateForm]);

    const handleClose = (e) => {
        e.preventDefault()
        setEdit1(false)
    }
  return (
    <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
        <h2>{heading[0].toUpperCase() + heading.slice(1)}</h2>
        
        <div style={{ marginBottom: '10px' }}>
            <textarea
                id={`${heading}`}
                placeholder={`${heading}`}
                value={text}
                onChange={(e) => settext(e.target.value)}
                style={styles.textarea}
            ></textarea>
            {errors && <p style={styles.error}>{errors}</p>}        
        </div>

        <div style={styles.btnDivEditDelete}>
            <button onClick={(e) => handleSubmit(e)} style={styles.btn}>
            Save
            </button>
            <button style={styles.btn} onClick={(e) => handleClose(e)}>
            Cancel
            </button>
        </div>
    </div>
  )
}

const styles = {
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '2px solid black',
        zIndex: 9999,
        maxWidth: '100%',
        width:'auto',
        maxHeight: '100vh',
        overflowY: 'auto',
        borderRadius: '20px',
        cursor: 'default',
    },
    btnDivEditDelete: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    btn: {
        padding: '10px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        borderColor: 'black',
    },
    textarea: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '300px',
        resize: 'both',
        height: '200px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
}


export default CompanyEditData;
