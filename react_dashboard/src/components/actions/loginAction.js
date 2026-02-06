import { redirect } from "react-router-dom";
import { postLoginData } from "../../api/GetApi";

export const loginData = async ({ request }) => {
  try {
    const res = await request.formData();

    const data = Object.fromEntries(res);

    await postLoginData(data);

    console.log(data);

    console.log(res);

    return redirect("/");
  } catch (error) {
    console.error("Error :", error.message);

    return { error: "Please check your email and password correctly" };
  }
};
