const Banner = (props) => {
  const { classname } = props;
  return (
    <div className={classname}>
      <img src="/images/Logo.png" alt="logo" className="w-7" />
      <h1 className="text-2xl font-semibold">SIMS PPOB</h1>
    </div>
  );
};

export default Banner;
