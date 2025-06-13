import shutil
from fastapi import UploadFile

async def save_file(file: UploadFile, destination: str):
    with open(destination, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
