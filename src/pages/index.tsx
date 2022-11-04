import { useContext, FormEvent } from "react";
import type { NextPage } from "next";
import styles from "../../styles/home.module.scss";
import Head from "next/head";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";

const Home: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "teste@teste.com",
      password: "senha",
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles["container"]}>
        <h1 className={styles["title__login-page"]}>Pizzaria</h1>

        <div className={styles["login__container"]}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <a className={styles["login__signup"]}>
              Não possui uma conta? Cadastre-se
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
