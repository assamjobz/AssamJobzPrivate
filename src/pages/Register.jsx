
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";
import { verification } from "@/lib/verification";

function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    company: "",
    mobileNumber: "",
    aboutCompany: "",
    companyAddress: "",
    gstNumber: "",
    panNumber: "",
    emailVerified: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = verification.generateCode();
    
    if (verification.sendVerificationEmail(formData.email, verificationCode)) {
      if (auth.register({ ...formData, verificationCode })) {
        toast({
          title: "Verification Required",
          description: "Please check your email for verification code",
        });
        navigate("/verify-email", { state: { email: formData.email } });
      } else {
        toast({
          title: "Error",
          description: "Email already exists",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to send verification email",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Input
              id="companyAddress"
              value={formData.companyAddress}
              onChange={(e) =>
                setFormData({ ...formData, companyAddress: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number (Optional)</Label>
            <Input
              id="gstNumber"
              value={formData.gstNumber}
              onChange={(e) =>
                setFormData({ ...formData, gstNumber: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number (Optional)</Label>
            <Input
              id="panNumber"
              value={formData.panNumber}
              onChange={(e) =>
                setFormData({ ...formData, panNumber: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="aboutCompany">About Company</Label>
          <Input
            id="aboutCompany"
            value={formData.aboutCompany}
            onChange={(e) =>
              setFormData({ ...formData, aboutCompany: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </motion.div>
  );
}

export default Register;
