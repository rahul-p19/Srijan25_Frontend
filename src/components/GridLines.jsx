const GridLines = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        {/* Vertical Lines */}
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white"></div>
        <div className="absolute top-0 left-[50%] w-[1px] h-full bg-white"></div>
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-white"></div>
      </div>
  
    );
  };
  
export default GridLines