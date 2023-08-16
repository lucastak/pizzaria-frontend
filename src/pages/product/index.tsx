/* eslint-disable @next/next/no-img-element */
import React, {ChangeEvent, FormEvent, useState} from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import { FiUpload } from "react-icons/fi";
import { setupApiClient } from "../../services/api";

type ItemProps ={
    id: string,
    name: string
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const image = event.target.files[0];
        if (!image) return;

        if (image.type === "image/jpeg" || image.type === "image/png") {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }

    }

    function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
        setCategorySelected(event.target.value as unknown as number);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (name === "" || price === "" || description === "" || imageAvatar === "") return;

            data.append("name", name);
            data.append("price", price);
            data.append("description", description);
            data.append("categorie", categories[categorySelected].id);
            data.append("file", imageAvatar);

            const apiClient = setupApiClient();
            apiClient.post("/product", data);

        } catch (error) {
            console.log(error);
            return;
        }

        setName("");
        setPrice("");
        setDescription("")
        setAvatarUrl("");
        setImageAvatar(null);
        setCategorySelected(0);
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

                        <form className={styles["form__container"]} onSubmit={handleRegister}>

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

                            <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((element, index) => {
                                return (
                                    <option key={element.id} value={index}>
                                        {element.name}
                                    </option>
                                    )
                            })}
                            </select>

                            <input
                                placeholder="Digite o nome do produto"
                                type="text"
                                className={styles["form__input"]}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                placeholder="Preco do produto"
                                type="text"
                                className={styles["form__input"]}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />


                            <textarea
                                placeholder="Descreva seu produto..."
                                className={styles["form__input"]}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
    const apiClient = setupApiClient(ctx);
    const response = await apiClient.get("/category");

    return {
        props: {
            categoryList: response.data
        }
    }
})