import { useState,useEffect } from 'react'
import NavBar from '../components/NavBar.js'
import SearchBar from '../components/SearchBar.js'
import JobList from '../components/JobList.js'

const ApplicantMainPage = ({ logedin,userMode,setuserMode,setlogedin,username }) => {
  
  const [jobList,setjobList] = useState([])
  const [jobtype,setjobtype] = useState('')
  const [minSalary,setminSalary] = useState('')
  const [maxSalary,setmaxSalary] = useState('')
  const [jobtitle,setjobtitle] = useState('')
  const [companyname,setcompanyname] = useState('')
  const [location,setlocation] = useState('')
  const [profilepic,setprofilepic] = useState(null)

  const getjobs = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/jobs/filter?title=${jobtitle}&name=${companyname}&location=${location}&type=${jobtype}&min=${minSalary}&max=${maxSalary}&id=${username}`);
      let jobs = await responce.json();
      // console.log(jobs)
      let skills
      for (var i = 0; i<jobs.length ;i++)
      {
        const responce = await fetch(`http://localhost:5000/required_skills/${jobs[i].id}`);
        skills = await responce.json();
        jobs[i].requiredSkills = skills;
      }
      console.log(jobs)
      setjobList(jobs)
    } catch (err){
        console.error(err.message);
    }
  }

  useEffect(() => {
      getjobs();
  },[jobtitle,companyname,location,jobtype,minSalary,maxSalary]);
  
  const Applicant = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/applicantProfile/${username}`);
      let pic = await responce.json();
      setprofilepic(pic)
      sessionStorage.setItem('profilePic', pic);
    } catch (err){
        console.error(err.message);
    }
  } 
  useEffect(() => {
    const storedProfilePic = sessionStorage.getItem('profilePic');
    if (storedProfilePic) {
      setprofilepic(storedProfilePic);
    } else {
      Applicant();
    }  
  },[username])

  return (
    <div className="main">
      <NavBar/>
      <SearchBar
        jobtitle={jobtitle}
        setjobtitle={setjobtitle}
        companyname={companyname}
        setcompanyname={setcompanyname}
        location={location}
        setlocation={setlocation}
        jobtype={jobtype}
        setjobtype={setjobtype}
        minSalary={minSalary}
        setminSalary={setminSalary}
        maxSalary={maxSalary}
        setmaxSalary={setmaxSalary} 
      />
      <JobList 
        logedin = {logedin}
        jobList = {jobList}
        username={username}
      />
    </div>
  )
}

export default ApplicantMainPage