import requests

token = "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6ImNoYW1pa2FfbXVuaXRodW5nYSIsInN1YiI6ImNoYW1pa2FfbXVuaXRodW5nYSIsImV4cCI6MTc5OTQyNTExOSwiaWF0IjoxNzk0MjQxMTE5LCJpc3MiOiJodHRwczovL3Vycy5lYXJ0aGRhdGEubmFzYS5nb3YiLCJpZGVudGl0eV9wcm92aWRlciI6ImVkbF9vcHMiLCJhY3IiOiJlZGwiLCJhc3N1cmFuY2VfbGV2ZWwiOjN9.GN0YuifBLTJFLMj602eKmlKkDbsEXbeJyVymHuJxDkUKOGW_5dWafRX1XvqbLxRhRk8L9rJz3pwhN0rS9ci1CFCQvICp0zKeVu4MF7d26quv8zGVzueZyKijf4V_nNhXUev-gFGFQm0Se8hL9grUCEirrEkjtsckP98_CPYrhDh7T3qGaHqCD3yES_JgrUN-0pjvbSCUvgyD19yoQu_tMoqlc8iC7hMfM_urOoYmxzjpmnbaBTYjgn9gRvrf-I03ZNicaz9qwAJ_O-wVcWR7P6ukfpl1Y_sS0g7EhNQitfoVMgWqn5xjeNHYrOPgFOgIOh0530tofGqt-CnUtXU_Lg"

headers = {
    "Authorization": f"Bearer {token}"
}

# Example: Querying NASA CMR collection metadata or cloud-optimized endpoints securely
url = "https://cmr.earthdata.nasa.gov/search/collections.json?short_name=SWOT_L2_LR_SSH_D"
response = requests.get(url, headers=headers)

if response.status_code == 200:
    print("Successfully authenticated and fetched data using the token!")
    print(response.json()['feed']['entry'][0]['title'])
else:
    print(f"Error {response.status_code}: {response.text}")