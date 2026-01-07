import React from "react";
import TagCard from "./TagCard";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Metrics from "../ui/Metrics";

interface Props {
  question: Question;
}

const QuestionsCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  //   const date = question.createdAt.toDateString();
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className=" flex-between mt-6 w-full flex-wrap gap-3">
        <Metrics
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)} `}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metrics
            imgUrl="/icons/like.svg"
            alt="like"
            value={upvotes}
            title="votes"
            textStyles="small-medium text-dark400_light700"
          />

          <Metrics
            imgUrl="/icons/message.svg"
            alt="message"
            value={answers}
            title="answer"
            textStyles="small-medium text-dark400_light700"
          />

          <Metrics
            imgUrl="/icons/eye.svg"
            alt="eye"
            value={views}
            title="views"
            textStyles="small-medium text-dark400_light700"
          />
        </div>
      </div>

      {/* <h3 className="h3-semibold font-inter text-light-900 invert-colors ">
        { title}
      </h3> */}
      {/* <div className="flex gap-8 mt-4">
        {question.tags.map((tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div> */}
      {/* <div className="mt-4 flex justify-between">
        <div className=" flex gap-1.25 items-center">
          <Image
            src="/icons/avatar.svg"
            alt="author-profile"
            height={12}
            width={12}
          />
          <p>{question.author.name}</p>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <p>{date}</p>
        </div>
        <div className="flex gap-2.25">
          <div className="flex gap-0.5">
            <Image
              src="icons/like.svg"
              alt="like"
              width={16}
              height={16}
              className="text-sky-500 bg"
            />
            <p>
              <span>{question.upvotes}</span> Votes
            </p>
          </div>
          <div className="flex gap-0.5">
            <Image
              src="icons/message.svg"
              alt="like"
              width={16}
              height={16}
              className="text-sky-500 bg"
            />
            <p>
              <span>{question.answers}</span> Answers
            </p>
          </div>
          <div className="flex gap-0.5">
            <Image
              src="icons/eye.svg"
              alt="like"
              width={16}
              height={16}
              className="text-sky-500 bg"
            />
            <p>
              <span>{question.views}</span> Views
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default QuestionsCard;
