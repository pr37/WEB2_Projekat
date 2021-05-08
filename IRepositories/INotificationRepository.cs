using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace IRepositories
{
    public interface INotificationRepository
    {
        public IEnumerable<Notifikacija> GetAllNotifications(string userID);
        public void markNotificationRead(string notificationID);
        public void markAllNotificationsRead(string userID);
        public void createNotification(Notifikacija notifikacija, string userID);

    }
}
