import NavBar from '../components/NavBar.js'
import CompanyEditData from '../components/CompanyEditData.js';
import CompanyEditInfo from '../components/CompanyEditInfo.js';
import PasswordChange from '../components/PasswordChange.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from './AuthContext.js'

const CompanyProfile = () => {
  const { username } = useAuth();
  const [Edit1, setEdit1] = useState(false);
  const [Edit2, setEdit2] = useState(false);
  const [EditPass, setEditPass] = useState(false);
  const [prevtext,setprevtext] = useState('');
  const [heading, setheading] = useState('');
  const { callingusername } = useParams();
  const [companyInfo,setcompanyInfo] = useState({
    name: '',
    email: '',
    contact: '',
    linkedin: '',
    website: '',
    locations: [],
    logo: '',
    vision: '',
    mission: '',
    environment:''
  });

  const getdata = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/companydata/${callingusername}`);
      let data = await responce.json();
      if (data.logo === '')
      {
        data.logo = require(`../Images/temp_profile.png`);
      }
      // data.logo = img;
      await setcompanyInfo(data)
    } catch (err){
        console.error(err.message);
    }
  }
  
  useEffect(() => {
    getdata();
  });

  const handleEditInfo = (e) => {
    e.preventDefault();
    setEdit2(!Edit2);
  }
  const handleEditText = (e,heading) => {
    e.preventDefault();
    setheading(heading);
    if (heading === 'vision')
    {
      setprevtext(companyInfo.vision);
    }
    else if (heading === 'mission')
    {
      setprevtext(companyInfo.mission);
    }
    else
    {
      setprevtext(companyInfo.environment);
    }
    setEdit1(!Edit1);
  }

  const handleEditPass = (e) => {
    e.preventDefault(e);
    setEditPass(!EditPass);
  }

  return (
    <>
      <NavBar />
      <div style={styles.body}>
        {/* Section 1: Basic Info */}
        <div style={styles.section}>
          <div style={styles.contactInfo}>
            <div>
              <h2>{companyInfo.name}</h2>
              <p style={{margin : '0px'}}>Email: {companyInfo.email}</p>
              <p style={{margin : '0px'}}>Contact: {companyInfo.contact}</p>
              <p style={{margin : '0px'}}>LinkedIn: <a href = {`${companyInfo.linkedin}`}>{companyInfo.linkedin}</a></p>
              <p style={{margin : '0px'}}>Website: <a href = {`${companyInfo.website}`}>{companyInfo.website}</a></p>
              {companyInfo.locations.length < 2 ? 
                (
                  companyInfo.locations.length === 0 ?
                    (<p style={{margin : '0px'}}>Location: None</p>)
                    :
                    (<p style={{margin : '0px'}}>Location: {companyInfo.locations[0].city + ',' + companyInfo.locations[0].country}</p>)
                  
                ):
                (
                  <>
                    <p style={{margin : '0px'}}> Locations</p> 
                    {companyInfo.locations.map(l => <p style={{margin : '0px'}}>{l.city + ',' + l.country}</p>)}
                  </>
                )
              }
            </div>
            <div style={styles.logoContainer}>
              <img src={companyInfo.logo} alt="Company Logo" style={styles.logo} />
            </div>
          </div>
          { callingusername === username && (
            <div style={styles.butt_div}>
              <button style={styles.button_in} onClick={(e) => {handleEditPass(e)}}>Change Password</button>
              <button style={styles.button_in} onClick={(e) => {handleEditInfo(e)}}>Edit</button>
            </div>
          )}
        </div>

        {/* Section 2: Vision */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Vision</h2>
          <p style={styles.paragraph}>{companyInfo.vision}</p>
          { callingusername === username && (
            <button style={styles.button} onClick={(e) => {handleEditText(e,'vision')}}>Edit</button>
          )}
        </div>

        {/* Section 3: Mission */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Mission</h2>
          <p style={styles.paragraph}>{companyInfo.mission}</p>
          { callingusername === username && (
            <button style={styles.button} onClick={(e) => {handleEditText(e,'mission')}}>Edit</button>
          )}
        </div>

        {/* Section 4: Environment */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Environment</h2>
          <p style={styles.paragraph}>{companyInfo.environment}</p>
          { callingusername === username && (
            <button style={styles.button} onClick={(e) => {handleEditText(e,'environment')}}>Edit</button>
          )}
        </div>
      </div>
      { Edit1 === true && 
        <CompanyEditData
          heading = {heading}
          prevtext = {prevtext}
          username = {callingusername}
          setEdit1 = {setEdit1}
        />
      }
      { Edit2 === true && 
        <CompanyEditInfo
          preInfo = {companyInfo}
          username = {callingusername}
          setEdit2 = {setEdit2}
        />
      }
      { EditPass === true &&
        <PasswordChange
          setEditPass = {setEditPass}
        />
      }
    </>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    marginTop: '170px', // Adjusted marginTop
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
};

export default CompanyProfile;