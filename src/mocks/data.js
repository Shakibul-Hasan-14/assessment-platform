export const users = [
  {
    id: 1,
    name: "Arif Hossain",
    refId: "16101121",
    email: "employer@akij.com",
    password: "password123",
    role: "employer",
  },
  {
    id: 2,
    name: "M. Rafiul Alam",
    refId: "16101122",
    email: "candidate@akij.com",
    password: "password123",
    role: "candidate",
  },
];

export const tests = [];

export const questions = {
  1: [
    {
      id: 1,
      title: "What is your preferred work style?",
      type: "mcq",
      options: ["Independent", "Collaborative", "Mixed", "Depends on task"],
    },
    {
      id: 2,
      title: "How do you handle tight deadlines?",
      type: "radio",
      options: ["Stay calm and prioritize", "Ask for help", "Work overtime"],
    },
    {
      id: 3,
      title: "Describe a challenge you overcame at work.",
      type: "paragraph",
      options: [],
    },
  ],
};
