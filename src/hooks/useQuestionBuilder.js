import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  addQuestion,
  updateQuestion,
  removeQuestion,
} from "../store/manageTestSlice";
import {
  getQuestions,
  createQuestion,
  updateQuestion as updateQuestionService,
  deleteQuestion,
} from "../services/questionsService";

const useQuestionBuilder = () => {
  const dispatch = useDispatch();
  const { questions, currentTestId, loadingQuestions, error } = useSelector(
    (state) => state.manageTest,
  );
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    if (!currentTestId) return;
    const fetchQuestions = async () => {
      dispatch(fetchQuestionsStart());
      try {
        const data = await getQuestions(currentTestId);
        dispatch(fetchQuestionsSuccess(data));
      } catch (err) {
        dispatch(
          fetchQuestionsFailure(
            err.response?.data?.message || "Failed to fetch questions",
          ),
        );
      }
    };
    fetchQuestions();
  }, [currentTestId, dispatch]);

  const handleAddQuestion = async (questionData) => {
    try {
      const newQuestion = await createQuestion(currentTestId, questionData);
      dispatch(addQuestion(newQuestion));
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const handleUpdateQuestion = async (questionData) => {
    try {
      const updated = await updateQuestionService(
        currentTestId,
        editingQuestion.id,
        questionData,
      );
      dispatch(updateQuestion(updated));
      setEditingQuestion(null);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to update question:", err);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(currentTestId, questionId);
      dispatch(removeQuestion(questionId));
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const openEditModal = (question) => {
    setEditingQuestion(question);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingQuestion(null);
    setShowModal(true);
  };

  return {
    questions,
    loadingQuestions,
    error,
    showModal,
    editingQuestion,
    openAddModal,
    openEditModal,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    setShowModal,
  };
};

export default useQuestionBuilder;
