//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Frenzone{

    uint public totalPosts=0;
    
    event post(address user,uint id ,string filehash,uint time,string desc);

    struct Post{
        address user;
        uint id;
        string filehash;
        uint timestamp;
        string desc;
    }

    Post[]  posts;

    function setHash(string memory _fileHash,string memory _desc) public{
        posts.push(Post(msg.sender,totalPosts,_fileHash,block.timestamp,_desc));
        emit post(msg.sender,totalPosts , _fileHash,block.timestamp,_desc);
        totalPosts++;
    }

    function getAllPosts() public view returns(Post[] memory) {
        return posts;
    }

}
