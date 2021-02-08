import React from "react";

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      { courses && courses.map(course => {
        return <Course key={`course-${course.id}`} course={course} />
      })}
    </div>
  );
};

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

export default App;
