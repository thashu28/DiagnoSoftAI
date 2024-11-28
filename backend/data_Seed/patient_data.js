const patient_data = [
  {
    name: "John Doe",
    age: 30,
    dob: new Date("1994-05-14"),
    gender: "male",
    email: "johndoe@example.com",
    password: "password123",
    phone: "+1 123-456-7890",
    role: "patient",
    bloodType: "A+",
    medicalHistory: ["Diabetes", "High Blood Pressure"],
    allergies: ["Peanuts"],
    currentMedication: ["Metformin"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab01",
        date: new Date("2024-12-01"),
        time: "10:00 AM",
        condition: "routine",
        description: "Follow-up check-up"
      }
    ],
    mriScans: [
      {
        scanType: "Brain",
        fileUrl: "https://example.com/scans/mri1.pdf",
        description: "Brain MRI for seizure analysis",
        requestedBy: "645a0f4c88e9c3f827aeab01",
        uploadDate: new Date("2024-11-25"),
        status: "Completed",
        comments: "Normal scan results"
      }
    ],
    testReports: [
      {
        testType: "Blood Test",
        fileUrl: "https://example.com/reports/blood1.pdf",
        description: "Routine blood work",
        requestedBy: "645a0f4c88e9c3f827aeab01",
        uploadDate: new Date("2024-11-20"),
        status: "Completed",
        comments: "All values within normal range"
      }
    ]
  },
  {
    name: "Jane Smith",
    age: 28,
    dob: new Date("1996-08-12"),
    gender: "female",
    email: "janesmith@example.com",
    password: "securepassword",
    phone: "+1 987-654-3210",
    role: "patient",
    bloodType: "B-",
    medicalHistory: ["Asthma"],
    allergies: ["Dust"],
    currentMedication: ["Inhaler"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab02",
        date: new Date("2024-11-28"),
        time: "2:30 PM",
        condition: "routine",
        description: "Asthma management review"
      }
    ],
    mriScans: [
      {
        scanType: "Spine",
        requestedBy: "645a0f4c88e9c3f827aeab02",
        uploadDate: null,
        status: "Pending"
      }
    ],
    testReports: [
      {
        testType: "Cholesterol Test",
        requestedBy: "645a0f4c88e9c3f827aeab02",
        uploadDate: null,
        status: "Pending"
      }
    ]
  },
  {
    name: "Alice Brown",
    age: 40,
    dob: new Date("1984-03-20"),
    gender: "female",
    email: "alicebrown@example.com",
    password: "passwordalice",
    phone: "+1 564-738-2920",
    role: "patient",
    bloodType: "O+",
    medicalHistory: ["Thyroid"],
    allergies: ["Penicillin"],
    currentMedication: ["Levothyroxine"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab03",
        date: new Date("2024-12-03"),
        time: "9:00 AM",
        condition: "critical",
        description: "Thyroid swelling evaluation"
      }
    ],
    mriScans: [
      {
        scanType: "Abdomen",
        fileUrl: "https://example.com/scans/abdomen1.pdf",
        description: "Abdomen MRI for suspected growth",
        requestedBy: "645a0f4c88e9c3f827aeab03",
        uploadDate: new Date("2024-11-23"),
        status: "Completed",
        comments: "Growth observed; biopsy suggested"
      }
    ],
    testReports: [
      {
        testType: "Glucose Test",
        fileUrl: "https://example.com/reports/glucose1.pdf",
        description: "Glucose levels check",
        requestedBy: "645a0f4c88e9c3f827aeab03",
        uploadDate: new Date("2024-11-22"),
        status: "Completed",
        comments: "Slightly elevated glucose levels"
      }
    ]
  },
  {
    name: "Robert Wilson",
    age: 35,
    dob: new Date("1989-12-10"),
    gender: "male",
    email: "robertwilson@example.com",
    password: "robert123",
    phone: "+1 213-556-7890",
    role: "patient",
    bloodType: "AB-",
    medicalHistory: ["Kidney Stones"],
    allergies: ["Seafood"],
    currentMedication: ["Painkillers"],
    appointments: [],
    mriScans: [],
    testReports: [
      {
        testType: "Urine Test",
        requestedBy: "645a0f4c88e9c3f827aeab04",
        uploadDate: null,
        status: "Pending"
      }
    ]
  },{
    name: "Emma Johnson",
    age: 25,
    dob: new Date("1999-07-10"),
    gender: "female",
    email: "emmajohnson@example.com",
    password: "emmaSecure",
    phone: "+1 654-789-1234",
    role: "patient",
    bloodType: "O-",
    medicalHistory: ["Migraine"],
    allergies: ["Nuts"],
    currentMedication: ["Aspirin"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab05",
        date: new Date("2024-12-05"),
        time: "11:00 AM",
        condition: "routine",
        description: "Migraine consultation"
      }
    ],
    mriScans: [
      {
        scanType: "Brain",
        fileUrl: null,
        description: null,
        requestedBy: "645a0f4c88e9c3f827aeab05",
        uploadDate: null,
        status: "Pending",
        comments: null
      }
    ],
    testReports: [
      {
        testType: "Blood Test",
        fileUrl: "https://example.com/reports/blood2.pdf",
        description: "Full blood count",
        requestedBy: "645a0f4c88e9c3f827aeab05",
        uploadDate: new Date("2024-11-18"),
        status: "Completed",
        comments: "Slight anemia detected"
      }
    ]
  },
  {
    name: "Liam Martinez",
    age: 45,
    dob: new Date("1979-09-15"),
    gender: "male",
    email: "liammartinez@example.com",
    password: "liamStrong123",
    phone: "+1 456-789-0123",
    role: "patient",
    bloodType: "B+",
    medicalHistory: ["Hypertension"],
    allergies: [],
    currentMedication: ["Lisinopril"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab06",
        date: new Date("2024-12-10"),
        time: "3:00 PM",
        condition: "routine",
        description: "Hypertension check-up"
      }
    ],
    mriScans: [],
    testReports: [
      {
        testType: "Cholesterol Test",
        requestedBy: "645a0f4c88e9c3f827aeab06",
        uploadDate: null,
        status: "Pending"
      }
    ]
  },
  {
    name: "Olivia Davis",
    age: 32,
    dob: new Date("1992-04-05"),
    gender: "female",
    email: "oliviadavis@example.com",
    password: "oliviaSecure123",
    phone: "+1 789-654-3210",
    role: "patient",
    bloodType: "A-",
    medicalHistory: ["PCOS"],
    allergies: ["Lactose"],
    currentMedication: ["Metformin"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab07",
        date: new Date("2024-11-30"),
        time: "1:00 PM",
        condition: "routine",
        description: "Hormonal therapy consultation"
      }
    ],
    mriScans: [
      {
        scanType: "Pelvis",
        fileUrl: "https://example.com/scans/pelvis1.pdf",
        description: "Pelvis scan for PCOS evaluation",
        requestedBy: "645a0f4c88e9c3f827aeab07",
        uploadDate: new Date("2024-11-26"),
        status: "Completed",
        comments: "No abnormalities found"
      }
    ],
    testReports: []
  },
  {
    name: "James Brown",
    age: 60,
    dob: new Date("1964-02-19"),
    gender: "male",
    email: "jamesbrown@example.com",
    password: "jamespassword",
    phone: "+1 345-678-9012",
    role: "patient",
    bloodType: "AB+",
    medicalHistory: ["Arthritis"],
    allergies: [],
    currentMedication: ["Ibuprofen"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab08",
        date: new Date("2024-12-02"),
        time: "9:30 AM",
        condition: "routine",
        description: "Joint pain management"
      }
    ],
    mriScans: [],
    testReports: [
      {
        testType: "Glucose Test",
        fileUrl: "https://example.com/reports/glucose2.pdf",
        description: "Glucose tolerance test",
        requestedBy: "645a0f4c88e9c3f827aeab08",
        uploadDate: new Date("2024-11-20"),
        status: "Completed",
        comments: "Normal glucose tolerance"
      }
    ]
  },
  {
    name: "Sophia Garcia",
    age: 22,
    dob: new Date("2002-06-12"),
    gender: "female",
    email: "sophiagarcia@example.com",
    password: "sophiaPass123",
    phone: "+1 234-567-8901",
    role: "patient",
    bloodType: "O+",
    medicalHistory: ["Anemia"],
    allergies: ["Pollen"],
    currentMedication: ["Iron Supplements"],
    appointments: [
      {
        doctor: "645a0f4c88e9c3f827aeab09",
        date: new Date("2024-12-07"),
        time: "10:15 AM",
        condition: "routine",
        description: "Anemia treatment follow-up"
      }
    ],
    mriScans: [
      {
        scanType: "Other",
        requestedBy: "645a0f4c88e9c3f827aeab09",
        uploadDate: null,
        status: "Pending"
      }
    ],
    testReports: [
      {
        testType: "Urine Test",
        fileUrl: null,
        description: null,
        requestedBy: "645a0f4c88e9c3f827aeab09",
        uploadDate: null,
        status: "Pending"
      }
    ]
  }
];

export default patient_data;