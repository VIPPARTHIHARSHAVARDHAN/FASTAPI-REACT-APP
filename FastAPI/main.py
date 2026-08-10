from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from typing import Annotated, List

from sqlalchemy.orm import Session

from pydantic import BaseModel, EmailStr

from database import SessionLocal, engine

import models

from fastapi.middleware.cors import CORSMiddleware

from passlib.context import CryptContext

from jose import jwt, JWTError

from datetime import datetime, timedelta



app = FastAPI()





# =========================
# JWT CONFIG
# =========================


SECRET_KEY = "budgeto_secret_key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30



oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="/login"

)



pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"

)







# =========================
# CORS
# =========================


origins = [

    "http://localhost:3000"
    "https://budgeto-eta.vercel.app"

]


app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


@app.get("/")
def home():
    return {"message": "Budgeto Backend Running"}




# =========================
# DATABASE
# =========================


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()





db_dependency = Annotated[Session, Depends(get_db)]



models.Base.metadata.create_all(bind=engine)









# =========================
# SCHEMAS
# =========================



class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str





class UserLogin(BaseModel):

    email: EmailStr

    password: str






class TransactionBase(BaseModel):

    amount: float

    category: str

    description: str

    is_income: bool

    date: str






class TransactionModel(TransactionBase):

    id: int


    class Config:

        from_attributes = True







# =========================
# PASSWORD FUNCTIONS
# =========================



def hash_password(password):

    return pwd_context.hash(password)





def verify_password(

    plain_password,

    hashed_password

):

    return pwd_context.verify(

        plain_password,

        hashed_password

    )









# =========================
# TOKEN FUNCTIONS
# =========================



def create_token(data):


    expire = datetime.utcnow() + timedelta(

        minutes=ACCESS_TOKEN_EXPIRE_MINUTES

    )



    data.update({

        "exp": expire

    })



    return jwt.encode(

        data,

        SECRET_KEY,

        algorithm=ALGORITHM

    )









# =========================
# CURRENT USER
# =========================



def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):


    try:


        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )


        email = payload.get("sub")



        if email is None:


            raise HTTPException(

                status_code=401,

                detail="Invalid token"

            )



    except JWTError:


        raise HTTPException(

            status_code=401,

            detail="Invalid token"

        )






    user = (

        db.query(models.User)

        .filter(

            models.User.email == email

        )

        .first()

    )



    if user is None:


        raise HTTPException(

            status_code=404,

            detail="User not found"

        )



    return user









# =========================
# REGISTER
# =========================



@app.post("/register")

async def register(

    user: UserCreate,

    db: db_dependency

):


    existing_user = (

        db.query(models.User)

        .filter(

            models.User.email == user.email

        )

        .first()

    )



    if existing_user:


        raise HTTPException(

            status_code=400,

            detail="Email already registered"

        )





    new_user = models.User(

        name=user.name,

        email=user.email,

        hashed_password=hash_password(

            user.password

        )

    )



    db.add(new_user)

    db.commit()

    db.refresh(new_user)



    return {


        "message":

        "User created successfully"


    }









# =========================
# LOGIN
# =========================



@app.post("/login")

async def login(

    user: UserLogin,

    db: db_dependency

):


    db_user = (

        db.query(models.User)

        .filter(

            models.User.email == user.email

        )

        .first()

    )



    if db_user is None:


        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"

        )





    if not verify_password(

        user.password,

        db_user.hashed_password

    ):


        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"

        )





    token = create_token({

        "sub": db_user.email

    })




    return {


        "access_token": token,

        "token_type": "bearer"


    }









# =========================
# TRANSACTIONS
# =========================



@app.post(

    "/transactions/",

    response_model=TransactionModel

)

async def create_transaction(

    transaction: TransactionBase,

    db: db_dependency,

    current_user: models.User = Depends(get_current_user)

):


    new_transaction = models.Transaction(

        **transaction.dict(),

        user_id=current_user.id

    )



    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)



    return new_transaction










@app.get(

    "/transactions/",

    response_model=List[TransactionModel]

)

async def read_transactions(

    db: db_dependency,

    current_user: models.User = Depends(get_current_user),

    skip: int = 0,

    limit: int = 100

):


    transactions = (

        db.query(models.Transaction)

        .filter(

            models.Transaction.user_id == current_user.id

        )

        .offset(skip)

        .limit(limit)

        .all()

    )



    return transactions











@app.delete("/transactions/{transaction_id}")

async def delete_transaction(

    transaction_id: int,

    db: db_dependency,

    current_user: models.User = Depends(get_current_user)

):


    transaction = (

        db.query(models.Transaction)

        .filter(

            models.Transaction.id == transaction_id,

            models.Transaction.user_id == current_user.id

        )

        .first()

    )



    if transaction is None:


        raise HTTPException(

            status_code=404,

            detail="Transaction not found"

        )




    db.delete(transaction)

    db.commit()



    return {


        "message":

        "Transaction deleted successfully"


    }









@app.put(

    "/transactions/{transaction_id}",

    response_model=TransactionModel

)

async def update_transaction(

    transaction_id: int,

    updated_transaction: TransactionBase,

    db: db_dependency,

    current_user: models.User = Depends(get_current_user)

):


    transaction = (

        db.query(models.Transaction)

        .filter(

            models.Transaction.id == transaction_id,

            models.Transaction.user_id == current_user.id

        )

        .first()

    )



    if transaction is None:


        raise HTTPException(

            status_code=404,

            detail="Transaction not found"

        )





    transaction.amount = updated_transaction.amount

    transaction.category = updated_transaction.category

    transaction.description = updated_transaction.description

    transaction.is_income = updated_transaction.is_income

    transaction.date = updated_transaction.date





    db.commit()

    db.refresh(transaction)



    return transaction