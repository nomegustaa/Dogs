import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../Utils/Forms/Input/Input";
import Button from "../../../Utils/Forms/Button/Button";
import stylesBtn from "../../../Utils/Forms/Button/Button.module.css";
import UseForm from "../../../Hooks/UseForm";
import { UserContext } from "../../../Context/UseContext";
import Error from "../../Helper/Error";
import styles from "../LoginForm/LoginForm.module.css";
import Head from "../../Helper/Head/Head";

const LoginForm = () => {
  const username = UseForm();
  const password = UseForm();

  const { userLogin, error, loading } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };
  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && "Dados incorretos"} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
