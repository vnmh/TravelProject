import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";
import { Tabs } from "antd";
import styled from "styled-components";
import CRUDBlogAdmin from "./CRUDBlogAdmin";

const { TabPane } = Tabs;
const CRUDBlogAdminContainerStyled = styled.div``;

const CRUDBlogAdminContainer = (props) => {
   const [tabKey, setTabKey] = useState("1"); 
   const onChangeTab = (key) => {
      setTabKey(key);
   };
   return (
      <CRUDBlogAdminContainerStyled>
         <Tabs defaultActiveKey='1' onChange={onChangeTab}>
            <TabPane tab='Thông tin' key='1'>
               <CRUDBlogAdmin {...props} />
            </TabPane>
         </Tabs>
      </CRUDBlogAdminContainerStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDBlogAdminContainer admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour,
         postTour: appApisActions.postTour,
         putTour: appApisActions.putTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDBlogAdminContainer);
