import React from "react";
import { useGlobalContext } from "../context";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const { currentAccount, connectWallet } = useGlobalContext();

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 mb-3">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <h1 className="font-bold text-5xl ">
          DAPPIMAGES
        </h1>
      </div>
      <ul className="text-white md:flex  list-none flex-row justify-between items-center flex-initial">
        <li>
          {currentAccount ? (
            <p className="text-red-500 text-2xl font-bold">
              {currentAccount.slice(0, 4) +
                "..." +
                currentAccount.slice(39, 42)}
            </p>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center  hover:bg-[#e3dac9] p-2 px-3 rounded-full cursor-pointer bg-red-500"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
