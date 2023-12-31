import React, { useState } from "react";
import { ReactComponent as Enviar } from "../../../assets/enviar.svg";
import UseFetch from "../../../Hooks/UseFetch";
import { COMMENT_POST } from "../../../Api/api";
import Error from "../../Helper/Error";
import styles from "../PhotoCommentsForm/PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = useState("");
  const { request, error } = UseFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  };

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />

      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
