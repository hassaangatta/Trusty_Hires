const JobListPagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    
    const totalPages = Math.ceil(totalItems / itemsPerPage)

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
    )
}

const styles = {
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
  }

export default JobListPagination
