using HalaysAccessories.Api.Data;
using HalaysAccessories.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HalaysAccessories.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ShopContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll() =>
        await db.Products.AsNoTracking().OrderBy(p => p.Id).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var product = await db.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        return product is null ? NotFound() : product;
    }
}
