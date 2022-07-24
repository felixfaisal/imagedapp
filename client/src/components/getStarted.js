function GetStarted() {
  return (
    <section
      className="bg-mainBg text-gray-300 "
      id="getStarted w-[80vw max-w-[700px]"
    >
      <div className="px-4 py-10 mx-auto font-rubik sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2  mb-4">
          <div className="pt-2 lg:pt-7">
            <h2 className="font-rubik text-center sm:inline-block pb-3 font-extrabold tracking-wide text-3xl sm:text-4xl mt-4 sm:mt-7 text-gray-300 sm:leading-none">
              Welcome To Frenzone
            </h2>
            <p className="font-raj text-center lg:text-left tracking-wider pt-2">
              Frenzone is a social media platform. You can post your content{" "}
              here on Polygon mumbai testnet
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div>
              <img
                src=""
                className="w-28 h-28 sm:w-60 sm:h-60 secure-shadow"
                alt="Security"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
