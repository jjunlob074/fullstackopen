import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <p><strong>Total Exercises of the course: {course.totalExercises}</strong></p>
        </div>
    );
};

export default Course;
