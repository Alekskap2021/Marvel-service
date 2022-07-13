import { useState, useEffect } from "react";

import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]),
    [offset, setOffset] = useState(210),
    [isEnd, setIsEnd] = useState(false),
    [newComicsLoading, setNewComicsLoading] = useState(false),
    { getAllComics, loading, error } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (offset) => {
    setNewComicsLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (comics) => {
    if (comics.length < 8) {
      setIsEnd(true);
    }
    setNewComicsLoading(false);
    setComicsList((comicsList) => [...comicsList, ...comics]);
    setOffset((offset) => offset + 8);
  };

  const renderComics = (comicsList) => {
    const comics = comicsList.map((com, i) => {
      const { price, name, thumbnail, url } = com;
      return (
        <li className="comics__item" key={i}>
          <a href={url}>
            <img src={thumbnail} alt={name} className="comics__item-img" />
            <div className="comics__item-name">{name}</div>
            <div className="comics__item-price">{price}</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{comics}</ul>;
  };

  const comics = renderComics(comicsList),
    spinner = loading && comicsList.length === 0 ? <Spinner /> : null,
    errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      {comics}
      <button
        className="button button__main button__long"
        disabled={newComicsLoading}
        style={{ display: isEnd ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
