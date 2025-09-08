// src/config/api.ts

export const REACT_APP_API_URL = "http://localhost:5000/api";

export const endpoints = {
  login: `${REACT_APP_API_URL}/auth/login`,
  register: `${REACT_APP_API_URL}/auth/register`,
  registerTenant: `${REACT_APP_API_URL}/tenants`,
  profile: `${REACT_APP_API_URL}/users/me`,
  generateInvite: `${REACT_APP_API_URL}/admin/invite`,

  // Courses
  courses: `${REACT_APP_API_URL}/courses`,

  // Videos
  videos: `${REACT_APP_API_URL}/videos`,
  videosUpload: `${REACT_APP_API_URL}/videos/upload`, // ⬅️ file upload
  videosLink: `${REACT_APP_API_URL}/videos/link`,     // ⬅️ external link
  videosChapterId: (chapterId: string) =>
    `${REACT_APP_API_URL}/videos/chapter/${chapterId}/`,

  // Resources (Notes / DPP / PDFs / Docs)
  resources: `${REACT_APP_API_URL}/resources`,
  resourcesUpload: `${REACT_APP_API_URL}/resources/upload`, // ⬅️ file upload
  resourcesLink: `${REACT_APP_API_URL}/resources/link`,     // ⬅️ external link
  resourcesChapterId: (chapterId: string) =>
    `${REACT_APP_API_URL}/resources/chapter/${chapterId}/`,

  // Users / Admin
  users: `${REACT_APP_API_URL}/admin/users`,
  assignRole: `${REACT_APP_API_URL}/admin/assign-role`,

  // Dynamic endpoints
  subjects: (courseId: string) =>
    `${REACT_APP_API_URL}/courses/${courseId}/subjects`,
  chapters: (courseId: string, subjectId: string) =>
    `${REACT_APP_API_URL}/courses/${courseId}/subjects/${subjectId}/chapters`,
};
