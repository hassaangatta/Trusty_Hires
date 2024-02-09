import PostJobPopup from "./PostJobPopup"
import JobPostPopup from "./JobPostPopup";
import { useState } from "react"

const PostJobListItem = ({ job, username }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [city,setcity] = useState('');
  const [state,setstate] = useState('');
  const [country,setcountry] = useState('');
  const [inputJob,setinputJob] = useState('');

  const handleDivClick = (e) => {
    e.preventDefault();
    // console.log(job);
    setPopupOpen(!isPopupOpen);
  }

  const getcity = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/getcity/${job.jid}`);
      let location = await responce.json();
      // console.log(location);
      setcity(location[0].city);
    } catch (err){
        console.error(err.message);
    }
  }

  const getstate = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/getstate/${job.jid}`);
      let location = await responce.json();
      // console.log(location);
      setstate(location[0].state);
    } catch (err){
        console.error(err.message);
    }
  }

  const getcountry = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/getcountry/${job.jid}`);
      let location = await responce.json();
      // console.log(location);
      setcountry(location[0].country);
    } catch (err){
        console.error(err.message);
    }
  }

  const arrObj_to_arrStr = () => {
    let arr = [];
    for (let i=0;i<job.requiredSkills.length;i++)
    {
      arr.push(job.requiredSkills[i].name);
    }
    return arr;
  }

  const handleEdit = async(e) =>{
    e.preventDefault();
    e.stopPropagation();
    let inJob;
    try{
      await getcity();
      await getstate();
      await getcountry();
      let arr = await arrObj_to_arrStr();
      let rsal,lsal;
      lsal = (job.salary).substring(0,(job.salary).indexOf('-') - 1);
      rsal = (job.salary).substring((job.salary).indexOf('-') + 2,(job.salary).length);
      inJob = {
        jid : job.jid,
        title : job.title,
        type : job.type,
        description : job.description,
        minEducation : job.mineducation,
        workExperience : job.workexperience,
        Lsalary : Number(lsal),
        Rsalary : Number(rsal),
        requiredSkills : arr
      };
    } catch (err) {
      console.error(err.message);
    }
    await setinputJob(inJob);
    await setEditPopupOpen(!isEditPopupOpen);
    console.log(inputJob);
  }
  const handleDelete = async(e) =>{
    e.preventDefault()
    e.stopPropagation()
    try {
      const response = await fetch(`http://localhost:5000/deletejob/${job.jid}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      setPopupOpen(false);
  } catch (err) {
      console.error(err.message);
  }
  }
  return (
    <div style={styles.jobCard} onClick={(e) => handleDivClick(e)}>
      <div style={styles.jobDetails}>
        <h3 style={{maxWidth:'250px'}}>{job.title}</h3>
        <p>Location: {job.location}</p>
        <p>Type: {job.type}</p>
        <div>
            <button style={styles.edit_button} onClick={(e) => handleEdit(e)}>Edit</button>
            <button style={styles.del_button} onClick={(e) => handleDelete(e)}>Delete</button>
        </div>
      </div>
      
      <PostJobPopup
        isPopupOpen = { isPopupOpen }
        handleDivClick = { handleDivClick }
        job = { job }
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
      />
      {isEditPopupOpen &&
        <JobPostPopup
          inputjob={inputJob}
          setPostPopOpen={setEditPopupOpen}
          username={username}
          incity={city}
          instate={state}
          incountry={country}
        />
      }

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
      position: 'relative', 
      maxWidth: '800px', 
      margin: '0 auto', 
      cursor: 'pointer'
    },
    jobDetails: {
        display: 'flex',
        justifyContent: 'space-between', /* Adjust as needed */
        alignItems: 'center'
    },
    edit_button: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        // marginLeft: '0px', 
        marginRight: '2px',
        // marginBottom: '10px', 
        display: 'inline-block',
        borderColor: 'black',
    },
    del_button: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        marginLeft: '2px', 
        // marginRight: '0px',
        // marginBottom: '10px', 
        display: 'inline-block',
        borderColor: 'black',
    }
}

export default PostJobListItem
