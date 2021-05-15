import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Checkbox, Row, Select, DatePicker, InputNumber, Cascader, message } from "antd";
import CRUDTourAdmin from "./CRUDTourAdmin";
import CRUDTourAdminImage from "./CRUDTourAdminImage";
import CRUDTourAdminTimeline from "./CRUDTourAdminTimeline";
import CRUDTourAdminDetail from "./CRUDTourAdminDetail";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const { Option } = Select;
const CRUDTourAdminContainerStyled = styled.div``;

const { TextArea } = Input;

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
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour,
         postTour: appApisActions.postTour,
         putTour: appApisActions.putTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdminContainer);
