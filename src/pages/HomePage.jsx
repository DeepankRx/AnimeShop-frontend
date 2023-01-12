import React from "react";

const HomePage = () => {
  return (
    <div className="w-[80%] m-auto mdrev:w-[90%]">
    <div className="grid mdrev:grid-cols-1 grid-cols-2 m-4 mt-10 gap-4 ">
      <div className="col-span-1 px-8 space-y-10">
        <div>Lorem ipsum dolor sit amet.</div>
        <div className="text-2xl font-bold ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iste
          mollitia vitae maiores temporibus laboriosam dolore laborum aut, natus
          asperiores.
        </div>
        <div className="font-semibold text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, illo
          odit? Provident, laborum. Vero nemo quam ipsum, totam, voluptate sint,
          autem amet impedit ex nam possimus inventore similique rerum
          consectetur?
        </div>
        <div className="bg-black text-white rounded-sm w-[200px] p-1 flex justify-center items-center ">Signup</div>
      </div>
      <div className="col-span-1 flex gap-4 ">
        <div className="h-[400px] w-[200px] flex flex-col gap-4 ">
          <div className="bg-green-400 w-[100%] h-[60%] rounded-full rounded-br-sm"></div>
          <div className="bg-orange-400 w-[100%] h-[50%] rounded-full rounded-tr-none"></div>
        </div>
        <div className="h-[400px] w-[200px] rounded-full bg-pink-400"></div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
