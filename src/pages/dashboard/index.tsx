import React, { useState } from "react";
import type { NextPage } from "next";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss"
import { FiRefreshCcw } from "react-icons/fi";
import {setupApiClient} from "../../services/api"

type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null
}
interface HomeProps {
  orders: OrderProps[]
}

const Dashboard: NextPage = ({ orders }: HomeProps) => {
  const [orderList, setOrderList] = useState(orders || []);

  function handleOpenModalView(id: string) {
    alert("id" + id)
  }

  return (
      <>  
        <Head>
            <title>Painel Pizzaria</title>
        </Head> 
        
        <div>
          <Header />
        
          <main className={styles.container}>
            
            <div className={styles.containerHeader}>
              
              <h1>Últimos Pedidos</h1>
              <button>
                <FiRefreshCcw color="#3fffa3" />
              </button>
            </div>
          
            <article className={styles.listOrders}>
              {orderList.map(item => (
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleOpenModalView(item.id)}>
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                  </button>
                </section>   
              ))}
            </article>
          </main>
        </div>
      </>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupApiClient(context);
  const response = await apiClient.get("/orders");
  console.log("orders", response.data);
  

  return {
      props: {
          orders: response.data
      }
  }
})
