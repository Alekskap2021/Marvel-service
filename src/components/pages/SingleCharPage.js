import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleCharPage.scss";

const SingleCharPage = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { getCharacter, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    getCharacter(charId).then(onCharLoaded);
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(spinner || errorMessage || !char) ? <View char={char} /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { name, descr, thumbnail } = char;
  return (
    <div className="single-char">
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{descr}</p>
      </div>
      <Link to={`/`} className="single-char__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharPage;
