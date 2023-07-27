import React from "react";
import type { NextPage } from "next";
import { canSSRAuth } from "../../utils/canSSRAuth";


const Dashboard: NextPage = () => {

  return (
      <>
          <h1>Dashboard</h1>
        </>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {}
  }
})
