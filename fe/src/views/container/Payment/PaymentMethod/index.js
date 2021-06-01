import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import ImpPayment from "./ImpPayment";
import { useRouteMatch } from "react-router";
import Header from "../../Header";
import Footer from "../../Footer";
import ScrollToTop from "~/ScrollToTop";
import TopBarPayment from "./TopBarPayment";

const PaymentStyled = styled.div``;

function Payment(props) {
   const [payment, setPayment] = useState();
   const match = useRouteMatch();

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
      <ScrollToTop>
         <PaymentStyled>
            <Header />
            <TopBarPayment />
            <ImpPayment payment={payment} />
            <Footer />
         </PaymentStyled>
      </ScrollToTop>
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
