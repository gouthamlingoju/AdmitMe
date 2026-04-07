from datetime import date
from typing import Optional

import re
from pydantic import BaseModel, EmailStr, field_validator, model_validator

from services.catalog_service import (
    normalize_branch_code,
    normalize_program_level,
    validate_program_branch,
)


class StudentApplicationRequest(BaseModel):
    # Personal
    student_name: str
    father_name: str
    mother_name: str
    date_of_birth: str
    gender: str
    aadhaar_card_number: str
    nationality: str
    religion: str

    # Academic/exam
    tenth_board_name: str
    tenth_studied_area_pincode: Optional[str] = ""
    twelfth_board_name: str
    twelfth_studied_area_pincode: Optional[str] = ""
    twelfth_or_diploma_specialization: Optional[str] = ""
    eapcet_ht_no: Optional[str] = ""
    eapcet_rank: Optional[str] = ""
    jee_ht_no: Optional[str] = ""
    jee_mains_rank: Optional[str] = ""

    # Contact
    mother_tongue: str
    student_phone: str
    father_phone: str
    mother_phone: str
    student_email: EmailStr
    father_email: Optional[EmailStr] = None
    mother_email: Optional[EmailStr] = None
    father_profession_and_designation: str
    father_organization: Optional[str] = ""
    mother_profession_and_designation: str
    mother_organization: Optional[str] = ""
    primary_contact_person: str

    # Address
    address_dno: str
    address_apartment_name_block_house_name: Optional[str] = ""
    address_street: str
    address_village_town: str
    address_mandal: str
    address_district: str
    address_state: str
    address_pincode: str
    rural_urban: str

    # Category/other
    ews_status: Optional[str] = "No"
    category_name: str
    caste_as_per_tc: Optional[str] = ""
    ebc_status: Optional[str] = "No"
    income: str
    minority: Optional[str] = ""
    minority_type: Optional[str] = ""
    blood_group: str
    ph_status: str
    ph_type: Optional[str] = ""
    scribe: str

    # Admission
    program_level: str = "BTECH"
    branch_code: str = "cse"
    degree_code: Optional[str] = None
    admission_category: str = "Convenor"

    @field_validator("date_of_birth")
    @classmethod
    def validate_and_normalize_dob(cls, value: str) -> str:
        raw = (value or "").strip()
        if not raw:
            raise ValueError("Date of Birth is required")

        m = re.match(r"^(\d{2})[/-](\d{2})[/-](\d{4})$", raw)
        if m:
            day, month, year = int(m.group(1)), int(m.group(2)), int(m.group(3))
            date(year, month, day)  # validates real date
            return f"{day:02d}/{month:02d}/{year:04d}"

        m = re.match(r"^(\d{4})-(\d{2})-(\d{2})$", raw)
        if m:
            year, month, day = int(m.group(1)), int(m.group(2)), int(m.group(3))
            date(year, month, day)
            return f"{day:02d}/{month:02d}/{year:04d}"

        raise ValueError("Date of Birth must be DD/MM/YYYY")

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, value: str) -> str:
        cleaned = (value or "").strip().lower()
        if cleaned in {"m", "male"}:
            return "M"
        if cleaned in {"f", "female"}:
            return "F"
        if cleaned in {"t", "transgender"}:
            return "T"
        raise ValueError("Gender must be M, F, or T")

    @field_validator("student_phone", "father_phone", "mother_phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        raw = (value or "").strip()
        if not raw:
            raise ValueError("Phone number is required")
        if re.fullmatch(r"\d{10}", raw):
            return raw  # legacy support
        if not re.fullmatch(r"\+[1-9]\d{1,14}", raw):
            raise ValueError("Phone number must include country code (example: +919999999999)")
        return raw

    @field_validator("aadhaar_card_number")
    @classmethod
    def validate_aadhaar(cls, value: str) -> str:
        cleaned = "".join(ch for ch in (value or "") if ch.isdigit())
        if len(cleaned) != 12:
            raise ValueError("Aadhaar must be 12 digits")
        return cleaned

    @field_validator("program_level")
    @classmethod
    def validate_program_level(cls, value: str) -> str:
        return normalize_program_level(value)

    @field_validator("branch_code")
    @classmethod
    def validate_branch_code(cls, value: str) -> str:
        return normalize_branch_code(value)

    @field_validator("degree_code")
    @classmethod
    def validate_degree_code(cls, value: Optional[str]) -> Optional[str]:
        if value is None or not str(value).strip():
            return None
        return normalize_branch_code(value)

    @model_validator(mode="after")
    def validate_program_branch_pair(self):
        validate_program_branch(self.program_level, self.branch_code)
        if not self.degree_code:
            self.degree_code = self.branch_code
        return self


class StudentApplicationResponse(BaseModel):
    application_reference: str
    student_id: str
    status: str
