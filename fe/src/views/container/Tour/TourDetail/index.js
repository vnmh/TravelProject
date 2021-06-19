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
import { useParams, useRouteMatch } from "react-router";
import ScrollToTop from "~/ScrollToTop";
import { authActions } from "~/state/ducks/authUser";
import HOC from "~/HOC";

const TourDetailStyled = styled.div``;

function TourDetail(props) {
   const [tourDetail, setTourDetail] = useState({});
   const params = useParams();

   useEffect(() => {
      let tourDetailAssign = {};
      props
         .getTour(params?.id)
         .then(({ res }) => {
            props.getAllImagesTour().then((resImg) => {
               tourDetailAssign = Object.assign(tourDetailAssign, {
                  ...res,
                  images: resImg.res.filter((image) => {
                     return res.idTour === image.idTour;
                  })
               });
               props.getTimelineTour(params?.id).then((resTimeline) => {
                  tourDetailAssign = Object.assign(tourDetailAssign, { timelines: _.head(resTimeline.res) });
                  props.getScheduleTour(params?.id).then((resSchedule) => {
                     tourDetailAssign = Object.assign(tourDetailAssign, { scheduleTour: resSchedule.res });
                     setTourDetail(tourDetailAssign);
                  });
               });
            });
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, [params?.id]);

   return (
      <HOC>
         <ScrollToTop>
            <TourDetailStyled>
               <Header />
               <ImpTourDetail tourDetail={tourDetail} />
               <Footer />
            </TourDetailStyled>
         </ScrollToTop>
      </HOC>
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
