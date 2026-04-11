import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { clearActiveTest } from "../store/candidateTestsSlice";
import { submitTest } from "../services/candidateService";

const useExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeTest } = useSelector((state) => state.candidateTests);
  const { user } = useSelector((state) => state.auth);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(
    activeTest ? activeTest.duration * 60 : 0,
  );
  const [testStatus, setTestStatus] = useState("active"); // active | completed | timeout
  const [warnings, setWarnings] = useState([]);

  const timerRef = useRef(null);
  const warningsRef = useRef(warnings);
  warningsRef.current = warnings;

  // Redirect if no active test
  useEffect(() => {
    if (!activeTest) navigate("/candidate/dashboard");
  }, [activeTest, navigate]);

  // Timer countdown
  useEffect(() => {
    if (testStatus !== "active") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [testStatus]);

  // Behavioral tracking — tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && testStatus === "active") {
        const warning = `Tab switch detected at ${new Date().toLocaleTimeString()}`;
        setWarnings((prev) => [...prev, warning]);
        console.warn("[BEHAVIORAL]", warning);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [testStatus]);

  // Behavioral tracking — fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && testStatus === "active") {
        const warning = `Fullscreen exit detected at ${new Date().toLocaleTimeString()}`;
        setWarnings((prev) => [...prev, warning]);
        console.warn("[BEHAVIORAL]", warning);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [testStatus]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAnswer = (questionId, value, type) => {
    setAnswers((prev) => {
      if (type === "checkbox") {
        const current = prev[questionId] || [];
        const exists = current.includes(value);
        return {
          ...prev,
          [questionId]: exists
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      }
      return { ...prev, [questionId]: value };
    });
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        }),
      );
      await submitTest(activeTest.id, formattedAnswers);
      setTestStatus("completed");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleAutoSubmit = useCallback(async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        }),
      );
      await submitTest(activeTest.id, formattedAnswers);
      setTestStatus("timeout");
    } catch (err) {
      console.error("Auto-submit failed:", err);
    }
  }, [answers, activeTest]);

  const handleBackToDashboard = () => {
    dispatch(clearActiveTest());
    navigate("/candidate/dashboard");
  };

  const handleSkip = () => {
    if (activeQuestion < activeTest.questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (activeQuestion < activeTest.questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const isLastQuestion = activeTest
    ? activeQuestion === activeTest.questions.length - 1
    : false;

  return {
    activeTest,
    user,
    activeQuestion,
    setActiveQuestion,
    answers,
    handleAnswer,
    timeLeft,
    formatTime,
    testStatus,
    warnings,
    handleSubmit,
    handleSkip,
    handleNext,
    handleBackToDashboard,
    isLastQuestion,
  };
};

export default useExam;
