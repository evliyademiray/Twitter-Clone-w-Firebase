import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";
import Nav from "../components/Nav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const FeedPage = () => {
  const [user, setUser] = useState(null);
  //Kullanıcı bilgisine abone ol
  useEffect(() => {
    //Anlık olarak aktif kullanıcının bilgisine abone olduk.
    //Kullanıcı değiştiği anda mevcut kullanıcının bilgisini state'e aktardık
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser));

    //Kullanıcı anasayfadan ayrılırsa aboneliği sonlandırdık.
    return () => unsub();
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default FeedPage;
