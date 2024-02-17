"use server";

import db from "@/db";

export async function getAllCourses() {
  return await db.course.findMany({
    include: {
      syllabus: true,
    },
  });
}

export async function getCourseById(id: string) {
  if (!id) return;
  return await db.course.findFirst({
    where: {
      id: id,
    },
    include: {
      syllabus: true,
    },
  });
}

export async function addSyllabus(
  syllabus: Syllabus | Syllabus[],
  courseId: string,
) {
  if (!syllabus) return;

  if (Array.isArray(syllabus)) {
    await db.syllabus.createMany({
      data: [
        ...syllabus.map((s) => ({
          courseId: courseId,
          content: s.content,
          topic: s.topic,
          video: s.video,
          week: s.week,
        })),
      ],
    });
  } else {
    await db.syllabus.create({
      data: {
        courseId: courseId,
        content: syllabus.content,
        topic: syllabus.topic,
        video: syllabus.video,
        week: syllabus.week,
      },
    });
  }
}

export async function addCourse(course: Course | Course[]) {
  if (!course) return;

  if (Array.isArray(course)) {
    course.forEach(async (c) => {
      await addCourse(c);
    });
  } else {
    const data = await db.course.create({
      data: {
        description: course.description,
        duration: course.duration,
        instructor: course.instructor,
        location: course.location,
        name: course.name,
        prerequisites: course.prerequisites,
        thumbnail: course.thumbnail,
      },
    });
    await addSyllabus(course.syllabus, data.id);
  }
}
