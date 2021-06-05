import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { message, Rate, Button } from "antd";
import { useParams } from "react-router";

const CommentTourDetailStyled = styled.div``;

function CommentTourDetail(props) {
   const params = useParams();
   const [email, setEmail] = useState("");
   const [title, setName] = useState("");
   const [contentEvaluate, setContentEvaluate] = useState("");
   const [numberStarService, setServiceRate] = useState(5);
   const [numberStarLocation, setLocationRate] = useState(5);
   const [numberStarMoney, setMoneyRate] = useState(5);
   const [numberStarCleanliness, setCleanlinessRate] = useState(5);
   const [numberStarFacilities, setFacilitiesRate] = useState(5);
   const [loading, setLoading] = useState(false);
   const submitReview = () => {
      const body = {
         email,
         title,
         contentEvaluate,
         numberStarService,
         numberStarLocation,
         numberStarMoney,
         numberStarCleanliness,
         numberStarFacilities,
         idTour: params.id
      };
      const verifyArray = _.compact(Object.keys(body).map((o) => body[o]));

      if (verifyArray.length !== Object.keys(body).length) {
         message.error("Vui lòng điền đầy đủ thông tin review");
         return;
      }
      setLoading(true);
      props
         .createEvaluate(body)
         .then(({ res }) => {
            setLoading(false);
            setEmail("");
            setName("");
            setContentEvaluate("");
            setServiceRate(5);
            setLocationRate(5);
            setMoneyRate(5);
            setCleanlinessRate(5);
            setFacilitiesRate(5);
            message.success("Cảm ơn bạn đã đánh giá tour, chúng tôi sẽ xử lý đánh giá trước khi hiển thị lên");
         })
         .catch((err) => {
            setLoading(false);
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   };

   return (
      <CommentTourDetailStyled>
         <div className='comment-forum padding-top-40px'>
            <div className='form-box'>
               <div className='form-title-wrap'>
                  <h3 className='title'>Viết đánh giá</h3>
               </div>
               <div className='form-content'>
                  <div className='rate-option p-2'>
                     <div className='row'>
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Dịch vụ</label>
                              <div className='rate-stars-option'>
                                 <Rate
                                    allowHalf
                                    value={numberStarService}
                                    onChange={(value) => {
                                       setServiceRate(value);
                                    }}></Rate>
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Vị trí</label>
                              <div className='rate-stars-option'>
                                 <Rate
                                    allowHalf
                                    value={numberStarLocation}
                                    onChange={(value) => {
                                       setLocationRate(value);
                                    }}></Rate>
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Giá tiền</label>
                              <div className='rate-stars-option'>
                                 <Rate
                                    allowHalf
                                    value={numberStarMoney}
                                    onChange={(value) => {
                                       setMoneyRate(value);
                                    }}></Rate>
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Sạch sẽ</label>
                              <div className='rate-stars-option'>
                                 <Rate
                                    allowHalf
                                    value={numberStarCleanliness}
                                    onChange={(value) => {
                                       setCleanlinessRate(value);
                                    }}></Rate>
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                        <div className='col-lg-4 responsive-column'>
                           <div className='rate-option-item'>
                              <label>Tiện nghi</label>
                              <div className='rate-stars-option'>
                                 <Rate
                                    allowHalf
                                    value={numberStarFacilities}
                                    onChange={(value) => {
                                       setFacilitiesRate(value);
                                    }}></Rate>
                              </div>
                           </div>
                        </div>
                        {/* col-lg-4 */}
                     </div>
                     {/* end row */}
                  </div>
                  {/* end rate-option */}
                  <div className='contact-form-action'>
                     <form method='post'>
                        <div className='row'>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Tiêu đề</label>
                                 <div className='form-group'>
                                    <span className='la la-user form-icon' />
                                    <input
                                       className='form-control'
                                       type='text'
                                       name='text'
                                       placeholder='Nhập tiêu đề'
                                       value={title}
                                       onChange={(e) => {
                                          setName(e?.target?.value);
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Email</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope-o form-icon' />
                                    <input
                                       className='form-control'
                                       type='email'
                                       name='email'
                                       placeholder='Nhập email'
                                       value={email}
                                       onChange={(e) => {
                                          setEmail(e?.target?.value);
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-12'>
                              <div className='input-box'>
                                 <label className='label-text'>Nội dung</label>
                                 <div className='form-group'>
                                    <span className='la la-pencil form-icon' />
                                    <textarea
                                       className='message-control form-control'
                                       name='message'
                                       placeholder='Nhập nội dung'
                                       defaultValue={""}
                                       value={contentEvaluate}
                                       onChange={(e) => {
                                          setContentEvaluate(e?.target?.value);
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-12 d-flex justify-content-center'>
                              <div className='btn-box'>
                                 <Button size='large' type='primary' onClick={submitReview} loading={loading}>
                                    Đánh giá
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
                  {/* end contact-form-action */}
               </div>
               {/* end form-content */}
            </div>
            {/* end form-box */}
         </div>
      </CommentTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      createEvaluate: appApisActions.createEvaluate
   }
)(CommentTourDetail);
