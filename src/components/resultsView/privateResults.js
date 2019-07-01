import React from 'react';
import PropTypes from 'prop-types'
import './results.css'

class PrivateResults extends React.Component {
  constructor() {
    super();
    this.state = {
      keepWhat: 'Songs'
    }
  }

    /*
     * Method: whatImage
     * Description: receives a number from a td element and it can return its
     *        image, a 'no image' image, or nothing if the element is null
     * Author: valentinoConti
     */
    whatImage = (here) => {
      try {
        // Album or Track
        if (this.props.resultados.items[here].track.album.images[0].url) {
          return this.props.resultados.items[here].track.album.images[0].url;
        }
      } catch (e) {
        try {
          // Artist
          return this.props.resultados.items[here].images[0].url;
        } catch (err) {
          if (err instanceof TypeError) {
            // There is a result on the square but doesnt have picture
            if (this.props.resultados.items.length > here) return require('./noHay.png');
          }
        }
      }
      return require('./noHay.png');
    }

    /*
     * Methods: whatFirstText & whatSecondText
     * Description: this methods receive a number from a td element and return:
     *    -> first title & second artist (for Tracks)
     *      -> first album & second artist (for Albums)
     *    -> just the artist name (for Artists)
     * Author: valentinoConti
     */
    whatFirstText = (here) => {
      try {
        if (this.props.resultados.items[here].track.name) {
          return this.props.resultados.items[here].track.name
        }
      } catch (e) {
        setTimeout(() => { this.whatFirstText(here) }, 500)
      }
      return true
    }

    whatSecondText = (here) => {
      try {
        if (this.props.resultados.items[here].track.artists[0].name) {
          return this.props.resultados.items[here].track.artists[0].name
        }
      } catch (e) {
        return ''
      }
      return ''
    }

    /*
     * Method: hasClicked
     * Description: receives a number from the td element that was clicked and it
     *        sends its information to the App to process
     * Author: valentinoConti
     */
    hasClicked = (here) => {
      try {
        this.props.showSpecific(this.props.resultados.items[here].track.id, this.state.keepWhat);
      } catch (err) {
        console.log('empty square clicked');
      }
    }

    render() {
      const { resultados } = this.props

      let entera = Math.floor(resultados.items.length / 4);
      const cociente = resultados.items.length % 4;
      if (cociente > 0) entera++;
      const filas = [];
      const errorMessage = [];
      let noRepeat = 0;
      if (entera === 0) {
        errorMessage.push(<b key="8921123123">THERE ARE NO RESULTS HERE</b>)
      }
      for (let i = 0; i < entera; i++) {
        const columnas = [];
        for (let j = 0; j < 4; j++) {
          const thisNumber = i * 4 + j;
          columnas.push(
            <td
              role="menuitem"
              key={noRepeat++}
              className="square elemSize"
              style={{ backgroundImage: `url(${this.whatImage(thisNumber)})` }}
              onClick={() => { this.hasClicked(thisNumber) }}
            >
              <div className="sobreLaImagen">
                <span className="taxt">{this.whatFirstText(thisNumber)}</span>
                <br />
                <br />
                <span className="taxt">{this.whatSecondText(thisNumber)}</span>
              </div>
            </td>
          );
        }
        filas.push(<tr key={noRepeat++}>{columnas}</tr>);
      }

      return (
        <div>
          <h2>{this.state.keepWhat}</h2>
          <hr className="separator" />
          {errorMessage}
          <table>
            <tbody>
              {filas}
            </tbody>
          </table>
        </div>
      );
    }
}

PrivateResults.propTypes = {
  resultados: PropTypes.object.isRequired,
  showSpecific: PropTypes.func.isRequired
}

export default PrivateResults;
