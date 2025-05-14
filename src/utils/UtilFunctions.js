import { toast } from "react-toastify";

// Cookie utilities 

export const getCookie = (name) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookies = (names) => {
  names.forEach(name => {
    document.cookie = name + '=; Max-Age=0';
  });
};

export const setCookie = (name, value, time) => {
  let expires = "";
  if (time) {
    let date = new Date();
    date.setTime(date.getTime() + time);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Token extraction

export const authHeader = () => ({
  headers: {
    'Authorization': 'Bearer ' + getCookie("access_token"),
  },
});

export const authHeaderWithRefresh = () => ({
  headers: {
    'Authorization': 'Bearer ' + getCookie("refresh_token"),
  },
});

// Navigate to home

export const redirectToHome = () => {
  window.location.href = window.location.origin;
};

// Toast error and success messages

const toastConfig = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
};

export function showToastSuccess(message) {
  toast.success(message, toastConfig);
};

export function showToastError(message) {
  toast.error(message, toastConfig);
};
