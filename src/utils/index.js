export const shortenText = (text, n) => {
  if (text.length > n) {
    // eslint-disable-next-line
      const shoretenedText = text.substring(0, n).
          concat("...");
      return shoretenedText;
  }
  return text;
};

// Validate Email
export const validateEmail = (email) => {
  return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
