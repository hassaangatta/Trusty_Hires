/*
\l to see all database
\c dbname to connect to database
\dt display tables
*/

CREATE DATABASE TrustyHires

CREATE TABLE Location (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255)
);

INSERT INTO Location (city, state, country) VALUES
('New York', 'New York', 'USA'),
('Los Angeles', 'California', 'USA'),
('London', NULL, 'United Kingdom'),
('Paris', NULL, 'France'),
('Tokyo', 'Tokyo', 'Japan'),
('Sydney', 'New South Wales', 'Australia'),
('Toronto', 'Ontario', 'Canada');

CREATE TABLE Applicant (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profilepic VARCHAR(255),
    contact VARCHAR(20) NOT NULL,
    linkedIn VARCHAR(255),
    location_id INT REFERENCES Location(id) NOT NULL
);

INSERT INTO Applicant (username, fullname, email, password, profilepic, contact, linkedIn, location_id) VALUES
('john_doe', 'John Doe', 'john@example.com', 'sdVvzrg456*', 'https://res.cloudinary.com/dnxl2t6br/image/upload/v1701893601/gxkf8orjgaoy3kbehhkx.jpg', '1234567890', 'https://www.linkedin.com/in/johndoe/', 1),
('jane_smith', 'Jane Smith', 'jane@example.com', '$Vhfxuhsdvv1', 'https://res.cloudinary.com/dnxl2t6br/image/upload/v1701893601/zrzgyetswwldzz1jibim.jpg', '9876543210', 'https://www.linkedin.com/in/janesmith/', 4);

CREATE TABLE Education (
    A_id VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    school VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (A_id, degree, field),
    FOREIGN KEY (A_id) REFERENCES Applicant(username)
);


INSERT INTO Education (A_id, degree, field, school, start_date, end_date) VALUES
('john_doe', 'Bachelor', 'Computer Science', 'University of XYZ', '2010-09-01', '2014-06-30'),
('john_doe', 'Master', 'Data Science', 'Tech Institute', '2015-08-01', '2017-05-30'),
('john_doe', 'PhD', 'Artificial Intelligence', 'Research University', '2018-09-01', '2023-05-30'),
('jane_smith', 'Bachelor', 'Economics', 'City College', '2012-09-01', '2016-06-30'),
('jane_smith', 'Master', 'Finance', 'Financial Institute', '2017-08-01', '2019-05-30'),
('jane_smith', 'Master', 'Business Administration', 'Business School', '2020-09-01', '2022-05-30');

CREATE TABLE Skill (
    A_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY (A_id, name),
    FOREIGN KEY (A_id) REFERENCES Applicant(username)
);

INSERT INTO Skill (A_id, name, level) VALUES
('john_doe', 'Programming', 5),
('john_doe', 'Machine Learning', 4),
('john_doe', 'Data Analysis', 3),
('john_doe', 'Database Management', 4),
('john_doe', 'Web Development', 5),
('jane_smith', 'Financial Analysis', 4),
('jane_smith', 'Risk Management', 5),
('jane_smith', 'Strategic Planning', 3),
('jane_smith', 'Marketing', 4),
('jane_smith', 'Project Management', 5);

CREATE TABLE Award (
    A_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    award_date DATE NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    PRIMARY KEY (A_id, title),
    FOREIGN KEY (A_id) REFERENCES Applicant(username)
);

INSERT INTO Award (A_id, title, award_date, issuer) VALUES
('john_doe', 'Outstanding Programmer Award', '2022-03-15', 'Tech Excellence Society'),
('jane_smith', 'Best Financial Analyst of the Year', '2021-12-10', 'Finance Professionals Association');

CREATE TABLE Project (
    A_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255),
    PRIMARY KEY (A_id, title),
    FOREIGN KEY (A_id) REFERENCES Applicant(username)
);

INSERT INTO Project (A_id, title, start_date, end_date, description, link) VALUES
('john_doe', 'Web Development Project', '2021-05-01', '2021-12-31', 'Developed a dynamic website for a client.', 'https://example.com/web-project'),
('john_doe', 'Data Analysis Project', '2022-02-15', '2022-08-30', 'Conducted data analysis on customer behavior.', 'https://example.com/data-project'),
('jane_smith', 'Financial Planning System', '2020-10-01', '2021-06-30', 'Designed and implemented a financial planning system.', 'https://example.com/financial-project'),
('jane_smith', 'Marketing Campaign Analytics', '2022-01-10', '2022-07-15', 'Led a team to analyze the effectiveness of marketing campaigns.', 'https://example.com/marketing-project');

CREATE TABLE Work_Experience (
    A_id VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (A_id, job_title, company_name),
    FOREIGN KEY (A_id) REFERENCES Applicant(username)
);

INSERT INTO Work_Experience (A_id, job_title, company_name, start_date, end_date, description) VALUES
('john_doe', 'Software Developer', 'Tech Solutions Inc.', '2019-03-01', '2022-06-30', 'Developed and maintained software applications for clients.'),
('jane_smith', 'Financial Analyst', 'Finance Corp', '2020-07-15', '2023-01-31', 'Conducted financial analysis and prepared reports for decision-making.');

CREATE TABLE Company (
    username VARCHAR(255) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    contact VARCHAR(20) NOT NULL,
    linkedIn VARCHAR(255),
    website VARCHAR(255),
    vision TEXT,
    mission TEXT,
    environment TEXT
);

