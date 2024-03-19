export const shortenText = (text, n) => {
    if (text.length > n) {
      const shoretenedText = text.substring(0, n).
      concat("...");
      return shoretenedText;
    }
    return text;
  };