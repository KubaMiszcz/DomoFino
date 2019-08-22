using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;

namespace DomoFino.DAL
{
    public class DomoFinoContext : DbContext
    {
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Paragon> Paragon { get; set; }
        public virtual DbSet<UserGroup> UserGroup { get; set; }

        //        private string connString = @"Server=mssql3.webio.pl,2401;Database=kubamiszcz_NaproKartaDB;Trusted_Connection=True;";
        private const string connString = @"Server=mssql3.webio.pl,2401;Database=kubamiszcz_NaproKartaDB;User Id=kubamiszcz_kubamiszcz;password=xxxxxx;";

        public DomoFinoContext() : base(connString)
        {
            Configuration.LazyLoadingEnabled = false;
            //            var instance = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);//.HasDefaultSchema("TrackingMPGON"));
            modelBuilder.HasDefaultSchema("DomoFino");

            //            modelBuilder.Entity<MPGONShadowedFromMW>().ToTable("MPGONShadowedFromMW").HasKey(x => x.ID);
            //            modelBuilder.Entity<MPGONShadowedFromMW>().ToTable("MPGONShadowedFromMW").HasRequired<StaffEF>(s => s.PrintedBy).WithMany().HasForeignKey(x => x.PrintedByID);
            //            modelBuilder.Entity<MPGONShadowedFromMW>().ToTable("MPGONShadowedFromMW").HasMany<MPGONTrackData>(g => g.TrackDataList).WithRequired(s => s.ParentMPGON).HasForeignKey(s => s.ParentMPGON_ID);
            //            modelBuilder.Entity<MPGONShadowedFromMW>().ToTable("MPGONShadowedFromMW").HasMany<OEGONShadowedFromMW>(g => g.OEGONsList).WithRequired(s => s.ParentMPGON).HasForeignKey(s => s.ParentMPGON_ID);
            //            //
            //
            //            modelBuilder.Entity<MPGONTrackData>().ToTable("MPGONTrackData").HasKey(x => x.ID);
            //            modelBuilder.Entity<MPGONTrackData>().ToTable("MPGONTrackData").Property(x => x.ParentMPGON_ID).HasColumnName("MPGONShadowedFromMW_ID");
            //            //modelBuilder.Entity<MPGONTrackData>().ToTable("MPGONTrackData").HasRequired<MPGONShadowedFromMW>(s => s.ParentMPGON).WithMany().HasForeignKey(x => x.ParentMPGON_ID);
            //            //modelBuilder.Entity<MPGONTrackData>().ToTable("MPGONTrackData").HasRequired<MPGONShadowedFromMW>(s => s.ParentMPGON).WithMany().HasForeignKey(x => x.ParentMPGON_ID);
            //
            //            //modelBuilder.Entity<MPGONTrackData>().ToTable("MPGONTrackData").HasRequired<StaffEF>(s => s.AddedBy).WithMany().HasForeignKey(x => x.AddedByID);
            //            //modelBuilder.Entity<MPGONTrackData>().ToTable("MPGONTrackData").HasRequired<Stage>(s => s.Stage).WithMany().HasForeignKey(x => x.StageID);
            //
            //
            //            modelBuilder.Entity<OEGONShadowedFromMW>().ToTable("OEGONShadowedFromMW").HasKey(x => x.ID);
            //            modelBuilder.Entity<OEGONShadowedFromMW>().ToTable("OEGONShadowedFromMW").Property(x => x.ParentMPGON_ID).HasColumnName("MPGONShadowedFromMW_ID");
            //
            //
            //            modelBuilder.Entity<Role>().ToTable("Role", schemaName: "Shared").HasKey(x => x.ID);
            //
            //
            //            modelBuilder.Entity<StaffEF>().ToTable("AllowedUsers").HasKey(x => x.ID);
            //            //modelBuilder.Entity<StaffEF>().ToTable("StaffEF", schemaName: "Shared").HasRequired(t => t.Role).WithMany().HasForeignKey(t => t.RoleID);
            //
            //
            //            modelBuilder.Entity<Stage>().ToTable("Stage").HasKey(x => x.ID);
            //            //modelBuilder.Entity<Stage>().ToTable("Stage").HasRequired(t => t.Role).WithMany().HasForeignKey(t => t.RoleID);
        }


        //modelBuilder.Entity<StaffEF>(entity =>
        //{
        //    entity.Property(e => e.ID).IsRequired();
        //});
    }
}