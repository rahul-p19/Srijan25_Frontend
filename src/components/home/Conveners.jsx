import { Call } from "@mui/icons-material";

function Conveners() {
  return (
    <div className="min-h-[40vh] grid grid-cols-7 grid-rows-5 lg:grid-rows-1 lg:grid-cols-5">
      <div className="hidden sm:flex relative row-span-4 border-greyBorder border-b lg:border-b-transparent col-span-7 lg:col-span-1">
        <div className="absolute left-[50%] top-[50%] -translate-[50%] w-5/7 h-full border-greyBorder border-l border-r lg:hidden"></div>
      </div>
      <div className="row-span-5 col-span-7 lg:col-span-3 border-greyBorder lg:border-l lg:border-r border-t flex flex-col p-4">
        <div className="grid lg:grid-cols-2 text-center gap-y-6">
            <h4>General Convener:</h4>
            <div className="flex flex-col items-center">
                <p>Dipayan Bhattacharyya</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+917044836127</p>
                </div>
            </div>
            <h4>Finance Conveners:</h4>
            <div className="flex flex-col items-center">
                <p>Harsham Mishra</p>
                <div className="flex gap-x-2 text-base items-center mb-1">
                    <Call fontSize="small" />
                    <p>+917980623712</p>
                </div>
                <p>Arindam Mukherjee</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+918697367852</p>
                </div>
            </div>
            <h4>On-day Conveners:</h4>
            <div className="flex flex-col items-center">
                <p>Supriti Sarkar</p>
                <div className="flex gap-x-2 text-base items-center mb-1">
                    <Call fontSize="small" />
                    <p>+8961716604</p>
                </div>
                <p>Gourab Paul</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+8961716604</p>
                </div>
            </div>
            <h4>Event Co-ordinators:</h4>
            <div className="flex flex-col items-center">
                <p>Ankush Agarwala</p>
                <div className="flex gap-x-2 text-base items-center mb-1">
                    <Call fontSize="small" />
                    <p>+919635609058</p>
                </div>
                <p>Samriddha Chakraborty</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+919330284935</p>
                </div>
            </div>
            <h4>Event POC:</h4>
            <div className="flex flex-col items-center">
                <p>Saumili Roy</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+917328809736</p>
                </div>
            </div>
            <h4>Tech Leads:</h4>
            <div className="flex flex-col items-center">
                <p>Anupam Ghosh</p>
                <div className="flex gap-x-2 text-base items-center mb-1">
                    <Call fontSize="small" />
                    <p>+917548005727</p>
                </div>
                <p>Rahul Pandey</p>
                <div className="flex gap-x-2 text-base items-center mb-1">
                    <Call fontSize="small" />
                    <p>+8961716604</p>
                </div>
                <p>Arnob Bhakta</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+919477719573</p>
                </div>
            </div>
            <h4>Sponsorship Lead:</h4>
            <div className="flex flex-col items-center">
                <p>Abhinandan Roy</p>
                <div className="flex gap-x-2 text-base items-center">
                    <Call fontSize="small" />
                    <p>+919903142457</p>
                </div>
            </div>
        </div>
      </div>
      <div className="grid row-span-1 lg:grid-rows-5 col-span-7 lg:col-span-1">
      </div>
    </div>
  );
}

export default Conveners;
