import React, { useContext } from "react";
import Input from "../../../Utils/Forms/Input/Input";
import Button from "../../../Utils/Forms/Button/Button";
import Error from "../../Helper/Error";
import UseForm from "../../../Hooks/UseForm";
import { USER_POST } from "../../../Api/api";
import { UserContext } from "../../../Context/UseContext";
import UseFetch from "../../../Hooks/UseFetch";
import Head from "../../Helper/Head/Head";

const LoginCreate = () => {
  const username = UseForm();
  const email = UseForm("email");
  const password = UseForm();

  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = UseFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    console.log(response);
    if (response.ok) userLogin(username.value, password.value);
  };

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;