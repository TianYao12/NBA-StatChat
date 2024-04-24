import requests
from bs4 import BeautifulSoup

def write_to_markdown(data, filename):
  """Writes data to a markdown file."""
  with open(filename, "w", encoding="utf-8") as f:
    f.write(data)

url = "https://en.wikipedia.org/wiki/NBA_playoffs"
response = requests.get(url)

if response.status_code == 200:
  content = response.content
else:
  print("Failed to fetch content")

soup = BeautifulSoup(content, "html.parser")
paragraphs = soup.find_all("p")

total = ""
for paragraph in paragraphs:
  total += paragraph.text
  print(paragraph.text.strip())

write_to_markdown(total, "playoffs.md")


