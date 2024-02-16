"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { couserData } from "../../public/data/data";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { getAllCourses } from "@/actions";

type Props = {};

function CourseList({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [courses, setCourses] = useState<any>([]);

  const getCousers = async () => {
    const res = await getAllCourses();
    setCourses(res);
  };

  useEffect(() => {
    getCousers();
  }, []);

  return (
    <div className="h-full w-full">
      <section className="relative flex h-[40vh] w-full items-end justify-center p-10 sm:h-[50vh]">
        <div className="flex w-full flex-col items-center justify-center  gap-2">
          <h1 className="mb-3 mt-10 text-center text-3xl font-semibold text-white sm:text-5xl lg:text-7xl">
            Courses List
          </h1>
          <input
            type="text"
            className="h-10 w-2/3 rounded-lg bg-[rgba(255,255,255,0.45)] px-10 text-base font-medium text-white outline-none backdrop-blur-sm placeholder:font-medium placeholder:text-white sm:font-semibold md:h-16
            md:w-1/2 md:text-xl md:placeholder:font-semibold
            "
            placeholder="Search for a course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="absolute left-0 top-0 -z-20  h-[40vh] w-full  sm:h-[50vh]">
          <Image
            alt="Mountains"
            src="/images/bg.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>
      <section className="container mt-32 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: Course, index: number) => {
          return (
            <Card
              key={index}
              className="h-[50vh] rounded-xl border-2 hover:border-black hover:shadow-lg"
            >
              <CardHeader className="relative h-[60%]">
                <div className="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col  items-start justify-end bg-gradient-to-tr from-[rgba(0,0,0,0.5)] to-transparent p-5">
                  <CardTitle className="text-2xl font-semibold text-white">
                    {course.name}
                  </CardTitle>
                  <CardDescription className="text-base text-white">
                    {course.description}
                  </CardDescription>
                </div>
                <img src={course.thumbnail} alt={course.name} />
              </CardHeader>

              <CardContent className="container mt-3 text-sm">
                <p>Instructor : {course.instructor}</p>
                <p>Duraction : {course.duration} Hrs</p>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button>Enroll</Button>
                <Button variant="ghost">Details</Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

export default CourseList;