import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { getCharacter, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null,
    spinner = loading ? <Spinner /> : null,
    content = !(errorMessage || spinner) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, descr, thumbnail, homepage, wiki } = char;
  const isImgFound = (thumbnail) => {
    if (thumbnail.indexOf(`image_not_available`, 0) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={{ objectFit: isImgFound(thumbnail) ? "contain" : `cover` }} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descr}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

//Обновление персонажа по кнопке tryit
// динамические стили заглушки
// отрисовка списка персонажей
