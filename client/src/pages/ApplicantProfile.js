import NavBar from '../components/NavBar.js'
import PasswordChange from '../components/PasswordChange.js';
import ApplicantEditInfo from '../components/ApplicantEditInfo.js';
import AddEditEducation from '../components/AddEditEducation.js';
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from './AuthContext.js'

const ApplicantProfile = () => {
    const { username } = useAuth();
    const [EditInfo, setEditInfo] = useState(false);
    const [EditEducation, setEditEducation] = useState(false);
    const [EditSkill, setEditSkill] = useState(false);
    const [EditAward, setEditAward] = useState(false);
    const [EditProject, setEditProject] = useState(false);
    const [EditWork, setEditWork] = useState(false);
    const [EditPass, setEditPass] = useState(false);
    const { callingusername } = useParams();
    const [ApplicantInfo,setApplicantInfo] = useState({
      name: '',
      email: '',
      contact: '',
      linkedin: '',
      city: '',
      state: '',
      country: '',
      profilepic: '',
    });
    const [Education,setEducation] = useState([]);
    const [Skill,setSkill] = useState([]);
    const [Award,setAward] = useState([]);
    const [Project,setProject] = useState([]);
    const [Work,setWork] = useState([]);
    const [option, setoption] = useState('');
    const [changeEdu, setchangeEdu] = useState({
      degree:'',
      field:'',
      school:'',
      start_date:'',
      end_date:'',
    });

    const getInfo = async () => {
      try {
        const responce = await fetch(`http://localhost:5000/applicantInfo/${callingusername}`);
        let data = await responce.json();
        if (data.profilepic === '')
        {
          data.profilepic = require(`../Images/temp_profile.png`);
        }
        await setApplicantInfo(data)
      } catch (err){
          console.error(err.message);
      }
    }
    
    const getEducation = async () => {
      try {
        const responce = await fetch(`http://localhost:5000/applicanteducation/${callingusername}`);
        let data = await responce.json();
        for (let i=0;i<data.length; i++)
        {
          data[i].key = i;
        }
        await setEducation(data)
      } catch (err){
          console.error(err.message);
      }
    }

    const getAward = async () => {
      try {
        const responce = await fetch(`http://localhost:5000/applicantaward/${callingusername}`);
        let data = await responce.json();
        for (let i=0;i<data.length; i++)
        {
          data[i].key = i;
        }
        await setAward(data)
      } catch (err){
          console.error(err.message);
      }
    }

    const getSkill = async () => {
      try {
        const responce = await fetch(`http://localhost:5000/applicantskill/${callingusername}`);
        let data = await responce.json();
        for (let i=0;i<data.length; i++)
        {
          data[i].key = i;
        }
        await setSkill(data)
      } catch (err){
          console.error(err.message);
      }
    }

    const getProject = async () => {
      try {
        const responce = await fetch(`http://localhost:5000/applicantproject/${callingusername}`);
        let data = await responce.json();
        for (let i=0;i<data.length; i++)
        {
          data[i].key = i;
        }
        await setProject(data)
      } catch (err){
          console.error(err.message);
      }
    }

    const getWork = async () => {
      try {
        const responce = await fetch(`http://localhost:5000/applicantwork/${callingusername}`);
        let data = await responce.json();
        for (let i=0;i<data.length; i++)
        {
          data[i].key = i;
        }
        await setWork(data)
      } catch (err){
          console.error(err.message);
      }
    }

    useEffect(() => {
      getInfo();
      getEducation();
      getAward();
      getProject();
      getSkill();
      getWork();
      // console.log('Info = ',ApplicantInfo);
      // console.log('Education = ',Education);
      // console.log('Skill = ',Skill);
      // console.log('Award = ',Award);
      // console.log('Project = ',Project);
      // console.log('Work = ',Work);
    });

    const handleEditInfo = (e) => {
      e.preventDefault();
      setEditInfo(!EditInfo);
    }

    const handleEditPass = (e) => {
      e.preventDefault(e);
      setEditPass(!EditPass);
    }

    const handleAddEducation = (e) => {
      e.preventDefault();
      setoption('new');
      setEditEducation(!EditEducation);
    }

    const handleEditEducation = (e,index) => {
      e.preventDefault();
      for (let i=0; i<Education.length; i++)
      {
        if (Education[i].key === index)
        {
          setchangeEdu(Education[i]);
        }
      }
      setoption('edit');
      setEditEducation(!EditEducation);
    }

    const handleRemoveEducation = async(e,index) => {
      e.preventDefault();
      let body = {
        aid:username,
        degree:'',
        field:'',
        school:'',
      }
      try {
            const response = await fetch(`http://localhost:5000/deleteeducation`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        // console.log(response);
        setEditEducation(false);
      } catch (err) {
        console.error(err.message);
      }
    }

    return (
      <>
        <NavBar/>
        <div style={styles.body}>
          <div style={styles.section}>
            <div style={styles.contactInfo}>
              <div>
                <h2>{ApplicantInfo.name}</h2>
                <p style={{margin : '0px'}}>Email: {ApplicantInfo.email}</p>
                <p style={{margin : '0px'}}>Contact: {ApplicantInfo.contact}</p>
                <p style={{margin : '0px'}}>LinkedIn: <a href = {`${ApplicantInfo.linkedin}`}>{ApplicantInfo.linkedin}</a></p>
                <p style={{margin : '0px'}}>Location: {ApplicantInfo.city + ',' + ApplicantInfo.country}</p>
              </div>
              <div style={styles.logoContainer}>
                <img src={ApplicantInfo.profilepic} alt="Company Logo" style={styles.logo} />
              </div>
            </div>
            { callingusername === username && (
              <div style={styles.butt_div}>
                <button style={styles.button_in} onClick={(e) => {handleEditPass(e)}}>Change Password</button>
                <button style={styles.button_in} onClick={(e) => {handleEditInfo(e)}}>Edit</button>
              </div>
            )}
          </div>
          <div style={styles.section}>
            <h2 style={styles.heading}>Education</h2>
            <button style={styles.button} onClick={(e) => handleAddEducation(e)}>Add</button>
            {Education.map((education) => (
              <div key={education.key} style={styles.educationBox}>
                <p>Degree: {education.degree}</p>
                <p>School: {education.school}</p>
                <p>Field: {education.field}</p>
                <p>Start Date: {education.start_date}</p>
                <p>End Date: {education.end_date}</p>
                <div style={styles.buttonGroup}>
                  <button style={styles.editButton} onClick={(e) => handleEditEducation(e,education.key)}>Edit</button>
                  <button style={styles.removeButton} onClick={(e) => handleRemoveEducation(e,education.key)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        { EditInfo === true && 
          <ApplicantEditInfo
            preInfo = {ApplicantInfo}
            username = {callingusername}
            setEditInfo = {setEditInfo}
          />
        }
        { EditPass === true &&
          <PasswordChange
            setEditPass = {setEditPass}
          />
        }
        { EditEducation &&
          <AddEditEducation
            education={changeEdu}
            setEditEducation={setEditEducation}
            username={username}
            option={option}
          />
        }
      </>
    )
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    marginTop: '130px', // Adjusted marginTop
    marginRight: '30px',
    marginLeft: '30px',
  },
  section: {
    marginBottom: '30px',
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    position: 'relative', // Added position relative
  },
  heading: {
    textAlign: 'center',
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logo: {
    maxWidth: '100px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    borderRadius: '15px',
    marginLeft: '95%',
  },
  butt_div:{
    display:'flex',
    marginLeft: '80%',
    justifyContent:'space-between',
  },
  button_in:{
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    borderRadius: '15px',
  },
  paragraph: {
    margin: '0',
    textAlign: 'center',
  },
  educationBox: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '20px',
    position: 'relative', // Added position relative
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  editButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '15px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '15px',
    cursor: 'pointer',
  },
};

export default ApplicantProfile