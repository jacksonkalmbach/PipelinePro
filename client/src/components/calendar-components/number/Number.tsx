import React from "react";

import "./Number.styles.scss";

interface NumberProps {
  date: Date;
  day: Date;
}

const Number = ({ date, day }: NumberProps) => {
  const number = day.getDate();

  return (
    <div
      className={`number-container ${
        date.getDate() === day.getDate() && "today"
      }`}
    >
      {number}
    </div>
  );
};

export default Number;
