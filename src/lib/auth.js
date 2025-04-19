
export const auth = {
  initialize: () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some(u => u.email === 'basubwmik@gmail.com')) {
      users.push({
        email: 'basubwmik@gmail.com',
        password: 'Basu123@',
        name: 'Admin',
        role: 'admin',
        accountStatus: 'verified',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  },
  isAuthenticated: () => {
    return localStorage.getItem('user') !== null;
  },
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user && (user.accountStatus !== 'suspended' || user.role === 'admin')) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  },
  register: (user) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === user.email)) {
      return false;
    }
    const newUser = {
      ...user,
      role: 'user',
      accountStatus: 'pending',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  updateProfile: (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === userData.email);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(users[userIndex]));
      return true;
    }
    return false;
  },
  getAllUsers: () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },
  updateUserStatus: (email, status) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      users[userIndex].accountStatus = status;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  },
  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'admin';
  },
  canPostJobs: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.accountStatus === 'verified';
  },
  changePassword: (email, oldPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email && u.password === oldPassword);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  }
};
