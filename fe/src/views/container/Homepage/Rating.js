import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";

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
   withRouter
)(RatingHomepage);
