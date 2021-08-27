from praw import Reddit
import json
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

subreddit = reddit.subreddit("trypophobia")

output = []

for post in subreddit.hot(limit=100):
# for post in subreddit.top(limit=100):
    output.append({
        "link": post.url,
        "score": post.score,
        "ratio": post.upvote_ratio,
    })

json = json.dumps(output, indent=2)
with open("output.txt", "a") as f:
    f.write(json)
