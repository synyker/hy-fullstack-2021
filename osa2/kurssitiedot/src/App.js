import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14,
      },
      {
        id: 4,
        name: "Extra part",
        exercises: 6,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={course.parts} /> */}
    </div>
  );
};

const Header = (props) => {
  const { name } = props;
  return <h1>{name}</h1>;
};

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      { parts && parts.map(part => {
        return <Part key={`part-${part.id}`} part={part.name} exercises={part.exercises} />
      })}
    </div>
  );
};

const Part = (props) => {
  const { part, exercises } = props;
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = (props) => {
  const { parts } = props
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises +
        parts[1].exercises +
        parts[2].exercises}
    </p>
  );
};

export default App;
