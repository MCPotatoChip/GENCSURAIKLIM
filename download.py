import urllib.request
import os
import json

urls = {
    "City Comparison": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU5ZjBhZjIzOTgwZjRlNDliZjViNWMwN2M3OWE2YTc1EgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "2D Grafikler": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q2ZjMzN2JkODM2MzQwNTViMzNkMzQ2NWQ1ZTkwNjJhEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Ana Sayfa": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRhZmEyYWRjY2RmODQzODRhMWEzOWIxZjQ3MjBmYWU0EgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Iklim Sozlugu": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk2YmYyM2QzZjc2ZTQwZjRhNDEzZWMyZTlhYjFmZGFhEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Simulasyon Sureci": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzYxMjBkOTUxZmQ5NzQ5NGI4MGQxZTAxNzc5ZGFhZTI5EgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Countdown": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M0ZjU0YzY1MzY4ZDQ1NzNiYzhlMTM1NDYzOWFlNmJiEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Hakkinda": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JkOTM0ZWMyMTgwYjQ2OTI4NjgzZmYyNjFlODhiNjkwEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Iklim Yarismasi": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzIwYjdjNDMwMGQzMDQ2ZjE5NTUyNWM0M2UwYTJmNTdmEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Iklim Anketi": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzIxMTgyMDNiYjE1ZDRjZTU5ZjljODgzNmYxMzY1N2Q2EgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Iklim Infografikleri": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzkxNWViYjQ1MmUxZTQ2OWRiYzQ5NzY1MTUxOTM2MDhhEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Climate Map": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMyYTdhYjQ3NTcwYjQzN2I4YzY0NGY3MzViNjg0OWFhEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Iklim Simulatoru": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY5NTg5OWZmOWFjMzQ1NTA5MzhiNDE0NmI4MjNlYTI1EgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Kavram Agi": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdjZWQ5MGE4ZTJlZTRmY2RhNjY0MmI4NGViZjVkNGFiEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086",
    "Karbon Hesaplayici": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJlMDViZjZlZjk0NjRhNmNiZGEzMjBlZWM5ZWU2NGQzEgsSBxDDireOoB8YAZIBIwoKcHJvamVjdF9pZBIVQhMyODUyNzc0NjUxMDkwMTk3ODA1&filename=&opi=89354086"
}

os.makedirs('stitch_designs', exist_ok=True)

for name, url in urls.items():
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            with open(f"stitch_designs/{name.replace(' ', '_').lower()}.html", "w", encoding='utf-8') as f:
                f.write(html)
        print(f"Successfully downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
