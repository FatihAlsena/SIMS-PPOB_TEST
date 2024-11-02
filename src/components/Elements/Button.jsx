const Button = (props) => {
  const { children, type, variant, onClick } = props;
  return (
    <button className={variant} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
