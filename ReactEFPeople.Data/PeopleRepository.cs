using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactEFPeople.Data
{
    public class PeopleRepository
    {
        private string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using(var ctx = new PeopleContext(_connectionString))
            {
                return ctx.People.ToList();
            }
        }

        public Person AddPerson(Person person)
        {
            using(var ctx = new PeopleContext(_connectionString))
            {
                ctx.People.Add(person);
                ctx.SaveChanges();
                return person;
            }
        }

        public void DeletePerson(Person person)
        {
            using(var ctx = new PeopleContext(_connectionString))
            {
                ctx.People.Remove(person);
                ctx.SaveChanges();
            }
        }

        public void EditPerson(Person person)
        {
            using(var ctx = new PeopleContext(_connectionString))
            {
                ctx.People.Attach(person);
                ctx.Entry(person).State = EntityState.Modified;
                ctx.SaveChanges();
            }
        }

        public void DeleteSelected(List<int> ids)
        {
            using(var ctx = new PeopleContext(_connectionString))
            {
                if(ids == null)
                {
                    return;
                }
                ids.ForEach(id => ctx.People.Remove(ctx.People.FirstOrDefault(p => p.Id == id)));
                ctx.SaveChanges();
            }
        }
    }
}
