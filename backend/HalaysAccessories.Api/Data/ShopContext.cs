using HalaysAccessories.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HalaysAccessories.Api.Data;

public class ShopContext(DbContextOptions<ShopContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Smart Watch", Description = "Fitness tracking, heart-rate monitor and notifications on your wrist.", Price = 79.99m },
            new Product { Id = 2, Name = "Headphones", Description = "Wireless over-ear headphones with deep bass and 30-hour battery.", Price = 59.99m },
            new Product { Id = 3, Name = "Cap", Description = "Classic cotton cap embroidered with the Halay's Accessories logo.", Price = 19.99m });
    }
}
