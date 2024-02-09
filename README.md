<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hassaangatta/Trusty_Hires/tree/main">
    <img src="client/src/Images/trustyhires.png" alt="Logo" width="300" height="50">
  </a>
</div>

<a name="readme-top"></a>

# Trusty Hires

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#concepts-used">Concepts Used</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Introducing Trusty Hires: Where Talent Meets Opportunity.

"TrustyHires" is a revolutionary online job market platform designed to streamline the hiring process for both job applicants and companies. With an array of cutting-edge features tailored to meet the needs of both parties, TrustyHires redefines the traditional hiring experience.

<b>For Applicants: </b>

* <b>Advanced Filter Options:</b>
TrustyHires offers applicants a seamless job search experience with advanced filter options, allowing them to refine their search based on skills, experience, and career aspirations.

* <b>Intuitive In-App Resume Builder:</b>
Simplify the application process with TrustyHires' intuitive in-app resume builder, empowering candidates to showcase their qualifications effortlessly.

<b>For Companies:</b>

* <b>Innovative Assessment Tool:</b>
Enhance the hiring process with TrustyHires' innovative assessment tool, which evaluates candidates based on specific job requirements. Using a sophisticated formula, TrustyHires analyzes candidates' experiences, education, and skills, delivering results in a sorted order of perfect matches. This saves companies valuable time and resources, ensuring they connect with the most suitable candidates efficiently.

* <b>Comprehensive Profile Builder:</b>
TrustyHires enables companies to create detailed profiles that accurately represent their organizational culture, values, and hiring requirements.

With TrustyHires, finding the perfect job or candidate has never been easier. Join our platform today and experience a new era of hassle-free hiring and career advancement.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![Postgre][PostgreSQL]][Postgre-url]
* [![cloudinary][cloudinary_shield]][cloudinary-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Concepts Used

* <b>Database:</b>
  1. Normalization: Ensured all tables are normalized up to 3NF to minimize redundancy and maintain data integrity.
  2. Efficient Queries: Utilized joins and subqueries effectively to optimize database performance and retrieve data efficiently.

* <b>Web Development:</b>
  1. Context API: Leveraged the Context API for state management, providing a scalable and efficient solution for managing application state across components.
  2. Best Practices: Followed industry best practices for React and Express.js development, including modular code structure, code reusability, and proper error handling to ensure a robust and maintainable codebase.

* <b>Cloud Integration:</b>
  1. Cloudinary Integration: Integrated Cloudinary for storing user profile images, ensuring seamless scalability, reliability, and security for handling media assets.
  2. Optimized Storage: Implemented efficient image storage strategies, such as image compression and optimization, to minimize storage costs and optimize performance.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites



* npm
  ```sh
  npm install npm@latest -g
  ```
* nodemon
  ```sh
  npm install -g nodemon
  ```

* Also see the package json file of both client and server, mainly used packages are cloudinary,dotenv,react-router-dom, etc.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hassaangatta/Trusty_Hires/tree/main.git
   ```
2. Go to server directory
   ```sh
   nodemon index
   ```
3. Go to client directory
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Demo

* The Applicant side has 3 pages one for searching and filtering jobs, one is to see his/her applied jobs history and its status and last page is for profile of applicant where he/she can update profile. Below is the searching and job list interface.</br></br>


<div align="center">
  <img src="Demo Screenshots/Search.png" alt="search" width="700" height="400">
</div>

</br>
* The Company side has 4 pages one for posting and editing jobs, one is to see applications on posted jobs, another page is to see history of candidates got selected throuugh our platform and last page is for profile of company where it can update profile. There are two interfases show below, fisrt one is job posting page and second one is where company can see list of applications on perticular jobs in decending order of percentage match.</br></br>


<div align="center">
  <img src="Demo Screenshots/Posting job.png" alt="job post" width="700" height="400">
</div>
<div align="center">
  <img src="Demo Screenshots/Applications.png" alt="applications" width="700" height="400">
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Hassaan Gatta - hassaangatta@gmail.com

Project Link: [https://github.com/hassaangatta/Trusty_Hires/tree/main](https://github.com/hassaangatta/Trusty_Hires/tree/main)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgre-url]: https://www.postgresql.org/
[cloudinary_shield]: https://camo.githubusercontent.com/00e341094ba817981b92795f98fa43fcf58a17d2041f3706d616755b7a863952/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d436c6f7564696e61727926636f6c6f723d333434384335266c6f676f3d436c6f7564696e617279266c6f676f436f6c6f723d464646464646266c6162656c3d
[cloudinary-url]: https://cloudinary.com/