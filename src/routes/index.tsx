import { RouteObject } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import PrivateLayout from "../layouts/PrivateLayout";

import Home from "../pages/dashboard/Home";
import UploadVideo from "../pages/teacher/UploadVideo";
import Playlist from "../pages/Playlist";
import VideoDetail from "../pages/videos/VideoDetail";
import CourseDetail from "../pages/courses/CourseDetailPage";
import Profile from "../pages/users/Profile";
import Admin from "../pages/users/Admin";
import SubjectDetail from "../pages/courses/SubjectList/SubjectDetail";
import CreateCourse from "../pages/teacher/CreateCourse";
import CreateSubject from "../pages/teacher/CreateSubject";
import CreateChapter from "../pages/teacher/CreateChapter";
import VideoStandAlone from "../pages/videos/videoStandAlone";
import ChapterList from "../pages/courses/SubjectList/ChapterList/ChapterList";

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
     path: "/videos",
      element: (
      <PrivateRoute>
        <PrivateLayout>
          <VideoStandAlone />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/videos/:id",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <VideoDetail />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
   {
    path: "/courses/:courseId/subjects/:subjectId/chapterVideos/:id",
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <ChapterList />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/course/:courseId", 
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <CourseDetail />
        </PrivateLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/courses/:courseId/subjects/:subjectId",
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
];
