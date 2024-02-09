import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js'

const Applications = () => {
  // const [jobs,setjobs] = useState()
  // const [jobData, setJobData] = useState()
  const getApplicant = async (J_id) => {
    try {
      const responce = await fetch(`http://localhost:5000/applicants/${J_id}`);
      let applicants = await responce.json();
      return applicants
    } catch (err){
        console.error(err.message);
    }
  }
  const getjobs = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/applications/it_company`);
      let job = await responce.json();
      // console.log(job)
      let appl
      for (var i = 0; i<job.length ;i++)
      {
        appl = await getApplicant(job[i].id)
        job[i].applicants = appl;
      }
      console.log(job)
      setJobData(job)
    } catch (err){
        console.error(err.message);
    }
  }

  useEffect(() => {
    getjobs();
  });
  const [jobData, setJobData] = useState([
    // {
    //   title: 'Data Scientist',
    //   applicants: [
    //     { name: 'Farhan', location: 'Karachi, Pakistan', email: 'example@gmail.com', percentage: 80 },
    //     { name: 'Hassaan', location: 'Karachi, Pakistan', email: 'example@gmail.com', percentage: 75 },
    //   ],
    // },
    // {
    //   title: 'Finance Manager',
    //   applicants: [
    //     { name: 'Farhan', location: 'Karachi, Pakistan', email: 'example@gmail.com', percentage: 90 },
    //     { name: 'Hassaan', location: 'Karachi, Pakistan', email: 'example@gmail.com', percentage: 85 },
    //   ],
    // },
    // Add more job data as needed
  ])

  const handleAccept = async(e,jobIndex, applicantIndex) => {
    e.stopPropagation();
    try {
      const response = await fetch('http://localhost:5000/applicationaccept', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jid:jobData[jobIndex].id, aid:jobData[jobIndex].applicants[applicantIndex].a_id})
      });
    } catch (error) {
      console.error('Error:', error.message);
      // setMessage('Internal Server Error');
    }
  }

  const handleReject = async(e,jobIndex, applicantIndex) => {
    e.stopPropagation();
    try {
      const response = await fetch('http://localhost:5000/applicationreject', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jid:jobData[jobIndex].id, aid:jobData[jobIndex].applicants[applicantIndex].a_id})
      });
    } catch (error) {
      console.error('Error:', error.message);
      // setMessage('Internal Server Error');
    }
  }

  return (
    <>
    <NavBar/>
    <div style={styles.container}>
      {jobData.map((job, jobIndex) => (
        <div key={jobIndex} style={styles.jobContainer}>
          <div style={styles.jobTitle}>{job.title}</div>
          {job.applicants.map((applicant, applicantIndex) => (
            <div key={applicantIndex} style={styles.applicantContainer} onClick={(e) => {e.preventDefault();console.log(jobIndex,applicantIndex);}}>
              <div style={styles.applicantName}>{applicant.fullname}</div>
              <div style={styles.applicantInfo}>
                <div>{`Location: ${applicant.location}`}</div>
                <div>{`Email: ${applicant.email}`}</div>
              </div>
              <div style={styles.applicantInfo}>
                {`Percentage: ${applicant.percentage}%`}
              </div>
              <div style={styles.buttonsContainer}>
                <button style={styles.acceptButton} onClick={(e) => handleAccept(e,jobIndex, applicantIndex)}>Accept</button>
                <button style={styles.rejectButton} onClick={(e) => handleReject(e,jobIndex, applicantIndex)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px',
  },
  jobTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  jobContainer: {
    marginBottom: '20px',
    padding: '10px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  applicantContainer: {
    marginBottom: '10px',
    padding: '10px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border:'1px black solid',
    cursor:'pointer'
  },
  applicantName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  applicantInfo: {
    fontSize: '14px',
    margin: '5px 0',
  },
  buttonsContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
  },
}

export default Applications;



// import React, { useState } from 'react'
// const Applications = () => {
// const [image, setImage ] = useState("");
// const [ url, setUrl ] = useState("");
// const uploadImage = () => {
// const data = new FormData()
// data.append("file", image)
// data.append("upload_preset", "trustyhires")
// data.append("cloud_name","dnxl2t6br")
// fetch("  https://api.cloudinary.com/v1_1/dnxl2t6br/image/upload",{
// method:"post",
// body: data
// })
// .then(resp => resp.json())
// .then(data => {
// setUrl(data.url)
// console.log(data)
// })
// .catch(err => console.log(err))
// }
// const deleteImage = (e) => {
//   e.preventDefault()
//   let flag = false
//   let publicId = ''
//   let tempId = ''
//   for (var i = url.length - 1; i >= 0; i--) {
//     if (url[i] === '.'){
//       flag = true
//       continue;
//     }
//     if (url[i] === '/')
//       break;
//     if (flag)
//       tempId += url[i];
//   }
//   for (i = tempId.length - 1; i >= 0; i--) {
//       publicId += tempId[i];
//   }
//   console.log(publicId)
//   fetch(`http://localhost:5000/delete-image/${publicId}`, {
//       method: "delete",
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         console.log(data);
//         // setUrl(""); // Clear the URL after deletion
//         // setPublicId("");
//       })
//       .catch((err) => console.log(err));
//   // fetch(`https://api.cloudinary.com/v1_1/dnxl2t6br/image/destroy/${publicId}`, {
//   //   method: "post",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // })
//   //   .then((resp) => resp.json())
//   //   .then((data) => {
//   //     console.log(data);
//   //     setUrl(""); // Clear the URL after deletion
//   //     // setPublicId("");
//   //   })
//   //   .catch((err) => console.log(err));
// }
// return (
// <div>
// <div>
// <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
// <button onClick={uploadImage}>Upload</button>
// <button onClick={(e) => deleteImage(e)}>Delete</button>
// </div>
// <div>
// <h1>Uploaded image will be displayed here</h1>
// <img src={url} alt='imag'/>
// </div>
// </div>
// )
// }
// export default Applications;