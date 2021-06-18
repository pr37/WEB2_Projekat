using System;
using System.Collections.Generic;
using System.Text;
using IRepositories;
using Models;

namespace Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        public void createNotification(Notifikacija notifikacija, string userID)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Notifikacija> GetAllNotifications(string userID)
        {
            throw new NotImplementedException();
        }

        public void markAllNotificationsRead(string userID)
        {
            throw new NotImplementedException();
        }

        public void markNotificationRead(string notificationID)
        {
            throw new NotImplementedException();
        }
    }
}
