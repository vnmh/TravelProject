import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import CRUDTourAdmin from "./CRUDTourAdmin";
import CRUDTourAdminImage from "./CRUDTourAdminImage";
import CRUDTourAdminTimeline from "./CRUDTourAdminTimeline";
import CRUDTourAdminDetail from "./CRUDTourAdminDetail";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const CRUDTourAdminContainerStyled = styled.div``;

const CRUDTourAdminContainer = (props) => {
   const [tabKey, setTabKey] = useState("1");
   const onChangeTab = (key) => {
      setTabKey(key);
   };
   return (
      <CRUDTourAdminContainerStyled>
         <Tabs defaultActiveKey='1' onChange={onChangeTab}>
            <TabPane tab='Thông tin' key='1'>
               <CRUDTourAdmin {...props} />
            </TabPane>
            <TabPane tab='Hình ảnh tour' key='2'>
               <CRUDTourAdminImage {...props} />
            </TabPane>
            <TabPane tab='Lịch trình tour' key='3'>
               <CRUDTourAdminTimeline {...props} />
            </TabPane>
            <TabPane tab='Mô tả chi tiết' key='4'>
               <CRUDTourAdminDetail {...props} />
            </TabPane>
         </Tabs>
      </CRUDTourAdminContainerStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDTourAdminContainer admin , không thì redirect tới homepage
      }),
      {
         // login: appApisActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu
)(CRUDTourAdminContainer);
