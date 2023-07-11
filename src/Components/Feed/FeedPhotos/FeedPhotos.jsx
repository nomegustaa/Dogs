import React, { useEffect } from "react";
import FeedPhotoItem from "../FeedPhotosItem/FeedPhotoItem";
import UseFetch from "../../../Hooks/UseFetch";
import Error from "../../Helper/Error";
import { PHOTOS_GET } from "../../../Api/api";
import Loading from "../../Helper/Loading/Loading";
import styles from "../FeedPhotos/FeedPhotos.module.css";

const FeedPhotos = ({ page, user, setInfinite, setModalPhoto }) => {
  const { data, loading, error, request } = UseFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
    };
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotoItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
