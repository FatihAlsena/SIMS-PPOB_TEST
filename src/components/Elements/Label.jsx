const Label = (props) => {
  const { variant, title, name } = props;
  return (
    <label htmlFor={name} className={variant}>
      {title}
    </label>
  );
};
export default Label;
