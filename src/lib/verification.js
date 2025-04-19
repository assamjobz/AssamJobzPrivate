import React from "react";

export const verification = {
  generateCode: () => {
    return "DISABLED"; // No real code
  },
  
  sendVerificationEmail: (email, code) => {
    return true; // Always succeed without doing anything
  },
  
  verifyCode: (email, code) => {
    return true; // Always pass verification
  }
};
