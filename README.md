# DiagnoSoftAI

## Description
DiagnoSoftAI is a sophisticated healthcare platform designed to revolutionize medical diagnosis through advanced image analysis and seamless doctor-patient communication. The system leverages cutting-edge AI technology to enhance diagnostic accuracy while providing a comprehensive solution for managing patient records, appointments, and medical imaging.

## Key Features
- Signup, Login & Logout
- Multi-role Access (Doctors, Patients, Lab Technicians)
- AI Medical Image Analysis  - Brain tumour Segmentation using Attention Enhanced U-NET Model
- AI Chat Bot
- Comprehensive Medical Management - search patients/doctors and view details/reports.
- Appointment Scheduling System - schedule, reschedule & cancel appointments
- Tests & Scans Management - upload & download scans and reports
- Diagnosis Reports - Notes Functionality for the doctor to make disease predictions.


## Technical Stack (MERN)
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI API, Brain tumour Segmentation using Attention Enhanced U-NET Model

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
   ```
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
      PORT = 5000
      DB_URL = mongodb://localhost:27017/diagnosoftai
      JWT_SECRET_KEY = 0c3be53199e03242b9f1e2ffdfadf93b213f0b8b100a7
      OPENAI_API_KEY = 
     ```
     

4. **Starting the Application**
   - To run the backend:
     ```
     cd backend
     npm start
     ```
    - Flask API set up
      ```
      python -m venv venv
      .\venv\scripts\Activate
      python app.py
      ```

   - To run the frontend:
     ```
     cd frontend
     npm run dev
     ```

5. **Note**: the app will be serve on http://localhost:5173/

   ![image](https://github.com/user-attachments/assets/b55901cc-6888-49d3-aca3-8f4b7ca59621)


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

## Data Set and AI Model 
This study leverages the BraTS 2020 dataset,(The BraTS dataset (Brain Tumor Segmentation) is a widely used benchmark dataset for the segmentation of brain tumors in MRI images, featuring multimodal scans and ground truth annotations for gliomas, categorized into high-grade (HGG) and low-grade (LGG) gliomas.)  comprising multimodal MRI scans (T1, T1ce, T2, FLAIR), to develop an attention-based U-Net model. The architecture incorporates attention gates to focus on tumor regions, improving segmentation accuracy. Evaluation metrics show competitive results, and the model demonstrates significant improvements over the baseline U-Net. While training we have saved the model weights, here we have imported the saved loaded weights for the prediction of the segmentation of brain tumours.

## Contributing
Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request. For major changes, please discuss them first in the project's issue tracker.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


