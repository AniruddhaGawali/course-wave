"use client";

import { useUser } from "@/redux/dispatch";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Spinner from "@/components/Spinner";

type Props = {};

function Dashboard({}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { enrollments, getEnrollments, enrollmentStatus } = useUser();

  useEffect(() => {
    if (enrollments.length === 0) {
      if (session?.user.id) getEnrollments(session?.user.id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="grainy-gradient flex h-screen w-full items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold capitalize">
          You are not authenticated, Please{" "}
        </h1>
        <Button onClick={() => router.push("/auth/login")}>Login</Button>
      </div>
    );
  }

  return (
    <>
      <section className="grainy-gradient h-[50vh] w-full">
        <div className="flex h-full flex-col items-center justify-end gap-5 p-5">
          <h1 className="text-center text-4xl font-bold capitalize sm:text-5xl lg:text-6xl">
            Welcome, <br className="md:hidden" /> {session?.user?.name}
          </h1>
          <div>
            <p className="text-lg sm:text-xl lg:text-2xl">
              You have{" "}
              <span className=" text-2xl md:text-4xl">
                {enrollments.length}
              </span>{" "}
              courses
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-5 text-sm sm:text-lg md:justify-end">
            <span>Enrolled : {enrollments.length}</span>
            <span>Completed : {enrollments.length}</span>
            <span>Progress : {enrollments.length}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center gap-2 p-10">
          <h3 className="text-center text-5xl font-semibold">Your Courses</h3>
        </div>
        {enrollmentStatus === "loading" ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="container  grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
            {enrollments.map((enroll, index) => {
              const course = enroll.course;
              return (
                <Card
                  key={index}
                  className="h-[50vh] rounded-xl border-2 hover:border-black hover:shadow-lg"
                >
                  <CardHeader className="relative h-[60%] p-0">
                    <div className="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col  items-start justify-end rounded-t-xl bg-gradient-to-tr from-[rgba(0,0,0,0.5)] to-transparent p-5">
                      <CardTitle className="text-2xl font-semibold text-white">
                        {course.name}
                      </CardTitle>
                      <CardDescription className="text-base text-white">
                        {course.description}
                      </CardDescription>
                    </div>
                    {/*  eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="mt-0 h-full w-full rounded-t-xl object-cover p-[1px]"
                      style={{ marginTop: 0 }}
                    />
                  </CardHeader>

                  <CardContent className="container mt-3 text-sm">
                    <p>Instructor : {course.instructor}</p>
                    <p>Duraction : {course.duration} Hrs</p>
                  </CardContent>
                  <CardFooter className="flex-col justify-end gap-2 md:flex-row">
                    <div className="flex w-full items-center gap-5">
                      <Progress
                        value={(enroll.progress / course.duration) * 100}
                      />
                      <span>{(enroll.progress / course.duration) * 100}%</span>
                    </div>

                    <Button
                      variant="secondary"
                      className="w-full md:w-auto"
                      onClick={() => {
                        router.push(`/course/${course.id}`);
                      }}
                    >
                      Go to Course
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;
