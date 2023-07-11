import React from "react";
import styles from "../PhotoDelete/PhotoDelete.module.css";
import { PHOTO_DELETE } from "../../../Api/api";
import UseFetch from "../../../Hooks/UseFetch";

const PhotoDelete = ({ id }) => {
  const token = window.localStorage.getItem("token");
  const { loading, request } = UseFetch();

  const handleClick = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      console.log(response);
      if (response.ok) window.location.reload();
    }
  };
  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
