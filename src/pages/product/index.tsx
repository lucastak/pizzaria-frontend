/* eslint-disable @next/next/no-img-element */
import React, {ChangeEvent, useState} from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { FiUpload } from "react-icons/fi";

export default function Product() {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const image = event.target.files[0];
        if (!image) return;

        if (image.type === "image/jpeg" || image.type === "image/png") {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }

    }

    return (
        <>
            <Head>
                <title>Novo Produto</title>
            </Head>
                <div>
                    <Header />
                    <main className={styles["product__container"]}>
                        <h2>Novo Produto</h2>

                        <form className={styles["form__container"]}>

                            <label className={styles["form__label-avatar"]}>
                            <span>
                                <FiUpload size={30} color="#fff" />
                            </span>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFile}
                            />


                            {avatarUrl && (
                                <img
                                    className={styles["form__label-preview"]}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                            </label>

                            <select>
                                <option>Bebida</option>
                                <option>Pizzas</option>
                            </select>

                            <input
                                placeholder="Digite o nome do produto"
                                type="text"
                                className={styles["form__input"]}
                            />

                            <input
                                placeholder="Preco do produto"
                                type="text"
                                className={styles["form__input"]}
                            />


                            <textarea
                                placeholder="Descreva seu produto..."
                                className={styles["form__input"]}
                            />

                            <button className={styles["form__button"]}>
                                Cadastrar
                            </button>
                        </form>
                    </main>
                </div>
            
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})