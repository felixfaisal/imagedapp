import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import "./App.css";
import Footer from "./components/footer";
import Loader from "./components/loader";
import Navbar from "./components/navbar";
import "./index.css";
const App = () => {
  const {
    currentAccount,
    retrieveFile,
    handleSubmit,
    getAllImages,
    descHandle,
    posts,
    desc,
    postLoading,
    selectedImage,
  } = useGlobalContext();

  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <main>
      <Navbar />
      {!currentAccount ? (
        ""
      ) : (
        <section className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit}
            className="flex justify-start items-center flex-col
            w-[80vw] max-w-[700px]
            border-[1px] border-[#e3dac9] border-solid p-6 rounded-md"
          >
            <input
              onChange={retrieveFile}
              type="file"
              name="upload"
              id="upload"
              placeholder="Upload File"
            />
            {selectedImage ? (
              <img
                src={`https://ipfs.infura.io/ipfs/${selectedImage}`}
                alt=""
                className="w-[250px] h-[250px] object-cover my-2"
              />
            ) : (
              ""
            )}
            <br />
            <br />
            <textarea
              onChange={(e) => descHandle(e)}
              value={desc}
              className="flex justify-start items-center flex-col
   bg-[transparent]  w-[70%] focus:border-[#e3dac9]
            border-[1px] border-[#e3dac9] border-solid p-6 rounded-md h-[250px]"
              placeholder="Post Caption"
            ></textarea>
            <br />
            <br />
            <button
              type="submit"
              className="flex flex-row justify-center items-center  p-2 px-3 cursor-pointer bg-[transparent]  font-bold w-[30%] text-2xl
              border-[1px] border-[#e3dac9] border-solid  text-[#e3dac9]
              hover:bg-[#e3dac9] hover:text-white
              "
            >
              POST
            </button>
          </form>
        </section>
      )}
      {postLoading ? (
        <Loader />
      ) : (
        <div
          className="flex justify-center items-center 
 mt-20 
        "
        >
          <div className="flex-col justify-center items-center ">
            {posts.map((item) => {
              const { user, id, filehash, timestamp, desc } = item;
              return (
                <div
                  key={id}
                  class=" rounded overflow-hidden w-[80vw] max-w-[700px]  bg-[transparent] mx-3 md:mx-0 lg:mx-0
        border-[1px] border-[#e3dac9] border-solid  text-[#e3dac9]
        flex justify-center items-center flex-col
        m-5
      "
                >
                  <div class="w-[100%] flex justify-between p-3">
                    <div class="flex">
                      <div
                        class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden
                 
            "
                      >
                        <img
                          src="https://cdna.iconscout.com/img/Rectangle.f298e95.png"
                          alt="profilepic"
                        />
                      </div>
                      <span class="pt-1 ml-2 font-bold text-2xl">
                        {user.slice(0, 4) + "..." + user.slice(39, 42)}
                      </span>
                      <p className="text-sm p-3">{timestamp}</p>
                    </div>
                    <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">
                      <i class="fas fa-ellipsis-h pt-2 text-lg"></i>
                    </span>
                  </div>
                  <div class="mb-2">
                    <div class="mb-2 text-lg p-2">
                      <h3>{desc}</h3>
                    </div>
                  </div>
                  <img
                    class=" bg-cover h-[250px] w-[90%] p-2 object-cover"
                    src={`https://ipfs.infura.io/ipfs/${filehash}`}
                  />
                </div>
              );
            })}
            <Footer />
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
