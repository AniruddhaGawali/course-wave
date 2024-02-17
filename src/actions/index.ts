"use sever";
import { signIn, signOut } from "next-auth/react";

export { addCourse, addSyllabus, getAllCourses } from "./courseAction";

export async function loginFromGoogle() {
  const res = await signIn("google", {
    redirect: false,
    callbackUrl: "/",
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function logOut() {
  await signOut({ redirect: true, callbackUrl: "/" });
}
