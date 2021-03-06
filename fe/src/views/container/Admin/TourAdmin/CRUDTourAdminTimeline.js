import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import styled from "styled-components";
import { appApisActions } from "~/state/ducks/appApis";
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, message, Upload, Image } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ImgCrop from "antd-img-crop";
import { API_URL } from "~/configs";
import { UploadOutlined } from "@ant-design/icons";
import { firstImage } from "~/views/utilities/helpers/utilObject";

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
   let inputNode = undefined;

   switch (inputType) {
      case "number":
         inputNode = <InputNumber min={1} max={100} />;
         break;
      case "textarea":
         inputNode = <TextArea rows={8} />;
         break;
      case "upload":
         inputNode = (
            // <ImgCrop rotate aspect={16 / 9} grid modalWidth={650}>
            <Upload
               name='file'
               listType="picture"
               className='avatar-uploader'
               action={`${API_URL}/file`}
               maxCount={1}
            >
               <Button icon={<UploadOutlined />}>Tải ảnh mới</Button>
            </Upload>
            // </ImgCrop>
         );
         break;
      default:
         inputNode = <Input />;
         break;
   }

   return (
      <td {...restProps}>
         {editing ? (
            <Form.Item
               name={dataIndex}
               style={{
                  margin: 0
               }}
               rules={[
                  {
                     required: true,
                     message: `Hãy nhập ${title}!`
                  }
               ]}>
               {inputNode}
            </Form.Item>
         ) : (
            children
         )}
      </td>
   );
};

