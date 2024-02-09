
const SearchBar = ({ jobtitle, setjobtitle, companyname, setcompanyname, location, setlocation, jobtype, setjobtype, minSalary, setminSalary, maxSalary, setmaxSalary }) => {

  const handleSearch = (e) =>{
    e.preventDefault();
    console.log(jobtitle,companyname,location,jobtype,minSalary,maxSalary)
  }

  return (
    <div className="Search_filters">
      <form onSubmit={handleSearch}>
      <div className="search_input">
        <label htmlFor="title_search">Job Title</label>
        <input
            id = "title_search"
            type="text"
            placeholder="Job Title"
            value={ jobtitle }
            onChange={(e) => setjobtitle(e.target.value)} 
        />
        <label htmlFor="company_search">Job Title</label>
        <input
            id = "company_search"
            // autoFocus
            type="text"
            placeholder="Company Name"
            value={ companyname }
            onChange={(e) => setcompanyname(e.target.value)} 
        />
        <label htmlFor="location_search">Job Title</label>
        <input
            id = "location_search"
            // autoFocus
            type="text"
            placeholder="Location"
            value={ location }
            onChange={(e) => setlocation(e.target.value)} 
        />
      </div>  
      <div className="search_input">  
        <select 
            id = "type_search"
            value={ jobtype }
            onChange={(e) => setjobtype(e.target.value)}
        >
          <option value=''>Select Job Type</option>
          <option value='On-Site'>On-site</option>
          <option value='Remote'>Remote</option>
        </select>
        {/* <select 
            id = "salary_search"
            value={ salary }
            onChange={(e) => setsalary(e.target.value)}
        >
          <option value=''>Select Salary Range</option>
          <option value='<=50000'>less than 50,000</option>
          <option value='<=100000'>50,000 - 100,000</option>
          <option value='<=150000'>100,000 - 150,000</option>
          <option value='<=200000'>150,000 - 200,000</option>
          <option value='<=250000'>200,000 - 250,000</option>
          <option value='>=250000'>more than 250,000</option>
        </select> */}
        <div className="salary-range-input">
            <input
              id="minRange"
              type="number"
              placeholder="Min Salary"
              value={minSalary}
              onChange={(e) => setminSalary(e.target.value)}
            />
            <input
              id="maxRange"
              type="number"
              placeholder="Max Salary"
              value={maxSalary}
              onChange={(e) => setmaxSalary(e.target.value)}
            />
          </div>
      </div>
      <button id="searchButton" onClick={handleSearch}>Search</button>
      </form>
    </div>
  )
}

export default SearchBar