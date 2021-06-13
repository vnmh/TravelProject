import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { appApisActions } from "~/state/ducks/appApis";
import { Tabs } from "antd";
import styled from "styled-components";
import CreateBlog from "./CreateBlog";
import CreateBlogImage from "./CreateBlogImage";

const { TabPane } = Tabs;
const CreateBlogContainerStyled = styled.div``;

const CreateBlogContainer = (props) => {
   const [tabKey, setTabKey] = useState("1"); 
   const onChangeTab = (key) => {
      setTabKey(key);
   };
   return (
      <CreateBlogContainerStyled>
         <Tabs defaultActiveKey='1' onChange={onChangeTab}>
            <TabPane tab='Thông tin' key='1'>
               <CreateBlog {...props} />
            </TabPane>
            <TabPane tab='Hình ảnh' key='2'>
               <CreateBlogImage {...props} />
            </TabPane>
         </Tabs>
      </CreateBlogContainerStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CreateBlogContainer admin , không thì redirect tới homepage
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
)(CreateBlogContainer);
