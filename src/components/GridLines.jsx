const GridLines = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-0 pointer-events-none">
      {/* Vertical Lines */}
      <div className="absolute top-0 left-[14.25%] sm:left-[20%] w-[1px] h-full bg-greyBorder"></div>
      <div className="absolute top-0 left-[50%] w-[1px] h-full bg-greyBorder"></div>
      <div className="absolute top-0 right-[14.25%] sm:right-[20%] w-[1px] h-full bg-greyBorder"></div>
    </div>

  );
};

export default GridLines
