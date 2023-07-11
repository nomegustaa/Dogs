import React, { useEffect } from "react";
import styles from "../FeedModal/FeedModal.module.css";
import UseFetch from "../../../Hooks/UseFetch";
import { PHOTO_GET } from "../../../Api/api";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading/Loading";
import PhotoContent from "../../Photo/PhotoContent/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = UseFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) setModalPhoto(null);
  };

  return (
    <div onClick={handleOutsideClick} className={styles.modal}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
