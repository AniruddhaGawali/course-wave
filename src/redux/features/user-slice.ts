import {
  enrollCourse,
  getEnrolledCourses,
  progressCourse,
} from "@/actions/userAction";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  userId: string;
  enrollment: Enrollment[];
  status: "idle" | "loading" | "succeeded" | "failed";
} = {
  userId: "",
  enrollment: [],
  status: "idle",
};

export const fetchEnrollment = createAsyncThunk(
  "courses/fetchEnrollment",
  async (id: string) => {
    const data = await getEnrolledCourses(id);
    return data as any as Enrollment[];
  },
);

export const addEnrollCourse = createAsyncThunk(
  "courses/addEnrollCourse",
  async ({ courseId, userId }: { courseId: string; userId: string }) => {
    const data = await enrollCourse(courseId, userId);
    return data as any as Enrollment;
  },
);

export const progressEnrollCourse = createAsyncThunk(
  "courses/progressCourse",
  async ({
    courseId,
    userId,
    progress,
  }: {
    courseId: string;
    userId: string;
    progress: number;
  }) => {
    const data = await progressCourse(courseId, userId, progress);
    return data as any as Enrollment;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEnrollment.pending, (state, action) => {
      state.enrollment = [];
      state.status = "loading";
    });

    builder.addCase(fetchEnrollment.rejected, (state, action) => {
      state.enrollment = [];
      state.status = "failed";
    });

    builder.addCase(fetchEnrollment.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.enrollment = action.payload;
    });

    builder.addCase(addEnrollCourse.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(addEnrollCourse.rejected, (state, action) => {
      state.status = "failed";
    });

    builder.addCase(addEnrollCourse.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.enrollment.push(action.payload);
    });

    builder.addCase(progressEnrollCourse.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(progressEnrollCourse.rejected, (state, action) => {
      state.status = "failed";
    });

    builder.addCase(progressEnrollCourse.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.enrollment.findIndex(
        (enroll) => enroll.course.id === action.payload.course.id,
      );
      state.enrollment[index] = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
