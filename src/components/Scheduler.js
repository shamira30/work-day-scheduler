import React, { useState, useEffect } from 'react';
import TimeSlot from './TimeSlot';
import styled from 'styled-components';
import { getHours, isPast, isFuture } from 'date-fns';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em 0;
`;

const TimeSlots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-width: 600px;
`;

const workHours = Array.from({ length: 9 }, (_, i) => 9 + i);

function Scheduler() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Wrapper>
      <h1>Work Day Scheduler</h1>
      <TimeSlots>
        {workHours.map(hour => {
          const currentTask = tasks.find(task => task.hour === hour);
          const currentTime = getHours(new Date());

          let timeStatus;
          if (hour < currentTime) {
            timeStatus = 'past';
          } else if (hour > currentTime) {
            timeStatus = 'future';
          } else {
            timeStatus = 'present';
          }

          return (
            <TimeSlot
              key={hour}
              hour={hour}
              task={currentTask}
              timeStatus={timeStatus}
              setTasks={setTasks}
            />
          );
        })}
      </TimeSlots>
    </Wrapper>
  );
}

export default Scheduler;
