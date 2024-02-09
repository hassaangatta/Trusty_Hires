import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar.js'

const SelectedCandidates = ({username}) => {
  
  const [selectedCandidates,setselectedCandidates] = useState(['']);
  const getlist = async () => {
    try {
      const responce = await fetch(`http://localhost:5000/selectedcandidates/${username}`);
      let candidates = await responce.json();
      for (let i=0; i<candidates.length; i++)
      {
        candidates[i].unique_id = i+1;
        candidates[i].pic = require(`../Images/${candidates[i].id}.png`)
      }
      // console.log(candidates)
      await setselectedCandidates(candidates)
    } catch (err){
        console.error(err.message);
    }
  }
  useEffect(() => {
    getlist();
  });
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentData = selectedCandidates.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = pageNumber => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, Math.ceil(selectedCandidates.length / itemsPerPage))));
  };
  
  return (
    <div>
      <NavBar/>
      <h1 style={styles.title}>Selected Candidates</h1>
      {currentData.map(candidate => (
        <ApplicantCard key={candidate.unique_id} candidate={candidate} />
      ))}

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={selectedCandidates.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

const ApplicantCard = ({ candidate }) => {
  return (
    <div style={styles.jobCard}>
      {/* Logo Image */}
      <img src={candidate.pic} alt="Candidate Profile" style={styles.logo} />

      <div style={styles.jobDetails}>
        <h3>{candidate.name}</h3>
        <p>email: {candidate.email}</p>
        <p>Location: {candidate.location}</p>
        <p>Job Title: {candidate.title}</p>
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
    marginTop: '120px',
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

export default SelectedCandidates