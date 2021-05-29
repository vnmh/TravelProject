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
import { useRouteMatch } from "react-router";
import ScrollToTop from "~/ScrollToTop";
import { authActions } from "~/state/ducks/authUser";

const TourDetailStyled = styled.div``;

function TourDetail(props) {
   const [tourDetail, setTourDetail] = useState({});
   const match = useRouteMatch();

   useEffect(() => {
      let tourDetailAssign = {};
      props
         .getTour(match?.params?.id)
         .then(({ res }) => {
            props.getAllImagesTour().then((resImg) => {
               tourDetailAssign = Object.assign(tourDetailAssign, {
                  ...res,
                  images: resImg.res.filter((image) => {
                     return res.idTour === image.idTour;
                  })
               });
               props.getTimelineTour(match?.params?.id).then((resTimeline) => {
                  tourDetailAssign = Object.assign(tourDetailAssign, { timelines: _.head(resTimeline.res) });
                  props.getScheduleTour(match?.params?.id).then((resSchedule) => {
                     tourDetailAssign = Object.assign(tourDetailAssign, { schedule: resSchedule.res });
                     setTourDetail(tourDetailAssign);
                  });
               });
            });
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);

   return (
      <ScrollToTop>
         <TourDetailStyled>
            <Header />
            <ImpTourDetail tourDetail={tourDetail} />
            <Footer />
         </TourDetailStyled>
      </ScrollToTop>
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
      getAllImagesTour: appApisActions.getAllImagesTour,
      logout: authActions.logout
   }
)(TourDetail);
