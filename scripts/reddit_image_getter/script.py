from praw import Reddit
from dotenv import dotenv_values

# Load login details
config = dotenv_values(".env")

reddit = Reddit(
    client_id=config["CLIENT_ID"],
    client_secret=config["CLIENT_SECRET"],
    password=config["PASSWORD"],
    user_agent=config["USERAGENT"],
    username=config["USERNAME"],
)

