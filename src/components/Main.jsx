import React, { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "./Spinner";
import Post from "./Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  //Kolleksiyonun referansını alma
  const tweetsCol = collection(db, "tweets");

  //Filtreleme ayarları tanımla
  const options = query(tweetsCol, orderBy("createdAt", "desc"));

  useEffect(() => {
    //Tweetler kolleksiyonuna abone ol
    const unsub = onSnapshot(options, (snapshot) => {
      //Geçici dizi
      const tempTweets = [];

      //Bütün dökümanları dön ve id'lerinden oluşan objeleri geçici diziye aktar
      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));

      //Geçici dizideki verileri state'e aktar
      setTweets(tempTweets);
    });

    return () => unsub();
  }, []);

  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px]">Anasayfa</header>

      <Form user={user} />

      {/* Tweetleri Listele */}
      {!tweets ? (
        <div className="flex justify-center my-10 ">
          <Spinner style={"w-6 h-6 text-blue-600 "} />
        </div>
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
};

export default Main;
