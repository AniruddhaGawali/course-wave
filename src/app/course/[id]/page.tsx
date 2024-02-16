"use client";

import { useCourse } from "@/redux/dispatch";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

function DetailPage({}: Props) {
  const { getCourseById } = useCourse();
  const param = useParams();
  // console.log(getCourseById(param.id as string));

  console.log(getCourseById(param.id as string));

  return <div>DetailPage</div>;
}

export default DetailPage;
