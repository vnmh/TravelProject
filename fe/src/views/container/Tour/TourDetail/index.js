import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import Header from "../../Header";
import Footer from "../../Footer";
import ImpTourDetail from "./ImpTourDetail";

const TourDetailStyled = styled.div``;

function TourDetail(props) {
   const [tourDetail, setTourDetail] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            setTourDetail(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <TourDetailStyled>
         <Header />
         <ImpTourDetail />
         <Footer />
      </TourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(TourDetail);
