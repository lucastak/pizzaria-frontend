import type { NextPage } from "next";
import styles from "../../styles/home.module.scss";
import Head from "next/head";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles["container"]}>
        <h1 className={styles["title__login-page"]}>Pizzaria</h1>

        <div className={styles["container__login"]}>
          <Input placeholder="Digite seu email" type="text" />
          <Input placeholder="Digite sua senha" type="password" />
          <Button type="submit" loading={false}>
            Acessar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
