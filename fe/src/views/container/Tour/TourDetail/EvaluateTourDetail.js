import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useParams } from "react-router";
import { Rate } from "antd";

const EvaluateTourDetailStyled = styled.div``;

function EvaluateTourDetail(props) {
   const [evaluateReport, setEvaluateReport] = useState({});
   const params = useParams();

   useEffect(() => {
      if (params.id)
         props
            .getEvaluateByIdTour(params.id)
            .then(({ res }) => {
               setEvaluateReport(_.head(res[1] || []));
            })
            .catch((err) => {
               console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
            });
   }, [params?.id]);

   const calRating = (value) => {
      return Math.floor(value) + (Math.round(value - Math.floor(value)) ? 0.5 : 0.0);
   };

   return (
      <EvaluateTourDetailStyled data-aos='fade-up'>
         <div id='reviews' className='page-scroll'>
            <div className='single-content-item padding-top-40px padding-bottom-40px'>
               <h3 className='title font-size-20'>Đánh giá</h3>
               <div className='review-container padding-top-30px'>
                  <div className='row align-items-center'>
                     <div className='col-lg-4'>
                        <div className='review-summary'>
                           <h2>
                              {calRating(
                                 (evaluateReport.numberStarCleanliness +
                                    evaluateReport.numberStarFacilities +
                                    evaluateReport.numberStarLocation +
                                    evaluateReport.numberStarMoney +
                                    evaluateReport.numberStarService) /
                                    5
                              )}
                              <span>/5</span>
                           </h2>
                           <span>Có {evaluateReport.countAll} reviews</span>
                        </div>
                     </div>
                     {/* end col-lg-4 */}
                     <div className='col-lg-8'>
                        <div className='review-bars'>
                           <div className='row'>
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Service</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <Rate
                                             size='small'
                                             disabled
                                             allowHalf
                                             value={calRating(evaluateReport.numberStarService)}></Rate>
                                       </div>
                                       <div className='bar-percent'>
                                          {calRating(evaluateReport.numberStarService)}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Location</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <Rate
                                             size='small'
                                             disabled
                                             allowHalf
                                             value={calRating(evaluateReport.numberStarLocation)}></Rate>
                                       </div>
                                       <div className='bar-percent'>
                                          {calRating(evaluateReport.numberStarLocation)}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Value for Money</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <Rate
                                             size='small'
                                             disabled
                                             allowHalf
                                             value={calRating(evaluateReport.numberStarMoney)}></Rate>
                                       </div>
                                       <div className='bar-percent'>
                                          {calRating(evaluateReport.numberStarMoney)}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Cleanliness</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <Rate
                                             size='small'
                                             disabled
                                             allowHalf
                                             value={calRating(evaluateReport.numberStarCleanliness)}></Rate>
                                       </div>
                                       <div className='bar-percent'>
                                          {calRating(evaluateReport.numberStarCleanliness)}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                              <div className='col-lg-6'>
                                 <div className='progress-item'>
                                    <h3 className='progressbar-title'>Facilities</h3>
                                    <div className='progressbar-content line-height-20 d-flex align-items-center justify-content-between'>
                                       <div className='progressbar-box flex-shrink-0'>
                                          <Rate
                                             size='small'
                                             disabled
                                             allowHalf
                                             value={calRating(evaluateReport.numberStarFacilities)}></Rate>
                                       </div>
                                       <div className='bar-percent'>
                                          {calRating(evaluateReport.numberStarFacilities)}
                                       </div>
                                    </div>
                                 </div>
                                 {/* end progress-item */}
                              </div>
                              {/* end col-lg-6 */}
                           </div>
                           {/* end row */}
                        </div>
                     </div>
                     {/* end col-lg-8 */}
                  </div>
               </div>
            </div>
            {/* end single-content-item */}
            <div className='section-block' />
         </div>
      </EvaluateTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getEvaluateByIdTour: appApisActions.getEvaluateByIdTour
   }
)(EvaluateTourDetail);
