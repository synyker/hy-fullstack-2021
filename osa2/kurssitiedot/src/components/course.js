import React from 'react'

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  const { name } = props;
  return <h2>{name}</h2>;
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
  const { parts } = props;
  const total = parts.reduce((a, b) => ({ exercises: a.exercises + b.exercises }))
  return (
    <p>
      Number of exercises {total.exercises}
    </p>
  );
};

export default Course
