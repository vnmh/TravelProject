import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import ReviewBreadAdminPage from "./ReviewBreadAdminPage";
import { message, Rate, Select } from "antd";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { appApisActions } from "~/state/ducks/appApis";
import _ from "lodash";
import { REVIEW_STATUS, renderStatusReview } from "~/configs/status";
const CardItemReviewAdminPageStyled = styled.div``;

const CardItemReviewAdminPage = (props) => {
   const [evaluates, setEvaluates] = useState([]);
   const [evaluatesView, setEvaluatesView] = useState([]);
   const [status, setStatus] = useState();
   const [needLoadAgin, setNeedLoadAgin] = useState(false);

   useEffect(() => {
      props
         .getEvaluates()
         .then(({ res }) => {
            setEvaluates(res || []);
            setEvaluatesView(res || []);
            setNeedLoadAgin(false);
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, [needLoadAgin]);

   const calRating = (value) => {
      return Math.floor(value) + (Math.round(value - Math.floor(value)) ? 0.5 : 0.0);
   };

   useEffect(() => {
      if (status) {
         const arr = Array.from(evaluates);
         setEvaluatesView(
            arr.filter((o) => {
               return status === o.status;
            })
         );
      }
   }, [status]);

   const onChangeStatus = (review, status) => {
      props
         .updateEvaluate({ ...review, status })
         .then(({ res }) => {
            setNeedLoadAgin(true);
            message.success("Cập nhật trạng thái thành công");
         })
         .catch((err) => {
            message.error("Cập nhật trạng thái thất bại");
            setNeedLoadAgin(true);
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   };

   return (
      <CardItemReviewAdminPageStyled>
         <div className='row'>
            <div className='col-lg-12'>
               <div className='form-box'>
                  <div className='form-title-wrap'>
                     <div className='d-flex align-items-center justify-content-between'>
                        <div>
                           <h3 className='title'>Review Lists</h3>
                           {/* <p className='font-size-14'>Showing 1 to 4 of 20 entries</p> */}
                        </div>
                        <Select style={{ width: 200 }} placeholder='Trạng thái' allowClear onChange={setStatus}>
                           {Object.keys(REVIEW_STATUS).map((status) => {
                              return (
                                 <Select.Option value={status}>{renderStatusReview(status, "String")}</Select.Option>
                              );
                           })}
                        </Select>
                     </div>
                  </div>
                  <div className='form-content'>
                     <div className='comments-list'>
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
                                    <div className='comment-reply d-flex align-items-center justify-content-end'>
                                       {o?.status === REVIEW_STATUS.New && (
                                          <button
                                             className='d-flex justify-content-center align-items-center theme-btn theme-btn-small mr-4'
                                             style={{ width: 130, color: "white", background: "#52c41a" }}
                                             onClick={() => onChangeStatus(o, REVIEW_STATUS.Approve)}>
                                             <i className='la la-check-circle mr-1' />
                                             Phê duyệt
                                          </button>
                                       )}
                                       {o?.status !== REVIEW_STATUS.Cancel && (
                                          <button
                                             className='d-flex justify-content-center align-items-center theme-btn theme-btn-small'
                                             style={{ width: 120 }}
                                             onClick={() => onChangeStatus(o, REVIEW_STATUS.Cancel)}>
                                             <i className='la la-times mr-1' />
                                             Hủy bỏ
                                          </button>
                                       )}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </CardItemReviewAdminPageStyled>
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
)(CardItemReviewAdminPage);
