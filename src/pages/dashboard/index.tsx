import React, { useState } from "react";
import type { NextPage } from "next";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss"
import { FiRefreshCcw } from "react-icons/fi";
import { setupApiClient } from "../../services/api"
import { ModalOrder } from "../../components/Modal";

import Modal from 'react-modal'

type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null
}

export type orderItemProps = {
  id: string,
  amount: number,
  order_id: string,
  product_id: string,
  product: {
    id: string,
    name: string,
    description: string,
    price: string,
    banner: string
  }
  order: {
    id: string,
    table: string | number,
    status: boolean,
    name: string | null
  }

}
interface HomeProps {
  orders: OrderProps[]
}

const Dashboard: NextPage = ({ orders }: HomeProps) => {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<orderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);

  async function handleOpenModalView(id: string) {
    const apiClient = setupApiClient();
    const response = await apiClient.get(`/order/detail`, {
      params: {
        order_id: id,
      }
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleFinishItem(id: string) {
    const apiClient = setupApiClient();
    await apiClient.put(`/order/finish`, {
        order_id: id
    });

    const response = await apiClient.get('/orders')

    setOrderList(response.data)
    setModalVisible(false)
  }
  
  Modal.setAppElement('#__next')

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
        
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}

        </div>
      </>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupApiClient(context);
  const response = await apiClient.get("/orders");

  return {
      props: {
          orders: response.data
      }
  }
})
