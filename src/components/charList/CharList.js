import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.getCharList()
  }

  onCharsLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  getCharList = () => {
    this.setState({ loading: false });
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  }

  renderItem = (charList) => {
    return (
      <ul className="char__grid">
        {charList.map(char => {
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
          )
        })}
      </ul>
    )
  }

  render() {
    const { charList, loading, error } = this.state;
    const items = this.renderItem(charList)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
