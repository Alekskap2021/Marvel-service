import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useState, useEffect, useRef } from "react";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]),
    [newItemLoading, setNewItemLoading] = useState(false),
    [offset, setOffset] = useState(210),
    [charListEnded, setCharListEnded] = useState(false);

  const { loading, error, getAllCharacters, clearError } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    clearError();
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharListEnded(ended);
  };

  const itemRefs = useRef([]);

  const setFocus = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
    itemRefs.current[id].classList.add(`char__item_selected`);
    itemRefs.current[id].focus();
  };

  const renderCharCard = (cardList) => {
    const cards = cardList.map((card, i) => {
      const { name, id, thumbnail } = card;
      let objectFit = { objectFit: "cover" };
      if (thumbnail.indexOf(`image_not_available`, 0) !== -1) {
        objectFit = { objectFit: "contain" };
      }
      return (
        <li
          className="char__item"
          tabIndex={0}
          key={id}
          onClick={() => {
            props.onSelectChar(id);
            setFocus(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ` ` || e.key === "Enter") {
              props.onSelectChar(id);
              setFocus(i);
            }
          }}
          ref={(el) => (itemRefs.current[i] = el)}
        >
          <img src={thumbnail} alt={name} style={objectFit} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{cards}</ul>;
  };

  const items = renderCharCard(charList),
    errorMessage = error ? <ErrorMessage /> : null,
    spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charListEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
