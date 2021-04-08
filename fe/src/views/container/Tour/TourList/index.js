import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import Header from "../../Header";
import Footer from "../../Footer";
import TopBarTour from "../TopBarTour";
import ImpTourList from "./ImpTourList";

const TourListStyled = styled.div``;

function TourList(props) {
   const [tourList, setTourList] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            setTourList(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <TourListStyled>
         <Header />
         <TopBarTour />
         <ImpTourList />
         <Footer />
      </TourListStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(TourList);
