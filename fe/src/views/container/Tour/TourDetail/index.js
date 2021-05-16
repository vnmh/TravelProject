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
import { useHistory, useRouteMatch } from "react-router";

const TourDetailStyled = styled.div``;

function TourDetail(props) {
   const [tourDetail, setTourDetail] = useState({});

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
               props.getTimelineTour(match?.params?.id).then((resTimeline) => {
                  tourDetail = Object.assign(tourDetail, { timelines: _.head(resTimeline.res) });
                  props.getScheduleTour(match?.params?.id).then((resSchedule) => {
                     tourDetail = Object.assign(tourDetail, { schedule: resSchedule.res });
                     setTourDetail(tourDetail);
                  });
               });
            });
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);

   return (
      <TourDetailStyled>
         <Header />
         <ImpTourDetail tourDetail={tourDetail} />
         <Footer />
      </TourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getScheduleTour: appApisActions.getScheduleTour,
      getTimelineTour: appApisActions.getTimelineTour,
      getAllImagesTour: appApisActions.getAllImagesTour
   }
)(TourDetail);
