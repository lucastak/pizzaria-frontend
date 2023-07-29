import React, { FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss"


export default function Category() {
    const [name, setName] = useState('');

    function handleRegister(event: FormEvent) {
        event.preventDefault();

        alert("name " + name)
    }

    return (
        <>
            <Head>
                <title>Categoria</title>
            </Head>
            <Header />
            <main>
                <form className={styles["form-category__container"]} onSubmit={handleRegister}>
                    <h2>Cadastrar categoria</h2>

                    <input
                        type="text"
                        placeholder="Digite o nome da categoria"
                        className={styles["form-category__input"]}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button type="submit" className={styles["form-category__button"]}>
                        Cadastrar
                    </button>
                </form>
            </main>
        </>  
    );
}