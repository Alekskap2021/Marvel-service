import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null),
    { getComic, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null,
    spinner = loading ? <Spinner /> : null,
    content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { name, lang, pageCount, descr, price, thumbnail, url } = comic;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{descr}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {lang}</p>
        <div className="single-comic__price">{price}$</div>
        <a href={url} className="button button__secondary" style={{ marginTop: "60px" }}>
          <div className="inner">Wiki</div>
        </a>
      </div>
      <Link to={`/comics`} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
