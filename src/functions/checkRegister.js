export default function checkRegister(form, status) {
  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checked = {};
  if (status === "login") {
    if (form.password.length < 6) {
      checked = {
        ...checked,
        password: "Password is too short!",
        passwordStat: false,
      };
    } else {
      checked = { ...checked, passwordStat: true, password: true };
    }
    if (!form.email.toLowerCase().match(validRegex)) {
      checked = { ...checked, emailStat: false, email: "Email is not valid!" };
    } else {
      checked = { ...checked, emailStat: true, email: true };
    }
  }
  if (status === "signup") {
    if (form.password.length < 6) {
      checked = {
        ...checked,
        password: "Password is too short!",
        passwordStat: false,
      };
    } else {
      checked = { ...checked, passwordStat: true, password: true };
    }
    if (form.confirmPassword !== form.password) {
      checked = {
        ...checked,
        confirmPassword: "Passwords are not match!",
        confirmPasswordStat: false,
      };
    } else {
      checked = {
        ...checked,
        confirmPassword: true,
        confirmPasswordStat: true,
      };
    }
    if (!form.email.toLowerCase().match(validRegex)) {
      checked = { ...checked, emailStat: false, email: "Email is not valid!" };
    } else {
      checked = { ...checked, emailStat: true, email: true };
    }
  }

  return checked;
}
