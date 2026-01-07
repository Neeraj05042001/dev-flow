import { auth, signOut } from "@/auth";
import QuestionsCard from "@/components/crads/QuestionsCard";
import HomeFilters from "@/components/filters/HomeFilters";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2025-12-20"),
  },
  {
    _id: "2",
    title: "Difference between useEffect and useLayoutEffect",
    description: "When should I use useLayoutEffect over useEffect?",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "Hooks" },
    ],
    author: { _id: "2", name: "Neeraj Kumar",image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4", },
    upvotes: 24,
    answers: 7,
    views: 340,
    createdAt: new Date("2025-12-18"),
  },
  {
    _id: "3",
    title: "What is debouncing in JavaScript?",
    description: "Can someone explain debouncing with a real-world example?",
    tags: [
      { _id: "5", name: "JavaScript" },
      { _id: "6", name: "Performance" },
    ],
    author: {
      _id: "3",
      name: "Alex Smith",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 18,
    answers: 4,
    views: 210,
    createdAt: new Date("2025-12-15"),
  },
  {
    _id: "4",
    title: "How does JWT authentication work?",
    description: "I'm confused about how JWT works between browser and server.",
    tags: [
      { _id: "7", name: "Authentication" },
      { _id: "8", name: "JWT" },
    ],
    author: {
      _id: "4",
      name: "Rahul Verma",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 32,
    answers: 9,
    views: 520,
    createdAt: new Date("2025-12-12"),
  },
  {
    _id: "5",
    title: "Tailwind CSS vs CSS Modules",
    description: "Which styling approach is better for scalable projects?",
    tags: [
      { _id: "9", name: "CSS" },
      { _id: "10", name: "Tailwind" },
    ],
    author: {
      _id: "5",
      name: "Priya Sharma",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 15,
    answers: 6,
    views: 190,
    createdAt: new Date("2025-12-10"),
  },
  {
    _id: "6",
    title: "Why is my Next.js page re-rendering multiple times?",
    description: "My component keeps re-rendering when using useSearchParams.",
    tags: [
      { _id: "11", name: "Next.js" },
      { _id: "12", name: "Rendering" },
    ],
    author: {
      _id: "6",
      name: "Amit Patel",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 21,
    answers: 3,
    views: 260,
    createdAt: new Date("2025-12-08"),
  },
  {
    _id: "7",
    title: "Best way to structure a large React project",
    description: "How should I structure folders for scalability?",
    tags: [
      { _id: "13", name: "React" },
      { _id: "14", name: "Architecture" },
    ],
    author: {
      _id: "7",
      name: "Sophia Lee",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 29,
    answers: 8,
    views: 410,
    createdAt: new Date("2025-12-05"),
  },
  {
    _id: "8",
    title: "What is memoization and when to use it?",
    description: "I want to understand memoization from basics to advanced.",
    tags: [
      { _id: "15", name: "JavaScript" },
      { _id: "16", name: "Optimization" },
    ],
    author: {
      _id: "8",
      name: "Daniel Brown",
      image:
        "https://avatars.githubusercontent.com/u/115901952?s=400&u=5c259fc934b20458502e1745e98dffe7a155c68b&v=4",
    },
    upvotes: 26,
    answers: 6,
    views: 380,
    createdAt: new Date("2025-12-02"),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filterQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  // Had not written this this was to make the filter button logic filter the questions
  // const filteredquestions = questions.filter((question) => {
  //   const matchesQuery = question.title
  //     .toLowerCase()
  //     .includes(query.toLowerCase());
  //   const matchesFilter = filter
  //     ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
  //     : true;

  //   return matchesQuery && matchesFilter;
  // });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-11.5 py-2 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTIONS}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="search questions"
          otherClasses="flex-1"
        />
      </section>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filterQuestions.map((question) => (
          <QuestionsCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
