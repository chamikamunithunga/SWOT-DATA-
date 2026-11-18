import time
import requests

def fetch_live_satellite_weather():
    # Example using Open-Meteo's live hourly weather and marine API
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": 6.9271,
        "longitude": 79.8612,
        "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m",
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        current = data.get("current", {})
        print(f"--- Live Satellite/Weather Feed Update ---")
        print(f"Time: {current.get('time')}")
        print(f"Temperature: {current.get('temperature_2m')} °C")
        print(f"Wind Speed: {current.get('wind_speed_10m')} km/h")
        print(f"Wind Direction: {current.get('wind_direction_10m')}°")
    else:
        print("Failed to fetch live feed.")

# Simulate real-time polling loop (every 60 seconds)
if __name__ == "__main__":
    print("Starting real-time data stream listener...")
    for _ in range(3):  # Run for 3 cycles as a test
        fetch_live_satellite_weather()
        time.sleep(5)  # Change to 60 or 300 seconds for actual live monitoring