import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import MyCKEditor from "~/views/container/commons/MyCKEditor";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Sliders from "./slide";
import Header from "../Header";
const ContainerStyled = styled.div``;

function Overview(props) {
   const [data, setData] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            setData(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <ContainerStyled>
         <Header />
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This
         is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard page
         This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is dashboard
         page This is dashboard page This is dashboard page This is dashboard page This is dashboard page This is
         dashboard page This is dashboard page This is dashboard page This is dashboard page
      </ContainerStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(Overview);
