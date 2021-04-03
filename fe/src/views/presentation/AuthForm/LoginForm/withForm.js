import { compose } from "recompose";
import { connect } from "react-redux";
import * as yup from "yup";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";

import { authActions } from "~/state/ducks/authUser";
import { DASHBOARD, SETUP_PROFILE_PATH } from "~/configs/routesConfig";

import { passwordValidate, phoneOrEmailValidate } from "~/views/utilities/validation/input";
import { getBool } from "~/views/utilities/helpers/utilObject";

const validationSchema = yup.object().shape({
   password: passwordValidate,
   username: phoneOrEmailValidate
});

export default compose(
   withRouter,
   connect(null, {
      login: authActions.login,
      getProfile: authActions.getProfile
   }),
   withFormik({
      displayName: "loginForm",
      mapPropsToValues: () => ({
         username: "",
         password: "",
         rememberMe: true
      }),
      validationSchema: validationSchema,
      handleSubmit: async (values, { props, setSubmitting }) => {
         const { login, getProfile, history } = props;
         login(values)
            .then(() => getProfile())
            .then(({ res }) => {
               setSubmitting(false);

               if (getBool(res, "isSkipProfile", false) === false) {
                  history.push(SETUP_PROFILE_PATH);
               } else {
                  history.push(DASHBOARD);
               }
            })
            .catch((err) => {
               console.error(`ithoangtan ~ err`, err)
               setSubmitting(false);
            });
      }
   })
);
