interface HeaderProps {
  courseName: string;
}

export const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};
