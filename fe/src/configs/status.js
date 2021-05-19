import React from "react";
//#69c0ff New, - Mới tạo
//#fff566 Waiting - Chờ xác nhận bơi admin (người dùng thanh toán bằng tiền mặt hoặc chuyển khoảng)
//#5cdbd3 Paid - Đã thanh toán (1: MOMO success, 2: Admin xác nhận đã nhận tiền ừ phươg thức chuyển khoản)
//#95de64 Done - Đã đi toủ chơi bời tè le rồi
//#bfbfbf Cancel - Bị hủy (1: MOMO error, 2: admin hủy)

export const ORDER_STATUS = {
   New: "New",
   Waiting: "Waiting",
   Paid: "Paid",
   Done: "Done",
   Cancel: "Cancel"
};
export const renderStatusOrder = (status) => {
   switch (status) {
      case ORDER_STATUS.New:
         return <span style={{ color: "#ffffff", background: "#69c0ff", borderRadius: "10px", textAlign: "center" }}>Mới</span>;
      case ORDER_STATUS.Waiting:
         return <span style={{ color: "#ffffff", background: "#fff566", borderRadius: "10px", textAlign: "center" }}>Chờ xác nhận</span>;
      case ORDER_STATUS.Paid:
         return <span style={{ color: "#ffffff", background: "#5cdbd3", borderRadius: "10px", textAlign: "center" }}>Đã thanh toán</span>;
      case ORDER_STATUS.Done:
         return <span style={{ color: "#ffffff", background: "#95de64", borderRadius: "10px", textAlign: "center" }}>Hoàn thành</span>;
      case ORDER_STATUS.Cancel:
         return <span style={{ color: "#ffffff", background: "#bfbfbf", borderRadius: "10px", textAlign: "center" }}>Đã hủy</span>;
      default:
         break;
   }
};
