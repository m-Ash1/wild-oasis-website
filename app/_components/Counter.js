"use client";
import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Plus
      </button>
      <div className="counter">{count}</div>
    </>
  );
}

export default Counter;
