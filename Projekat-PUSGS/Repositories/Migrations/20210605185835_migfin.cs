using Microsoft.EntityFrameworkCore.Migrations;

namespace Repositories.Migrations
{
    public partial class migfin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PodesavanjaTB",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ErrorVisible = table.Column<bool>(type: "bit", nullable: false),
                    WarningVisible = table.Column<bool>(type: "bit", nullable: false),
                    InfoVisible = table.Column<bool>(type: "bit", nullable: false),
                    SuccessVisible = table.Column<bool>(type: "bit", nullable: false),
                    HideRequiredFields = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PodesavanjaTB", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PodesavanjaTB");
        }
    }
}
