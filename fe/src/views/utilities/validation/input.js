/*eslint-disable */
import * as yup from "yup";

/** Regex Validation **/
export const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const emailRegex = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;
const isEmailOrPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;

const passwordSchema = yup.string().min(6, "strings.invalid_password");

export const emailValidate = yup
   .string()
   .trim()
   .matches(emailRegex, "strings.invalid_email")
   .required("strings.email_required")
   .max(50, "strings.formatString(strings.max_length, { max: 50 })");
export const emailNRValidate = yup
   .string()
   .trim()
   .matches(emailRegex, "strings.invalid_email")
   .max(50, "strings.formatString(strings.max_length, { max: 50 })");

export const phoneValidate = yup
   .string()
   .trim()
   .matches(phoneRegex, "strings.invalid_phone")
   .required("strings.invalid_phone");
export const phoneNRValidate = yup.string().trim().matches(phoneRegex, "strings.invalid_phone").nullable();

export const numberValidate = yup
   .number()
   .min(0, "strings.more_than_zero")
   .typeError("strings.must_be_number")
   .nullable()
   .max(9223372036854775807, "strings.number_to_large");
export const numberValidateMinMax = (message, min = 0, max = 9223372036854775807) =>
   yup
      .number()
      .required(message || "strings.required")
      .min(min, "strings.formatString(strings.more_than_number, { number: min })")
      .typeError("strings.must_be_number")
      .nullable()
      .max(max, "strings.formatString(strings.number_to_larger, { number: max })");
export const numberRequired = (message, max = 9223372036854775807) =>
   yup
      .number()
      .required(message || "strings.required")
      .min(0, " strings.more_than_zero")
      .typeError("strings.must_be_number")
      .nullable()
      .max(max, "strings.number_to_large");
export const numberRequiredField = yup.number().required("strings.required");
export const passwordValidate = passwordSchema
   .required("strings.password_required")
   .max(60, "strings.formatString(strings.max_length, { max: 60 })");
export const passwordConfirmationValidate = passwordValidate.oneOf(
   [yup.ref("password"), null],
   "strings.password_not_matched"
);

export const phoneOrEmailValidate = yup
   .string()
   .trim()
   .required("strings.phone_or_email_required")
   .matches(isEmailOrPhone, "strings.invalid_email_or_phone")
   .max(50, "strings.formatString(strings.max_length, { max: 50 })");

export const stringRequiredField = (message, maxLength = 255) =>
   yup
      .string()
      .trim()
      .required(message || "strings.required")
      .max(maxLength, "strings.formatString(strings.max_length, { max: maxLength })");
export const stringNRFieldValidate = (maxLength = 255) =>
   yup.string().max(maxLength, "strings.formatString(strings.max_length, { max: maxLength })").nullable();
