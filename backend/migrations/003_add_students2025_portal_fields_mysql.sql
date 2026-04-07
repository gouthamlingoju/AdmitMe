-- Add new columns used by the Student Admissions Portal (MySQL)

use admitme;

alter table students2025
  add column address_apartment_name_block_house_name text,
  add column father_organization text,
  add column mother_organization text,
  add column minority_type text,
  add column ph_type text,
  add column tenth_studied_area_pincode text,
  add column twelfth_studied_area_pincode text,
  add column twelfth_or_diploma_specialization text;
