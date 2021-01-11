using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ReactEFPeople.Data
{
    public class PeopleContextFactory : IDesignTimeDbContextFactory<PeopleContext>
    {
        public PeopleContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactEFPeople.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new PeopleContext(config.GetConnectionString("ConStr"));
        }
    }

}
