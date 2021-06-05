import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";
import * as PATH from "~/configs/routesConfig";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { message, Tooltip, Typography } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const RatingHomepage = (props) => {
   const [evaluateReport, setEvaluateReport] = useState({});

   useEffect(() => {
      if (props?.item?.idTour)
         props
            .getEvaluateByIdTour(props?.item?.idTour)
            .then(({ res }) => {
               setEvaluateReport(_.head(res[1] || []));
            })
            .catch((err) => {
               console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
            });
   }, [props?.item?.idTour]);

   const calRating = (value) => {
      return Math.floor(value) + (Math.round(value - Math.floor(value)) ? 0.5 : 0.0);
   };

   return (
      <div className='card-rating'>
         <span className='badge text-white'>
            {" "}
            {calRating(
               (evaluateReport.numberStarCleanliness +
                  evaluateReport.numberStarFacilities +
                  evaluateReport.numberStarLocation +
                  evaluateReport.numberStarMoney +
                  evaluateReport.numberStarService) /
                  5
            )}
            /5
         </span>
         <span className='rating__text ml-2'>{evaluateReport.countAll} đánh giá</span>
      </div>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         getEvaluateByIdTour: appApisActions.getEvaluateByIdTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(RatingHomepage);
