import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import SavedPassword from '../SavedPassword'
import './index.css'

const eachPasswordCardColor = [
  'yellow',
  'red',
  'green',
  'orange',
  'white',
  'grey',
  'goldenorange',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    passwordListCopy: [],
    websiteInput: '',
    usernameInput: '',
    userPasswordInput: '',
    showPassword: false,
  }

  getRandomColor = () => {
    const indexNo = Math.floor(Math.random() * eachPasswordCardColor.length)
    const color = eachPasswordCardColor[indexNo]
    return color
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state

    const filteredList = passwordList.filter(each => each.id !== id)

    this.setState({passwordList: filteredList, passwordListCopy: filteredList})
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteInput, userPasswordInput, usernameInput} = this.state
    const color = this.getRandomColor()

    if (
      websiteInput !== '' &&
      userPasswordInput !== '' &&
      usernameInput !== ''
    ) {
      this.setState(prevState => ({
        passwordList: [
          ...prevState.passwordList,
          {
            websiteInput,
            userPasswordInput,
            usernameInput,
            id: uuidV4(),
            showPassword: false,
            color,
          },
        ],
        passwordListCopy: [
          ...prevState.passwordListCopy,
          {
            websiteInput,
            userPasswordInput,
            usernameInput,
            id: uuidV4(),
            showPassword: false,
            color,
          },
        ],
        websiteInput: '',
        userPasswordInput: '',
        usernameInput: '',
      }))
    }
  }

  getWebsiteInputValue = event => {
    const userInputValue = event.target.value
    this.setState({websiteInput: userInputValue})
  }

  getUserNameInputValue = event => {
    const userInputValue = event.target.value
    this.setState({usernameInput: userInputValue})
  }

  getUserpasswordInputValue = event => {
    const userInputValue = event.target.value
    this.setState({userPasswordInput: userInputValue})
  }

  renderNoPassWordImage = () => (
    <figure>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-password-img"
        alt="no passwords"
      />
      <p className="heading">No Passwords</p>
    </figure>
  )

  onSearchPassword = event => {
    const {passwordList, passwordListCopy} = this.state
    const searchInputValue = event.target.value.toLowerCase()

    if (searchInputValue !== '') {
      const searchPassword = passwordList.filter(each =>
        each.websiteInput.toLowerCase().includes(searchInputValue),
      )
      this.setState({passwordList: searchPassword})
    } else {
      this.setState({passwordList: passwordListCopy})
    }
  }

  render() {
    const {
      passwordList,
      websiteInput,
      usernameInput,
      userPasswordInput,
      showPassword,
    } = this.state
    const passwordListCount = passwordList.length

    return (
      <div className="app-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="main-cont">
          <form className="password-adding-cont">
            <h1 className="heading">Add New Password</h1>
            <div className="input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.getWebsiteInputValue}
              />
            </div>

            <div className="input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.getUserNameInputValue}
              />
            </div>

            <div className="input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={userPasswordInput}
                onChange={this.getUserpasswordInputValue}
              />
            </div>
            <button
              type="submit"
              className="add-btn"
              onClick={this.addPassword}
            >
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="saved-password-cont">
          <div className="password-search-count-cont">
            <div className="password-count-cont">
              <h1 className="name">Your Passwords</h1>
              <p className="count">{passwordListCount}</p>
            </div>

            <div className="password-search-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <div className="show-password">
            <input
              type="checkbox"
              id="checkbox"
              value={showPassword}
              onChange={this.onShowPassword}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          {passwordListCount === 0 ? (
            this.renderNoPassWordImage()
          ) : (
            <ul className="saved-password-list-cont">
              {passwordList.map(each => (
                <SavedPassword
                  passwordDetails={each}
                  key={each.id}
                  showPassword={showPassword}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
