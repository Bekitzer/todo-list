import { required, email, max } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "שדה זה הוא חובה"
});

extend("max", {
  ...max,
  message: "שדה זה לא יכול להכיל יותר מ-{length} תווים"
});

extend("email", {
  ...email,
  message: "שדה זה חייב להיות דוא׳ל חוקי"
});
