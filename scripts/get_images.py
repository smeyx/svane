import requests
import pprint

pp = pprint.PrettyPrinter(indent=4)

r = requests.get('https://data.nba.com/prod/v2/2020/teams.json')
team_data = r.json()
teams = team_data['league']['standard']

for team in teams:
    team_id = team['teamId']
    re = requests.get(f'https://cdn.nba.com/logos/nba/{team_id}/global/D/logo.svg')
    file = open(f'../src/assets/images/{team_id}.svg', 'w')
    file.write(re.text)
    file.close()

