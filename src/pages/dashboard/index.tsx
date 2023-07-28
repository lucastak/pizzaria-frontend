import React from "react";
import type { NextPage } from "next";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";


const Dashboard: NextPage = () => {

  return (
      <>  
        <Head>
            <title>Painel Pizzaria</title>
        </Head> 
        <Header />
        <div>
          <h1>
            Painel
          </h1>
        </div>
      </>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {}
  }
})
