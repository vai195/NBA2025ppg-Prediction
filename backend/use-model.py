# Import necessary libraries
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load the model (assuming you have already trained and saved the model)
model = joblib.load('nba_points_prediction_model.pkl')

# Load datasets for all seasons
data_2024 = pd.read_csv('2023-2024 NBA Player Stats - Regular.csv', sep =";", encoding='latin-1')
data_2023 = pd.read_csv('2022-2023 NBA Player Stats - Regular.csv', sep =";", encoding='latin-1')
data_2022 = pd.read_csv('2021-2022 NBA Player Stats - Regular.csv', sep =";", encoding='latin-1')

# Extract unique players for each season
players_2024 = set(data_2024['Player'])
players_2023 = set(data_2023['Player'])
players_2022 = set(data_2022['Player'])

# Find players present in all seasons
common_players = players_2024.intersection(players_2023, players_2022)

# Input player name
player_name = input("Enter the player's name: ")

# Check if the player is present in all seasons
if player_name in common_players:
    # Filter datasets to include only the player of interest
    data_2024_player = data_2024[data_2024['Player'] == player_name].drop(['Rk', 'Player', 'Pos', 'Tm', 'PTS'], axis=1)
    
    # Predict PTS for the 2024-2025 season
    predicted_pts = model.predict(data_2024_player)
    
    print("Predicted points per game for the 2024-2025 season for", player_name, "is", predicted_pts[0], "points")
else:
    print("The player", player_name, "is not present in all seasons.")