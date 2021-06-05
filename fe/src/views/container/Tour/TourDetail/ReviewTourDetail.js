import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useParams } from "react-router";
import { Rate } from "antd";
import UtilDate from "~/views/utilities/helpers/UtilDate";

const ReviewTourDetailStyled = styled.div``;

function ReviewTourDetail(props) {
   const [evaluates, setEvaluates] = useState([]);
   const [evaluatesView, setEvaluatesView] = useState([]);
   const [viewAll, setViewAll] = useState(false);
   const params = useParams();

   useEffect(() => {
      if (params.id)
         props
            .getEvaluateByIdTour(params.id)
            .then(({ res }) => {
               setEvaluates(_.head(res || []) || []);
               const views = Array.from(_.head(res || []) || []);
               views.length = 2;
               setEvaluatesView(views);
            })
            .catch((err) => {
               console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
            });
   }, [params?.id]);

   const calRating = (value) => {
      return Math.floor(value) + (Math.round(value - Math.floor(value)) ? 0.5 : 0.0);
   };

   return (
      <ReviewTourDetailStyled>
         <h3 className='title font-size-20'>Có {evaluates.length} lượt review</h3>
         <div className='comments-list padding-top-50px'>
            <div className='comment d-flex flex-wrap'>
               {(evaluatesView || []).map((o) => {
                  return (
                     <div className='comment-body w-100 mt-4' key={`evaluate_${o.id}`}>
                        <div className='meta-data'>
                           <h3 className='comment__author'>{o.title}</h3>
                           <div className='d-flex justify-content-between align-items-center'>
                              <div className='meta-data-inner d-flex justify-content-start align-items-center'>
                                 <span className='ratings d-flex align-items-center mr-1'>
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
                                 <p className='comment__date m-0'>{UtilDate.toDateLocal(o.dateAdded)}</p>
                              </div>
                              <p className='comment__date m-0'>{o.email}</p>
                           </div>
                        </div>
                        <p className='comment-content'>{o.contentEvaluate}</p>
                        <div className='comment-reply d-flex align-items-center justify-content-between'></div>
                     </div>
                  );
               })}
            </div>
            {/* end comments */}
            {!viewAll && (
               <div className='btn-box load-more text-center'>
                  <button
                     onClick={() => {
                        setEvaluatesView(evaluates);
                        setViewAll(true);
                     }}
                     className='theme-btn theme-btn-small theme-btn-transparent'
                     type='button'>
                     Load More Review
                  </button>
               </div>
            )}
         </div>
      </ReviewTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getEvaluateByIdTour: appApisActions.getEvaluateByIdTour
   }
)(ReviewTourDetail);
