import { useState, useEffect } from "react";

export default function Trivial({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (q) => {
    setSelectedAnswer(q);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(q.correct ? "answer correct" : "answer wrong")
    );
    delay(6000, () => {
      if (q.correct) {
        setQuestionNumber((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div className="trivial">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((q) => (
          <div
            className={selectedAnswer === q ? className : "answer"}
            onClick={() => handleClick(q)}
          >
            {q.text}
          </div>
        ))}
      </div>
    </div>
  );
}
