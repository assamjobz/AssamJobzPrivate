
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/jobs";

function Home() {
  const [jobList, setJobList] = React.useState([]);

  React.useEffect(() => {
    setJobList(jobs.getAll());
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-muted-foreground">
          Browse through hundreds of job opportunities
        </p>
      </motion.div>

      <div className="space-y-4">
        {jobList.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Link to={`/jobs/${job.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{job.title}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {job.jobType}
                      {job.isRemote && " (Remote)"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground line-clamp-2 mb-2">
                        {job.description}
                      </p>
                      <p className="text-sm font-medium">{job.company}</p>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>📍 {job.jobLocation}</p>
                      <p>💰 {job.salary}</p>
                      <p>⭐ {job.experience} years experience</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
