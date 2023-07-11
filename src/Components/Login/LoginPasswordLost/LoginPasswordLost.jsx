import React from "react";
import Input from "../../../Utils/Forms/Input/Input";
import Button from "../../../Utils/Forms/Button/Button";
import useForm from "../../../Hooks/UseForm";
import UseFetch from "../../../Hooks/UseFetch";
import { PASSWORD_LOST } from "../../../Api/api";
import Error from "../../Helper/Error";
import Head from "../../Helper/Head/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = UseFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });
      request(url, options);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha?" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
