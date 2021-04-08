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
import ImpTourGrid from "./ImpTourGrid";

const TourGridStyled = styled.div``;

function TourGrid(props) {
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
      <TourGridStyled>
         <Header />
         <TopBarTour />
         <ImpTourGrid />
         <Footer />
      </TourGridStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(TourGrid);
