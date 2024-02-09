import { useState } from "react";
import { Link } from "react-router-dom";

const JobDecriptionPopup = ({ isPopupOpen, handleDivClick, job, logedin,username }) => {
    const [applied,setapplied] = useState(false)

    const handleApply = async(e,id) =>{
        e.preventDefault();
        setapplied(true)
        try {
            console.log(username)
            const body = {username,id};
            // console.log(body);
            const responce = await fetch("http://localhost:5000/apply", {
              method : "POST",
              headers: { "Content-Type":"application/json" } ,
              body : JSON.stringify(body)
          });
        //   console.log(responce);
        } catch (err) {
            console.error(err.message);
        }
        // console.log(id)
    }
  return (
    <div>
        {isPopupOpen && (
            <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
                <div style={styles.btn_div} className="close-btn">
                    <button style={styles.close} onClick={(e) => handleDivClick(e)}>X</button>
                </div>
                <h3>{job.title}</h3>
                <p>Company: <Link to="/companyprofile" state={{ fromHome: { job } }}>{job.company_name}</Link></p>
                <p>Location: {job.location}</p>
                <p>Job Type: {job.job_type}</p>
                <p style={{ overflowWrap: 'break-word' }} >Job Decription: {job.description}</p>
                <p>Minimum Education: {job.min_education}</p>
                <p>Minimum Work Experience: {job.work_experience} years</p>
                <p>Salary: {job.min_salary} - {job.max_salary}</p>
                <p>Required Skills: {job.requiredSkills.map((item, index) => (
                    <span /*key={index}*/>
                        {item.name}
                        {index < job.requiredSkills.length - 1 && ', '}
                    </span>
                ))}</p>
                {logedin && 
                    <>
                        { !applied && (
                            <div>
                                <button id = "applyButton" onClick={(e) => handleApply(e,job.id)}>Apply</button>
                            </div>
                        )}
                        { applied && (
                            <div>
                                <p style={{textAlign:'center'}}>Application Sent Successfully!</p>
                                <button id = "backButton" onClick={(e) => handleDivClick(e)}>Back</button>
                            </div>
                        )}
                    </>
                }
                { !logedin &&
                    <div>
                        <p style={{textAlign:'center'}}>To Apply for or To Post a job <Link to = "/login">Login</Link></p>
                    </div>
                }
            </div>
        )}
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
        width: '400px', 
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '20px',
        cursor: 'default',
    },
    close: {
        color: 'black',
        backgroundColor: 'white',
        padding: '4px',
        cursor: 'pointer',
        border:'none',
        fontSize: 20
    },
    btn_div: {
        marginLeft:'380px',
    },
    apply: {
        padding: '10px',
        paddingLeft: '50px',
        paddingRight: '50px',
        backgroundColor: 'black', /* Add your desired button background color */
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        display: 'block',
        borderColor: 'black',
    }
}


export default JobDecriptionPopup
