import React, { useState } from "react";
import styled from "styled-components";

const TimeSlotWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: ${({ timeStatus }) =>
    timeStatus === "past"
      ? "#f8d7da"
      : timeStatus === "future"
      ? "#cce5ff"
      : "#d4edda"};
  border-radius: 5px;
`;

const Hour = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

const TaskInput = styled.input`
  flex: 1;
  margin: 0 1em;
  &:disabled {
    opacity: 0.4;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5em 1em;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function TimeSlot({ hour, task, timeStatus, setTasks }) {
  const [inputValue, setInputValue] = useState(task?.description || "");

  const handleSave = () => {
    if (task) {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
          prevTask.hour === hour
            ? { ...prevTask, description: inputValue }
            : prevTask
        )
      );
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        { hour, description: inputValue },
      ]);
    }
  };

  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.hour !== hour)
    );
    setInputValue("");
  };

  return (
    <TimeSlotWrapper timeStatus={timeStatus}>
      <Hour>
        {hour < 12 ? `${hour} AM` : `${hour === 12 ? hour : hour - 12} PM`}
      </Hour>
      <TaskInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={timeStatus === "past"}
      />
      <div>
        <Button
          onClick={handleSave}
          disabled={!inputValue || timeStatus === "past"}
        >
          Save
        </Button>
        {task && (
          <Button onClick={handleDelete} style={{ marginLeft: "1em" }}>
            Delete
          </Button>
        )}
      </div>
    </TimeSlotWrapper>
  );
}

export default TimeSlot;
