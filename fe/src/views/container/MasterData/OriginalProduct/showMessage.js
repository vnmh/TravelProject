import { message } from "antd";

import { getString } from "~/views/utilities/helpers/utilObject";

export const showMessage = (error) => {
   switch (getString(error, "message")) {
      case "error.http.404":
         return message.error(strings.product_page_not_found_product);
      default:
         return message.error(strings.server_can_not_connect);
   }
   // alert(JSON.stringify(error))
};
