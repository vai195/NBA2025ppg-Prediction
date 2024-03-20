# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib


# Load datasets for all seasons
data_2024 = pd.read_csv('2023-2024 NBA Player Stats - Regular.csv', sep =";", encoding='latin-1')
data_2023 = pd.read_csv('2022-2023 NBA Player Stats - Regular.csv', sep =";", encoding='latin-1')
data_2022 = pd.read_csv('2021-2022 NBA Player Stats - Regular.csv', sep =";", encoding='latin-1')

# Concatenate datasets for all seasons
all_data = pd.concat([data_2024, data_2023, data_2022], ignore_index=True)

# Data preprocessing
# For simplicity, let's assume all columns are relevant for now and there are no missing values or outliers
# Drop non-numeric columns and the target variable
X = all_data.drop(['Rk', 'Player', 'Pos', 'Tm', 'PTS'], axis=1)
# Target variable
y = all_data['PTS']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,  random_state=42)

# Initialize and train the model (linear regression as an example)
model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, 'nba_points_prediction_model.pkl')

# Make predictions on the testing set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)


