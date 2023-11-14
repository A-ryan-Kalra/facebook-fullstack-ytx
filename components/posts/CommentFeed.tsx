import React from "react";
import CommentItem from "./CommentItem";
import PostItem from "./PostItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

function CommentFeed({ comments }: CommentFeedProps) {
  //   console.log(comments);
  return (
    <div>
      <div className="flex flex-col gap-2 mt-2">
        {comments?.map((comment: Record<string, any>, index: number) => (
          <CommentItem key={index} data={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentFeed;
