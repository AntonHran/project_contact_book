"""new field were added to cintact

Revision ID: 71d282f3e673
Revises: a9bb3ddf43af
Create Date: 2023-10-07 21:32:27.795085

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '71d282f3e673'
down_revision: Union[str, None] = 'a9bb3ddf43af'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('contacts', sa.Column('location', sa.String(length=40), nullable=True))
    op.add_column('contacts', sa.Column('company', sa.String(length=50), nullable=True))
    op.add_column('contacts', sa.Column('position', sa.String(length=30), nullable=True))
    op.add_column('contacts', sa.Column('photo', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('contacts', 'photo')
    op.drop_column('contacts', 'position')
    op.drop_column('contacts', 'company')
    op.drop_column('contacts', 'location')
    # ### end Alembic commands ###