const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middleware
app.use(cors());
app.use(express.json());

app.delete('/delete/:id/:imgId/:usermode', async(req, res) => {
    const id = req.params.id;
    const imageId = req.params.imgId;
    const user = req.params.usermode;
    // console.log(id,imageId);
    try {
        if (user === 'Applicant')
        {
            const responce = await pool.query(`UPDATE Applicant SET profilepic = '' WHERE username = '${id}'`);
        }
        else if (user === 'Company')
        {
            const responce = await pool.query(`UPDATE Company SET logo = '' WHERE username = '${id}'`);
        }
        const result = await cloudinary.uploader.destroy(imageId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }

});

app.put('/update', async(req, res) => {
    const id = req.body.username;
    const url = req.body.url;
    // console.log(url);
    const user = req.body.userMode;
    // console.log(id,user);
    try {
        if (user === 'Applicant')
        {
            const responce = await pool.query(`UPDATE Applicant SET profilepic = ${url} WHERE username = '${id}'`);
        }
        else if (user === 'Company')
        {
            const responce = await pool.query(`UPDATE Company SET logo = '${url}' WHERE username = '${id}'`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

});

const educationValues = ['Matric / O Level','Inter / A Level','Bachelor','Master','PhD']

app.get("/getimageCompany/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const img = await pool.query(`SELECT logo FROM Company WHERE username = '${id}'`);
        res.json(img.rows[0].logo);
        // console.log(img.rows[0].logo);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/getimageApplicant/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const img = await pool.query(`SELECT profilepic FROM Applicant WHERE username = '${id}'`);
        res.json(img.rows[0].profilepic);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/appliedjobs/:a_id",async(req,res) => {
    try {
        const {a_id} = req.params;
        const jobs = await pool.query("SELECT J.id AS id, J.title AS title,C.company_name AS company, C.logo, (L.city ||','||L.country) AS location, J.Job_type AS type, A.status FROM Job J,Application A, Company C, Location L WHERE A.A_id = $1 AND J.id = A.J_id AND C.username = J.C_id AND L.id = J.L_id ORDER BY (J.id) DESC",[a_id]);
        res.json(jobs.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//selected candidates page
app.get("/selectedcandidates/:c_id",async(req,res) => {
    try {
        const {c_id} = req.params;
        const candidates = await pool.query(`SELECT A.username AS id, A.fullname AS name, A.email, (L.city || ', ' || L.country) AS location, J.title FROM Applicant A, Application Ap, Location L, Job J WHERE Ap.A_id = A.username AND Ap.Status = 'Accepted' AND Ap.J_id = J.id AND A.location_id = L.id AND J.c_id = '${c_id}'`);
        res.json(candidates.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//company Profile
app.get("/companydata/:c_id",async(req,res) => {
    try {
        const {c_id} = req.params;
        // console.log(c_id);
        let data = await pool.query(`SELECT company_name AS name, email, contact, linkedIn, website, vision, mission, environment,logo FROM Company WHERE username = '${c_id}'`);
        let locations = await pool.query(`SELECT city,state,country FROM Company_Location CL, Location L WHERE CL.C_id = '${c_id}' AND L.id = CL.L_id`);
        data.rows[0].locations = locations.rows
        // console.log(data.rows[0])
        res.json(data.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});


app.get("/getlocation/:j_id",async(req,res) => {
    try {
        const {j_id} = req.params;
        const jobs = await pool.query("SELECT L.city,L.state,L.country FROM Job J,Location L WHERE  L.id = J.L_id AND J.id = $1",[j_id]);
        res.json(jobs.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/getcity/:j_id",async(req,res) => {
    try {
        const {j_id} = req.params;
        const city = await pool.query("SELECT L.city FROM Job J,Location L WHERE  L.id = J.L_id AND J.id = $1",[j_id]);
        res.json(city.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/getstate/:j_id",async(req,res) => {
    try {
        const {j_id} = req.params;
        const state = await pool.query("SELECT L.state FROM Job J,Location L WHERE  L.id = J.L_id AND J.id = $1",[j_id]);
        res.json(state.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/getcountry/:j_id",async(req,res) => {
    try {
        const {j_id} = req.params;
        const country = await pool.query("SELECT L.country FROM Job J,Location L WHERE  L.id = J.L_id AND J.id = $1",[j_id]);
        res.json(country.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//applicant Info
app.get("/applicantInfo/:aid", async(req,res) => {
    try {
        const { aid } = req.params;
        const resp = await pool.query(`SELECT A.fullname AS name, A.email, A.profilepic, A.contact, A.linkedIn AS linkedin, L.city, L.state, L.country FROM Applicant A, Location L WHERE username ='${aid}' AND A.location_id = L.id`);
        res.json(resp.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//applicant education
app.get("/applicanteducation/:aid", async(req,res) => {
    try {
        const { aid } = req.params;
        const resp = await pool.query(`SELECT degree, field, school, start_date, end_date FROM Education WHERE A_id = '${aid}'`);
        res.json(resp.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//applicant award
app.get("/applicantaward/:aid", async(req,res) => {
    try {
        const { aid } = req.params;
        const resp = await pool.query(`SELECT title, award_date, issuer FROM Award WHERE A_id = '${aid}' `);
        res.json(resp.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//applicant skill
app.get("/applicantskill/:aid", async(req,res) => {
    try {
        const { aid } = req.params;
        const resp = await pool.query(`SELECT name, level FROM Skill WHERE A_id = '${aid}'`);
        res.json(resp.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//applicant project
app.get("/applicantproject/:aid", async(req,res) => {
    try {
        const { aid } = req.params;
        const resp = await pool.query(`SELECT title, start_date, end_date, description, link FROM Project WHERE A_id = '${aid}'`);
        res.json(resp.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//applicant work
app.get("/applicantwork/:aid", async(req,res) => {
    try {
        const { aid } = req.params;
        const resp = await pool.query(`SELECT job_title, company_name, start_date, end_date, description FROM Work_Experience WHERE A_id = '${aid}'`);
        res.json(resp.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/loginpass/:username/:userMode",async(req,res) => {
    const username = req.params.username;
    const userMode = req.params.userMode;
    console.log(`H ${username} ${userMode}`)
    try {
        if (userMode === 'Applicant')
        {
            const password = await pool.query("SELECT password FROM Applicant WHERE username = $1",[username]);        
            console.log(password.rows[0].password);
            res.json(password.rows[0].password);
        }
        else if (userMode === 'Company')
        {
            const password = await pool.query("SELECT password FROM Company WHERE username = $1",[username]);
            res.json(password.rows[0].password);
        }
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/applicantProfile/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const profile = await pool.query("SELECT profilepic FROM Applicant WHERE username = $1",[id])
        res.json(profile.rows[0].profilepic)
    }catch(error){
        console.log(error.massage);
    }

}) 

app.get("/jobs/:filter",async(req,res) => {
    try {
        // console.log(req.query.id)
        let temp = req.query.id;
        let queryRun = `SELECT J.id,J.title,J.description,J.min_education,J.work_experience,J.min_salary,J.max_salary,J.Job_type,J.C_id,C.company_name,C.logo,CONCAT(L.city, ',' ,L.country) AS location FROM Job J, Company C, Location L WHERE J.C_id = C.username AND J.L_id = L.id AND J.id NOT IN (SELECT J1.id FROM Job J1, Application A1 WHERE J1.id = A1.J_id AND A1.status = 'Accepted') AND J.id NOT IN (SELECT J1.id FROM Job J1, Application A1 WHERE J1.id = A1.J_id AND A1.A_id = '${temp}') `
        if (req.query.title !== ''){
            temp = req.query.title.toLowerCase();
            queryRun += `AND LOWER(J.title) LIKE '%${temp}%'`
        }
        if (req.query.name !== ''){
            temp = req.query.name.toLowerCase();
            queryRun += `AND LOWER(C.name) LIKE '%${temp}%'`
        }
        if (req.query.location !== ''){
            temp = req.query.location.toLowerCase();
            queryRun += `AND (LOWER(L.city) LIKE '%${temp}%' OR LOWER(L.country) LIKE '%${temp}%')`
        }
        if (req.query.type !== ''){
            temp = req.query.type.toLowerCase();
            queryRun += `AND LOWER(J.Job_type) LIKE '%${temp}%'`
        }
        if (req.query.min !== '' && req.query.max !== ''){
            let tempmin = req.query.min;
            let tempmax = req.query.max;
            queryRun += `AND ((J.min_salary <= ${tempmin} AND J.max_salary >= ${tempmin}) OR (J.min_salary <= ${tempmax} AND J.max_salary >= ${tempmax}))` 
        }
        if (req.query.min !== ''){
            temp = req.query.min;
            queryRun += `AND (J.max_salary >= ${temp})` 
        }
        if (req.query.max !== ''){
            temp = req.query.max;
            queryRun += `AND (J.min_salary <= ${temp})` 
        }
        queryRun += ' ORDER BY J.id DESC'
        // console.log(queryRun)
        const jobs = await pool.query(queryRun);
        res.json(jobs.rows);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/required_skills/:id",async(req,res) => {
    try {
        // console.log(req.params)
        const skills = await pool.query("SELECT name FROM Required_Skill WHERE J_id = $1",[req.params.id]);
        res.json(skills.rows);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/applicantForApplication/:A_id",async(req,res) => {
    try {
        const A_id = req.params.A_id;
        const details = await pool.query("SELECT A.fullname,A.email,CONCAT(L.city,',',L.country) AS location FROM Location L, Applicant A WHERE A.username = $1 AND L.id = A.location_id",[A_id]);
        res.json(details.rows);
    } catch (error) {
        console.log(error.massage);
    }
});


app.get("/mineducation/:J_id",async(req,res) => {
    try {
        const J_id = req.params.J_id;
        const details = await pool.query("SELECT min_education FROM Job WHERE id = $1",[J_id]);
        res.json(details.rows[0].min_education);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/minexperience/:J_id",async(req,res) => {
    try {
        const J_id = req.params.J_id;
        const details = await pool.query("SELECT work_experience FROM Job WHERE id = $1",[J_id]);
        res.json(details.rows[0].work_experience);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/maxeducation/:A_id",async(req,res) => {
    try {
        const A_id = req.params.A_id;
        const details = await pool.query("SELECT degree FROM Education WHERE A_id = $1",[A_id]);
        let maxi = 0,maxeducation = '';
        // console.log(details.rowCount)
        for (var i = 0; i<details.rowCount; i++)
        {
            if (educationValues.indexOf(details.rows[i].degree)>=maxi){
                maxi = educationValues.indexOf(details.rows[i].degree)
                maxeducation = details.rows[i].degree
            }
        }
        res.json(maxeducation);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/skill/:A_id",async(req,res) => {
    try {
        const A_id = req.params.A_id;
        const details = await pool.query("SELECT name FROM Skill WHERE A_id = $1",[A_id]);
        res.json(details.rows);
    } catch (error) {
        console.log(error.massage);
    }
});

app.get("/ExperienceInYears/:A_id",async(req,res) => {
    try {
        const A_id = req.params.A_id;
        const details = await pool.query("SELECT (EXTRACT(year FROM age(end_date,start_date)) + EXTRACT(month FROM age(end_date,start_date))/12) AS years FROM Work_Experience WHERE A_id = $1",[A_id]);
        let years = 0.0
        for (var i = 0; i<details.rowCount; i++)
        {
            // console.log(typeof(details.rows[i].years))
            years += parseFloat(details.rows[i].years)
        }
        // console.log(typeof(years))
        res.json(years);
    } catch (error) {
        console.log(error.massage);
    }
});

// main feature percentage calculations
const getExperience = async (A_id,J_id) => {
    try {
        // console.log(A_id)
        let responce = await fetch(`http://localhost:5000/ExperienceInYears/${A_id}`);
        const expapp = await responce.json();
        responce = await fetch(`http://localhost:5000/minexperience/${J_id}`);
        const expreq = await responce.json();
        // console.log(expapp,expreq)
        let percentage = 30.0
        if (expapp>=expreq)
            return percentage
        else
        {
            percentage = (expapp/expreq)*30.0
            return percentage
        }
    } catch (err){
        console.error(err.message);
    }
}

const getEducation = async (A_id,J_id) => {
    try {
        // console.log(A_id)
        let responce = await fetch(`http://localhost:5000/maxeducation/${A_id}`);
        const eduapp = await responce.json();
        responce = await fetch(`http://localhost:5000/mineducation/${J_id}`);
        const edureq = await responce.json();
        // console.log(expapp,expreq)
        let percentage = 20.0
        if (educationValues.indexOf(eduapp)>=educationValues.indexOf(edureq))
            return percentage
        else
        {
            percentage = (educationValues.indexOf(eduapp)+1/educationValues.indexOf(edureq)+1)*20.0
            return percentage
        }
    } catch (err){
        console.error(err.message);
    }
}

const getSkill = async (A_id,J_id) => {
    try {
        // console.log(A_id)
        let responce = await fetch(`http://localhost:5000/skill/${A_id}`);
        const skillapp = await responce.json();
        responce = await fetch(`http://localhost:5000/required_skills/${J_id}`);
        const skillreq = await responce.json();
        // console.log(skillapp,skillreq)
        let count = 0
        for (var j = 0; j<skillapp.length; j++)
        {
            for (var k=0; k<skillreq.length; k++)
            {
                if (skillreq[k].name === skillapp[j].name)
                {
                    count++;
                    break;
                }
            }
        }
        let percentage = (count/skillreq.length) * 50.0
        return percentage
    } catch (err){
        console.error(err.message);
    }
}

const getApplicant = async (A_id) => {
    try {
        // console.log(A_id)
        const responce = await fetch(`http://localhost:5000/applicantForApplication/${A_id}`);
        const applicant = await responce.json();
        // console.log(applicant)
        return applicant
    } catch (err){
        console.error(err.message);
    }
  }


app.get("/applicants/:J_id",async(req,res) => {
    try {
        const J_id = req.params.J_id;
        const applicants = await pool.query("SELECT A_id FROM Application WHERE J_id = $1",[J_id]);
        for (var i=0; i<applicants.rowCount; i++)
        {
            const result = await getApplicant(applicants.rows[i].a_id)
            // console.log(result[0].fullname)
            applicants.rows[i].fullname = result[0].fullname
            applicants.rows[i].email = result[0].email
            applicants.rows[i].location = result[0].location
            const exp = await getExperience(applicants.rows[i].a_id,J_id)
            const edu = await getEducation(applicants.rows[i].a_id,J_id)
            const skill = await getSkill(applicants.rows[i].a_id,J_id)
            // console.log(exp,edu,skill)
            applicants.rows[i].percentage = (exp+edu+skill)
        }
        // console.log(applicants.rows)
        function comparePercentage(a, b) {
            const a1 = a.percentage
            const b1 = b.percentage
            let comparison = 0;
        
            if (a1 > b1) {
                comparison = -1;
            } else if (a1 < b1) {
                comparison = 1;
            }
            return comparison;
        }
        applicants.rows.sort(comparePercentage)
        res.json(applicants.rows);
    } catch (error) {
        console.log(error.massage);
    }
});

// get applications 
app.get("/applications/:C_id",async(req,res) => {
    try {
        const C_id = req.params.C_id;
        const jobs = await pool.query("SELECT DISTINCT J.id,J.title FROM Job J, Application A WHERE C_id = $1 AND J.id = A.J_id AND A.status = 'Pending'",[C_id]);
        res.json(jobs.rows);
    } catch (error) {
        console.log(error.massage);
    }
});

// Company main page jobs list
app.get("/postedjobs/:id",async(req,res) => {
    try{
        const cid = req.params.id;
        const runquery = `SELECT DISTINCT J.id AS jid, J.title,(L.city || ',' || L.country) AS location,J.Job_type AS type,J.description,J.min_education AS minEducation,J.work_experience AS workExperience, (J.min_salary || ' - ' || J.max_salary) AS salary FROM Job J,Location L WHERE L.id = J.L_id AND C_id = '${cid}' AND J.id NOT IN (SELECT A.J_id FROM Application A WHERE A.status = 'Accepted') ORDER BY jid DESC`;
        const jobs = await pool.query(runquery);
        res.json(jobs.rows);
        // console.log(jobs.rows);
    } catch(error){
        console.log(error.massage);
    }
});

//for Applying job
app.post("/apply",async(req,res) => {
    try {
        
        // console.log(req.body);
        const query = `INSERT INTO Application (a_id,j_id,status,notified_applicant,notified_company) VALUES('${req.body.username}',${req.body.id},'Pending',false,false)`;
        // console.log(query);
        const newApplication = await pool.query(query);

    } catch (error) {
        console.log(error.massage);
    }
});

//post a job
app.post("/jobpost",async(req,res) => {
    try {
        console.log(req.body)
        let LocID
        const checklocationid = await pool.query("SELECT id FROM Location WHERE city = $1 AND state = $2 AND country = $3",[req.body.city,req.body.state,req.body.country])
        if (checklocationid.rows.length === 0) 
        {
            console.log("Location not found");
            const insertlocation = await pool.query("INSERT INTO Location (city,state,country) VALUES($1,$2,$3) RETURNING id",[req.body.city,req.body.state,req.body.country])
            LocID = insertlocation.rows[0].id
            console.log(LocID)
        } else 
        {
        // The query result has at least one row
            LocID = checklocationid.rows[0].id;
            console.log("Location ID:", LocID);
        }
        const newjob = await pool.query("INSERT INTO Job (title, description, min_education, work_experience, min_salary, max_salary, C_id, L_id, Job_type) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id" ,[req.body.title,req.body.description,req.body.education,req.body.experience,req.body.minsalary,req.body.maxsalary,req.body.username,LocID,req.body.type]);
        const j_id = newjob.rows[0].id
        console.log(j_id)
        let newskill
        for (var i=0; i<req.body.requiredSkills.length; i++)
        {
            newskill = await pool.query("INSERT INTO Required_Skill VALUES($1,$2)",[j_id,req.body.requiredSkills[i]])
        }
        // res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.massage);
    }
});

// To Update Password
app.put("/updatepassword",async(req,res) => {
    try {
        const id = req.body.id;
        const mode = req.body.mode;
        const pass = req.body.pass;
        if (mode === 'Applicant')
        {
            const res = pool.query(`UPDATE Applicant SET password = '${pass}' WHERE username = '${id}'`);
        }
        else if (mode === 'Company')
        {
            const res = pool.query(`UPDATE Company SET password = '${pass}' WHERE username = '${id}'`);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//edit job company
app.put("/updatejob", async (req, res) => {
    try {
        let LocID
        const checklocationid = await pool.query("SELECT id FROM Location WHERE city = $1 AND state = $2 AND country = $3",[req.body.city,req.body.state,req.body.country])
        if (checklocationid.rows.length === 0) 
        {
            console.log("Location not found");
            const insertlocation = await pool.query("INSERT INTO Location (city,state,country) VALUES($1,$2,$3) RETURNING id",[req.body.city,req.body.state,req.body.country])
            LocID = insertlocation.rows[0].id
            console.log(LocID)
        } else 
        {
            LocID = checklocationid.rows[0].id;
            console.log("Location ID:", LocID);
        }

        const updateQuery = `UPDATE Job SET title = '${req.body.title}', description = '${req.body.description}', min_education = '${req.body.education}', work_experience = ${req.body.experience}, min_salary = ${req.body.minsalary}, max_salary = ${req.body.maxsalary}, C_id = '${req.body.username}', L_id = ${LocID}, Job_type = '${req.body.type}' WHERE id = ${req.body.jid}`;
        await pool.query(updateQuery);
        await pool.query(`DELETE FROM Required_Skill WHERE J_id = ${req.body.jid}`);
        let newskill
        for (var i=0; i<req.body.requiredSkills.length; i++)
        {
            newskill = await pool.query("INSERT INTO Required_Skill VALUES($1,$2)",[req.body.jid,req.body.requiredSkills[i]])
        }
        res.json({ message: "Job Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//change status to accepted
app.put("/applicationaccept", async (req, res) => {
    try {
        const { jid, aid } = req.body;

        // Validate if jid and aid are provided
        if (!jid || !aid) {
            return res.status(400).json({ error: "Both jid and aid are required in the request body." });
        }

        // Update the Application table with status 'Accept'
        const updateQuery = "UPDATE Application SET Status = 'Accepted' WHERE J_id = $1 AND A_id = $2";
        await pool.query(updateQuery, [jid, aid]);

        res.json({ message: "Application status updated to 'Accept'." });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//change status to rejecteded
app.put("/applicationreject", async (req, res) => {
    try {
        const { jid, aid } = req.body;

        // Validate if jid and aid are provided
        if (!jid || !aid) {
            return res.status(400).json({ error: "Both jid and aid are required in the request body." });
        }

        const updateQuery = "UPDATE Application SET Status = 'Rejected' WHERE J_id = $1 AND A_id = $2";
        await pool.query(updateQuery, [jid, aid]);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update profile environment, missiom, vision
app.put("/updatecompanyprofiletext", async (req, res) => {
    try {
        const { username , data, text} = req.body;
        console.log(username,data,text)
        if (text === 'mission')
        {
            const updateQuery = `UPDATE Company SET mission = '${data}' WHERE username = '${username}'`;
            await pool.query(updateQuery);
        }
        else if (text === 'vision')
        {
            const updateQuery = `UPDATE Company SET vision = '${data}' WHERE username = '${username}'`;
            await pool.query(updateQuery);
        }
        else
        {
            const updateQuery = `UPDATE Company SET environment = '${data}' WHERE username = '${username}'`;
            await pool.query(updateQuery);
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update company profile Info
app.put("/updatecompanyprofileinfo", async (req, res) => {
    try {
        const { username , name, email, contact, website, linkedin, locations} = req.body;
        console.log(username,name,email,contact,linkedin,website,locations)
        const DeleteQuerry = await pool.query(`DELETE FROM Company_Location WHERE C_id = '${username}'`)
        let LocID
        for (let i=0; i<locations.length; i++)
        {
            const checklocationid = await pool.query("SELECT id FROM Location WHERE city = $1 AND state = $2 AND country = $3",[locations[i].city,locations[i].state,locations[i].country])
            if (checklocationid.rows.length === 0) 
            {
                console.log("Location not found");
                const insertlocation = await pool.query("INSERT INTO Location (city,state,country) VALUES($1,$2,$3) RETURNING id",[locations[i].city,locations[i].state,locations[i].country])
                LocID = insertlocation.rows[0].id;
                console.log(LocID)
            } 
            else 
            {
                LocID = checklocationid.rows[0].id;
                console.log("Location ID:", LocID);
            }
            const insertPair = await pool.query(`INSERT INTO Company_Location (C_id,L_id) VALUES('${username}',${LocID})`)
        }
        const updateQuery = `UPDATE Company SET company_name = '${name}', email = '${email}', contact = '${contact}', website = '${website}', linkedIn = '${linkedin}' WHERE username = '${username}'`;
        await pool.query(updateQuery);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// update applicant profile
app.put("/updateapplicantprofileinfo", async (req,res) => {
    try {
        const { username , name, email, contact, linkedin, city, state, country } = req.body;
        let LocID;
        const checklocationid = await pool.query("SELECT id FROM Location WHERE city = $1 AND state = $2 AND country = $3",[city,state,country])
        if (checklocationid.rows.length === 0) 
        {
            console.log("Location not found");
            const insertlocation = await pool.query("INSERT INTO Location (city,state,country) VALUES($1,$2,$3) RETURNING id",[city,state,country])
            LocID = insertlocation.rows[0].id;
            console.log(LocID)
        } 
        else 
        {
            LocID = checklocationid.rows[0].id;
            console.log("Location ID:", LocID);
        }
        const updateQuery = `UPDATE Applicant SET fullname = '${name}', email = '${email}', contact = '${contact}', linkedIn = '${linkedin}', location_id = '${LocID}' WHERE username = '${username}'`;
        await pool.query(updateQuery);

    } catch (error) {
        console.error(error.message);
    }
});

//Delete Job Company
app.delete("/deletejob/:jid", async (req, res) => {
    try {
        const jid = req.params.jid;

        let Query = `DELETE FROM Required_Skill WHERE J_id = ${jid}`;
        await pool.query(Query);
        Query = `DELETE FROM Application WHERE J_id = ${jid}`;
        await pool.query(Query);
        Query = `DELETE FROM JOB WHERE id = ${jid}`;
        await pool.query(Query);

        res.json({ message: "Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete education
app.delete("/deleteeducation", async (req, res) => {
    try {
        const { aid, degree, field, school } = req.body;

        Query = `DELETE FROM Education WHERE A_id = '${aid}' AND degree = '${degree}' AND field = '${field}' AND school = '${school}'`;
        await pool.query(Query);
        res.json({ message: "Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//add education
app.post("/addeducation", async(req,res) => {
    try {
        const { aid, degree, school, field, start_date, end_date } = req.body;
        Query = `INSERT INTO Education (A_id,degree,field,school,start_date,end_date) VALUES ('${aid}','${degree}','${field}','${school}','${start_date}','${end_date}')`;
        await pool.query(Query);
    } catch (error) {
        console.log(error);
    }
});

//update education
app.post("/updateeducation", async(req,res) => {
    try {
        const { aid, degree, school, field, start_date, end_date } = req.body;
        Query = `UPDATE Education SET degree = '${degree}' ,field = '${field}' , school = '${school}' , start_date = '${start_date}' , end_date = '${end_date}' WHERE A_id = '${aid}' AND degree = '${degree}' AND field = '${field}' AND school = '${school}'`;
        await pool.query(Query);
    } catch (error) {
        console.log(error);
    }
});

//signup data
app.post("/applicantdetails",async(req,res) => {
    try {
        console.log(req.body)
        let LocID
        const checklocationid = await pool.query("SELECT id FROM Location WHERE city = $1",[req.body.city])
        if (checklocationid.rows.length === 0) {
            // The query result is empty
            console.log("Location not found");
            const insertlocation = await pool.query("INSERT INTO Location (city,state,country) VALUES($1,$2,$3) RETURNING id",[req.body.city,req.body.state,req.body.country])
            LocID = insertlocation.rows[0].id
            console.log(LocID)
        } else {
        // The query result has at least one row
            LocID = checklocationid.rows[0].id;
            console.log("Location ID:", LocID);
        }
        const newdata = await pool.query("INSERT INTO Applicant VALUES($1,$2,$3,$4,$5,$6,$7,$8)" ,[req.body.username,req.body.name,req.body.email,req.body.password,req.body.url,req.body.contact,req.body.linkedin,LocID]);
    } catch (error) {
        console.log(error.massage);
    }
});

app.listen(5000,() => {
    console.log('server started');
})