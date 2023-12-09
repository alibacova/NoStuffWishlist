const initialUserInfo = {
  email: "",
  password: "",
  passwordConf: "",
};

const noError = {
  isValid: true,
  message: null,
};

const noErrorObject = {
  email: noError,
  password: noError,
  general: noError,
};

const initialWishInfo = {
  title: "",
  description: "",
  url: "",
};

const initialLoginInfo = {
  email: "",
  password: "",
};

export { initialUserInfo, noErrorObject, initialWishInfo, initialLoginInfo };
