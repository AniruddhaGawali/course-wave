"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchCoursesByID } from "../features/course-slice";

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
