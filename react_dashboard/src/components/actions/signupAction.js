import { redirect } from "react-router-dom";
import { postSignupData } from "../../api/GetApi";

export const signUpData = async ({ request }) => {
  try {
    const res = await request.formData();

    const data = Object.fromEntries(res);

    console.log(data);

    console.log(res);


    await postSignupData(data);

    return redirect("/");
  } catch (error) {
    console.error("Error : ", error.message);

    return { error: "Your email & password already exists" };
  }
};