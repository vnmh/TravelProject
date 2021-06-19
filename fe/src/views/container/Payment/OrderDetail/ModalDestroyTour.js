import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
import StatusPayment from "./StatusPayment";
import PaymentDetail from "./PaymentDetail";
import InfoBooking from "./InfoBooking";
import Header from "../../Header";
import { Button, message, Typography } from "antd";
import { appApisActions } from "~/state/ducks/appApis";
import queryString from "query-string";
import { ORDER_STATUS } from "~/configs/status";
import ScrollToTop from "~/ScrollToTop";
import { Link, useHistory } from "react-router-dom";
import { Form } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import moment from 'moment'
import { currencyFormat } from "~/views/utilities/helpers/currency";
import { USER_BOOKING } from "~/configs/routesConfig";

const OrderDetailStyled = styled.div``;

function DestroyTour(props) {
   const [form] = Form.useForm()
   const params = queryString.parse(window.location.search);
   const [loading, setLoading] = useState(false)
   const history = useHistory()
   const [destroyFee, setDestroyFee] = useState(0)


   useEffect(() => {
      // GET info price
      const dayOrderFromNow = Math.abs(moment().diff(props.orderDetail?.departureDay, 'days'));
      const totalPrice = props.orderDetail?.order?.totalPrice
      if (dayOrderFromNow > 45) setDestroyFee(0);
      if (dayOrderFromNow >= 30 && dayOrderFromNow <= 45) setDestroyFee(totalPrice * 0.1);
      if (dayOrderFromNow >= 16 && dayOrderFromNow <= 29) setDestroyFee(totalPrice * 0.3);
      if (dayOrderFromNow >= 8 && dayOrderFromNow <= 15) setDestroyFee(totalPrice * 0.6);
      if (dayOrderFromNow >= 4 && dayOrderFromNow <= 7) setDestroyFee(totalPrice * 0.9);
      if (dayOrderFromNow >= 1 && dayOrderFromNow <= 3) setDestroyFee(totalPrice * 1);

   }, [props.visibleModalDestroy])

   const onFinish = (values) => {
      // Gọi API hủy tour
      // Gọi API change status order thành Cancel
      setLoading(true)
      const bodyUpdate = {
         PIN: props.orderDetail?.order?.PIN,
         status: ORDER_STATUS.Destroy,
         destroyFee
      };
      console.log(`ithoangtan -  ~ file: ModalDestroyTour.js ~ line 53 ~ onFinish ~ props.orderDetail`, props.orderDetail)

      props
         .orderUpdateStatus(bodyUpdate)
         .then((res) => {
            setLoading(false)
            props.setVisibleModalDestroy(false)
            message.success("Yêu cầu hủy tour đang chờ duyệt, chúng tôi sẽ thông báo cho bạn kết quả trong 24h!", 4);
            if (props.user)
               history.push(USER_BOOKING)
            else message.success("Thông tin hủy tour đã được gửi tới mail của bạn!", 4);
            props.setIsDestroy(true)
         })
         .catch((err) => {
            setLoading(false)
            message.error("Hủy tour thất bại - Vui lòng liên hệ để khắc hủy trực tiếp");
         });
   }


   return (<Form form={form} onFinish={onFinish} className="d-flex flex-column">
      <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
         <p>    Thời gian hủy tour được tính cho ngày làm việc, không tính thứ bảy, chủ nhật và các ngày Lễ Tết.</p>
         <p>Các tour ngày lễ, tết là các tour có thời gian diễn ra rơi vào một trong các ngày lễ, tết theo qui định.</p>


         <h5>  1. Trường hợp bị hủy bỏ do TRAVEL TRIZEN:</h5>
         <p>     Nếu TRAVEL TRIZEN không thực hiện được chuyến du lịch, du lịch Trizen Travel phải báo ngay cho khách hàng biết và thanh toán lại cho khách hàng toàn bộ số tiền khách hàng đã đóng trong vòng 3 ngày kể từ lúc việc thông báo hủy chuyến du lịch bằng tiền mặt hoặc chuyển khoản.</p>
         <h5>    2. Trường hợp bị hủy bỏ do khách hàng:</h5>
         <p>Các điều kiện huỷ tour (đối với ngày thường):</p>

         <p> – Hủy tour ngay sau khi Đại Sứ Quán, Lãnh Sự Quán đã cấp visa: Chi phí huỷ tour là 100% tiền cọc tour.</p>

         <p> – Hủy tour từ 30 – 45 ngày trước ngày khởi hành: Phí huỷ tour là 10% trên tổng giá tour.</p>

         <p> – Hủy tour từ 16 – 29 ngày trước ngày khởi hành: Phí huỷ tour là 30% trên tổng giá tour.</p>

         <p> – Hủy tour từ 08 – 15 ngày trước ngày khởi hành: Phí huỷ tour là 60% trên tổng giá tour.</p>

         <p> – Hủy tour từ 04 – 07 ngày trước ngày khởi hành: Phí huỷ tour là 90% trên tổng giá tour.</p>

         <p> – Hủy tour từ 01 – 03 ngày trước ngày khởi hành: Phí huỷ tour là 100% trên tổng giá tour.</p>

         <p>  -Thời gian hủy tour được tính cho ngày làm việc, không tính thứ bảy, chủ nhật và các ngày Lễ Tết.</p>

         <b>  * Các tour ngày lễ, tết là các tour có thời gian diễn ra rơi vào một trong các ngày lễ, tết theo qui định.</b>

         <p>  Các điều kiện huỷ tour (đối với ngày lễ, Tết):</p>

         <p>  – Hủy tour ngay sau khi Đại Sứ Quán, Lãnh Sự Quán đã cấp visa: Chi phí huỷ tour là 100% tiền cọc tour.</p>

         <p> – Hủy tour từ 30 – 45 ngày trước ngày khởi hành: Phí huỷ tour là 30% trên tổng giá tour.</p>

         <p> – Hủy tour từ 16 – 29 ngày trước ngày khởi hành: Phí huỷ tour là 60% trên tổng giá tour.</p>

         <p> – Hủy tour từ 08 – 15 ngày trước ngày khởi hành: Phí huỷ tour là 90% trên tổng giá tour.</p>

         <p>  – Hủy tour từ 01 – 07 ngày trước ngày khởi hành: Phí huỷ tour là 100% trên tổng giá tour.</p>

         <p>  -Thời gian hủy tour được tính cho ngày làm việc, không tính thứ bảy, chủ nhật và các ngày Lễ Tết.</p>

         <p>  * Các tour ngày lễ, tết là các tour có thời gian diễn ra rơi vào một trong các ngày lễ, tết theo qui định.</p>

         <b>    Lưu ý:</b>
         <p> – Trường hợp hủy tour do sự cố khách quan như thiên tai, dịch bệnh, hoãn và hủy chuyến của các phương tiện vận chuyển công cộng… TRAVEL TRIZEN sẽ không chịu trách nhiệm bồi thường thêm bất kỳ chi phí nào ngoài việc hoàn trả tiền tour.</p>
         <p>– Trên đây là mức phạt hủy tối đa, chi phí này có thể được giảm tùy theo điều kiện của từng nhà cung cấp dịch vụ cho TRAVEL TRIZEN.</p>
         <p>  – Thời gian hủy chuyến du lịch được tính cho ngày làm việc, không tính thứ 7, Chủ Nhật và các ngày Lễ, Tết.</p>

         <p>   DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ TRÊN TRANG TRAVEL TRIZEN.COM.VN THANH TOÁN TRỰC TUYẾN</p>

         <p>  Khách hàng hủy Vé du lịch theo đúng những qui định trên, trong trường hợp khách thanh toán trực tuyến, nếu hủy Vé du lịch khách hàng sẽ chịu toàn bộ phí ngân hàng cho việc thanh toán tiền Vé du lịch.</p>
         <p>  Việc hoàn trả tiền cho khách sẽ được TRAVEL TRIZEN thực hiện ngay sau khi ngân hàng thông báo tiền đã vào tài khoản của TRAVEL TRIZEN.</p>

         <p>  Trường hợp bất khả kháng</p>
         <p> Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì một lý do bất khả kháng (hỏa hoạn, thời tiết, tai nạn, thiên tai, chiến tranh, hoãn và hủy chuyến của các phương tiện vận chuyển công cộng…), thì hai bên sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý nào. Tuy nhiên mỗi bên có trách nhiệm cố gắng tối đa để giúp đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng.</p>

         <b>  Note: Việc huỷ bỏ chuyến đi phải được thông báo trực tiếp với Công ty hoặc qua fax, email và phải được Công ty xác nhận. Việc huỷ bỏ bằng điện thoại không được chấp nhận.</b>
      </div>
      <Form.Item valuePropName="checked" className="mt-2" name="approve" rules={[
         {
            required: true,
            message: "Vui lòng đồng ý với điều khoản và chính sách của chúng tôi!"
         },
      ]}>
         <Checkbox>Đồng ý với điều khoản và chính sách hủy tour</Checkbox>
      </Form.Item>
      <div className="d-flex justify-content-center align-items-center">
         <Typography.Title level={5}>Phí hủy tour: {currencyFormat(destroyFee)}</Typography.Title>
      </div>
      <Button loading={loading} type="primary" className="mt-2" size="large" danger htmlType="submit">HỦY TOUR</Button>
   </Form>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getAllImagesTour: appApisActions.getAllImagesTour,
      getOrder: appApisActions.getOrder,
      orderUpdateStatus: appApisActions.orderUpdateStatus
   }
)(DestroyTour);
