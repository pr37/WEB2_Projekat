using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repositories.Migrations
{
    public partial class prva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InstrukcijeTB",
                columns: table => new
                {
                    InstructionID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PlanRadaID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Equipment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Validated = table.Column<bool>(type: "bit", nullable: false),
                    Executed = table.Column<bool>(type: "bit", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstrukcijeTB", x => x.InstructionID);
                });

            migrationBuilder.CreateTable(
                name: "IstorijeTB",
                columns: table => new
                {
                    IstorijaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlanRadaID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IstorijeTB", x => x.IstorijaID);
                });

            migrationBuilder.CreateTable(
                name: "MultimedijeTB",
                columns: table => new
                {
                    MultimediaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlanRadaID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MultimedijeTB", x => x.MultimediaID);
                });

            migrationBuilder.CreateTable(
                name: "NotifikacijeTB",
                columns: table => new
                {
                    NotifikacijaID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ForUserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Tied = table.Column<bool>(type: "bit", nullable: false),
                    TiedTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Read = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifikacijeTB", x => x.NotifikacijaID);
                });

            migrationBuilder.CreateTable(
                name: "PlanoviRadaTB",
                columns: table => new
                {
                    PlanRadaID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TipNaCemu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TipRada = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkRequestID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IncidentID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FieldCrew = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Svrha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Detalji = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Beleske = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanoviRadaTB", x => x.PlanRadaID);
                });

            migrationBuilder.CreateTable(
                name: "PotrosaciTB",
                columns: table => new
                {
                    PotrosacID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TipPotrosaca = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PotrosaciTB", x => x.PotrosacID);
                });

            migrationBuilder.CreateTable(
                name: "PoziviTB",
                columns: table => new
                {
                    PozivID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Problem = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoziviTB", x => x.PozivID);
                });

            migrationBuilder.CreateTable(
                name: "UsersTB",
                columns: table => new
                {
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestedRole = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersTB", x => x.UserID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InstrukcijeTB");

            migrationBuilder.DropTable(
                name: "IstorijeTB");

            migrationBuilder.DropTable(
                name: "MultimedijeTB");

            migrationBuilder.DropTable(
                name: "NotifikacijeTB");

            migrationBuilder.DropTable(
                name: "PlanoviRadaTB");

            migrationBuilder.DropTable(
                name: "PotrosaciTB");

            migrationBuilder.DropTable(
                name: "PoziviTB");

            migrationBuilder.DropTable(
                name: "UsersTB");
        }
    }
}
