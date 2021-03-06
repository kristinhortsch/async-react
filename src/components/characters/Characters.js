import React from 'react';
import Character from './Character';
import { getCharacters } from '../../services/rickAndMortyApi';
import PropTypes from 'prop-types';
import { withPaging } from '../paging/Paging';

class Characters extends React.PureComponent {
  state = {
    characters: [] 
  }

  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    updateTotalPages: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    const { currentPage, updateTotalPages } = this.props;
    getCharacters(currentPage)
      .then(response => {
        updateTotalPages(response.totalPages);
        this.setState({ characters: response.results });
      });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentPage !== this.props.currentPage) {
      const { currentPage, updateTotalPages } = this.props;
      getCharacters(currentPage)
        .then(response => {
          updateTotalPages(response.totalPages);
          this.setState({ characters: response.results });
        });
    }
  }

  render() {
    const listOfCharacters = this.state.characters.map(character => {
      return <li key={character.id}><Character character={character}/></li>;
    });

    return (
      <div>
        <h3>Characters</h3>
        <ul>
          {listOfCharacters}
        </ul>
      </div>
    );
  }
}

export default withPaging(Characters);

