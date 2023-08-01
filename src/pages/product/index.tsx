import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";

export default function Product() {
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