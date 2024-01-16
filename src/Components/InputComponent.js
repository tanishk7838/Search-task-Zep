import React, { useEffect, useState } from "react";
import "./InputComponent.css";
import { MdOutlineCancel } from "react-icons/md";
const InputComponent = () => {
const [listItem, setListItem] = useState([
    {
      id: 1,
      name: "Tanishk",
      email: "tanishk@gmail.com",
      pic: "https://w0.peakpx.com/wallpaper/613/983/HD-wallpaper-itachi-uchiha-sharingan-artwork-naruto-uchiha-itachi-naruto-characters.jpg",
    },
    {
      id: 2,
      name: "Saqlain Ali",
      email: "ali@gmail.com",
      pic: "https://w0.peakpx.com/wallpaper/826/952/HD-wallpaper-obito-uchiha-anime-characters-manga-naruto.jpg",
    },
    {
      id: 3,
      name: "Umang",
      email: "umang@gmail.com",
      pic: "https://w0.peakpx.com/wallpaper/628/394/HD-wallpaper-itachi-uchiha-characters-manga-naruto.jpg",
    },
    {
      id: 4,
      name: "Manish",
      email: "manish@gmail.com",
      pic: "https://w0.peakpx.com/wallpaper/782/768/HD-wallpaper-konan-rain-naruto-manga-artwork-naruto-characters.jpg",
    },
    {
      id: 5,
      name: "Pavitra",
      email: "pavitra@gmail.com",
      pic: "https://w0.peakpx.com/wallpaper/57/476/HD-wallpaper-hinata-hyuga-naruto-characters-hinata-uzumaki-manga-artwork-naruto.jpg",
    },
    {
      id: 6,
      name: "Utsav",
      email: "utsav@gmail.com",
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhYMXIClcLvpzmbO-nlgOe09ET0PguijVwsSagrzgQzj27bh-huWePbX4JQ&s",
    },
    {
      id: 7,
      name: "Kalash",
      email: "kalash@gmail.com",
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbNCbPxofTjjEAC163UWLRIyMIf4VbQhsOjCNAGzekgBDVmBAf7WXjxgb1ZQ&s",
    },
    {
      id: 8,
      name: "Manvi",
      email: "manvi@gmail.com",
      pic: "https://w0.peakpx.com/wallpaper/666/961/HD-wallpaper-anime-jujutsu-kaisen-satoru-gojo.jpg",
    },
    {
      id: 9,
      name: "Raftaar",
      email: "shashu@gmail.com",
      pic: "https://w.forfun.com/fetch/aa/aac4a30fd1e63f7030f489864dfd445d.jpeg",
    },
    {
      id: 10,
      name: "Shashank",
      email: "shashank@gmail.com",
      pic: "https://wallpapers.com/images/high/naruto-pictures-59j4py5kpauv4mgu.webp",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = listItem.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [prevSearch, setPrevSearch] = useState([])
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const handleClick = (item) => {
    setSelectedItem(prev=>[...prev, item]);
    setListItem(listItem.filter((i) => i.id !== item.id));
  };
  const handleCancelButton = (item) => {
    setSelectedItem(prev=>{
      setPrevSearch(prev)
      return prev.filter((ele) => ele.id != item.id)
    });
    setListItem([...listItem, item]);
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showList]);
  const handleOutsideClick = (event) => {
    if (showList && event.target.closest("body") === null) {
      setShowList(false);
    }
  };

  const handleKeyDown = (event) =>{
    if(event.key === 'Backspace'){
      setSelectedItem(prevSearch)
      setBackspaceCount(backspaceCount + 1);
      if (backspaceCount >= 2) {
        setSelectedItem([])
        setBackspaceCount(0);
      }
    }
  }
  return (
    <div className="container">
      <div className="section-1">PICK USERS</div>
      <div className="section-2">
        {selectedItem.map((item, index) => {
          return (
            <div key={index} className="section-2-1">
              <p className="section-p">
                <img src={`${item.pic}`} className="section-img" />
              </p>
              <p>{item.name}</p>
              <button onClick={() => handleCancelButton(item)}>
                <MdOutlineCancel />
              </button>
            </div>
          );
        })}
        <input
          type="text"
          placeholder="Add More User..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setShowList(!showList)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showList && (
        <div className="section-3">
          {filteredOptions.map((option, index) => (
            <div onClick={() => handleClick(option)} className="section-3-1">
              <p className="section-p">
                <img src={`${option.pic}`} className="section-img" />
              </p>
              <p>{option.name}</p>
              <p>{option.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputComponent;
