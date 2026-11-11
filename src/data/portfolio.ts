// All portfolio facts live here. Edit this file to update the site.
export const portfolio = {
  name: "Damisetti Shamya Lohitha",
  shortName: "Lohitha",
  role: "Full Stack Developer",
  tagline:
    "I build scalable applications with React, Node.js and modern backends — with a soft spot for AI and beautifully engineered systems.",
  summary:
    "Motivated Full Stack Developer skilled in building scalable applications with React, Node.js, and modern backend technologies. Strong in API development, system design, and problem solving.",
  location: "Andhra Pradesh, India",
  resume: "/media/Lohitha-Damisetti-Resume.pdf",
  contact: {
    email: "damisettilohitha@gmail.com",
    github: "https://github.com/lohithadamisetti123",
    linkedin: "https://www.linkedin.com/in/lohitha-damisetti-2bb36829a",
  },
  stats: [
    { value: 9.07, decimals: 2, suffix: "", label: "B.Tech CGPA" },
    { value: 1230, decimals: 0, suffix: "+", label: "Problems solved" },
    { value: 3, decimals: 0, suffix: "", label: "Full-stack AI products" },
    { value: 8, decimals: 0, suffix: "", label: "Certifications" },
  ],
  skills: [
    { name: "Languages", potion: "Elixir of Syntax", color: "#ff8fc7", items: ["C++", "Java", "Python", "JavaScript", "SQL"] },
    { name: "Frontend", potion: "Draught of Interfaces", color: "#7fe7ff", items: ["React.js", "React Native", "HTML", "CSS", "Tailwind CSS"] },
    { name: "Backend", potion: "Tonic of Servers", color: "#b49bff", items: ["Node.js", "Express.js", "REST API Development", "Spring Boot"] },
    { name: "Databases", potion: "Potion of Memory", color: "#7dffb5", items: ["MongoDB", "PostgreSQL", "MySQL", "MongoDB Atlas"] },
    { name: "Tools & Tech", potion: "Brew of Craft", color: "#ffc56b", items: ["Docker", "Git", "Redis", "JWT Authentication", "Postman", "Electron.js"] },
    { name: "Core Concepts", potion: "Essence of Wisdom", color: "#8fb8ff", items: ["Data Structures & Algorithms", "OOP", "System Design", "API Design", "Artificial Intelligence", "Machine Learning", "Data Science"] },
  ],
  projects: [
    {
      numeral: "I",
      title: "PolicyGuard AI",
      kicker: "The Guardian of Fine Print",
      art: "shield" as const,
      summary:
        "An AI-powered platform that analyses privacy policies and legal contracts across web, desktop and mobile — with risk detection, privacy alerts and AI-generated risk scores.",
      tech: ["React.js", "React Native", "Electron.js", "Node.js", "Express.js", "MongoDB Atlas", "OpenAI API", "Prompt Engineering", "NLP", "Tailwind CSS", "JWT", "Docker", "Electron Builder", "REST APIs"],
      url: "https://github.com/lohithadamisetti123/PolicyGuard-AI",
    },
    {
      numeral: "II",
      title: "Software Release Risk Heatmap",
      kicker: "The Oracle of Releases",
      art: "heatmap" as const,
      summary:
        "A full-stack ML platform using Random Forest to classify software releases by risk level, with an interactive heatmap dashboard for real-time risk monitoring across teams and modules.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Python", "FastAPI", "scikit-learn", "PostgreSQL", "JWT", "REST APIs"],
      url: "https://github.com/lohithadamisetti123/Software-Release-Risk-Heatmap",
    },
    {
      numeral: "III",
      title: "StarCloset — Myntra Bharat AI",
      kicker: "The Enchanted Wardrobe",
      art: "closet" as const,
      summary:
        "An AI fashion platform that turns preferences, occasions and budgets into personalised head-to-toe outfits — with conversational AI, stylist personas and a scalable recommendation engine.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Go", "Gin", "PostgreSQL", "Redis", "AI/LLM", "REST APIs"],
      url: "https://github.com/lohithadamisetti123/weforshe-starcloset",
    },
  ],
  achievements: [
    {
      title: "1,230+ problems conquered",
      detail: "Solved 450+ LeetCode, 500+ CodeChef and 280+ GFG problems; earned 20+ HackerRank stars.",
      bars: [
        { label: "LeetCode", value: 450 },
        { label: "CodeChef", value: 500 },
        { label: "GeeksforGeeks", value: 280 },
      ],
      icon: "scroll" as const,
    },
    { title: "Department Topper", detail: "Ranked first in the Data Science Department.", icon: "crown" as const },
    { title: "Top 100 Team", detail: "Myntra WeForShe Hackerramp 2026.", icon: "trophy" as const },
  ],
  certifications: [
    { name: "CLA: Programming Essentials in C/C++", issuer: "C++ Institute" },
    { name: "HTML & CSS", issuer: "Certiport · IT Pearson" },
    { name: "Python & Introduction to Data Science", issuer: "Cisco Networking Academy" },
    { name: "Java Foundations", issuer: "Oracle Certified Foundations Associate" },
    { name: "JavaScript Essentials 1 & 2", issuer: "Cisco Networking Academy" },
    { name: "Career Launchpad — Data Analytics", issuer: "Google Cloud" },
    { name: "Certified Associate Developer", issuer: "MongoDB" },
    { name: "GitHub Foundations", issuer: "Microsoft" },
  ],
  timeline: [
    {
      period: "May – June 2026",
      title: "Full Stack Development Intern",
      place: "Technical Hub Pvt Ltd",
      detail: "Trained in full stack development with React Native; developed web and mobile applications.",
      badge: "Internship",
    },
    {
      period: "2023 – 2027",
      title: "B.Tech in Data Science",
      place: "Aditya College of Engineering and Technology, Surampalem",
      detail: "CGPA 9.07 · Department Topper",
      badge: "CGPA 9.07",
    },
    {
      period: "2021 – 2023",
      title: "Intermediate (MPC)",
      place: "Sri Chaitanya Junior College, Kakinada",
      detail: "Mathematics, Physics & Chemistry",
      badge: "90.60%",
    },
  ],
};

export const chapters = [
  { id: "home", label: "Prologue" },
  { id: "about", label: "The Developer" },
  { id: "skills", label: "Workshop" },
  { id: "projects", label: "Lantern Village" },
  { id: "treasury", label: "Treasure Hall" },
  { id: "library", label: "Royal Library" },
  { id: "contact", label: "Post Tower" },
];
