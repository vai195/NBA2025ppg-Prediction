# Flask API (api.py)
from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load trained model
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



@app.route('/api/predict', methods=['POST'])
def predict():
    features  = request.json['features']
    
    if features in common_players:
    # Filter datasets to include only the player of interest
        data_2024_player = data_2024[data_2024['Player'] == features].drop(['Rk', 'Player', 'Pos', 'Tm', 'PTS'], axis=1)
    else:
        return jsonify({'points_per_game_prediction': ("The player " + features + " is not present in all seasons or does not exist.")})
    
    # Predict PTS for the 2024-2025 season
    predicted_pts = model.predict(data_2024_player)
    return jsonify({'points_per_game_prediction': predicted_pts.tolist()[0]})

if __name__ == '__main__':
    #app.run(debug=True)
    app.run()
