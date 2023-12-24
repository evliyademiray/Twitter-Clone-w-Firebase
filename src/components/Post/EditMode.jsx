import React, { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { SlReload } from "react-icons/sl";

const EditMode = ({ tweet, close }) => {
  const inputRef = useRef();

  //Resim silinecek mi state'i
  const [isPictureDeleting, setIsPictureDeleting] = useState(false);

  //Kaydet butonuna tıklanınca çalışır
  const handleSave = () => {
    //1-Inputun içeriğine eriş
    const newText = inputRef.current.value;
    console.log(newText);

    //2-Güncellenecek dökümanın referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);

    //3-Dökümanın textContentini güncelle
    //*Eğer resim silinecekse imageContentini null yap
    if (isPictureDeleting) {
      updateDoc(tweetRef, { textContent: newText, imageContent: null });
    } else {
      updateDoc(tweetRef, { textContent: newText });
    }

    //4-Düzenleme modunu kapat
    close();
  };
  return (
    <>
      <input
        ref={inputRef}
        defaultValue={tweet.textContent}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full hover:bg-gray-500"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className=" p-2 text-red-800 rounded-full hover:bg-gray-500"
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={` ${
              isPictureDeleting ? "blur" : ""
            } my-2  rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />
          <button
            onClick={() => setIsPictureDeleting(!isPictureDeleting)}
            className=" absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 rounded-full hover:scale-90"
          >
            {isPictureDeleting ? <SlReload /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
