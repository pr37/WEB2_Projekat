using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class User
    {
        public User(string userID, string ime, string prezime, string username, string email, DateTime dateOfBirth, string address, string role, bool isAdmin, byte[] image, string imageUrl)
        {
            UserID = userID;
            Ime = ime;
            Prezime = prezime;
            Username = username;
            Email = email;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;
            this.isAdmin = isAdmin;
            Image = image;
            ImageUrl = imageUrl;
        }

        public string UserID { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public bool isAdmin { get; set; }
        public byte[] Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
