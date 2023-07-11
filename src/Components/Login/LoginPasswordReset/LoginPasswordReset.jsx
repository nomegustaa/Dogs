import React, { useEffect, useState } from "react";
import Input from "../../../Utils/Forms/Input/Input";
import UseForm from "../../../Hooks/UseForm";
import Button from "../../../Utils/Forms/Button/Button";
import { PASSWORD_RESET } from "../../../Api/api";
import UseFetch from "../../../Hooks/UseFetch";
import Error from "../../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../../Helper/Head/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = UseForm();
  const { error, loading, request } = UseFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate("/login");
    }
  };
  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
