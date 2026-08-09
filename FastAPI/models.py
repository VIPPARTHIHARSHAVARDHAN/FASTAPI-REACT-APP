from database import Base

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship





class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String,
        nullable=False
    )


    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )


    hashed_password = Column(
        String,
        nullable=False
    )


    transactions = relationship(
        "Transaction",
        back_populates="owner"
    )








class Transaction(Base):

    __tablename__ = "transactions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    amount = Column(
        Float
    )


    category = Column(
        String
    )


    description = Column(
        String
    )


    is_income = Column(
        Boolean
    )


    date = Column(
        String
    )


    owner = relationship(
        "User",
        back_populates="transactions"
    )