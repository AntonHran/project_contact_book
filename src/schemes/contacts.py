from datetime import date

from pydantic import BaseModel, Field, EmailStr, ConfigDict
from pydantic_extra_types.phone_numbers import PhoneNumber


class ContactModel(BaseModel):
    first_name: str = Field(min_length=3, max_length=25)
    last_name: str = Field(min_length=4, max_length=30)
    location: str | None = Field(min_length=0)
    company: str | None = Field(min_length=0)
    position: str | None = Field(min_length=0)
    email: EmailStr
    phone_number: PhoneNumber
    birth_date: date = None
    notes: str | None


class ContactResponse(BaseModel):
    id: int = 1
    first_name: str
    last_name: str
    location: str | None
    company: str | None
    position: str | None
    photo: str | None
    email: EmailStr
    phone_number: PhoneNumber
    birth_date: date | None
    notes: str
    model_config = ConfigDict(from_attributes=True)
