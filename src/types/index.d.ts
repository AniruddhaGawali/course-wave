interface Course {
  id: string;
  name: string;
  instructor: string;
  description: string;
  thumbnail: string;
  duration: number;
  location: string;
  prerequisites: string[];
  syllabus: Syllabus[];
}

interface Syllabus {
  week: number;
  topic: string;
  content: string;
  video: string;
}

interface Enrollment {
  id: string;
  course: Course;
  progress: number;
}
