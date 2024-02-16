interface Course {
  id: number;
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
