"use server";

import db from "@/db";

export async function enrollCourse(courseId: string, userId: string) {
  if (!courseId || !userId) throw new Error("Invalid input");
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
  if (!userId) throw new Error("Invalid input");
  return await db.enrollment.findMany({
    where: {
      userId: userId,
    },
    include: {
      course: true,
    },
  });
}

export async function progressCourse(
  courseId: string,
  userId: string,
  progress: number,
) {
  if (!courseId || !userId || !progress) throw new Error("Invalid input");
  return await db.enrollment.update({
    where: {
      courseId_userId: {
        courseId: courseId,
        userId: userId,
      },
    },
    data: {
      progress: progress,
    },
    include: {
      course: true,
    },
  });
}
