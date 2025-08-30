import { RouteObject } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import PrivateLayout from "../layouts/PrivateLayout";

import Home from "../pages/dashboard/Home";
import UploadVideo from "../pages/teacher/UploadVideo";
import Playlist from "../pages/Playlist";
import VideoDetail from "../pages/VideoDetail";
import CreatePlaylist from "../pages/teacher/CreatePlaylist";
import CourseDetail from "../pages/courses/CourseDetailPage";
import Profile from "../pages/users/Profile";
import Admin from "../pages/users/Admin";
import SubjectDetail from "../pages/courses/SubjectList/SubjectDetail";
import CreateCourse from "../pages/teacher/CreateCourse";
import CreateSubject from "../pages/teacher/CreateSubject";
import CreateChapter from "../pages/teacher/CreateChapter";

export const privateRoutes: RouteObject[] = [
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <Home />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/courses",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <Playlist />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <Profile />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/upload",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <UploadVideo />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/create-playlist",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CreatePlaylist />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <Admin />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/video/:id",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <VideoDetail />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/course/:id", // 👈 renamed from playlist to course
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CourseDetail />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/courses/:courseId/subjects/:id",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <SubjectDetail />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/courses/:courseId/subjects/:subjectId/add-chapter",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CreateChapter />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/create-course",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CreateCourse />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/course/:courseId/add-subject",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CreateSubject />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/subject/:subjectId/add-chapter",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CreateChapter />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
];
