"use client";

import YoutubeEmbed from "@/components/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/redux/dispatch";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

function DetailPage({}: Props) {
  const { getCourseById } = useCourse();
  const param = useParams();

  const course = getCourseById(param.id as string);

  const [selectedModule, setSelectedModule] = useState<Syllabus | null>(null);
  const youtubeEmbeded = selectedModule?.video.split("v=")[1];
  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <section className="relative h-[60vh] w-full">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.thumbnail}
          alt={course.name}
          className="h-full w-full object-cover"
        />

        <div className="md::flex-row absolute bottom-0 left-0 z-10 flex h-full w-screen flex-col items-start justify-end rounded-t-xl bg-gradient-to-tr from-[rgba(0,0,0,0.5)] to-transparent p-5 pb-10 pl-10 text-white md:flex-row md:items-end md:justify-between md:pl-20">
          <div>
            <h1 className="text-6xl font-semibold md:text-8xl ">
              {course.name}
            </h1>
            <h3 className="text-lg md:text-2xl">{course.description}</h3>
            <Button variant="secondary" className="mt-5 font-semibold">
              Enroll Now
            </Button>
          </div>

          <div className="flex w-full max-w-[90%] flex-row items-center justify-between pt-5 md:flex-col md:items-end md:justify-end md:p-5">
            <h4 className="text-lg font-semibold md:text-2xl">
              By {course.instructor}
            </h4>
            <p className="md:text-xl">{course.duration} Hrs</p>
            <p className="md:text-xl">{course.syllabus.length} Modules</p>
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
            <YoutubeEmbed
              embedId={youtubeEmbeded as string}
              title={selectedModule?.topic as string}
            />
          </div>
        </div>

        <div className="w-full rounded-lg border-2 border-primary p-5 lg:w-[30%]">
          <h2 className="mb-5 text-2xl font-semibold">Course Content</h2>
          <div className="grid grid-cols-1 gap-5">
            {course.syllabus.map((module, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-200 p-5 transition-all duration-300 ease-in-out hover:bg-gray-300"
                onClick={() => setSelectedModule(module)}
              >
                <div>
                  <h5 className="text-base">{module.topic}</h5>
                  <p className="whitespace-normal text-xs">{module.content}</p>
                </div>
                <p className="text-sm">{module.week} Module</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
