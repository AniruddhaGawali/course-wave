"use server";

import db from "@/db";

export async function enrollCourse(courseId: string, userId: string) {
  const data = await db.enrollment.create({
    data: {
      courseId: courseId,
      userId: userId,
      progress: 0,
    },
    include: {
      course: true,
    },
  });
  return data;
}

export async function getEnrolledCourses(userId: string) {
  return await db.enrollment.findMany({
    where: {
      userId: userId,
    },
    include: {
      course: true,
    },
  });
}
