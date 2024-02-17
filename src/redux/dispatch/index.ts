"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchCoursesByID } from "../features/course-slice";
import {
  addEnrollCourse,
  fetchEnrollment,
  progressEnrollCourse,
} from "../features/user-slice";

export const useCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector(
    (state: RootState) => state.courseReducer.courses,
  );

  const getCourses = () => {
    dispatch(fetchCourses()); // Add 'as any' to fix the type error
  };

  const getCourseById = (id: string) => {
    if (courses.length == 0) {
      dispatch(fetchCoursesByID(id));
    }
    return courses.find((course) => course.id == id);
  };

  return { courses, getCourses, getCourseById };
};

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const enrollments = useSelector(
    (state: RootState) => state.userReducer.enrollment,
  );

  const getEnrollments = (id: string) => {
    dispatch(fetchEnrollment(id)); // Add 'as any' to fix the type error
  };

  const enrollCourse = (courseId: string, userId: string) => {
    dispatch(addEnrollCourse({ courseId, userId })); // Add 'as any' to fix the type error
  };

  const progressCourse = (
    courseId: string,
    userId: string,
    progress: number,
  ) => {
    dispatch(progressEnrollCourse({ courseId, userId, progress })); // Add 'as any' to fix the type error
  };

  return { enrollments, getEnrollments, enrollCourse, progressCourse };
};
