import requests
from bs4 import BeautifulSoup


def print_secret_message(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table')

    data = []
    max_x = 0
    max_y = 0

    for row in table.find_all('tr')[1:]:
        cols = [td.get_text().strip() for td in row.find_all('td')]
        if len(cols) == 3:
            try:
                x = int(cols[0])
                char = cols[1]
                y = int(cols[2])

                data.append((char, x, y))
                max_x = max(max_x, x)
                max_y = max(max_y, y)
            except ValueError:
                continue

    grid = [[' ' for _ in range(max_x + 1)] for _  in range(max_y + 1)]
    for char, x, y in data:
        grid[y][x] = char

    for row_idx in range(max_y, -1, -1):
        print(''.join(grid[row_idx]))

print_secret_message(
    "https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub")

