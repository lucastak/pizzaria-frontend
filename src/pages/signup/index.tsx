import React, { useState, FormEvent, useContext } from "react";
import type { NextPage } from "next";
import styles from "../../../styles/home.module.scss";
import Head from "next/head";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";

import Link from "next/link";

const SignUp: NextPage = () => {
  const {signUp} = useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    if (name === '' || email === '' || password === '') {
      alert('Preencha todos os campos')
      setLoading(false);
      return
    }
    await signUp({ name, email, password });
    setLoading(false);
    
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro</title>
      </Head>
      <div className={styles["container"]}>
        <h1 data-testid="teste" className={styles["title__login-page"]}>Pizzaria</h1>
        <h2 className={styles["subtitle__signup-page"]}>Crie sua conta</h2>

        <div className={styles["login__container"]}>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <a className={styles["login__signup"]}>
              Já possui uma conta? Faça login
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
