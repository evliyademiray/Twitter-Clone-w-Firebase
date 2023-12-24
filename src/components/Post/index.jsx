import React, { useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment";
import "moment/locale/tr";
import { auth, db } from "../../firebase/config";
import DropDown from "../../components/Post/DropDown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  //Tweet'in atılma tarihini hesaplama
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  //Aktif kullanıcı bu tweet'in likes dizisi içinde var mı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  //Tweet'i Kaldırır
  const handleDelete = async () => {
    if (confirm("Silinsin mi?")) {
      //Kaldıracağımız dökümanın referansını alma
      const tweetRef = doc(db, "tweets", tweet.id);

      //dökümanı kaldır
      await deleteDoc(tweetRef);
    }
  };

  //Like olayını izler
  const handleLike = async () => {
    //Güncellenecek belgenin referansını alma
    const ref = doc(db, "tweets", tweet.id);

    //Aktif kullanıcının id'sine likes dizisine ekle
    await updateDoc(ref, {
      likes: isLiked // Bu kullanıcı tweet'i likeledi mi?
        ? arrayRemove(auth.currentUser.uid) //Like kaldır
        : arrayUnion(auth.currentUser.uid), //Like at
    });
  };

  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-image"
      />

      <div className="w-full">
        {/* Üst Kısım > kullanıcı bilgileri */}
        <div className="flex justify-between ">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replace("", "_")}
            </p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* Orta Kısım > tweet içeriği */}
        <div className="my-3">
          {isEditMode && (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          )}

          {!isEditMode &&  tweet.textContent && (
            <p className="my-2">{tweet.textContent}</p>
          )}
          {!isEditMode && tweet.imageContent && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* Alt Kısım > etkileşim butonları */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>

          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#32743069]">
            <FaRetweet />
          </div>

          <div
            onClick={handleLike}
            className="flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#97425d68]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>

          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#5a5a5a69]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
