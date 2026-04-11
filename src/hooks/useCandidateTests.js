import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchTestsStart,
  fetchTestsSuccess,
  fetchTestsFailure,
  setActiveTest,
} from "../store/candidateTestsSlice";
import {
  getCandidateTests,
  getCandidateTestById,
} from "../services/candidateService";

const useCandidateTests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tests, loading, error } = useSelector(
    (state) => state.candidateTests,
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchTests = async () => {
      dispatch(fetchTestsStart());
      try {
        const data = await getCandidateTests();
        dispatch(fetchTestsSuccess(data));
      } catch (err) {
        dispatch(
          fetchTestsFailure(
            err.response?.data?.message || "Failed to fetch tests",
          ),
        );
      }
    };
    fetchTests();
  }, [dispatch]);

  const handleStartTest = async (testId) => {
    try {
      const testWithQuestions = await getCandidateTestById(testId);
      dispatch(setActiveTest(testWithQuestions));
      navigate("/candidate/exam");
    } catch (err) {
      console.error("Failed to load test:", err);
    }
  };

  const filtered = tests.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return {
    tests: paginated,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    handleStartTest,
  };
};

export default useCandidateTests;
