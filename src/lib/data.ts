export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  nextSlot: string;
  verified: boolean;
  languages: string[];
  degrees: string;
  initials: string;
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Farhana Rahman",
    specialty: "Cardiology",
    hospital: "Square Hospital",
    location: "Dhaka",
    rating: 4.9,
    reviews: 412,
    experience: 15,
    fee: 1200,
    nextSlot: "Today, 5:30 PM",
    verified: true,
    languages: ["Bengali", "English"],
    degrees: "MBBS, MD (Cardiology), FCPS",
    initials: "FR",
  },
  {
    id: "d2",
    name: "Dr. Imran Hossain",
    specialty: "Dermatology",
    hospital: "Popular Diagnostic",
    location: "Dhaka",
    rating: 4.8,
    reviews: 289,
    experience: 11,
    fee: 900,
    nextSlot: "Tomorrow, 10:00 AM",
    verified: true,
    languages: ["Bengali", "English", "Hindi"],
    degrees: "MBBS, DDV",
    initials: "IH",
  },
  {
    id: "d3",
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrics",
    hospital: "United Hospital",
    location: "Chattogram",
    rating: 5.0,
    reviews: 531,
    experience: 18,
    fee: 1000,
    nextSlot: "Today, 7:00 PM",
    verified: true,
    languages: ["Bengali", "English"],
    degrees: "MBBS, FCPS (Paediatrics)",
    initials: "NJ",
  },
  {
    id: "d4",
    name: "Dr. Sabbir Ahmed",
    specialty: "Neurology",
    hospital: "Evercare Hospital",
    location: "Dhaka",
    rating: 4.7,
    reviews: 176,
    experience: 9,
    fee: 1500,
    nextSlot: "Wed, 2:00 PM",
    verified: true,
    languages: ["Bengali", "English"],
    degrees: "MBBS, MD (Neurology)",
    initials: "SA",
  },
  {
    id: "d5",
    name: "Dr. Tania Islam",
    specialty: "Gynecology",
    hospital: "Labaid Specialized",
    location: "Sylhet",
    rating: 4.9,
    reviews: 358,
    experience: 13,
    fee: 1100,
    nextSlot: "Tomorrow, 4:00 PM",
    verified: true,
    languages: ["Bengali", "English"],
    degrees: "MBBS, FCPS (Gynae & Obs)",
    initials: "TI",
  },
  {
    id: "d6",
    name: "Dr. Rakib Chowdhury",
    specialty: "Orthopedics",
    hospital: "Ibn Sina Hospital",
    location: "Dhaka",
    rating: 4.6,
    reviews: 142,
    experience: 8,
    fee: 950,
    nextSlot: "Thu, 11:30 AM",
    verified: false,
    languages: ["Bengali", "English"],
    degrees: "MBBS, D-Ortho",
    initials: "RC",
  },
];

export const specialties = [
  "All",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Gynecology",
  "Orthopedics",
];

export interface BloodRequest {
  id: string;
  group: string;
  units: number;
  hospital: string;
  location: string;
  patient: string;
  urgency: "Critical" | "Urgent" | "Scheduled";
  postedAgo: string;
}

export const bloodRequests: BloodRequest[] = [
  {
    id: "b1",
    group: "O-",
    units: 2,
    hospital: "Dhaka Medical College",
    location: "Dhaka",
    patient: "Accident trauma",
    urgency: "Critical",
    postedAgo: "8 min ago",
  },
  {
    id: "b2",
    group: "B+",
    units: 1,
    hospital: "Chittagong Medical",
    location: "Chattogram",
    patient: "Surgery",
    urgency: "Urgent",
    postedAgo: "34 min ago",
  },
  {
    id: "b3",
    group: "A+",
    units: 3,
    hospital: "Labaid Specialized",
    location: "Sylhet",
    patient: "Thalassemia",
    urgency: "Scheduled",
    postedAgo: "2 hrs ago",
  },
];

