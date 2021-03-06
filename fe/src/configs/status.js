import React from "react";
//#69c0ff New, - Mới tạo
//#fff566 Waiting - Chờ xác nhận bơi admin (người dùng thanh toán bằng tiền mặt hoặc chuyển khoản)
//#5cdbd3 Paid - Đã thanh toán (1: MOMO success, 2: Admin xác nhận đã nhận tiền từ phươg thức chuyển khoản)
//#95de64 Done - Đã đi tour chơi bời tè le rồi
//#bfbfbf Cancel - Bị hủy (1: MOMO error, 2: admin hủy)

export const ORDER_STATUS = {
   New: "New",
   Waiting: "Waiting",
   Paid: "Paid",
   // Done: "Done",
   Cancel: "Cancel",
   Destroy: "Destroy"
};
export const renderStatusOrder = (status, type) => {
   if (type === "String") {
      switch (status) {
         case ORDER_STATUS.New:
            return "Mới";
         case ORDER_STATUS.Waiting:
            return "Chờ thanh toán";
         case ORDER_STATUS.Paid:
            return "Đã thanh toán";
         case ORDER_STATUS.Cancel:
            return "Đã hủy";
         case ORDER_STATUS.Destroy:
            return "Chờ xác nhận hủy";
         default:
            break;
      }
   } else
      switch (status) {
         case ORDER_STATUS.New:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#69c0ff",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Mới
               </span>
            );
         case ORDER_STATUS.Waiting:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#fff566",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Chờ thanh toán
               </span>
            );
         case ORDER_STATUS.Paid:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#5cdbd3",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Đã thanh toán
               </span>
            );
         case ORDER_STATUS.Cancel:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#bfbfbf",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Đã hủy
               </span>
            );
         case ORDER_STATUS.Destroy:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#fa541c",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Chờ xác nhận hủy
               </span>
            );
         default:
            break;
      }
};

export const REVIEW_STATUS = {
   New: "New",
   Approve: "Approve",
   Cancel: "Cancel"
};
export const renderStatusReview = (status, type) => {
   if (type === "String") {
      switch (status) {
         case REVIEW_STATUS.New:
            return "Chờ duyệt";
         case REVIEW_STATUS.Approve:
            return "Đã duyệt";
         case REVIEW_STATUS.Cancel:
            return "Đã hủy";

         default:
            break;
      }
   } else
      switch (status) {
         case REVIEW_STATUS.New:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#69c0ff",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Chờ duyệt
               </span>
            );
         case REVIEW_STATUS.Approve:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#95de64",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Đã duyệt
               </span>
            );
         case REVIEW_STATUS.Cancel:
            return (
               <span
                  style={{
                     color: "#ffffff",
                     background: "#bfbfbf",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: "1px 8px 1px 8px"
                  }}>
                  Đã hủy
               </span>
            );

         default:
            break;
      }
};
