import { http, HttpResponse } from "msw";
import { users, tests, questions } from "./data";

export const handlers = [
  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const { password: _, ...safeUser } = user;

    return HttpResponse.json({
      user: safeUser,
      token: "mock-jwt-token",
    });
  }),

  // GET /api/employer/tests
  http.get("/api/employer/tests", () => {
    return HttpResponse.json(tests);
  }),

  // POST /api/employer/tests
  http.post("/api/employer/tests", async ({ request }) => {
    const body = await request.json();
    const newTest = { id: tests.length + 1, ...body };
    tests.push(newTest);
    return HttpResponse.json(newTest, { status: 201 });
  }),

  // GET /api/employer/tests/:id/questions
  http.get("/api/employer/tests/:id/questions", ({ params }) => {
    const testQuestions = questions[params.id] || [];
    return HttpResponse.json(testQuestions);
  }),

  // POST /api/employer/tests/:id/questions
  http.post(
    "/api/employer/tests/:id/questions",
    async ({ request, params }) => {
      const body = await request.json();
      if (!questions[params.id]) questions[params.id] = [];
      const newQuestion = { id: questions[params.id].length + 1, ...body };
      questions[params.id].push(newQuestion);
      return HttpResponse.json(newQuestion, { status: 201 });
    },
  ),

  // PUT /api/employer/tests/:id/questions/:questionId
  http.put(
    "/api/employer/tests/:id/questions/:questionId",
    async ({ request, params }) => {
      const body = await request.json();
      const testQuestions = questions[params.id] || [];
      const index = testQuestions.findIndex(
        (q) => q.id === Number(params.questionId),
      );
      if (index === -1) {
        return HttpResponse.json(
          { message: "Question not found" },
          { status: 404 },
        );
      }
      testQuestions[index] = { ...testQuestions[index], ...body };
      return HttpResponse.json(testQuestions[index]);
    },
  ),

  // DELETE /api/employer/tests/:id/questions/:questionId
  http.delete("/api/employer/tests/:id/questions/:questionId", ({ params }) => {
    const testQuestions = questions[params.id] || [];
    const index = testQuestions.findIndex(
      (q) => q.id === Number(params.questionId),
    );
    if (index === -1) {
      return HttpResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );
    }
    testQuestions.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),

  // GET /api/candidate/tests
  http.get("/api/candidate/tests", () => {
    return HttpResponse.json(
      tests.map(({ id, title, duration, totalQuestions, negativeMarking }) => ({
        id,
        title,
        duration,
        totalQuestions,
        negativeMarking,
      })),
    );
  }),

  // GET /api/candidate/tests/:id
  http.get("/api/candidate/tests/:id", ({ params }) => {
    const test = tests.find((t) => t.id === Number(params.id));
    if (!test) {
      return HttpResponse.json({ message: "Test not found" }, { status: 404 });
    }
    return HttpResponse.json({
      ...test,
      questions: questions[params.id] || [],
    });
  }),

  // POST /api/candidate/tests/:id/submit
  http.post("/api/candidate/tests/:id/submit", async ({ request }) => {
    const body = await request.json();
    console.log("Submitted answers:", body.answers);
    return HttpResponse.json({ success: true });
  }),
];
