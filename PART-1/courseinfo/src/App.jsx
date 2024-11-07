// PLANTILLA INICIAL DE UNICAFE

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <h1>{course}</h1>
//       <p>
//         {part1} {exercises1}
//       </p>
//       <p>
//         {part2} {exercises2}
//       </p>
//       <p>
//         {part3} {exercises3}
//       </p>
//       <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
//     </div>
//   )
// }

// #############################################

// SOLUCION EJERCICIOS 1.1-1.5

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} =&gt; {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
    <h2>Parts of the course:</h2>
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
    </>
  );
};

const Total = ({ total }) => {
  return (
    <>
    <h3>Total of exercises:</h3>
    <p><b>Number of exercises: {total}</b></p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </>
  )
}

export default App