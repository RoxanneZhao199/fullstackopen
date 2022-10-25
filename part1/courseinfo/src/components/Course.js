const Header = ({ header }) => <h1>{header}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>


const Total = ({ sum }) => <p><strong>Total of {sum} exercises</strong></p>

const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  )
}

export default Course
