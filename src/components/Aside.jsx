import {
  average,
  collection,
  count,
  getAggregateFromServer,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const tweetCol = collection(db, "tweets");
  const [data, setData] = useState(null);
  //Dökümanlarımızla alakalı istatistik hesaplar
  //1-Kolleksiyon referansını ister.
  //2-sum/average/count metodları yardımıyla rapor adımları belirle

  useEffect(() => {
    getAggregateFromServer(tweetCol, {
      tweetsCount: count(),
    }).then((data) => setData(data._data));
  }, []);

  return (
    <div className="max-lg:hidden">
      <p className="my-5 text-align-center p-3 text-lg">
        Toplam Tweet sayısı: {data?.tweetsCount.integerValue}
      </p>
    </div>
  );
};

export default Aside;
