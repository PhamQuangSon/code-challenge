interface IProps {
  title: string;
  classExtend?: string;
}
const Button = (props: IProps) => {
  return (
    <button
      type="submit"
      className={`bg-gray-200 border hover:text-background text-gray-800  ${props?.classExtend}`}
    >
      {props.title}
    </button>
  );
};

export default Button;
