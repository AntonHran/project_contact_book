from typing import List

from pydantic import BaseModel, Field, EmailStr, ConfigDict

from src.database.models import Role
from src.schemes.contacts import ContactResponse


class UserModel(BaseModel):
    username: str = Field(min_length=3, max_length=15)
    email: EmailStr
    password: str = Field(min_length=6, max_length=12)


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    avatar: str
    roles: Role
    contacts: List[ContactResponse] if ContactResponse else None
    model_config = ConfigDict(from_attributes=True)


class TokenModel(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
