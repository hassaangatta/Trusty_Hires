import { useState, useEffect,useCallback } from 'react';

const JobPostPopup = ({ inputjob, setPostPopOpen, username, incity, instate, incountry }) => {
    const [jobTitle, setJobTitle] = useState(inputjob.title);
    const [city, setcity] = useState(incity);
    const [state, setstate] = useState(instate);
    const [country, setcountry] = useState(incountry);
    const [jobType, setJobType] = useState(inputjob.type);
    const [description, setDescription] = useState(inputjob.description);
    const [education, setEducation] = useState(inputjob.minEducation);
    const [experience, setExperience] = useState(inputjob.workExperience);
    const [salaryRangeLower, setSalaryRangeLower] = useState(inputjob.Lsalary);
    const [salaryRangeUpper, setSalaryRangeUpper] = useState(inputjob.Rsalary);
    const [skills, setSkills] = useState(inputjob.requiredSkills|| ['']);
    const [errors, setErrors] = useState({
        jobTitle: '',
        city: '',
        state:'',
        country:'',
        type:'',
        education:'',
        experience:'',
        skill:'',
        salaryRange: '',
    });

    const validateForm = () => {
        let flag = 0;
        for (let i=0;i<skills.length;i++)
        {
            if (skills[i] === '')
                flag = 1;
        }
        const newErrors = {
          jobTitle: jobTitle.trim() === '' ? 'Job Title field is required ' : '',
          city: city.trim() === '' ? 'City field is required ' : '',
          state: state.trim() === '' ? 'State field is required ' : '',
          country: country.trim() === '' ? 'Country field is required ' : '',
          type: jobType.trim() === '' ? 'Job Type field is required ' : '',
          education: education.trim() === '' ? 'Education field is required ' : '',
          experience: experience === undefined ? 'Experince field is required ' : '',
          skill: flag === 1 ? 'Skill  field is required ' : '',
          salaryRange:
            salaryRangeLower === '' || salaryRangeUpper === ''
              ? 'These Fields are required'
              : salaryRangeLower > salaryRangeUpper
              ? 'Lower Salary Range cannot be greater than Upper Salary Range'
              : '',
        };
        setErrors(newErrors);
    
        return Object.values(newErrors).every((error) => error === '');
      };

    const handleSkillChange = (index, value) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);
    };

    const addSkillInput = () => {
        let flag = 0;
        for (let i=0;i<skills.length;i++)
        {
            if (skills[i] === '')
                flag = 1;
        }
        if (flag !== 1)
            setSkills([...skills, '']);
        else
            setSkills(skills);
    };

    const removeSkillInput = (index) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    };

    const newJob = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/jobpost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // console.log(response);
            setPostPopOpen(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const updateJob = async (body) => {
        try {
            const response = await fetch("http://localhost:5000/updatejob", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // console.log(response);
            setPostPopOpen(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = useCallback(async(e) => {
        e.preventDefault()
        if (validateForm())
        {
            const updated = {
                jid:inputjob.jid,
                username:username,
                title: jobTitle,
                city:city,
                state:state,
                country:country,
                type: jobType,
                description: description,
                education: education,
                experience: experience,
                minsalary:salaryRangeLower,
                maxsalary:salaryRangeUpper,
                requiredSkills: skills
            }
            setPostPopOpen(false);
            // console.log(updated);
            if (inputjob.jid === '')
                await newJob(updated);
            else
                await updateJob(updated);
        }
    },[setPostPopOpen, jobTitle, city, state, country, jobType, description, education, experience, salaryRangeLower, salaryRangeUpper, skills, username,newJob]);

    const handleClose = (e) => {
        e.preventDefault()
        setPostPopOpen(false)
    }

    return (
        <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
        <h2>Job Information</h2>
        
        <div style={{ marginBottom: '10px' }}>
            <input
                id='title'
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                style={styles.inputTitle}
            />
            {errors.jobTitle && <p style={styles.error}>{errors.jobTitle}</p>}
            <div style={styles.inputRow}>
                <input
                    id='city'
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setcity((e.target.value) === '' ? '' : (e.target.value)[0].toUpperCase()+(e.target.value).slice(1))}
                    style={styles.inputLocation}
                />
                <input
                    id='state'
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setstate((e.target.value) === '' ? '' : (e.target.value)[0].toUpperCase()+(e.target.value).slice(1))}
                    style={styles.inputLocation}
                />
                <input
                    id='country'
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setcountry((e.target.value) === '' ? '' : (e.target.value)[0].toUpperCase()+(e.target.value).slice(1))}
                    style={styles.inputLocation}
                />
            </div>
            <div style={styles.inputRow}>
                {errors.city && <p style={styles.error}>{errors.city}</p>}
                {errors.state && <p style={styles.error}>{errors.state}</p>}
                {errors.country && <p style={styles.error}>{errors.country}</p>}
            </div>
            <div style={styles.inputRow}>
                <div className='typeinput'>
                    <select id='type' style={styles.select} value={jobType} onChange={e => setJobType(e.target.value)}>
                        <option value="" disabled>Job Type</option>
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                    </select>
                </div>
                <div className='educationinput'>
                    <select id='edu' style={styles.select} value={education} onChange={e => setEducation(e.target.value)}>
                        <option value="" disabled>Minimum Education</option>
                        <option value="Matric / O Level">Matric / O Level</option>
                        <option value="Inter / A Level">Inter / A Level</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PhD">PhD</option>
                    </select>
                </div>
                <input
                    id='exp'
                    type="number"
                    placeholder="Experience (years)"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    style={styles.select}
                />
            </div>
            <div style={styles.inputRow}>
                {errors.type && <p style={styles.error}>{errors.type}</p>}
                {errors.education && <p style={styles.error}>{errors.education}</p>}
                {errors.experience && <p style={styles.error}>{errors.experience}</p>}
            </div>
            <div style={styles.salaryRange}>
                <input
                    id='LR'
                    type="number"
                    placeholder="Salary Range Lower"
                    value={salaryRangeLower}
                    onChange={(e) => setSalaryRangeLower(e.target.value)}
                    style={styles.input}
                />
                <input
                    id='UR'
                    type="number"
                    placeholder="Salary Range Upper"
                    value={salaryRangeUpper}
                    onChange={(e) => setSalaryRangeUpper(e.target.value)}
                    style={styles.input}
                />
            </div>
            {errors.salaryRange && <p style={styles.error}>{errors.salaryRange}</p>}
            {skills.map((skill, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                    <input
                    id={index}
                    type="text"
                    placeholder="Enter Required Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    style={styles.skill_inp}
                    />
                    {index > 0 && (
                    <button
                        type="button"
                        onClick={() => removeSkillInput(index)}
                        style={styles.btnSkill}
                    >
                        x
                    </button>
                    )}
                    { index == 0 && (
                        <button
                        type="button"
                        onClick={addSkillInput}
                        style={styles.btnSkill}
                        >
                            +
                        </button>
                    )}
                </div>
            ))}
            {errors.skill && <p style={styles.error}>{errors.skill}</p>}
            <textarea
                id='dec'
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
            ></textarea>        
        </div>

        <div style={styles.btnDivEditDelete}>
            <button onClick={(e) => handleSubmit(e)} style={styles.btn}>
            {inputjob.jid === '' ? 'Post' : 'Save'}
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
    btnSkill:{
        padding: '4px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        borderColor: 'black',
        fontSize:'20px',
    },
    skill_inp: {
        flex: '1', 
        marginRight: '10px', 
        padding: '8px', 
        border: '1px solid #ccc', 
        borderRadius: '4px' 
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    inputTitle: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '95%',
    },
    inputLocation: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flex : '1',
        width:'33.33%',
    },
    inputRow: {
        display: 'flex',
        marginBottom: '10px',
        width:'100%',
    },
    select: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flex: '1',
        width: '100%',
      },
    textarea: {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '95%',
        resize: 'vertical',
    },
    salaryRange: {
        display: 'flex',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
}

export default JobPostPopup;
