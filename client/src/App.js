import ApplicantMainPage from './pages/ApplicantMainPage.js'
import ApplicantProfile from './pages/ApplicantProfile.js'
import AppliedJobs from './pages/AppliedJobs.js'
import CompanyProfile from './pages/CompanyProfile.js'
import CompanyMainPage from './pages/CompanyMainPage.js'
import Applications from './pages/Applications.js'
import SelectedCandidates from './pages/SelectedCandidates.js'
import Login from './pages/Login.js'
import SignupPage from './pages/SignupPage.js'
import { AuthProvider,useAuth } from './pages/AuthContext.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const { logedin, setlogedin, username, setusername, userMode, setuserMode } = useAuth();

  return (
    <AuthProvider>
    <Router>
    <div className='App'>
      <Routes>
        <Route exact path='/login' element = {<Login 
          // username={username}
          // setusername={setusername}
        />}/>
        <Route exact path='/signup' element = {<SignupPage/>}/>
        {/* <Route exact path='/' element = {<CompanyMainPage/>}/> */}
        {/* <Route exact path='/' element = {<CompanyMainPage/>}/> */}
        {/* <Route exact path='/' element = {<CompanyMainPage/>}/> */}
        {/* <Route exact path='/' element = {<CompanyMainPage/>}/> */}
        { userMode === 'Company' ? 
          <Route exact path='/' element = {<CompanyMainPage
            logedin = {logedin}
            userMode = {userMode}
            username={username}
          />}/> :
          <Route exact path='/' element = {<ApplicantMainPage 
            logedin = {logedin}
            userMode = {userMode}
            setuserMode={setuserMode}
            setlogedin={setlogedin}
            username={username}
          />}/>
        }
        {
          userMode === 'Applicant' && 
          logedin && 
          <>
            <Route path='/applicantprofile/:callingusername' element={<ApplicantProfile username={username} />}/>
            <Route path='/appliedjobs' element={<AppliedJobs username={username} />}/>
            <Route path='/companyprofile/:callingusername' element={<CompanyProfile/>}/>
          </>
        }
        {
          userMode === 'Company' && 
          logedin && 
          <>
            <Route path='/companyprofile/:callingusername' element={<CompanyProfile/>}/>
            <Route path='/applications' element={<Applications/>}/>
            <Route path='/selectedcandidates' element={<SelectedCandidates username={username}/>}/>
            <Route path='/applicantprofile/:callingusername' element={<ApplicantProfile/>}/>
          </>
        }
      </Routes>
    </div>
    </Router>
    </AuthProvider>
  );
}
export default App;
