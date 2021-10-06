using apiCalculadora.Models;
using Microsoft.EntityFrameworkCore;
using System;
namespace apiCalculadora.Context
{
    public class AppDbContext : DbContext
    {
       public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<LogCalculo> log_calculos { get; set; }
    }
}
