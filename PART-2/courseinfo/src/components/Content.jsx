import Part from "./Part";
const Content = ({ parts }) => (
  <>
  <h3>Content of this course:</h3>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export default Content;
