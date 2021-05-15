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
import { useHistory, useRouteMatch } from "react-router";

const PaymentStyled = styled.div``;

function Payment(props) {
   const [payment, setPayment] = useState();

   const hisory = useHistory();
   console.log("hiendev ~ file: index.js ~ line 18 ~ TourDetail ~ hisory", hisory);
   const match = useRouteMatch();
   console.log("hiendev ~ file: index.js ~ line 20 ~ TourDetail ~ match", match);

   useEffect(() => {
      let tourDetail = {};
      props
         .getTour(match?.params?.id)
         .then(({ res }) => {
            props.getAllImagesTour().then((resImg) => {
               tourDetail = Object.assign(tourDetail, {
                  ...res,
                  images: resImg.res.filter((image) => {
                     return res.idTour === image.idTour;
                  })
               });
               setPayment(tourDetail);
            });
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);

   return (
      <PaymentStyled>
         <Header />
         <TopBarTour />
         <ImpPayment payment={payment} />
         <Footer />
      </PaymentStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getAllImagesTour: appApisActions.getAllImagesTour
   }
)(Payment);
