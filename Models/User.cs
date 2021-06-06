using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        public User(string userID, string ime, string prezime, string username, string password, string email, DateTime dateOfBirth, string address, string role, string requestedRole, bool isAdmin, byte[] image, string imageUrl)
        {
            UserID = userID;
            Ime = ime;
            Prezime = prezime;
            Username = username;
            Password = password;
            Email = email;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;
            RequestedRole = requestedRole;
            this.isAdmin = isAdmin;
            Image = image;
            ImageUrl = imageUrl;
        }
        [Key]
        public string UserID { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public string RequestedRole { get; set; }
        public bool isAdmin { get; set; }
        public byte[] Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
