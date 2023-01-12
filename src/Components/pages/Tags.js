import React from "react";

export const Tags = ({ tags }) => {
  return (
    <div>
      <div>
      <p className="text-white text-bold text-[30px] mt-5">Tags</p>
      </div>
      <div className="tags">
        {tags?.map((tag, index) => (
          <p className="tag" key={index}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};


