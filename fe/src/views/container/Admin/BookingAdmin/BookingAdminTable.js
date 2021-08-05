import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { Table, Badge, Menu, Dropdown, Space, Divider, Button, Popconfirm, message, Tooltip, Typography } from "antd";
import {
   CheckOutlined,
   CloseOutlined,
   DeleteColumnOutlined,
   DeleteOutlined,
   DownOutlined,
   QuestionCircleOutlined
} from "@ant-design/icons";
import { appApisActions } from "~/state/ducks/appApis";
import _ from "lodash";
import { ORDER_STATUS, renderStatusOrder } from "~/configs/status";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import moment from "moment";
import { ORDER_DETAIL } from "~/configs/routesConfig";

const BookingAdminTableStyled = styled.div``;

const BookingAdminTable = (props) => {
   const [loading, setLoading] = useState(false);
   const [needLoadAgain, setNeedLoadAgain] = useState(true);
   const [orders, setOrders] = useState([]);
   const [ordersOld, setOrdersOld] = useState([]);
   const [ordersNew, setOrdersNew] = useState([]);

   const displayConfirm = [ORDER_STATUS.New, ORDER_STATUS.Waiting, ORDER_STATUS.Destroy];
   const displayCancel = [ORDER_STATUS.Waiting, ORDER_STATUS.Paid, ORDER_STATUS.New, ORDER_STATUS.Destroy];

   // LOAD ORDERS
   useEffect(() => {
      if (needLoadAgain) {
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
                           return (
                              o.departureDayCal === f.departureDayCal &&
                              (f.status === ORDER_STATUS.Waiting ||
                                 f.status === ORDER_STATUS.Paid ||
                                 f.status === ORDER_STATUS.New ||
                                 f.status === ORDER_STATUS.Done)
                           );
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
                        const ordersDestroy = (arrOrders || []).filter((t) => {
                           return t.departureDayCal === o.departureDayCal && t.status === ORDER_STATUS.Destroy;
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
                           ordersDestroyCount: _.sumBy(ordersDestroy, (s) => (s.destroyFee ? 1 : 0)),
                           ordersDestroyMoney: _.sumBy(ordersDestroy, "destroyFee"),
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
                  setNeedLoadAgain(false);
                  // Xác định trạng thái của 1 booking thông qua dữ liệu hiện có
                  // làm cái action nữa là xong
               });
            })
            .catch((err) => {
               setLoading(false);
               setNeedLoadAgain(false);
               console.log(`ithoangtan -  ~ file: BookingAdminTable.js ~ line 83 ~ props.getOrders ~ err`, err);
            });
      }
   }, [needLoadAgain]);
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
      {
         title: "Trạng thái",
         dataIndex: "status",
         key: "status",
         width: 120,
         render: (cell, row) => {
            let status = "processing";
            let title = "Chờ xử lý đơn hàng";
            const dayVerify = moment(row?.departureDayCal);
            if (dayVerify.diff(moment(), "days") <= 3) {
               // Còn 3 ngày là tới ngày khởi hành thì xét như sau
               // Trước đó thì toàn bộ là Chờ xử lý đơn hàng

               // Điều kiện đơn hàng done:
               // Số người > 50%
               // Tất cả orders đều đã thanh toán
               // Số người > 100%

               // Điều kiện đơn hàng hủy:
               // Toàn bộ đơn hàng ở trạng thái cancel
               // Không có đơn hàng

               let countPaid = 0;
               let countCancel = 0;
               const ar = row?.orders?.map((o) => {
                  if (o.status === ORDER_STATUS.Paid) countPaid++;
                  if (o.status === ORDER_STATUS.Cancel) countCancel++;
                  return "";
               });
               if (
                  countPaid &&
                  (countPaid === row?.orders?.length || countPaid + countCancel === row?.orders?.length)
               ) {
                  if (row?.numberPeopleAll / row?.tour?.groupSize > 0.5) {
                     status = "success";
                     title = "Sẵn sàng khởi hành";
                     if (moment().unix() - moment(row?.departureDay).unix() > 0) {
                        title = "Đã hoàn thành";
                     }
                  } else {
                     status = "warning";
                     title = "Không đủ điều kiện";
                  }
               }
               if (countCancel && countCancel === row?.orders?.length) {
                  status = "default";
                  title = "Đã hủy";
               }
            } else {
               let countPaid = 0;
               let countCancel = 0;
               const ar = row?.orders?.map((o) => {
                  if (o.status === ORDER_STATUS.Paid) countPaid++;
                  if (o.status === ORDER_STATUS.Cancel) countCancel++;
                  return "";
               });
               if (
                  countPaid &&
                  (countPaid === row?.orders?.length || countPaid + countCancel === row?.orders?.length)
               ) {
                  if (row?.numberPeopleAll / row?.tour?.groupSize >= 1) {
                     status = "success";
                     title = "Sẵn sàng khởi hành";
                  }
               }
            }

            return (
               <span>
                  <Badge status={status} />
                  {title}
               </span>
            );
         }
      },
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
      }
      // {
      //    title: "Hành động",
      //    key: "operation",
      //    align: "center",
      //    fixed: "right",
      //    render: () => {
      //       return (
      //          <div className='d-flex'>
      //             <Popconfirm
      //                placement='topRight'
      //                title='Xác nhận tour đã hoàn thành?'
      //                onConfirm={() => {}}
      //                okText='Có'
      //                cancelText='Không'>
      //                <Button type='primary'>Xong</Button>
      //             </Popconfirm>
      //             <Divider type='vertical' className=''></Divider>
      //             <Popconfirm
      //                placement='topRight'
      //                title='Bạn muốn xóa toàn bộ đơn hàng của tour này?'
      //                onConfirm={() => {}}
      //                okText='Xóa tất cả'
      //                cancelText='Không'>
      //                <Button type='dash' danger size=''>
      //                   Xóa
      //                </Button>
      //             </Popconfirm>
      //          </div>
      //       );
      //    },
      //    width: 180
      // }
   ];

   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   const expandedRowRender = (record, index, indent, expanded) => {
      const columns = [
         { title: "Tên", dataIndex: "buyer", key: "buyer", fixed: "left", width: 140 },
         { title: "PIN", dataIndex: "PIN", key: "PIN", width: 140 },
         { title: "Số người", dataIndex: "numberPeople", key: "numberPeople", width: 100 },
         { title: "SĐT", dataIndex: "phone", key: "phone", width: 140 },
         { title: "Email", dataIndex: "email", key: "email", width: 200 },
         {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (cell, row) => {
               return renderStatusOrder(cell);
            },
            width: 160
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
            title: "Thay đổi",
            dataIndex: "operation",
            key: "operation",
            fixed: "right",
            align: "center",
            render: (cell, row) => {
               return (
                  <div className='d-flex justify-content-end'>
                     {displayConfirm.includes(row?.status) && (
                        <Popconfirm
                           placement='topRight'
                           title='Bạn xác nhận đơn hàng này?'
                           onConfirm={() => {
                              const bodyUpdate = {
                                 PIN: row?.PIN,
                                 status: row?.status === ORDER_STATUS.Destroy ? ORDER_STATUS.Cancel : ORDER_STATUS.Paid
                              };
                              props
                                 .orderUpdateStatus(bodyUpdate)
                                 .then((res) => {
                                    message.success("Thành công");
                                    setNeedLoadAgain(true);
                                 })
                                 .catch((err) => {
                                    message.error("Thất bại");
                                 });
                           }}
                           okText='Xác nhận'
                           cancelText='Không'>
                           <Button type='link'>
                              <CheckOutlined style={{ color: "#1890ff" }} />
                           </Button>
                        </Popconfirm>
                     )}
                     {displayCancel.includes(row?.status) && (
                        <Popconfirm
                           placement='topRight'
                           title='Bạn muốn hủy đơn hàng này?'
                           onConfirm={() => {
                              const bodyUpdate = {
                                 PIN: row?.PIN,
                                 status: ORDER_STATUS.Cancel
                              };
                              props
                                 .orderUpdateStatus(bodyUpdate)
                                 .then((res) => {
                                    message.success("Thành công");
                                    setNeedLoadAgain(true);
                                 })
                                 .catch((err) => {
                                    message.error("Thất bại");
                                 });
                           }}
                           okText='Hủy'
                           cancelText='Không'>
                           <Button type='link' danger>
                              <CloseOutlined style={{ color: "#f5222d" }} />
                           </Button>
                        </Popconfirm>
                     )}
                     <Popconfirm
                        placement='topRight'
                        title='Bạn muốn xóa đơn hàng này?'
                        onConfirm={() => {
                           props
                              .deleteOrder(row?.idOrder)
                              .then((res) => {
                                 message.success("Thành công");
                                 setNeedLoadAgain(true);
                              })
                              .catch((err) => {
                                 message.error("Thất bại!");
                              });
                        }}
                        okText='Xóa'
                        cancelText='Không'>
                        <Button type='text'>
                           <DeleteOutlined style={{ color: "#8c8c8c" }} />
                        </Button>
                     </Popconfirm>
                  </div>
               );
            },

            width: 150
         }
      ];

      return (
         <Table
            size='small'
            columns={columns}
            dataSource={record?.orders || []}
            pagination={false}
            scroll={{ x: 1200 }}
         />
      );
   };
   const expandedRowRenderOld = (record, index, indent, expanded) => {
      const columns = [
         { title: "Tên", dataIndex: "buyer", key: "buyer", fixed: "left", width: 140 },
         { title: "PIN", dataIndex: "PIN", key: "PIN", width: 140 },
         { title: "Số người", dataIndex: "numberPeople", key: "numberPeople", width: 100 },
         { title: "SĐT", dataIndex: "phone", key: "phone", width: 140 },
         { title: "Email", dataIndex: "email", key: "email", width: 200 },
         {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (cell, row) => {
               return renderStatusOrder(cell);
            },
            width: 160
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
         { title: "Địa chỉ", dataIndex: "address", key: "address", width: 200 }
      ];

      return (
         <Table
            size='small'
            columns={columns}
            dataSource={record?.orders || []}
            pagination={false}
            scroll={{ x: 1200 }}
         />
      );
   };
   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   // EXPAND ROW RENDER
   return (
      <BookingAdminTableStyled>
         {/*  */}
         <Table
            loading={loading}
            title={() => (
               <div className='d-flex'>
                  <h6>
                     Danh sách booking mới{" "}
                     <Tooltip
                        overlayStyle={{ width: 550 }}
                        overlayInnerStyle={{ width: 550 }}
                        placement='right'
                        title={
                           <div>
                              <p>
                                 + Các tour có ngày khởi hành trong 3 ngày kế tiếp từ ngày hiện tại sẽ có trạng thái:
                              </p>
                              <p>{`   - Sẵn sàng khởi hành: Số người > 50% và Tất cả đơn hàng đều Đã thanh toán.`} </p>
                              <p>{`   - Đã hủy: Toàn bộ đơn hàng ở trạng thái Hủy.`} </p>
                              <p>{`   - Không đủ điều kiện. `} </p>
                              <hr></hr>
                              <p>+ Các tour có ngày khởi hành quá 3 ngày từ ngày hiện tại sẽ có trạng thái:</p>
                              <p>{`   - Sẵn sàng khởi hành: Số người 100% và Tất cả đơn hàng đều đã thanh toán.`} </p>
                              <p>{`   - Chờ xử lý đơn hàng.`} </p>
                           </div>
                        }>
                        <span style={{ color: "#f5222d" }}>(Lưu ý!)</span>
                     </Tooltip>
                  </h6>
               </div>
            )}
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
            expandable={{ expandedRowRender: expandedRowRenderOld }}
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
         deleteOrder: appApisActions.deleteOrder,
         orderUpdateStatus: appApisActions.orderUpdateStatus,
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(BookingAdminTable);
