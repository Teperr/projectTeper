# -*- coding: utf-8 -*-
"""
Created on Tue Nov 14 18:51:30 2023

@author:  @MartinOnData (BettingAnalytics.io)
"""

import requests
import json
import pandas as pd

api_key = "e03cfae20687c0e5cdc1500ec6c00edb" # Replace with own API from https://the-odds-api.com/?ref=bettinganalyticsio

region = "eu,uk"
market = "h2h"
sport_key = "soccer_epl"

# region = "us"
# market = "h2h"
# sport_key = "icehockey_nhl"


url = f'https://api.the-odds-api.com/v4/sports/{sport_key}/odds/?apiKey={api_key}&regions={region}&markets={market}'
print(url)

odds_response = requests.get(url)

odds_data = json.loads(odds_response.text)

rows_list = []
# print(odds_data)

for game in odds_data:

    for bookmaker in game['bookmakers']:

        for market_ in bookmaker['markets']:

            for outcome in market_['outcomes']:

                row = {
                    'game_id': game['id'],
                    'sport_key': game['sport_key'],
                    'sport_title': game['sport_title'],
                    'home_team': game['home_team'],
                    'away_team': game['away_team'],
                    'commence_time': game['commence_time'],
                    'bookmaker_key': bookmaker['key'],
                    'bookmaker_title': bookmaker['title'],
                    'bookmaker_last_update': bookmaker['last_update'],
                    'market_key': market_['key'],
                    'market_last_update': market_['last_update'],
                    'outcome_name': outcome['name'],
                    'outcome_price': outcome['price']
                }

                rows_list.append(row)

df = pd.DataFrame(rows_list)

df = df[~df['bookmaker_key'].isin(['betfair_ex_uk', 'betfair_ex_eu', 'matchbook'])]

idx = df.groupby(['game_id', 'outcome_name'])['outcome_price'].idxmax()
df_arbitrage = df.loc[idx].copy()

df_arbitrage['implied_probability'] = 1 / df_arbitrage['outcome_price']
df_arbitrage['sum_implied_prob'] = df_arbitrage.groupby('game_id')['implied_probability'].transform('sum')
df_arbitrage = df_arbitrage[df_arbitrage['sum_implied_prob'] < 1]

total_stake = 1000

df_arbitrage['stake'] = (total_stake / df_arbitrage['sum_implied_prob']) * df_arbitrage['implied_probability']
df_arbitrage['ror'] = 1-df_arbitrage['sum_implied_prob']

print(df_arbitrage)

send_to_js = df_arbitrage

# Save df_arbitrage to a JSON file
df_arbitrage.to_json('df_arbitrage.json', orient='records')

# Save df_arbitrage to a JavaScript file
with open('game.data.js', 'w') as js_file:
    js_file.write('var df_arbitrage = ')
    df_arbitrage.to_json(js_file, orient='records')
    js_file.write(';')
