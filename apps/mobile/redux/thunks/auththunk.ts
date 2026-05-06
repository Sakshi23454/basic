// import { getStorage } from "./../utils/authStorage";
// import { setAdmin } from "./../slices/auth.slice";
// // import { setAdmin } from "./../slices/auth.slice";

// export const loadAdmin = () => async (dispatch: any) => {
//   const data = await getStorage();
//   dispatch(setAdmin(data));
// };

import { getStorage } from "../utils/authStorage";
import { setAdmin } from "../slices/auth.slice";

export const loadAdmin = () => async (dispatch: any) => {
  try {
    const data = await getStorage();
    dispatch(setAdmin(data));
  } catch (error) {
    console.error("Error loading admin from storage", error);
  }
};