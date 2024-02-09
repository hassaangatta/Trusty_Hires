import JobDecriptionPopup from "./JobDecriptionPopup"
import { useState } from "react"

const JobListItem = ({ job,url,logedin,username }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDivClick = () => {
    setPopupOpen(!isPopupOpen);
  }
  return (
    <div style={styles.jobCard} onClick={(e) => handleDivClick(e)}>
      <img src = {url} alt="Company Logo" style={styles.logo} />
    
      <div style={styles.jobDetails}>
        <h3>{job.title}</h3>
        <p>Company: {job.company_name}</p>
        <p>Location: {job.location}</p>
        <p>Type: {job.job_type}</p>
      </div>
      
      <JobDecriptionPopup
        isPopupOpen = { isPopupOpen }
        handleDivClick = { handleDivClick }
        job = { job }
        logedin={ logedin }
        username={username}
      />
    </div>
  )
}

const styles = {
    jobCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      textAlign: 'left',
      position: 'relative', // Make the position relative for absolute positioning of the logo
      maxWidth: '400px', // Limit the width
      margin: '0 auto', // Center the block
      cursor: 'pointer'
    },
    logo: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '50px', // Adjust the width as needed
      height: '50px', // Adjust the height as needed
    },
    jobDetails: {
      marginLeft: '60px', // Adjust the margin as needed
    },
    popup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '2px solid black',
      zIndex: 9999,
    }
}

export default JobListItem
