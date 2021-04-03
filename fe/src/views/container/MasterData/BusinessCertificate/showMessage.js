import { message } from "antd";

import { getString } from "~/views/utilities/helpers/utilObject";

export const showMessage = (error) => {
   switch (getString(error, "message")) {
      case "category.alreadyexist":
         return message.warning(getString(strings.CATEGORY_PAGE_MESSAGE_UPDATE_FALURE_NAME_EXIST));
      case "categorydefault.notfound":
         return message.warning(getString(strings.CATEGORY_PAGE_MESSAGE_DELETE_FALURE));
      default:
         return message.error(strings.server_can_not_connect);
   }
   // alert(JSON.stringify(error))
};
