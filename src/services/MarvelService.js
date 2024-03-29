import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const _apiBase = `https://gateway.marvel.com:443/v1/public/`,
    _apiKey = `apikey=593034a5863c5a00994e9e6a6975a9da`,
    _baseOffset = 210;

  const { loading, request, error, clearError } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    // return res.data.results;
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const transformCharacterDescr = (descr) => {
    if (!descr) {
      return `There is no description for this character`;
    } else if (descr.length > 220) {
      return descr.slice(0, 215) + `...`;
    }
    return descr;
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      descr: transformCharacterDescr(char.description),
      thumbnail: char.thumbnail.path + `.` + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      name: comics.title,
      descr: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} pages`
        : "No information about number of page",
      thumbnail: comics.thumbnail.path + `.` + comics.thumbnail.extension,
      lang: comics.textObjects.language || "en-us",
      price: comics.prices[0].price,
      url: comics.urls[0].url,
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    getAllComics,
    loading,
    error,
    clearError,
    getComic,
  };
};

export default useMarvelService;
