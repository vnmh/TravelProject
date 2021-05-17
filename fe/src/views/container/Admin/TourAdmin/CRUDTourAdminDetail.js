import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Button, message } from "antd";
import MyCKEditor from "~/views/container/commons/MyCKEditor";

const CRUDTourAdminDetailStyled = styled.div``;

const CRUDTourAdminDetail = (props) => {
   const [data, setData] = useState("");
   // LOAD data timelines
   useEffect(() => {
      props
         .getScheduleTour(props.currentEdit?.idTour)
         .then(({ res }) => {
            setData(res.data || "");
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, []);

   const saveDetail = () => {
      // gọi API lưu dữ liệu
      props
         .putSchedule({ idTour: props.currentEdit?.idTour, data })
         .then((res) => {
            message.success("Thành công!");
         })
         .catch((err) => {
            message.error("Thất bại!");
         });
   };

   const onChangeDetail = (event, editor) => {
      setData(editor.getData());
   };
   return (
      <CRUDTourAdminDetailStyled>
         {props.currentEdit && (
            <>
               <div className='d-flex justify-content-end w-100 mb-3'>
                  <Button type='primary' onClick={saveDetail} className='mr-3'>
                     Lưu
                  </Button>
                  <Button
                     onClick={() => {
                        props.setCurrentEdit(undefined);
                        props.setIsCreateTour && props.setIsCreateTour(undefined);
                     }}>
                     Đóng
                  </Button>
               </div>
               <MyCKEditor data={data || ""} onChange={onChangeDetail} />
            </>
         )}
         {!props.currentEdit && "Chỉ có thể sửa chi tiết tour sau khi tạo tour thành công!"}
      </CRUDTourAdminDetailStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDTourAdminDetail admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getScheduleTour: appApisActions.getScheduleTour,
         getAllImagesTour: appApisActions.getAllImagesTour,
         postTour: appApisActions.postTour,
         postTimeline: appApisActions.postTimeline,
         putTimeline: appApisActions.putTimeline,
         deleteTimeline: appApisActions.deleteTimeline,
         putSchedule: appApisActions.putSchedule,
         deleteImage: appApisActions.deleteImage
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdminDetail);
