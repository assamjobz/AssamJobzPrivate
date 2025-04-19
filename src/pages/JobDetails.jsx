
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobs } from "@/lib/jobs";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = React.useState(null);

  React.useEffect(() => {
    const jobData = jobs.getById(Number(id));
    if (jobData) {
      setJob(jobData);
    }
  }, [id]);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        ← Back to Jobs
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{job.title}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {job.jobType}
              {job.isRemote && " (Remote)"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Company</p>
              <p>{job.company}</p>
            </div>
            <div>
              <p className="font-medium">Location</p>
              <p>{job.jobLocation}</p>
            </div>
            <div>
              <p className="font-medium">Salary</p>
              <p>{job.salary}</p>
            </div>
            <div>
              <p className="font-medium">Experience Required</p>
              <p>{job.experience} years</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Roles & Responsibilities
            </h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {job.jobRoles}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">About the Company</h3>
            <p className="text-muted-foreground">{job.aboutCompany}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-muted-foreground">{job.contactDetails}</p>
          </div>

          <div className="flex justify-end">
            <Button size="lg">Apply Now</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default JobDetails;
