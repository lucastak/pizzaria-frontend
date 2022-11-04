import type { NextPage } from "next";
import styles from "../../styles/home.module.scss";
import Head from "next/head";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles["container"]}>
        <h1 className={styles["title__login-page"]}>Pizzaria</h1>

        <div className={styles["login__container"]}>
          <form>
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
