import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setBasicInfo, setCurrentTestId } from "../store/manageTestSlice";
import { addTest } from "../store/testsSlice";
import { createTest } from "../services/testsService";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  totalCandidates: z.coerce.number().min(1, "Total candidates is required"),
  totalSlots: z.coerce.number().min(1, "Total slots is required"),
  totalExams: z.coerce.number().min(1, "Total question sets is required"),
  questionType: z.string().min(1, "Question type is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

const useBasicInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { basicInfo, loading, error } = useSelector(
    (state) => state.manageTest,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: basicInfo || {},
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const getDuration = () => {
    if (!startTime || !endTime) return "";
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = Math.round((end - start) / 60000);
    return diff > 0 ? `${diff} minutes` : "";
  };

  const onSubmit = async (data) => {
    try {
      const newTest = await createTest(data);
      dispatch(addTest(newTest));
      dispatch(setBasicInfo(data));
      dispatch(setCurrentTestId(newTest.id));
      navigate("/employer/manage-test/questions");
    } catch (err) {
      console.error("Failed to create test:", err);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getDuration,
    loading,
    error,
    basicInfo,
  };
};

export default useBasicInfo;
