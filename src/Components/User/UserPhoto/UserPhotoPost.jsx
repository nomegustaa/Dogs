import React, { useEffect, useState } from "react";
import styles from "../UserPhoto/UserPhotoPost.module.css";
import Input from "../../../Utils/Forms/Input/Input";
import Button from "../../../Utils/Forms/Button/Button";
import UseForm from "../../../Hooks/UseForm";
import UseFetch from "../../../Hooks/UseFetch";
import Error from "../../Helper/Error";
import { PHOTO_POST, TOKEN_POST } from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import Head from "../../Helper/Head/Head";

const UserPhotoPost = () => {
  const nome = UseForm();
  const peso = UseForm("number");
  const idade = UseForm("number");
  const [img, setImg] = useState({});
  const { data, error, loading, request } = UseFetch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);
    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  };

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };
  useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);
  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>

      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
