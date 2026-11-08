const generateRecoveryCode = (expiryMinutes = 2) => {
  const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

  const expiryTime = new Date(Date.now() + expiryMinutes * 60 * 1000);

  return {
    recoveryCode,
    expiryTime,
  };
};

export default generateRecoveryCode;
