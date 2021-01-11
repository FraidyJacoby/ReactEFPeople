using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactEFPeople.Data;

namespace ReactEFPeople.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addperson")]
        public Person AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.AddPerson(person);
        }

        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(person);
        }

        [HttpPost]
        [Route("editperson")]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);
        }

        [HttpPost]
        [Route("deleteselected")]
        public void DeleteSelected(List<int> ids)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeleteSelected(ids);
        }
    }
}
