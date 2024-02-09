import { useState } from "react"
import JobListPagination from "./JobListPagination"
import JobListItem from "./JobListItem"

const JobList = ({ logedin,jobList,username }) => {
  //   [
  //   {
  //     jid : 1,
  //     title : "Data Scientist",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName : "Folio",
  //     location : "",
  //     type : "Remote",
  //     description : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation : "PhD",
  //     workExperience : 3,
  //     salary : "60,000 - 100,000",
  //     requiredSkills : ["Python","Numpy","Pandas"]
  //   },
  //   {
  //     jid : 2,
  //     title : "Data Analyst",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName : "Folio",
  //     location : "Lahore",
  //     type : "Onsite",
  //     description : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation : "Masters",
  //     workExperience : 3,
  //     salary : "60,000 - 100,000",
  //     requiredSkills : ["Python","Numpy","Pandas"]
  //   },
  //   {
  //     jid : 3,
  //     title: "AI Engineer",
  //     logo_url: require("../Images/folio3.png"),
  //     companyName: "InnoTech Solutions",
  //     location: "Singapore",
  //     type: "Remote",
  //     description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation: "Master's Degree",
  //     workExperience: 4,
  //     salary: "80,000 - 120,000",
  //     requiredSkills: ["Machine Learning", "Python", "TensorFlow"]
  //   },
  //   {
  //     jid : 4,
  //     title: "Data Analyst",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName: "Data Insights Corp.",
  //     location: "New York",
  //     type: "On-site",
  //     description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation: "Bachelor's Degree",
  //     workExperience: 2,
  //     salary: "50,000 - 80,000",
  //     requiredSkills: ["SQL", "Excel", "Data Visualization"]
  //   },
  //   {
  //     jid : 5,
  //     title: "Machine Learning Engineer",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName: "Tech Innovate",
  //     location: "San Francisco",
  //     type: "Remote",
  //     description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation: "PhD",
  //     workExperience: 5,
  //     salary: "85,000 - 130,000",
  //     requiredSkills: ["Python", "Scikit-Learn", "Deep Learning"]
  //   },
  //   {
  //     jid : 6,
  //     title: "Data Engineer",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName: "Data Solutions International",
  //     location: "Berlin",
  //     type: "On-site",
  //     description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation: "Master's Degree",
  //     workExperience: 4,
  //     salary: "70,000 - 110,000",
  //     requiredSkills: ["SQL", "ETL", "Database Management"]
  //   },
  //   {
  //     jid : 7,
  //     title: "Statistical Analyst",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName: "Stats Insight",
  //     location: "Paris",
  //     type: "Remote",
  //     description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation: "Master's Degree",
  //     workExperience: 2,
  //     salary: "55,000 - 85,000",
  //     requiredSkills: ["Statistics", "R", "Data Analysis"]
  //   },
  //   {
  //     jid : 8,
  //     title: "Machine Learning Engineer",
  //     logo_url : require("../Images/folio3.png"),
  //     companyName: "Tech Innovate",
  //     location: "San Francisco",
  //     type: "Remote",
  //     description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //     minEducation: "PhD",
  //     workExperience: 5,
  //     salary: "85,000 - 130,000",
  //     requiredSkills: ["Python", "Scikit-Learn", "Deep Learning"]
  //   }
  // ]

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentAppliedJobsData = jobList.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = pageNumber => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, Math.ceil(jobList.length / itemsPerPage))));
  }

  return (
    <div>
      <h1 style={styles.title}>Jobs</h1>
      {currentAppliedJobsData.map(job => (
        console.log(),
        <JobListItem 
          key={job.id} 
          job={job} 
          url = {job.logo} 
          logedin = {logedin}
          username={username}
        />
      ))}

      <JobListPagination
        itemsPerPage={itemsPerPage}
        totalItems={jobList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

const styles = {
  title: {
    textAlign: 'center',
  },
  activePage: {
    marginRight: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}

export default JobList