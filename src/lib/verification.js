
import React from "react";

export const verification = {
  generateCode: () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  },
  
  sendVerificationEmail: (email, code) => {
    // In a real app, this would send an actual email
    // For now, we'll simulate it by storing the code
    localStorage.setItem(`verification_${email}`, code);
    return true;
  },
  
  verifyCode: (email, code) => {
    const storedCode = localStorage.getItem(`verification_${email}`);
    return storedCode === code;
  }
};
