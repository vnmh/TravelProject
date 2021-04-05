import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { Form } from "antd";
import enhance from "./withForm";
import { Button } from "antd";
import styled from "styled-components";
import { ACCOUNT_RECOVERY_PATH } from "~/configs/routesConfig";
import Color from "~/views/utilities/layout/color";

const FormStyled = styled(Form)`
   width: 100%;
   .login   {
      color: ${Color.brow};
   }
   .login_anotation {
      color: ${Color.browLight};
      font-style: italic;
      font-weight: 400;
   }
   div div button:hover {
      color: ${Color.browLight};
      text-decoration: none;
      border: none;
   }
   div div button {
      color: ${Color.brow};
      text-decoration: none;
      font-style: italic;
      border: none;
   }
`;

class LoginForm extends PureComponent {
   render() {
      const { handleSubmit, isValid, isSubmitting, history } = this.props;

      return (
         <FormStyled onFinish={handleSubmit}>
            <h3 className='login'>{"strings.login"}</h3>
            <p className='login_anotation mb-5'>{"strings.login_anotation"}</p>
            <Row type='flex' align='middle' className='mt-4'>
               <Button
                  style={{ width: "100%" }}
                  type='primary'
                  htmlType='submit'
                  loading={isSubmitting}
                  disabled={!isValid}>
                  <span>{"strings.login"}</span>
               </Button>
            </Row>
            <Row type='flex' className='mt-3'>
               <Col span={24} className='d-flex justify-content-between'>
                  <button
                     className='btn btn-link mx-0 px-0'
                     type='button'
                     onClick={() => {
                        history.push(ACCOUNT_RECOVERY_PATH);
                     }}>
                     <span>{"strings.forgot_password"}</span>
                  </button>
               </Col>
            </Row>
         </FormStyled>
      );
   }
}

export default enhance(LoginForm);
