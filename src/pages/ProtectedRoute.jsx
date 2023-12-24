import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  //Kullanıcının yetkisi var mı?
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //Anlık olarak kullanıcının oturumunu izler
    // verdiğimiz her oturum değiştiğinde çalışır
    //ve parametre olarak aktif kullanıcıyı alır
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsub();
  }, []);

  //Kullanıcı yetkisi yoksa login'e gönder.
  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }

  //Kullanıcının yetkisi varsa alt Route'a geçmesine izin ver
  return <Outlet />;
};

export default ProtectedRoute;
