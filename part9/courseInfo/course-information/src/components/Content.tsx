interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: [string, string];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground |CoursePartSpecial;

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div key={part.name}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>{part.description}</p>
              </div>
            );
          case 'group':
            return (
              <div key={part.name}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            );
          case 'background':
            return (
              <div key={part.name}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>{part.description}</p>
                <p>
                  submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                </p>
              </div>
            );
          case 'special':
          return (
            <div key={part.name}>
              <h3>{part.name} {part.exerciseCount}</h3>
              <p>{part.description}</p>
              <p>
                required skills: {part.requirements[0]}, {part.requirements[1]}
              </p>
            </div>
          );
          default:
            return null;
        }
      })}
    </div>
  );
};
