import React, {useContext} from "react"
import { Logo } from "../Logo"
import styles from "./styles.module.scss"
import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContext"

import { FiLogOut } from "react-icons/fi"

export function Header() {
    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles["header__container"]}>
            <div className={styles["header__content"]}>
                <Link href="/dashboard" >
                    <Logo />
                </Link>

                <nav className={styles["header__content-nav"]}>
                    <Link href="/categoria">
                        <a>Categoria</a>
                    </Link>

                    <Link href="/produto">
                        <a>Cardápio</a>
                    </Link>
                    
                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={24} />
                    </button>
                </nav>
            </div>



        </header>
    )
}