const EditableTable = (props) => {
   const [form] = Form.useForm();
   const [data, setData] = useState([]);
   const [editingKey, setEditingKey] = useState("");
   const [needFetchNewData, setNeedFetchNewData] = useState(true); // Để fetch API lần đầu khi load trang

   // LOAD data timelines
   useEffect(() => {
      needFetchNewData &&
         props
            .getTimelineTour(props.currentEdit?.idTour)
            .then(({ res }) => {
               const arr = _.sortBy(_.head(res || []), "dayIndex")
               setData(arr);
               setNeedFetchNewData(false);
            })
            .catch((err) => {
               console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
            });
   }, [needFetchNewData]);

   const isEditing = (record) => record.dayIndex === editingKey;

   const edit = (record) => {
      form.setFieldsValue(record);
      setEditingKey(record.dayIndex);
   };

   const cancel = () => {
      setEditingKey("");
   };

   const save = async (dayIndex) => {
      try {
         const row = await form.validateFields();
         const newData = [...data];
         const index = newData.findIndex((item) => dayIndex === item.dayIndex);

         if (index > -1) {
            // update
            const item = newData[index];
            const body = {
               ...item,
               ...row,
               image: row?.image?.file?.response?.nameFile ? row?.image?.file?.response?.nameFile : item?.image
            }; //item: dữ liệu mới, dữ liệu cũ
            newData.splice(index, 1, body);
            setData(newData);
            setEditingKey("");
            // gọi API sửa
            props
               .putTimeline(body)
               .then((res) => {
                  message.success("Thành công!");
               })
               .catch((err) => {
                  message.error("Thất bại!");
                  console.log("hiendev ~ file: CRUDTourAdminTimeline.js ~ line 115 ~ save ~ err", err);
               });
         } else {
            // new
            newData.push(row);
            setData(newData);
            setEditingKey("");
         }
      } catch (errInfo) {
         console.log("Validate Failed:", errInfo);
      }
   };

   const NEW_TIMELINE = {
      dayIndex: 1,
      title: "tiêu đề",
      description: "mô tả",
      image: ""
   };

   const addRow = () => {
      let body = NEW_TIMELINE;
      if (data.length !== 0) {
         // đã có dữ liệu
         const newTimeline = _.last(data);
         body = { ...NEW_TIMELINE, dayIndex: newTimeline.dayIndex + 1 };
      }
      props
         .postTimeline({ ...body, idTour: props.currentEdit?.idTour })
         .then(({ res }) => {
            message.success("Thành công!");
            setNeedFetchNewData(true);
         })
         .catch((err) => {
            message.error("Thất bại!");
            console.log("hiendev ~ file: CRUDTourAdminTimeline.js ~ line 149 ~ addRow ~ err", err);
         });
   };

   const onDeleteTimeline = (timeline) => {
      // xóa khỏi giao diện
      props
         .deleteTimeline(timeline.idTimelines)
         .then((res) => {
            message.success("Thành công!");
            setNeedFetchNewData(true);
         })
         .catch((err) => {
            message.error("Thất bại!");
            console.log("hiendev ~ file: CRUDTourAdminTimeline.js ~ line 163 ~ onDeleteTimeline ~ err", err);
         });
      // xóa ở BE
   };

   const columns = [
      {
         title: "Ngày số",
         dataIndex: "dayIndex",
         inputType: "number",
         width: "10%",
      },
      {
         title: "Hình ảnh",
         dataIndex: "image",
         width: "10%",
         editable: true,
         inputType: "upload",
         render: (row, record) => {
            return _.isString(row) ? <Image
               width={100}
               src={firstImage("/img/" + row)}
               alt='-img'
            /> : ''
         },
      },
      {
         title: "Tiêu đề",
         dataIndex: "title",
         width: "30%",
         editable: true
      },
      {
         title: "Mô tả",
         dataIndex: "description",
         width: "40%",
         editable: true,
         inputType: "textarea"
      },
      {
         title: "Hoạt động",
         width: "10%",
         dataIndex: "operation",
         render: (row, record) => {
            const editable = isEditing(record);
            return editable ? (
               <span>
                  <a
                     href='javascript:;'
                     onClick={() => save(record.dayIndex)}
                     style={{
                        marginRight: 8
                     }}>
                     Lưu
                  </a>
                  <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
                     <a href='javascript:;'>Hủy</a>
                  </Popconfirm>
               </span>
            ) : (
               <span>
                  <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
                     Sửa
                  </Typography.Link>
                  {/* Chỉ hiện thị xóa đối với phần tử cuối cùng để tránh ảnh hưởng tới index */}
                  {record.dayIndex === _.last(data)?.dayIndex && (
                     <Popconfirm
                        className='ml-3'
                        placement='topRight'
                        title={"Bạn có muốn xóa timeline này?"}
                        onConfirm={() => onDeleteTimeline(record)}
                        okText='Có'
                        cancelText='Không'>
                        <Typography.Link disabled={editingKey !== ""}>Xóa</Typography.Link>
                     </Popconfirm>
                  )}
               </span>
            );
         }
      }
   ];

   const mergedColumns = columns.map((col) => {
      if (!col.editable) {
         return col;
      }

      return {
         ...col,
         onCell: (record) => ({
            record,
            inputType: col.inputType,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record)
         })
      };
   });

   return (
      <>
         {!props.currentEdit && "Chỉ có thể thêm timeline sau khi tạo tour thành công!"}
         {props.currentEdit && (
            <Form form={form} component={false}>
               <div className='d-flex justify-content-end w-100 mb-3'>
                  <Button type='primary' onClick={addRow} className='mr-3'>
                     Thêm
                  </Button>
                  <Button
                     onClick={() => {
                        props.setCurrentEdit(undefined);
                        props.setIsCreateTour && props.setIsCreateTour(undefined);
                     }}>
                     Đóng
                  </Button>
               </div>
               <Table
                  components={{
                     body: {
                        cell: EditableCell
                     }
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName='editable-row'
                  pagination={{
                     onChange: cancel
                  }}
               />
            </Form>
         )}
      </>
   );
};

const CRUDTourAdminTimelineStyled = styled.div``;

const CRUDTourAdminTimeline = (props) => {
   return (
      <CRUDTourAdminTimelineStyled>
         <EditableTable {...props} />
      </CRUDTourAdminTimelineStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
      }),
      {
         getTimelineTour: appApisActions.getTimelineTour,
         getAllImagesTour: appApisActions.getAllImagesTour,
         postTour: appApisActions.postTour,
         postTimeline: appApisActions.postTimeline,
         putTimeline: appApisActions.putTimeline,
         deleteTimeline: appApisActions.deleteTimeline,
         putTour: appApisActions.putTour,
         deleteImage: appApisActions.deleteImage
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDTourAdminTimeline);
