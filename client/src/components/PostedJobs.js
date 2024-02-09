import { useEffect, useState } from "react"
import PostJobListItem from "./PostJobListItem";
import JobListPagination from "./JobListPagination";
import JobPostPopup from "./JobPostPopup";

const PostedJobs = ({ username }) => {
  const inputJob = {
      jid : '',
      title : '',
      type : '',
      description : '',
      minEducation : '',
      workExperience : '',
      Lsalary : '',
      Rsalary : '',
      requiredSkills : ['']
  }
  const [postedJobList,setpostedJobList] = useState([]);
    // {
    //   jid : 1,
    //   title : "Data Scientist",
    //   location : "",
    //   type : "Remote",
    //   description : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //   minEducation : "PhD",
    //   workExperience : 3,
    //   salary : "60,000 - 100,000",
    //   requiredSkills : ["Python","Numpy","Pandas"]
    // }
  const [postPopOpen,setPostPopOpen] = useState(false)
  const handlePost = (e) => {
    e.preventDefault()
    setPostPopOpen(!postPopOpen)
  }

  const getpostedjobs = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/postedjobs/${username}`);
      let jobs = await responce.json();
      // console.log(jobs);
      let skills
      for (var i = 0; i<jobs.length ;i++)
      {
        const responce = await fetch(`http://localhost:5000/required_skills/${jobs[i].jid}`);
        skills = await responce.json();
        jobs[i].requiredSkills = skills;
      }
      // console.log(jobs)
      setpostedJobList(jobs)
    } catch (err){
        console.error(err.message);
    }
  }
  useEffect(() => {
    getpostedjobs();
  });
  
  const [itemsPerPage,setitemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfLastJob,setindexOfLastJob] = useState(0);
  const [indexOfFirstJob,setindexOfFirstJob] = useState(1);
  const [currentAppliedJobsData,setcurrentAppliedJobsData] = useState([]);

  useEffect(() => {
      setindexOfLastJob(currentPage * itemsPerPage);
      setindexOfFirstJob(indexOfLastJob - itemsPerPage);
      setcurrentAppliedJobsData(postedJobList.slice(indexOfFirstJob, indexOfLastJob));
  },[postedJobList,itemsPerPage,currentPage,indexOfFirstJob,indexOfLastJob]);

  const paginate = pageNumber => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, Math.ceil(postedJobList.length / itemsPerPage))));
  }

  return (
    <div style={styles.main_div}>
      <button className='post-btn' style={styles.button} onClick={(e) => handlePost(e)}>+ Post</button>
      <div className='list'>
        {currentAppliedJobsData.map(job => (
          <PostJobListItem key={job.jid} job={job} username={username}/>
        ))}

        <JobListPagination
          itemsPerPage={itemsPerPage}
          totalItems={postedJobList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      { postPopOpen && 
        <>
          <JobPostPopup
            inputjob={inputJob}
            setPostPopOpen={setPostPopOpen}
            username={username}
            incity={''}
            instate={''}
            incountry={''}
          />
        </>
      }
    </div>
  )
}

const styles = {
  main_div: {
    marginTop: '180px',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center'
  },
  button: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '15px',
    cursor: 'pointer',
    marginLeft: 'auto', 
    marginRight: '17%',
    marginBottom: '10px', 
    borderColor: 'black',
  }
    // padding: '10px',
    // paddingLeft: '30px',
    // paddingRight: '30px',
    // backgroundColor: 'black',
    // color: 'white',
    // borderRadius: '15px',
    // cursor: 'pointer',
    // marginLeft: '750px', 
    // marginRight: '100px',
    // marginBottom: '10px', 
    // display: 'block',
    // borderColor: 'black',
}

export default PostedJobs
