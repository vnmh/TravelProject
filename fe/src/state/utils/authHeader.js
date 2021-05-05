import { getCookie } from "./session";
import { JWT } from "~/configs/index";
import moment from "moment";
const authHeader = () => {
   let token = getCookie(JWT);

   if (token) {
      //YYYY-MM-DDTHH:mm:ss.SSS[Z]
      return {
         Authentication: token, // Chỗ này phải là Authentication chứ không phải Authencation
         localDatetime: moment().format("YYYY-MM-DDTHH:mm:ssZ")
      };
   } else {
      return { localDatetime: moment().format("YYYY-MM-DDTHH:mm:ssZ") };
   }
};

export default authHeader;
