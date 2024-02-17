"use client";

import Spinner from "@/components/Spinner";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import { useCourse, useUser } from "@/redux/dispatch";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

function DetailPage({}: Props) {
  const router = useRouter();
  const { getCourseById, courseStatus } = useCourse();
  const param = useParams();

  const course = getCourseById(param.id as string);
  const { data: session } = useSession();
  const {
    enrollCourse,
    getEnrollments,
    enrollments,
    progressCourse,
    enrollmentStatus,
  } = useUser();

  useEffect(() => {
    if (enrollments.length == 0) {
      getEnrollments(session?.user?.id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedModule, setSelectedModule] = useState<Syllabus | null>(
    course ? course.syllabus[0] : null,
  );
  const youtubeEmbeded = selectedModule?.video.split("v=")[1];

  useEffect(() => {
    if (course) setSelectedModule(course.syllabus[0]);
  }, [course]);

  if (!course || enrollmentStatus === "loading" || courseStatus === "loading")
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <section className="relative h-[60vh] w-full">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.thumbnail}
          alt={course.name}
          className="h-full w-full object-cover"
        />

        <div className="md::flex-row absolute bottom-0 left-0 z-10 flex h-full w-full flex-col items-start justify-end rounded-t-xl bg-gradient-to-tr from-[rgba(0,0,0,0.5)] to-transparent p-5 pb-10 pl-10 text-white md:flex-row md:items-end md:justify-between md:pl-20">
          <div>
            <h1 className="text-6xl font-semibold md:text-8xl ">
              {course.name}
            </h1>
            <h3 className="text-lg md:text-2xl">{course.description}</h3>
            <Button
              variant="secondary"
              className="mt-5 font-semibold"
              onClick={() => {
                if (session) {
                  enrollCourse(course.id, session?.user?.id as string);
                  toast.success("Enrolled Successfully");
                } else {
                  router.push("/auth/login");
                }
              }}
              disabled={
                enrollments.find((enroll) => enroll.course.id == course.id)
                  ? true
                  : false
              }
            >
              {session
                ? enrollments.find((enroll) => enroll.course.id == course.id)
                  ? "Enrolled"
                  : "Enroll Now"
                : "Login to Enroll"}
            </Button>
          </div>

          <div className="flex w-full max-w-[90%] flex-row items-center justify-between pt-5 md:flex-col md:items-end md:justify-end md:p-5">
            <h4 className="text-lg font-semibold md:text-2xl">
              By {course.instructor}
            </h4>
            <p className="md:text-xl">{course.duration} Hrs</p>
            <p className="md:text-xl">{course.syllabus.length} Modules</p>
            <p className="flex gap-2 md:text-xl">
              Prerequisites :{" "}
              {course.prerequisites.map((e, key) => (
                <span key={key}>{e}</span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-10 p-10 lg:flex-row lg:items-start">
        <div className="w-full rounded-xl bg-gray-100 p-5 lg:w-[70%]">
          <div className="mb-10 space-y-5">
            <h2 className="text-2xl font-semibold">
              {selectedModule?.topic || "Course Overview"}
            </h2>
            <p
              className="m-0 whitespace-pre-line"
              style={{ whiteSpace: "pre-line", marginTop: "0" }}
            >
              {selectedModule?.content || course.description}
            </p>
          </div>

          <div className=" w-full overflow-hidden rounded-lg ">
            {enrollments.find((enroll) => enroll.course.id == course.id) ? (
              <YoutubeEmbed
                embedId={youtubeEmbeded as string}
                title={selectedModule?.topic as string}
              />
            ) : (
              <>
                <div className="flex h-[40vh] w-full items-center justify-center rounded-lg bg-gray-200">
                  <h3 className="text-2xl font-semibold">
                    Please Enroll to watch the video
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full rounded-lg border-2 border-primary p-5 lg:w-[30%]">
          <h2 className="mb-5 text-2xl font-semibold">Course Content</h2>
          <div className="grid grid-cols-1 gap-5">
            {course.syllabus.map((module, index) => {
              const currentModule = module.week;
              const isEnrolled = enrollments.find(
                (enroll) => enroll.course.id == course.id,
              );
              const currentProgressed = isEnrolled?.progress;
              return (
                <div
                  key={index}
                  className={`group cursor-pointer space-y-5 rounded-lg bg-gray-200  p-5 transition-all duration-300 ease-in-out hover:bg-gray-300 ${module == selectedModule ? "border-2 border-primary" : ""}`}
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="flex  items-center justify-between">
                    <div>
                      <h5 className="text-base">{module.topic}</h5>
                      <p className="whitespace-normal text-xs">
                        {module.content}
                      </p>
                    </div>
                    <p className="text-sm">{module.week} Module</p>
                  </div>

                  {isEnrolled && (
                    <div
                      className={`  items-start justify-start overflow-hidden transition-all duration-300  group-hover:flex ${module == selectedModule ? "flex" : "hidden"}`}
                    >
                      <Button
                        size="sm"
                        disabled={
                          isEnrolled
                            ? !(currentProgressed! + 1 >= currentModule)
                              ? true
                              : false
                            : true
                        }
                        onClick={() => {
                          if (
                            enrollments.find(
                              (enroll) => enroll.course.id == course.id,
                            )
                          ) {
                            progressCourse(
                              course.id,
                              session?.user?.id as string,
                              module.week,
                            );
                          }
                        }}
                      >
                        {
                          <span>
                            {
                              <span>
                                {currentProgressed! + 1 >= currentModule
                                  ? currentProgressed! + 1 == currentModule
                                    ? "Completed"
                                    : "Undo Progress"
                                  : "In Progress"}
                              </span>
                            }
                          </span>
                        }
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
