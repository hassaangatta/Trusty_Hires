import NavBar from '../components/NavBar.js'
import PostedJobs from '../components/PostedJobs.js'

const CompanyMainPage = ({ logedin,userMode,username }) => {
  return (
    <div className="main">
      <NavBar/>
      <PostedJobs username={username}/>
    </div>
  )
}

export default CompanyMainPage
