using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace IRepositories
{
    public interface IUserRepository
    {
        public User GetUser(string id);
        public void updateUser(User user);
        public void requestRoleChange(string id, string role);
    }
}
