import { useContext, FormEvent, useState } from "react";
import type { NextPage } from "next";
import styles from "../../styles/home.module.scss";
import Head from "next/head";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";
import { canSSRGuest } from "../utils/canSSRGuest";
import { Logo } from "../components/Logo";

const Home: NextPage = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email == "" || password == "") {
      alert("preencha osd ados");
      return;
    }

    setLoading(true);

    let data = {
      email: email,
      password: password,
    };

    await signIn(data);
    setLoading(false);
  }


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles["container"]}>
        <Logo />

        <div className={styles["login__container"]}>
          <form onSubmit={handleLogin}>
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

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {}
  }
})