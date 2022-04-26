import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

class ShareButton extends React.Component {
  constructor() {
    super();

    this.state = {
      shareBtnStatus: '',
    };

    this.handleShareBtn = this.handleShareBtn.bind(this);
  }

  handleShareBtn() {
    const { url } = this.props;
    copy(url); // https://stackoverflow.com/questions/39823681/read-the-current-full-url-with-react
    this.setState({
      shareBtnStatus: 'Link copiado!',
    });
  }

  render() {
    const { dataTestId, testLocation } = this.props;
    const { shareBtnStatus } = this.state;

    return (
      <button
        data-testid={ testLocation === 'button' ? dataTestId : null }
        type="button"
        onClick={ () => this.handleShareBtn() }
      >
        {
          shareBtnStatus !== ''
            ? 'Link copiado!'
            : (
              <img
                alt="Ícone do botão compartilhar"
                src={ shareIcon }
                data-testid={ testLocation === 'img' ? dataTestId : null }
              />)
        }
      </button>
    );
  }
}

export default ShareButton;

ShareButton.propTypes = {
  dataTestId: PropTypes.string,
  testLocation: PropTypes.string,
  url: PropTypes.string,
}.isRequired;
