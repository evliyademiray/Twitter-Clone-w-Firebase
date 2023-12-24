import React, { useRef } from "react";

const DropDown = ({ handleDelete, setIsEditMode }) => {

  const checkboxRef = useRef()
  return (
    <label class="popup">
      <input ref={checkboxRef}  type="checkbox" />
      <div class="burger" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="popup-window">
        <legend>Eylemler</legend>
        <ul>
          <li>
            <button onClick={() =>{setIsEditMode(true)
            //Input'un checked değerini false'a çekeceğiz
            //menünün kapanması için
            checkboxRef.current.checked = false;}
            }>
              <img src={"/edit.svg"} />
              <span>Düzenle</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              <img src={"/delete.svg"} />
              <span>Sil</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default DropDown;
