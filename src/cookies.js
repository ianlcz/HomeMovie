// Set the cookie
export const setCookie = (key, value) => {
  localStorage.setItem(key, value, {
    expires: 7,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

// Remove the cookie
export const removeCookie = (key) => {
  localStorage.removeItem(key);
};

// Get the cookie from client side
export const getCookieFromBrowser = (key) => {
  return localStorage.getItem(key);
};
