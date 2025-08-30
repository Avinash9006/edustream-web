// src/pages/dashboard/Home.tsx
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

export default function Home() {
  const userStr = localStorage.getItem("user");
const user = userStr ? JSON.parse(userStr) : null;

if (user?.role === "teacher" || user?.role === "admin") {
  return <TeacherDashboard />;
}

  return <StudentDashboard />;
}
