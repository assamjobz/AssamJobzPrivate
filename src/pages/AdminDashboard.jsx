
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";
import { ACCOUNT_STATUS } from "@/lib/constants";

function AdminDashboard() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setUsers(auth.getAllUsers().filter(user => user.role !== 'admin'));
  }, []);

  const handleStatusChange = (email, status) => {
    if (auth.updateUserStatus(email, status)) {
      setUsers(auth.getAllUsers().filter(user => user.role !== 'admin'));
      toast({
        title: "Success",
        description: `User status updated to ${status}`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage user accounts and verify employers</p>
      </motion.div>

      <div className="grid gap-6">
        {users.map((user) => (
          <motion.div
            key={user.email}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{user.name}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    user.accountStatus === ACCOUNT_STATUS.VERIFIED
                      ? "bg-green-100 text-green-800"
                      : user.accountStatus === ACCOUNT_STATUS.SUSPENDED
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {user.accountStatus}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{user.company}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mobile</p>
                    <p className="text-sm text-muted-foreground">{user.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-x-2">
                  {user.accountStatus !== ACCOUNT_STATUS.VERIFIED && (
                    <Button
                      onClick={() => handleStatusChange(user.email, ACCOUNT_STATUS.VERIFIED)}
                      variant="outline"
                      className="bg-green-100 hover:bg-green-200 text-green-800"
                    >
                      Verify Account
                    </Button>
                  )}
                  {user.accountStatus !== ACCOUNT_STATUS.SUSPENDED && (
                    <Button
                      onClick={() => handleStatusChange(user.email, ACCOUNT_STATUS.SUSPENDED)}
                      variant="outline"
                      className="bg-red-100 hover:bg-red-200 text-red-800"
                    >
                      Suspend Account
                    </Button>
                  )}
                  {user.accountStatus === ACCOUNT_STATUS.SUSPENDED && (
                    <Button
                      onClick={() => handleStatusChange(user.email, ACCOUNT_STATUS.VERIFIED)}
                      variant="outline"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800"
                    >
                      Reactivate Account
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
