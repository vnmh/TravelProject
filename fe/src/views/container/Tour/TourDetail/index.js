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
   const hisory = useHistory();
   console.log("hiendev ~ file: index.js ~ line 18 ~ TourDetail ~ hisory", hisory)
   const match = useRouteMatch();
   console.log("hiendev ~ file: index.js ~ line 20 ~ TourDetail ~ match", match)
   useEffect(() => {
      props
         .getTour(match?.params?.id)
         .then(({ res }) => {
            setTourDetail(res);
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   console.log("hiendev ~ file: index.js ~ line 17 ~ TourDetail ~ tourDetail", tourDetail);

   return (
      <TourDetailStyled>
         <Header />
         <ImpTourDetail tourDetail={tourDetail}/>
         <Footer />
      </TourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour
   }
)(TourDetail);
