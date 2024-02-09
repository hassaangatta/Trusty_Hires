import NavBar from '../components/NavBar.js'
import React, { useState, useEffect } from 'react';

const AppliedJobs = ({username}) => {

  const [allAppliedJobsData,setallAppliedJobsData] = useState(['']);
  const getlist = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/appliedjobs/${username}`);
      let jobs = await responce.json();
      // console.log(jobs)
      setallAppliedJobsData(jobs)
    } catch (err){
        console.error(err.message);
    }
  }
  useEffect(() => {
    getlist();
  });
  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentAppliedJobsData = allAppliedJobsData.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = pageNumber => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, Math.ceil(allAppliedJobsData.length / itemsPerPage))));
  };

  return (
    <div>
      <NavBar/>
      <h1 style={styles.title}>Applied Jobs</h1>
      {currentAppliedJobsData.map(job => (
        <JobCard key={job.id} job={job} />
      ))}

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={allAppliedJobsData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const JobCard = ({ job }) => {
  return (
    <div style={styles.jobCard}>
      {/* Logo Image */}
      <img src={job.logo} alt="Company Logo" style={styles.logo} />

      <div style={styles.jobDetails}>
        <h3>{job.title}</h3>
        <p>Company: {job.company}</p>
        <p>Location: {job.location}</p>
        <p>Type: {job.type}</p>
        <p>Status: {job.status}</p>
      </div>
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav style={styles.pagination}>
      <ul>
        {currentPage > 1 && (
          <li style={styles.pageItem}>
            <a onClick={() => paginate(currentPage - 1)} href="#!">
              Previous
            </a>
          </li>
        )}
        {currentPage < totalPages && (
          <li style={styles.pageItem}>
            <a onClick={() => paginate(currentPage + 1)} href="#!">
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  title: {
    marginTop: '100px',
    textAlign: 'center',
  },
  jobCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    textAlign: 'left',
    position: 'relative', // Make the position relative for absolute positioning of the logo
    maxWidth: '400px', // Limit the width
    margin: '0 auto', // Center the block
  },
  logo: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '50px', // Adjust the width as needed
    height: '50px', // Adjust the height as needed
    borderRadius: '40px',
  },
  jobDetails: {
    marginLeft: '60px', // Adjust the margin as needed
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
  },
  pageItem: {
    marginRight: '5px',
    cursor: 'pointer',
    display: 'inline-block',
  },
  activePage: {
    marginRight: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default AppliedJobs;