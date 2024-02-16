import { getAllCourses } from "@/actions";
import { getCourseById } from "@/actions/courseAction";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  courses: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
} = {
  courses: [],
  status: "idle",
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const data = await getAllCourses();
    return data as any as Course[];
  },
);
export const fetchCoursesByID = createAsyncThunk(
  "courses/fetchCoursesById",
  async (id: string) => {
    const data = await getCourseById(id);
    return data as any as Course;
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.courses = [];
      state.status = "loading";
    });

    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.courses = [];
      state.status = "failed";
    });

    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
      state.status = "succeeded";
    });

    builder.addCase(fetchCoursesByID.pending, (state, action) => {
      state.courses = [];
      state.status = "loading";
    });

    builder.addCase(fetchCoursesByID.rejected, (state, action) => {
      state.courses = [];
      state.status = "failed";
    });

    builder.addCase(fetchCoursesByID.fulfilled, (state, action) => {
      state.courses.push(action.payload);
      state.status = "succeeded";
    });
  },
});

export default courseSlice.reducer;
export const { setCourses } = courseSlice.actions;
