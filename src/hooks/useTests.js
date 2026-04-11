import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchTestsStart,
  fetchTestsSuccess,
  fetchTestsFailure,
} from "../store/testsSlice";
import { getEmployerTests } from "../services/testsService";

const useTests = () => {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((state) => state.tests);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchTests = async () => {
      dispatch(fetchTestsStart());
      try {
        const data = await getEmployerTests();
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
  };
};

export default useTests;
