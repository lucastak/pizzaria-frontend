import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../../../styles/home.module.scss";
import Head from "next/head";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

const SignUp: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Faça seu cadastro</title>
      </Head>
      <div className={styles["container"]}>
        <h1 className={styles["title__login-page"]}>Pizzaria</h1>
        <h2 className={styles["subtitle__signup-page"]}>Crie sua conta</h2>

        <div className={styles["login__container"]}>
          <form>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
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
