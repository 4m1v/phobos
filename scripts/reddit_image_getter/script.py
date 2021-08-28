from praw import Reddit
import json
import hashlib
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

for post in subreddit.hot(limit=150):
# for post in subreddit.top(limit=100):
    if post.url.lower().endswith(("jpg", "png", "jpeg")):
        output.append({
            "id": hashlib.md5(post.url.encode()).hexdigest(),
            "source": "https://www.reddit.com" + post.permalink,
            "link": post.url,
            "score": post.score,
            "ratio": post.upvote_ratio,
            "scariness": 0,
            "seen": 0
        })

json = json.dumps(output, indent=2)
with open("output.json", "a") as f:
    f.write(json)
