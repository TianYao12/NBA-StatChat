import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()

@app.get("/lebron-career-points")
async def lebron_career_points():
    url = "https://www.basketball-reference.com/players/j/jamesle01.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    career_points_element = soup.find("div", class_="stats_pullout")
    career_points = career_points_element.text.strip()
    return {"career_points": career_points}


