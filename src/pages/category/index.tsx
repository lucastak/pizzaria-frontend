import React, { FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss"
import { setupApiClient } from "../../services/api";




export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') return;

        const apiClient = setupApiClient();
        await apiClient.post('/category', {
            name: name
        })
        
        setName('');
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