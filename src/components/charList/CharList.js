import { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + newCharList.length,
      charEnded: ended
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderItem = (charList) => {
    return (
      <ul className="char__grid">
        {charList.map((char) => {
          let imgStyle = { objectFit: "cover" };
          if (
            char.thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ) {
            imgStyle = { objectFit: "contain" };
          }

          return (
            <li
              key={char.id}
              className="char__item"
              onClick={() => this.props.onCharSelected(char.id)}
            >
              <img src={char.thumbnail} alt={char.name} style={imgStyle} />
              <div className="char__name">{char.name}</div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;
    const items = this.renderItem(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ 'display': charEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func
}

export default CharList;
