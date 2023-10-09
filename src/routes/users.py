from typing import List

from fastapi import APIRouter, Depends, UploadFile, File, Path, status, Query
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from src.database.connection import get_db
from src.database.models import User, Role
from src.repository import users as repository_users
from src.services.auth import auth_user
from src.schemes.users import UserResponse
from src.services.cloud_image import CloudImage
from src.services.roles import RoleAccess


router = APIRouter(prefix="/users", tags=["users"])

allowed_read = RoleAccess([Role.user, Role.moderator, Role.admin])
allowed_update_avatar = RoleAccess([Role.user, Role.moderator, Role.admin])
allowed_get = RoleAccess([Role.moderator, Role.admin])
allowed_update = RoleAccess([Role.user, Role.moderator, Role.admin])
allowed_remove = RoleAccess([Role.admin])


@router.get("/me/", response_model=UserResponse,
            dependencies=[Depends(allowed_read)],
            description="For all users")
async def read_users_me(current_user: User = Depends(auth_user.get_current_user),
                        db: Session = Depends(get_db)):

    """
The read_users_me function returns the current user's information.

    :param current_user: User: Get the current user
    :param db: Session: Pass the database session to the function
    :return: A user object
    :doc-author: Trelent
    """
    return await repository_users.get_user_by_id(current_user.id, db)


@router.patch('/avatar', response_model=UserResponse,
              dependencies=[Depends(allowed_update_avatar)],
              description="For all users")
async def update_avatar_user(file: UploadFile = File(),
                             current_user: User = Depends(auth_user.get_current_user),
                             db: Session = Depends(get_db)):
    """
    The update_avatar_user function updates the avatar of a user.

    :param file: UploadFile: Get the file from the request
    :param current_user: User: Get the current user
    :param db: Session: Access the database
    :return: The updated user
    :doc-author: Trelent
    """
    public_id = CloudImage.generate_name_avatar(current_user.email)
    r = CloudImage.upload(file.file, public_id)
    src_url = CloudImage.get_url_for_avatar(public_id, r)
    user = await repository_users.update_avatar(current_user.email, src_url, db)
    return user


@router.get("/", response_model=List[UserResponse],
            dependencies=[Depends(allowed_get)],
            description="For moderators and admin only")
async def get_users(limit: int = Query(10, le=100),
                    offset: int = 0,
                    db: Session = Depends(get_db)):

    """
    The get_users function returns a list of users.

    :param limit: int: Limit the number of users returned
    :param le: Limit the maximum number of users that can be returned
    :param offset: int: Skip a number of records
    :param db: Session: Pass the database session to the function
    :return: A list of users
    :doc-author: Trelent
    """
    return await repository_users.get_all_users(limit, offset, db)


@router.get("/{user_id}", response_model=UserResponse,
            dependencies=[Depends(allowed_get)],
            description="For moderators and admin only")
async def get_user(user_id: int = Path(ge=1), db: Session = Depends(get_db)):

    """
    The get_user function returns a user by id.
        Args:
            user_id (int): The id of the user to return.
            db (Session, optional): SQLAlchemy Session. Defaults to Depends(get_db).

    :param user_id: int: Specify the type of data that is expected to be passed in
    :param db: Session: Pass the database session to the function
    :return: A user object
    :doc-author: Trelent
    """
    return await repository_users.get_user_by_id(user_id, db)


@router.delete("/{user_id}", response_model=UserResponse,
               dependencies=[Depends(allowed_remove)],
               description="For admin only")
async def remove_user(user_id: int = Path(ge=1),
                      db: Session = Depends(get_db)):

    """
    The remove_user function removes a user from the database.

    :param user_id: int: Specify the user id of the user to be deleted
    :param db: Session: Pass the database session to the repository function
    :return: The user that was removed
    :doc-author: Trelent
    """
    user = await repository_users.remove_user(user_id, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return user
