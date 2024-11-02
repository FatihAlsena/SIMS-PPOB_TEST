const Img = (props) => {
  const { classname, src, alt } = props;
  return <img src={src} alt={alt} className={classname} />;
};

export default Img;
