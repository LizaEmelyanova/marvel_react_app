class MarvelService {
  _apiBase = 'https://gateway.marvel.com/v1/public/'
  _apiKey = 'apikey=632da1dd7cdbee7e827e1228dd9c7a79'

  getResource = async (url) => {
    let res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    )
  }

  getCharacter = (id) => {
    return this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    )
  }
}

export default MarvelService;