export interface Lesson {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  type: "Video" | "Audio";
  duration: string;
}

export const lessons: Lesson[] = [
  {
    id: "l1",
    title: "Managing Diabetes at Home",
    titleBn: "ঘরে বসে ডায়াবেটিস নিয়ন্ত্রণ",
    category: "Chronic Care",
    type: "Video",
    duration: "12:40",
  },
  {
    id: "l2",
    title: "Healthy Pregnancy Nutrition",
    titleBn: "গর্ভাবস্থায় স্বাস্থ্যকর খাদ্য",
    category: "Maternal",
    type: "Video",
    duration: "18:05",
  },
  {
    id: "l3",
    title: "Recognising a Heart Attack",
    titleBn: "হার্ট অ্যাটাক চেনার উপায়",
    category: "Emergency",
    type: "Audio",
    duration: "07:22",
  },
  {
    id: "l4",
    title: "Child Vaccination Schedule",
    titleBn: "শিশুর টিকা সময়সূচি",
    category: "Pediatric",
    type: "Video",
    duration: "09:15",
  },
  {
    id: "l5",
    title: "Controlling High Blood Pressure",
    titleBn: "উচ্চ রক্তচাপ নিয়ন্ত্রণ",
    category: "Chronic Care",
    type: "Audio",
    duration: "10:48",
  },
  {
    id: "l6",
    title: "Safe Use of Antibiotics",
    titleBn: "অ্যান্টিবায়োটিকের নিরাপদ ব্যবহার",
    category: "Medicine",
    type: "Video",
    duration: "06:30",
  },
];

export interface Medicine {
  id: string;
  brand: string;
  generic: string;
  strength: string;
  form: string;
  maker: string;
  category: string;
  price: number;
  prescription: boolean;
}

export const medicines: Medicine[] = [
  { id: "m1", brand: "Napa Extra", generic: "Paracetamol + Caffeine", strength: "500mg", form: "Tablet", maker: "Beximco", category: "Pain Relief", price: 2, prescription: false },
  { id: "m2", brand: "Seclo", generic: "Omeprazole", strength: "20mg", form: "Capsule", maker: "Square", category: "Gastric", price: 7, prescription: false },
  { id: "m3", brand: "Monas", generic: "Montelukast", strength: "10mg", form: "Tablet", maker: "ACME", category: "Respiratory", price: 14, prescription: true },
  { id: "m4", brand: "Amdocal", generic: "Amlodipine", strength: "5mg", form: "Tablet", maker: "Square", category: "Cardiac", price: 4, prescription: true },
  { id: "m5", brand: "Comet", generic: "Metformin", strength: "500mg", form: "Tablet", maker: "Beximco", category: "Diabetes", price: 3, prescription: true },
  { id: "m6", brand: "Atova", generic: "Atorvastatin", strength: "10mg", form: "Tablet", maker: "ACME", category: "Cardiac", price: 8, prescription: true },
  { id: "m7", brand: "Fexo", generic: "Fexofenadine", strength: "120mg", form: "Tablet", maker: "Square", category: "Allergy", price: 9, prescription: false },
  { id: "m8", brand: "Azithrocin", generic: "Azithromycin", strength: "500mg", form: "Tablet", maker: "Incepta", category: "Antibiotic", price: 35, prescription: true },
  { id: "m9", brand: "Maxpro", generic: "Esomeprazole", strength: "20mg", form: "Capsule", maker: "Renata", category: "Gastric", price: 9, prescription: false },
  { id: "m10", brand: "Ceevit", generic: "Vitamin C", strength: "250mg", form: "Tablet", maker: "Square", category: "Supplement", price: 2, prescription: false },
];

export const medicineCategories = [
  "All",
  "Pain Relief",
  "Gastric",
  "Cardiac",
  "Diabetes",
  "Antibiotic",
  "Respiratory",
  "Allergy",
  "Supplement",
];
