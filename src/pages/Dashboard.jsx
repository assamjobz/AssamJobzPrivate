
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";
import { jobs } from "@/lib/jobs";
import { ASSAM_DISTRICTS } from "@/lib/constants";

function Dashboard() {
  const { toast } = useToast();
  const user = auth.getCurrentUser();
  const [userJobs, setUserJobs] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState(null);
  const [profileData, setProfileData] = React.useState(user);
  const [showJobForm, setShowJobForm] = React.useState(false);
  const [newJob, setNewJob] = React.useState({
    title: "",
    description: "",
    company: user.company,
    userId: user.email,
    jobType: "Full Time",
    aboutCompany: user.aboutCompany || "",
    contactDetails: user.mobileNumber || "",
    jobRoles: "",
    district: ASSAM_DISTRICTS[0],
    salary: "",
    experience: "0",
    isRemote: false
  });

  React.useEffect(() => {
    setUserJobs(jobs.getByUser(user.email));
  }, [user.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth.canPostJobs()) {
      toast({
        title: "Error",
        description: "Your account needs to be verified before posting jobs",
        variant: "destructive"
      });
      return;
    }

    const job = jobs.create(newJob);
    setUserJobs([job, ...userJobs]);
    setNewJob({
      title: "",
      description: "",
      company: user.company,
      userId: user.email,
      jobType: "Full Time",
      aboutCompany: user.aboutCompany || "",
      contactDetails: user.mobileNumber || "",
      jobRoles: "",
      district: ASSAM_DISTRICTS[0],
      salary: "",
      experience: "0",
      isRemote: false
    });
    setShowJobForm(false);
    toast({
      title: "Success",
      description: "Job posted successfully",
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (auth.updateProfile(profileData)) {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    }
  };

  const handleJobEdit = (job) => {
    setEditingJob(job);
    setNewJob(job);
    setIsEditing(true);
    setShowJobForm(true);
  };

  const handleJobUpdate = (e) => {
    e.preventDefault();
    const updatedJob = jobs.update(editingJob.id, newJob);
    if (updatedJob) {
      setUserJobs(userJobs.map(job => 
        job.id === updatedJob.id ? updatedJob : job
      ));
      setIsEditing(false);
      setEditingJob(null);
      setShowJobForm(false);
      toast({
        title: "Success",
        description: "Job updated successfully",
      });
    }
  };

  const handleJobDelete = (jobId) => {
    if (jobs.delete(jobId)) {
      setUserJobs(userJobs.filter(job => job.id !== jobId));
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    }
  };

  const handleMarkAsRecruited = (jobId) => {
    if (jobs.markAsRecruited(jobId)) {
      setUserJobs(userJobs.map(job => 
        job.id === jobId ? { ...job, status: 'recruited' } : job
      ));
      toast({
        title: "Success",
        description: "Job marked as recruited",
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-muted-foreground">Manage your profile and job postings</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) =>
                    setProfileData({ ...profileData, company: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  value={profileData.mobileNumber}
                  onChange={(e) =>
                    setProfileData({ ...profileData, mobileNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input
                  id="gstNumber"
                  value={profileData.gstNumber}
                  onChange={(e) =>
                    setProfileData({ ...profileData, gstNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number (Optional)</Label>
                <Input
                  id="panNumber"
                  value={profileData.panNumber}
                  onChange={(e) =>
                    setProfileData({ ...profileData, panNumber: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutCompany">About Company</Label>
              <textarea
                id="aboutCompany"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
                value={profileData.aboutCompany}
                onChange={(e) =>
                  setProfileData({ ...profileData, aboutCompany: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Job Postings</h2>
        <Button onClick={() => setShowJobForm(!showJobForm)}>
          {showJobForm ? "Cancel" : "Post New Job"}
        </Button>
      </div>

      {showJobForm && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Job" : "Post a New Job"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={isEditing ? handleJobUpdate : handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <select
                    id="jobType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newJob.jobType}
                    onChange={(e) =>
                      setNewJob({ ...newJob, jobType: e.target.value })
                    }
                    required
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <select
                    id="district"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newJob.district}
                    onChange={(e) =>
                      setNewJob({ ...newJob, district: e.target.value })
                    }
                    required
                  >
                    {ASSAM_DISTRICTS.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={newJob.salary}
                    onChange={(e) =>
                      setNewJob({ ...newJob, salary: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={newJob.experience}
                    onChange={(e) =>
                      setNewJob({ ...newJob, experience: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactDetails">Contact Details</Label>
                  <Input
                    id="contactDetails"
                    value={newJob.contactDetails}
                    onChange={(e) =>
                      setNewJob({ ...newJob, contactDetails: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobRoles">Job Roles & Responsibilities</Label>
                <textarea
                  id="jobRoles"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newJob.jobRoles}
                  onChange={(e) =>
                    setNewJob({ ...newJob, jobRoles: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRemote"
                  checked={newJob.isRemote}
                  onChange={(e) =>
                    setNewJob({ ...newJob, isRemote: e.target.checked })
                  }
                />
                <Label htmlFor="isRemote">Remote Job</Label>
              </div>
              <Button type="submit">{isEditing ? "Update Job" : "Post Job"}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {userJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{job.title}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    job.status === 'recruited'
                      ? "bg-green-100 text-green-800"
                      : job.status === 'expired'
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {job.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {job.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Type:</span> {job.jobType}
                    {job.isRemote && " (Remote)"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Location:</span> {job.district}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Salary:</span> {job.salary}
                  </p>
                </div>
                <div className="mt-4 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleJobEdit(job)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 hover:bg-red-200 text-red-800"
                    onClick={() => handleJobDelete(job.id)}
                  >
                    Delete
                  </Button>
                  {job.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-100 hover:bg-green-200 text-green-800"
                      onClick={() => handleMarkAsRecruited(job.id)}
                    >
                      Mark as Recruited
                    </Button>
                  )}
                </div>
                <span className="text-sm text-muted-foreground block mt-4">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