INSERT INTO Company (username, company_name, email, password, logo, contact, linkedIn, website, vision, mission, environment) VALUES
('it_company', 'Tech Solutions Inc.', 'info@techsolutions.com', 'securepassword', 'https://res.cloudinary.com/dnxl2t6br/image/upload/v1701813304/y5hdqkf6vk6uqdckyzum.jpg', '123-456-7890', 'https://www.linkedin.com/company/tech-solutions/', 'https://techsolutions.com', 'Leading innovation in technology solutions.', 'To empower businesses through cutting-edge technology.', 'Innovative and collaborative work environment for our team.'),
('finance_company', 'Finance Corp', 'info@financecorp.com', 'securepass123', 'https://res.cloudinary.com/dnxl2t6br/image/upload/v1701813318/sgawrqeekmx7yho1qniz.jpg', '987-654-3210', 'https://www.linkedin.com/company/finance-corp/', 'https://financecorp.com', 'Bridging financial gaps for a prosperous future.', 'To provide exceptional financial services with integrity.', 'Professional and supportive work environment for finance professionals.');

--securepassword
paS1*


CREATE TABLE Company_Location (
    C_id VARCHAR(255) NOT NULL,
    L_id INT NOT NULL,
    PRIMARY KEY (C_id, L_id),
    FOREIGN KEY (C_id) REFERENCES Company(username),
    FOREIGN KEY (L_id) REFERENCES Location(id)
);

INSERT INTO Company_Location (C_id, L_id) VALUES
('it_company', 1),
('it_company', 2),
('finance_company', 3),
('finance_company', 4);

CREATE TABLE Job (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    min_education VARCHAR(255) NOT NULL,
    work_experience INT NOT NULL,
    min_salary int NOT NULL,
    max_salary int NOT NULL,
    C_id VARCHAR(255) NOT NULL,
    L_id int NOT NULL,
    Job_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (C_id) REFERENCES Company(username),
    FOREIGN KEY (L_id) REFERENCES Location(id)
);

INSERT INTO Job (title, description, min_education, work_experience, min_salary, max_salary, C_id, L_id, Job_type) VALUES
('Software Engineer', 'Develop and maintain software applications.', 'Bachelors', 2, 80000, 100000, 'it_company', 1, 'On-site'),
('Data Scientist', 'Conduct data analysis and implement machine learning models.', 'Masters', 3, 90000, 110000, 'it_company', 1, 'On-site'),
('Web Developer', 'Create and optimize websites for clients.', 'Bachelors', 2, 70000, 90000, 'it_company', 1, 'Remote'),
('IT Support Specialist', 'Provide technical support to end-users.', 'Bechlors', 1, 50000, 70000, 'it_company', 2, 'On-site'),
('Network Administrator', 'Manage and optimize company networks.', 'Bachelors', 3, 80000, 100000, 'it_company', 2, 'Remote'),
('Financial Analyst', 'Analyze financial data and prepare reports.', 'Bachelors', 2, 60000, 80000, 'finance_company', 3, 'On-site'),
('Tax Accountant', 'Prepare and review tax returns for clients.', 'Bachelors', 3, 70000, 90000, 'finance_company', 4, 'On-site'),
('Audit Manager', 'Lead and manage audit teams.', 'Masters', 5, 100000, 120000, 'finance_company', 3, 'On-site'),
('Financial Planner', 'Develop financial plans for clients.', 'Masters', 4, 80000, 100000, 'finance_company', 4, 'On-site'),
('Risk Analyst', 'Assess and mitigate financial risks.', 'Bachelors', 3, 70000, 90000, 'finance_company', 4, 'On-site');

CREATE TABLE Required_Skill (
    J_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (J_id, name),
    FOREIGN KEY (J_id) REFERENCES Job(id)
);

INSERT INTO Required_Skill (J_id, name) VALUES
(1, 'Java Programming'),
(1, 'Database Management'),
(2, 'Machine Learning'),    
(2, 'Python'),
(3, 'HTML/CSS'),
(3, 'JavaScript'),
(4, 'Troubleshooting'),
(4, 'Customer Support'),
(5, 'Network Security'),
(5, 'Routing and Switching'),
(6, 'Financial Modeling'),
(6, 'Data Analysis'),
(7, 'Tax Planning'),
(7, 'IRS Regulations'),
(8, 'Audit Planning'),
(8, 'Risk Assessment'),
(9, 'Financial Planning'),
(9, 'Investment Strategies'),
(10, 'Risk Assessment'),
(10, 'Statistical Analysis');

CREATE TABLE Application (
    id SERIAL,
    A_id VARCHAR(255) NOT NULL,
    J_id INT NOT NULL,
    PRIMARY KEY (A_id, J_id),
    FOREIGN KEY (A_id) REFERENCES Applicant(username),
    FOREIGN KEY (J_id) REFERENCES Job(id),
    Status VARCHAR(50) NOT NULL,
    notified_applicant BOOLEAN,
    notified_company BOOLEAN
);

INSERT INTO Application (A_id, J_id, Status, notified_applicant, notified_company) VALUES
('john_doe', 4, 'Pending',  false, false),
('john_doe', 2, 'Pending',  false, false),
('john_doe', 3, 'Pending',  false, false),
('jane_smith', 2, 'Pending',  false, false),
('john_doe', 1, 'Accepted',  false, true);
