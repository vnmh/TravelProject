import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { Rate, Typography } from "antd";

const ReviewHomePageStyled = styled.div``;

const ReviewHomePage = (props) => {
   const [evaluates, setEvaluates] = useState([]);

   useEffect(() => {
      props
         .getEvaluates()
         .then(({ res }) => {
            const data = res || [];
            if (data.length > 4) data.length = 4;
            setEvaluates(data);
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, []);

   const calRating = (value) => {
      return Math.floor(value) + (Math.round(value - Math.floor(value)) ? 0.5 : 0.0);
   };
   return (
      <ReviewHomePageStyled>
         <div className='col-lg-12'>
            <div className='testimonial-carousel carousel-action'></div>
            <div className='row '>
               {(evaluates || []).map((o) => {
                  return (
                     <div className='col-6'>
                        <div className='testimonial-card mb-4 '>
                           <div className=''>
                              <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                 {o.contentEvaluate}
                              </Typography.Paragraph>
                           </div>
                           <div className='author-content d-flex align-items-center'>
                              <div className='author-bio'>
                                 <h4 className='author__title'>{o.title}</h4>
                                 <span className='author__meta'>
                                    {o.email} ({UtilDate.toDateLocal(o?.dateAdded)})
                                 </span>
                                 <span className='ratings d-flex align-items-center mt-1'>
                                    <Rate
                                       disabled
                                       allowHalf
                                       value={calRating(
                                          (o.numberStarCleanliness +
                                             o.numberStarFacilities +
                                             o.numberStarLocation +
                                             o.numberStarMoney +
                                             o.numberStarService) /
                                             5
                                       )}></Rate>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
         {/* end testimonial-card */}
      </ReviewHomePageStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getEvaluates: appApisActions.getEvaluates,
      updateEvaluate: appApisActions.updateEvaluate
   }
)(ReviewHomePage);
