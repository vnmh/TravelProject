import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import Header from "../Header";
import Footer from "../Footer";
import TopBarTour from "../Tour/TopBarTour";
import ImpPayment from "./ImpPayment";

const PaymentStyled = styled.div``;

function Payment(props) {
   const [payment, setPayment] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            setPayment(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <PaymentStyled>
         <Header />
         <TopBarTour />
         <ImpPayment />
         <Footer />
      </PaymentStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(Payment);
