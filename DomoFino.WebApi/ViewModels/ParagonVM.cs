using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;

namespace DomoFino.WebApi.ViewModels
{
    public class ParagonVM
    {
        public int Id { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Amount { get; set; }
        public string Note { get; set; }
        public int AddedById { get; set; }

        //        public int CategoryId { get; set; }
        //        public virtual UserVM AddedBy { get; set; }
        public virtual CategoryVM Category { get; set; }

        public ParagonVM() { }

        public ParagonVM(Paragon m)
        {
            Id = m.Id;
            Amount = m.Amount;
            PurchaseDate = m.PurchaseDate;
            Note = m.Note;
            Category = new CategoryVM(m.Category);
            AddedById = m.AddedById;
            //            UserVM AddedBy = new UserVM(m.AddedBy??);
        }

        public Paragon ToModel()
        {
            var m = new Paragon();
            m.Id = Id;
            m.Amount = Amount;
            m.PurchaseDate = PurchaseDate;
            m.Note = Note;
            m.AddedById = AddedById;
            m.CategoryId = Category.Id;
            return m;
        }
    }
}
