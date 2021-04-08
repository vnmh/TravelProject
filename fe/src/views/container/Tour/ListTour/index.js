import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import "pure-react-carousel/dist/react-carousel.es.css";
import Header from "../../Header";
import Footer from "../../Footer";
import ImpListTour from "./ImpListTour";
import TopBarTour from "../TopBarTour";

const ListTourStyled = styled.div``;

function ListTour(props) {
   const [listTour, setListTour] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            setListTour(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <ListTourStyled>
         <Header />
         <TopBarTour />
         <ImpListTour />
         <Footer />
      </ListTourStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ListTour);
