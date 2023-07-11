import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";
import { PHOTO_GET } from "../../Api/api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading/Loading";
import PhotoContent from "./PhotoContent/PhotoContent";
import Head from "../Helper/Head/Head";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = UseFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
