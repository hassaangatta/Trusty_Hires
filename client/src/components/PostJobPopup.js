import { useState } from "react";
import { Link } from "react-router-dom";

const PostJobPopup = ({ isPopupOpen, handleDivClick, job, handleEdit, handleDelete }) => {
  return (
    <div>
        {isPopupOpen && (
            <div style={styles.popup} onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
                <div style={styles.btn_div} className="close-btn">
                    <button style={styles.close} onClick={(e) => handleDivClick(e)}>X</button>
                </div>
                <h3>{job.title}</h3>
                <p>Location: {job.location}</p>
                <p>Job Type: {job.type}</p>
                <p style={{ overflowWrap: 'break-word' }} >Job Decription: {job.description}</p>
                <p>Minimum Education: {job.mineducation}</p>
                <p>Minimum Work Experience: {job.workexperience} years</p>
                <p>Salary: {job.salary}</p>
                <p>Required Skills: {job.requiredSkills.map((item, index) => (
                    <span key={index}>
                        {item.name}
                        {index < job.requiredSkills.length - 1 && ', '}
                    </span>
                ))}</p>
                <div style={styles.btn_div_edit_delete}>
                    <button style={styles.btn} onClick={(e) => {handleDivClick(e); handleEdit(e)}}>Edit</button>
                    <button style={styles.btn} onClick={(e) => {handleDivClick(e); handleDelete(e)}}>Delete</button>
                </div>
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
    btn_div_edit_delete: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    btn: {
        padding: '10px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        display: 'block',
        borderColor: 'black',
    }
}


export default PostJobPopup
