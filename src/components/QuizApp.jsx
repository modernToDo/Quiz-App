import React, {  useRef, useState } from "react";
import "./QuizApp.css";
import { Questions } from "./Questions";
const QuizApp = () => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(false)
  const ref=useRef(null)

  const highlightAnswer = (e, ans) => {
    if (isActive === false) {
      ref.current= e.target
      if (ans) {
      ref.current.classList.add("correct")
        setCount((prevCount) => prevCount + 1);
        setIsActive(true);
      } else {
        ref.current.classList.add("wrong");
        setIsActive(true);
      }
      setScore(true)
    } 
  };
  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
    setIsActive(false);
   ref.current.classList.remove("correct","wrong")
  };
  const handleRetake = () => {
    setIndex(0)
    setCount(0)
  }
  return (
    <div className="Quiz">
      {index < Questions.length ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Quizes</h1>
           {score&&<span style={{ color: "rgb(15, 63, 15)", fontSize: "18px" }}>
              you answered {count} out of {index+1}
            </span>} 
          </div>
          <hr />
          <h3>{Questions[index].question}</h3>
          <ul className={isActive ? "disable" : null}>
            {Questions[index].Answers.map((ans, i) => (
              <li
                key={i}
                onClick={(e) => {
                  highlightAnswer(e, ans.isTrue);
                }}
              >
                {ans.choice}
              </li>
            ))}
          </ul>
          {isActive && <button onClick={handleNext}>next</button>}
        </>
      ) : (
        < article>
          <p
            style={{ fontSize: "18px", color: "rgb(3, 75, 111)" }}
          >{`your total score is :${count} out of ${Questions.length}`}</p>
          <button onClick={handleRetake}>Retake Quiz</button>
        </article>
      )}
    </div>
  );
};

export default QuizApp;
