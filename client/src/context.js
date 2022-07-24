import React, { useContext, useState, useEffect } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const AppContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
  let provider = new ethers.providers.Web3Provider(ethereum);
  let signer = provider.getSigner();
  let ImageContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  return ImageContract;
};

const AppProvider = ({ children }) => {
  const [file, settFile] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [desc, setDesc] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const checkWalletIsConnected = async () => {
    try {
      if (!ethereum) alert("please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("no accounts found");
      }
      getAllImages();
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentAccount = async () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount("");
      }
    });
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) alert("please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      document.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("no ethereum object");
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
    getAllImages();
  }, []);

  useEffect(() => {
    getCurrentAccount();
  }, [currentAccount]);

  const descHandle = (e) => {
    setDesc(e.target.value);
  };

  const retrieveFile = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      setSelectedImage(added.path);
      console.log(added.path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!ethereum) alert("please install metamask");
      const postContract = getEthereumContract();
      console.log(selectedImage);
      const setHashTxn = await postContract.setHash(selectedImage, desc);
      await setHashTxn.wait();
      getAllImages();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllImages = async () => {
    try {
      if (ethereum) {
        const postContract = getEthereumContract();
        const availableImages = await postContract.getAllPosts();

        const structuredPosts = availableImages.map((transaction) => ({
          user: transaction.user,
          id: parseInt(transaction.id),
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          filehash: transaction.filehash,
          desc: transaction.desc,
        }));
        let newPosts = structuredPosts.reverse();
        setPosts(newPosts);
        // const url = `https://ipfs.infura.io/ipfs/${path}`;
        setPostLoading(false);
      } else {
        throw new Error("no ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        file,
        settFile,
        currentAccount,
        connectWallet,
        retrieveFile,
        handleSubmit,
        getAllImages,
        setPosts,
        posts,
        desc,
        descHandle,
        postLoading,
        setPostLoading,
        selectedImage,
        setSelectedImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
