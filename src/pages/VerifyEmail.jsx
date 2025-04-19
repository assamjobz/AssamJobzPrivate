
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { verification } from "@/lib/verification";
import { auth } from "@/lib/auth";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = React.useState("");
  const email = location.state?.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verification.verifyCode(email, verificationCode)) {
      auth.updateProfile({ email, emailVerified: true });
      toast({
        title: "Success",
        description: "Email verified successfully",
      });
      navigate("/login");
    } else {
      toast({
        title: "Error",
        description: "Invalid verification code",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Verify Email</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Verify Email
        </Button>
      </form>
    </motion.div>
  );
}

export default VerifyEmail;
