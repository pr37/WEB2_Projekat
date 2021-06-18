﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Repositories;

namespace Repositories.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20210605185835_migfin")]
    partial class migfin
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.6")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Instruction", b =>
                {
                    b.Property<string>("InstructionID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Equipment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Executed")
                        .HasColumnType("bit");

                    b.Property<string>("PlanRadaID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Validated")
                        .HasColumnType("bit");

                    b.HasKey("InstructionID");

                    b.ToTable("InstrukcijeTB");
                });

            modelBuilder.Entity("Models.IstorijaPromenePlanaRada", b =>
                {
                    b.Property<int>("IstorijaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ChangedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PlanRadaID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IstorijaID");

                    b.ToTable("IstorijeTB");
                });

            modelBuilder.Entity("Models.MultimediaPlanRada", b =>
                {
                    b.Property<int>("MultimediaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlanRadaID")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MultimediaID");

                    b.ToTable("MultimedijeTB");
                });

            modelBuilder.Entity("Models.Notifikacija", b =>
                {
                    b.Property<string>("NotifikacijaID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ForUserID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Read")
                        .HasColumnType("bit");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Tied")
                        .HasColumnType("bit");

                    b.Property<string>("TiedTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("datetime2");

                    b.HasKey("NotifikacijaID");

                    b.ToTable("NotifikacijeTB");
                });

            modelBuilder.Entity("Models.PlanRada", b =>
                {
                    b.Property<string>("PlanRadaID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Beleske")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Company")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detalji")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FieldCrew")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IncidentID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Svrha")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipNaCemu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipRada")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkRequestID")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PlanRadaID");

                    b.ToTable("PlanoviRadaTB");
                });

            modelBuilder.Entity("Models.Podesavanja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("ErrorVisible")
                        .HasColumnType("bit");

                    b.Property<bool>("HideRequiredFields")
                        .HasColumnType("bit");

                    b.Property<bool>("InfoVisible")
                        .HasColumnType("bit");

                    b.Property<bool>("SuccessVisible")
                        .HasColumnType("bit");

                    b.Property<bool>("WarningVisible")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("PodesavanjaTB");
                });

            modelBuilder.Entity("Models.Potrosac", b =>
                {
                    b.Property<string>("PotrosacID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Ime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipPotrosaca")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PotrosacID");

                    b.ToTable("PotrosaciTB");
                });

            modelBuilder.Entity("Models.Poziv", b =>
                {
                    b.Property<string>("PozivID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<int>("Prioritet")
                        .HasColumnType("int");

                    b.Property<string>("Problem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ulica")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PozivID");

                    b.ToTable("PoziviTB");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RequestedRole")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("bit");

                    b.HasKey("UserID");

                    b.ToTable("UsersTB");
                });
#pragma warning restore 612, 618
        }
    }
}
