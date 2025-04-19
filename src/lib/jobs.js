
import { JOB_STATUS } from './constants';

export const jobs = {
  getAll: (filters = {}) => {
    let allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    
    // Auto-mark jobs as recruited after 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    allJobs = allJobs.map(job => {
      if (new Date(job.createdAt) < thirtyDaysAgo && job.status === JOB_STATUS.ACTIVE) {
        return { ...job, status: JOB_STATUS.EXPIRED };
      }
      return job;
    });
    
    localStorage.setItem('jobs', JSON.stringify(allJobs));

    // Apply filters
    if (filters.district) {
      allJobs = allJobs.filter(job => job.district === filters.district);
    }
    if (filters.jobType) {
      allJobs = allJobs.filter(job => job.jobType === filters.jobType);
    }
    if (filters.isRemote !== undefined) {
      allJobs = allJobs.filter(job => job.isRemote === filters.isRemote);
    }
    if (filters.status) {
      allJobs = allJobs.filter(job => job.status === filters.status);
    }
    
    // Sort by date if requested
    if (filters.sortByDate) {
      allJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return allJobs;
  },
  
  create: (job) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const newJob = {
      ...job,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: JOB_STATUS.ACTIVE
    };
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    return newJob;
  },

  getByUser: (userId) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    return jobs.filter(job => job.userId === userId);
  },

  update: (jobId, updates) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex] = { ...jobs[jobIndex], ...updates };
      localStorage.setItem('jobs', JSON.stringify(jobs));
      return jobs[jobIndex];
    }
    return null;
  },

  delete: (jobId) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      jobs.splice(jobIndex, 1);
      localStorage.setItem('jobs', JSON.stringify(jobs));
      return true;
    }
    return false;
  },

  markAsRecruited: (jobId) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex].status = JOB_STATUS.RECRUITED;
      jobs[jobIndex].recruitedAt = new Date().toISOString();
      localStorage.setItem('jobs', JSON.stringify(jobs));
      return true;
    }
    return false;
  },

  getById: (jobId) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    return jobs.find(job => job.id === jobId) || null;
  }
};
