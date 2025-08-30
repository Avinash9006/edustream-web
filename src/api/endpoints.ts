export const REACT_APP_API_URL= process.env.REACT_APP_API_URL || 'https://my-backend.onrender.com'

export const endpoints = {
  login: `${REACT_APP_API_URL}/auth/login`,
  register: `${REACT_APP_API_URL}/auth/register`,
  profile: `${REACT_APP_API_URL}/users/me`,
  courses: `${REACT_APP_API_URL}/courses`,
  video:`${REACT_APP_API_URL}/videos`,
  users: `${REACT_APP_API_URL}/admin/users`,
  assignRole: `${REACT_APP_API_URL}/admin/assign-role`,
  subjects: (courseId: string) => `${REACT_APP_API_URL}/courses/${courseId}/subjects`,
  chapters: (courseId: string, subjectId: string) =>
    `${REACT_APP_API_URL}/courses/${courseId}/subjects/${subjectId}/chapters`,
};
