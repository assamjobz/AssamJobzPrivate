import React from "react";

export const verification = {
  generateCode: () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  },
  
  sendVerificationEmail: (email, code) => {
    localStorage.setItem(`verification_${email}`, code);
    return true;
  },
  
  verifyCode: (email, code) => {
    const storedCode = localStorage.getItem(`verification_${email}`);
    return storedCode === code;
  }
};
