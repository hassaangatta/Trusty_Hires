import { useState, useEffect,useCallback } from 'react';

const AddEditEducation = ({ education, setEditEducation, username, option }) => {
    const [Degree, setDegree] = useState(education.degree);
    const [School, setSchool] = useState(education.school);
    const [Field, setField] = useState(education.field);
    const [startDate, setstartDate] = useState(education.start_date);
    const [endDate, setendDate] = useState(education.end_date);
    const [errors, setErrors] = useState({
        degree:'',
        school:'',
        field:'',
        stdate:'',
        endate: '',
    });

    const validateForm = () => {
        const newErrors = {
          degree: Degree.trim() === '' ? 'Degree is required ' : '',
          school: School.trim() === '' ? 'School is required ' : '',
          field: Field.trim() === '' ? 'Field is required ' : '',
          stdate: startDate.trim() === '' ? 'Start Date is required ' : '',
          endate: endDate.trim() === '' ? 'End Date is required ' : '',
        };
        setErrors(newErrors);
    
        return Object.values(newErrors).every((error) => error === '');
      };


    const newEducation = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/addeducation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // console.log(response);
            setEditEducation(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const updateEducation = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/updateeducation", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // console.log(response);
            setEditEducation(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = useCallback(async(e) => {
        e.preventDefault()
        if (validateForm())
        {
            const updated = {
                aid:username,
                degree: Degree,
                school:School,
                field:Field,
                start_date:startDate,
                end_date: endDate,
            }
            setEditEducation(false);
            // console.log(updated);
            if (option === 'new')
                await newEducation(updated);
            else
                await updateEducation(updated);
        }
    },[setEditEducation, Degree, School, Field, startDate, endDate, username]);

    const handleClose = (e) => {
        e.preventDefault()
        setEditEducation(false)
    }

    return (
        <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
        <h2>Education</h2>
        
        <div style={{ marginBottom: '10px' }}>
            <div className='educationinput'>
                <select id='edu' style={styles.select} value={Degree} onChange={e => setDegree(e.target.value)}>
                    <option value="" disabled>Minimum Education</option>
                    <option value="Matric / O Level">Matric / O Level</option>
                    <option value="Inter / A Level">Inter / A Level</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                </select>
            </div>
            {errors.degree && <p style={styles.error}>{errors.degree}</p>}
            <input
                id='school'
                type="text"
                placeholder="School"
                value={School}
                onChange={(e) => setSchool(e.target.value)}
                style={styles.input}
            />
            {errors.school && <p style={styles.error}>{errors.school}</p>}
            <input
                id='field'
                type="text"
                placeholder="Field"
                value={Field}
                onChange={(e) => setField(e.target.value)}
                style={styles.input}
            />
            {errors.field && <p style={styles.error}>{errors.field}</p>}
            <input
                id='stdate'
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setstartDate(e.target.value)}
                style={styles.input}
            />
            {errors.stdate && <p style={styles.error}>{errors.stdate}</p>}
            <input
                id='endate'
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setendDate(e.target.value)}
                style={styles.input}
            />
            {errors.endate && <p style={styles.error}>{errors.endate}</p>}        
        </div>
        <div style={styles.btnDivEditDelete}>
            <button onClick={(e) => handleSubmit(e)} style={styles.btn}>
            {option === 'new' ? 'Add' : 'Save'}
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
        maxWidth: '90%',
        width:'auto',
        maxHeight: '80vh',
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
    input: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '95%',
    },
    select: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flex: '1',
        width: '100%',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
}

export default AddEditEducation;
