# DiagnoSoftAI

## Description
DiagnoSoftAI is a sophisticated healthcare platform designed to revolutionize medical diagnosis through advanced image analysis and seamless doctor-patient communication. The system leverages cutting-edge AI technology to enhance diagnostic accuracy while providing a comprehensive solution for managing patient records, appointments, and medical imaging.

## Key Features
- AI-Assisted Medical Image Analysis
- Real-time Doctor-Patient Communication
- Comprehensive Patient Management
- Appointment Scheduling System
- Medical Records Management
- Test Report & MRI Scan Management
- Multi-role Access (Doctors, Patients, Lab Technicians)

## Technical Stack (MERN)
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI API

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

### Setup
1. **Clone the Repository**
   ```
   git clone https://github.com/thashu28/DiagnoSoftAI.git
   cd DiagnoSoftAI

2. **Install Dependencies**
   - For the backend (Node.js & Express):
     ```
     cd backend
     npm install -g nodemon
     npm install
     ```
   - For the frontend (React):
     ```
     cd frontend
     npm install
     ```

3. **Set Up Environment File**
   - For the backend:
     ```
      cd backend
      create .env file
      Add the following environment variables to your file:
      PORT = 3000
      DB_URL =
      JWT_SECRET_KEY = 
      OPENAI_API_KEY = 
     ```

4. **Starting the Application**
   - To run the backend:
     ```
     cd backend
     npm start
     ```

   - To run the frontend:
     ```
     cd frontend
     npm run dev
     ```

5. **Note**: the app will be serve on http://localhost:5173/

## API Documentation

### Doctor Routes

#### Get All Doctors
- **Endpoint:** `/api/doctors`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get a list of all doctors.

#### Get One Doctor
- **Endpoint:** `/api/doctors/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get details of a specific doctor by ID.

#### Create Doctor
- **Endpoint:** `/api/doctors`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Create a new doctor.
- **Request Body:**
  - `name`: Doctor's name
  - `age`: Doctor's age
  - `dob`: Date of birth
  - `gender`: Gender
  - `email`: Email address
  - `password`: Password
  - `specialization`: Specialization
  - `phone`: Phone number
  - `role`: Role (e.g., doctor)
  - `experience`: Experience details
  - `qualifications`: Qualifications
  - `department`: Department

#### Update Doctor Information
- **Endpoint:** `/api/doctors/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Description:** Update information for a specific doctor by ID.

#### Delete Doctor
- **Endpoint:** `/api/doctors/:id`
- **Method:** `DELETE`
- **Authentication:** Required
- **Description:** Delete a specific doctor by ID.

#### Get Doctor Appointments
- **Endpoint:** `/api/doctors/appointments/:doctorId`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get appointments for a specific doctor by ID.

### Patient Routes

#### Get All Patients
- **Endpoint:** `/api/patients`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get a list of all patients.

#### Get One Patient
- **Endpoint:** `/api/patients/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get details of a specific patient by ID.

#### Create Patient
- **Endpoint:** `/api/patients`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Create a new patient.
- **Request Body:**
  - `name`: Patient's name
  - `age`: Patient's age
  - `dob`: Date of birth
  - `gender`: Gender
  - `email`: Email address
  - `password`: Password
  - `phone`: Phone number
  - `role`: Role (e.g., patient)
  - `bloodType`: Blood type
  - `medicalHistory`: Medical history
  - `allergies`: Allergies
  - `currentMedication`: Current medication

#### Update Patient Information
- **Endpoint:** `/api/patients/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Description:** Update information for a specific patient by ID.

#### Delete Patient
- **Endpoint:** `/api/patients/:id`
- **Method:** `DELETE`
- **Authentication:** Required
- **Description:** Delete a specific patient by ID.

#### Add Appointment
- **Endpoint:** `/api/patients/:patientId/appointments`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Add a new appointment for a patient.
- **Request Body:**
  - `doctor`: Doctor's ID
  - `date`: Date of the appointment
  - `time`: Time of the appointment
  - `condition`: Condition
  - `description`: Description

#### Delete Appointment
- **Endpoint:** `/api/patients/:patientId/appointments/:appointmentId`
- **Method:** `DELETE`
- **Authentication:** Required
- **Description:** Delete an appointment for a patient.

#### Add Test Report
- **Endpoint:** `/api/patients/:patientId/testReports`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Add a new test report for a patient.
- **Request Body:**
  - `testType`: Type of test
  - `fileUrl`: URL of the test report file
  - `description`: Description
  - `requestedBy`: Doctor's ID who requested the test
  - `status`: Status of the test
  - `comments`: Comments

#### Delete Test Report
- **Endpoint:** `/api/patients/:patientId/testReports/:testReportId`
- **Method:** `DELETE`
- **Authentication:** Required
- **Description:** Delete a test report for a patient.

#### Add MRI Scan
- **Endpoint:** `/api/patients/:patientId/mriScans`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Add a new MRI scan for a patient.
- **Request Body:**
  - `scanType`: Type of scan
  - `fileUrl`: URL of the scan file
  - `description`: Description
  - `requestedBy`: Doctor's ID who requested the scan
  - `status`: Status of the scan
  - `comments`: Comments

#### Delete MRI Scan
- **Endpoint:** `/api/patients/:patientId/mriScans/:mriScanId`
- **Method:** `DELETE`
- **Authentication:** Required
- **Description:** Delete an MRI scan for a patient.

### Authentication Routes

#### User Login
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Handles user login.
- **Request Body:**
  - `email`: User's email
  - `password`: User's password

#### User Registration
- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Handles user registration.
- **Request Body:**
  - `name`: User's name
  - `email`: User's email
  - `password`: User's password
  - `role`: User's role (e.g., patient, doctor, labtech)

#### User Logout
- **Endpoint:** `/api/auth/logout`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Handles user logout.

### Chatbot Routes

#### Generate Response
- **Endpoint:** `/api/chatbot`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Generate a response from the AI chatbot.
- **Request Body:**
  - `message`: User's message to the chatbot

## Contributing
Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request. For major changes, please discuss them first in the project's issue tracker.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


