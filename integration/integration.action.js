const { isEmailBurner } = require("burner-email-providers");

/**
* Handler that will be called during the execution of a PreUserRegistration flow.
*
* @param {Event} event - Details about the context and user that is attempting to register.
* @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
*/
exports.onExecutePreUserRegistration = async (event, api) => {
  const allowList = event.configuration.ALLOW_LIST || "";
  const errorMsg = event.configuration.ERROR_MSG || `${event.user.email.split('@')[1]} is an email burner 🔥. Please sign up with a valid email address`;
  const emailDomain = event.user.email.split("@")[1];

  if (allowList.includes(emailDomain)) {
    console.log(`Email Burner: ${emailDomain} defined in the allow list`);
    return;
  }

  if (isEmailBurner(event.user.email)) {
    api.access.deny(errorMsg, errorMsg);
  }
};
