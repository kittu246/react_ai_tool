import React from "react";
import Answers from "./Answers";
const QuestionAnswer = ({item, index}) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type === "q" ? "flex justify-end" : ""}
      >
        {item.type === "q" ? (
          <li
            key={index + Math.random()}
            className="text-right px-4 border-5 dark:bg-zinc-700 bg-pink-50 border-zinc-700 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-fit"
          >
            <Answers
              ans={item.text}
              type={item.type}
              index={index}
              length={item.text.length}
            />
          </li>
        ) : (
          item.text.map((subItem, ansIndex) => (
            <li key={ansIndex + Math.random()}>
              <Answers
                ans={subItem}
                type={item.type}
                index={ansIndex}
                length={subItem.length}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
