import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const BookingAdminTableExpendStyled = styled.div``;

const menu = (
   <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
   </Menu>
);

const BookingAdminTableExpend = (props) => {
   const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
         title: "Status",
         key: "state",
         render: () => (
            <span>
               <Badge status='success' />
               Finished
            </span>
         )
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
         title: "Action",
         dataIndex: "operation",
         key: "operation",
         render: () => (
            <Space size='middle'>
               <a>Pause</a>
               <a>Stop</a>
               <Dropdown overlay={menu}>
                  <a>
                     More <DownOutlined />
                  </a>
               </Dropdown>
            </Space>
         )
      }
   ];

   const data = [];
   for (let i = 0; i < 3; ++i) {
      data.push({
         key: i,
         date: "2014-12-24 23:12:00",
         name: "This is production name",
         upgradeNum: "Upgraded: 56"
      });
   }
   return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => dashboard admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BookingAdminTableExpend);
