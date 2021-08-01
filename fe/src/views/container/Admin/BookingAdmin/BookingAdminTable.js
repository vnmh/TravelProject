import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { Table, Badge, Menu, Dropdown, Space, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { appApisActions } from "~/state/ducks/appApis";
import _ from "lodash";
import { ORDER_STATUS } from "~/configs/status";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { currencyFormat } from "~/views/utilities/helpers/currency";

const BookingAdminTableStyled = styled.div``;

const menu = (
   <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
   </Menu>
);

const BookingAdminTable = (props) => {
   const [loading, setLoading] = useState(false);
   const [orders, setOrders] = useState([]);
   const [ordersOld, setOrdersOld] = useState([]);
   const [ordersNew, setOrdersNew] = useState([]);

   // LOAD ORDERS
   useEffect(() => {
      setLoading(true);
      props
         .getOrders()
         .then((resOrders) => {
            props.getToursAll().then((resTours) => {
               // Ngày departureDay lấy 10 ký tự đầu để so sánh ngày
               // group các orders theo ngày
               const current = new Date();
               const currentStr = current.toJSON().slice(0, 10);
               const resOrdersSorted = _.sortBy(
                  (resOrders.res || [])?.map((r) => {
                     return {
                        ...r,
                        departureDayCal: r?.departureDay?.slice(0, 10)
                     };
                  }),
                  (o) => {
                     return o.departureDayCal;
                  }
               );

               const mapDataOderAndTour = (arrOrders) => {
                  const calStatus = () => {
                     // Nếu có một order nào ở trạng thái chưa xử lý thì là status Waiting
                     // Nếu đã xử lý hết thì ở trạng thái sẵn sàng Ready
                     // Nếu đã qua ngày thì ở trạng thái Done
                     return "Waiting";
                  };
                  const arrGroupDay = _.uniqBy(arrOrders, "departureDayCal");

                  return arrGroupDay.map((o) => {
                     const arrFollowDepartureDayCal = arrOrders.filter((f) => {
                        return o.departureDayCal === f.departureDayCal;
                     });
                     const tour = _.find(resTours.res || [], (t) => {
                        return t.idTour === o.idTour;
                     });
                     const orders = (arrOrders || []).filter((t) => {
                        return t.departureDayCal === o.departureDayCal;
                     });
                     const ordersPaid = (arrOrders || []).filter((t) => {
                        return t.departureDayCal === o.departureDayCal && t.status === ORDER_STATUS.Paid;
                     });
                     const ordersWait = (arrOrders || []).filter((t) => {
                        return (
                           t.departureDayCal === o.departureDayCal &&
                           t.status !== ORDER_STATUS.Paid &&
                           t.status !== ORDER_STATUS.Cancel
                        );
                     });
                     return {
                        key: o.idOrder,
                        orderCount: _.sumBy(arrOrders, (c) => {
                           return c.departureDayCal === o.departureDayCal;
                        }),
                        // Map ra số lượng khách theo đơn hàng, map ra số lượng đơn hàng đã thành toán, xác nhận, hủy
                        numberPeopleAll: _.sumBy(arrFollowDepartureDayCal, "numberPeople"),
                        // Tính toán tổng thu và dự kiến thu(dự kiến thu là đơn hàng chưa được thanh toán đang chờ xác nhận hoặc đã hủy)
                        ordersPaidCount: ordersPaid.length,
                        ordersPaidMoney: _.sumBy(ordersPaid, "totalPrice"),
                        ordersWaitCount: ordersWait.length,
                        ordersWaitMoney: _.sumBy(ordersWait, "totalPrice"),
                        ordersMoney: _.sumBy(arrFollowDepartureDayCal, "totalPrice"),
                        //-----
                        ordersDestroyCount: _.sumBy(arrFollowDepartureDayCal, (s) => (s.destroyFee ? 1 : 0)),
                        ordersDestroyMoney: _.sumBy(arrFollowDepartureDayCal, "destroyFee"),
                        ordersAmount: _.sumBy(arrFollowDepartureDayCal, "totalPrice"),
                        tour,
                        titleTour: tour.titleTour,
                        orders,
                        departureDay: o.departureDay,
                        departureDayCal: o.departureDayCal,
                        status: calStatus()
                     };
                  });
               };

               const arrOldGroupDayWithTourAndCount = mapDataOderAndTour(
                  resOrdersSorted.filter((o) => {
                     return o.departureDayCal < currentStr;
                  })
               );
               setOrdersOld(arrOldGroupDayWithTourAndCount);

               const arrNewGroupDayWithTourAndCount = mapDataOderAndTour(
                  resOrdersSorted.filter((o) => {
                     return o.departureDayCal >= currentStr;
                  })
               );
               setOrdersNew(arrNewGroupDayWithTourAndCount);

               console.log(
                  `ithoangtan -  ~ file: BookingAdminTable.js ~ line 96 ~ props.getToursAll ~ arrNewGroupDayWithTourAndCount`,
                  arrNewGroupDayWithTourAndCount
               );

               setOrders(arrNewGroupDayWithTourAndCount);
               setLoading(false);
               // Xác định trạng thái của 1 booking thông qua dữ liệu hiện có
               // làm cái action nữa là xong
            });
         })
         .catch((err) => {
            setLoading(false);
            console.log(`ithoangtan -  ~ file: BookingAdminTable.js ~ line 83 ~ props.getOrders ~ err`, err);
         });
   }, []);
   // LOAD ORDERS

   const columns = [
      { title: "Tên Tour", dataIndex: "titleTour", key: "titleTour", fixed: "left", width: 300 },
      {
         title: "Khởi hành",
         dataIndex: "departureDayCal",
         key: "departureDayCal",
         render: (cell, row) => {
            return UtilDate.toDateLocal(cell);
         },
         width: 110
      },
      {
         title: "Số khách",
         dataIndex: "numberPeopleAll",
         key: "numberPeopleAll",
         align: "right",
         width: 120,
         render: (cell, row) => {
            return `${cell} / ${currencyFormat(row?.tour?.groupSize, "")}`;
         }
      },
      { title: "Số đơn", dataIndex: "orderCount", key: "orderCount", align: "right", width: 120 },
      { title: "Đơn T.toán", dataIndex: "ordersPaidCount", key: "ordersPaidCount", align: "right", width: 120 },
      { title: "Đơn Chờ", dataIndex: "ordersWaitCount", key: "ordersWaitCount", align: "right", width: 120 },
      { title: "Trạng thái", dataIndex: "status", key: "status", width: 120 },
      {
         title: "Đơn Hủy",
         dataIndex: "ordersDestroyCount",
         key: "ordersDestroyCount",
         render: (cell, row) => {
            return `${cell} đơn (${currencyFormat(row?.ordersDestroyMoney || 0)})`;
         },
         width: 180
      },
      {
         title: "Đã thu",
         dataIndex: "ordersPaidMoney",
         key: "ordersPaidMoney",
         render: (cell, row) => {
            return currencyFormat(cell || 0);
         },
         width: 150
      },
      {
         title: "Chưa thu",
         dataIndex: "ordersWaitMoney",
         key: "ordersWaitMoney",
         render: (cell, row) => {
            return currencyFormat(cell || 0);
         },
         width: 150
      },
      {
         title: "Tổng dự kiến thu",
         dataIndex: "ordersMoney",
         key: "ordersMoney",
         render: (cell, row) => {
            return currencyFormat(cell || 0);
         },
         width: 150
      },
      {
         title: "Action",
         key: "operation",
         align: "center",
         render: () => {
            return (
               <>
                  <a>Publish</a>
                  <Divider type='vertical' />
                  <a>Close</a>
               </>
            );
         },
         width: 180
      }
   ];

   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   const expandedRowRender = (record, index, indent, expanded) => {
      console.log(`ithoangtan -  ~ file: BookingAdminTable.js ~ line 194 ~ expandedRowRender ~ record`, record);
      const columns = [
         { title: "Tên", dataIndex: "buyer", key: "buyer", fixed: "left", width: 140 },
         { title: "PIN", dataIndex: "PIN", key: "PIN", width: 140 },
         { title: "Số người", dataIndex: "numberPeople", key: "numberPeople", width: 100 },
         { title: "SĐT", dataIndex: "phone", key: "phone", width: 120 },
         { title: "Email", dataIndex: "email", key: "email", width: 180 },
         {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (cell, row) => {
               // !TODO CHỗ này cần phải làm cái render status order mới
               return (
                  <span>
                     <Badge status='success' />
                     {cell}
                  </span>
               );
            },
            width: 140
         },
         {
            title: "Số tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            width: 140,
            render: (cell, row) => {
               return currencyFormat(cell || 0);
            }
         },
         { title: "PTTT", dataIndex: "paymentMethod", key: "paymentMethod", width: 120 },
         { title: "Địa chỉ", dataIndex: "address", key: "address", width: 200 },
         {
            title: "Action",
            dataIndex: "operation",
            key: "operation",
            fixed: "right",
            render: () => (
               <Space size='middle'>
                  <a>Approve</a>
                  <a>Decline</a>
               </Space>
            ),
            width: 120
         }
      ];

      return <Table columns={columns} dataSource={record?.orders || []} pagination={false} scroll={{ x: 1200 }} />;
   };
   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   // EXPAND ROW RENDER

   return (
      <BookingAdminTableStyled>
         {/*  */}
         <Table
            loading={loading}
            title={() => <h6>Danh sách booking mới</h6>}
            footer={() => "Chúc bạn một ngày tốt lành"}
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={ordersNew}
            scroll={{ x: 1400 }}
         />
         {/*  */}
         <Divider />
         <Table
            loading={loading}
            title={() => <h6>Danh sách booking đã xong</h6>}
            footer={() => "Chúc bạn một ngày tốt lành"}
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={ordersOld}
            scroll={{ x: 1600 }}
         />
         {/*  */}
      </BookingAdminTableStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => dashboard admin , không thì redirect tới homepage
      }),
      {
         getOrders: appApisActions.getOrders,
         getToursAll: appApisActions.getToursAll,
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BookingAdminTable);
