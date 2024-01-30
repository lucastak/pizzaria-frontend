import React from "react";
import type { NextPage } from "next";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss"
import { FiRefreshCcw } from "react-icons/fi";
import {setupApiClient} from "../../services/api"


const Dashboard: NextPage = () => {

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

                <section className={styles.orderItem}>
                  <button>
                    <div className={styles.tag}></div>
                    <span>Mesa 30</span>
                  </button>
                </section>
              
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
          orderList: response.data
      }
  }
})
