import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    onCharLoading();

    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const skeleton = char || error || loading ? null : <Skeleton />,
    errorMessage = error ? <ErrorMessage /> : null,
    spinner = loading ? <Spinner /> : null,
    content = !(errorMessage || spinner || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, descr, thumbnail, homepage, wiki, comics } = char;
  let objectFit = { objectFit: "cover" };
  if (thumbnail.indexOf(`image_not_available`, 0) !== -1) {
    objectFit = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={objectFit} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{descr}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length
          ? comics.map((item, id) => {
              return (
                <li key={id} className="char__comics-item">
                  {item.name}
                </li>
              );
            })
          : "There are no comics with this character"}
      </ul>
    </>
  );
};

export default CharInfo;
