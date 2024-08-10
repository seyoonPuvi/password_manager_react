import './index.css'

const SavedPassword = props => {
  const {passwordDetails, showPassword, deletePassword} = props
  const {
    id,
    websiteInput,
    usernameInput,
    userPasswordInput,
    color,
  } = passwordDetails

  const renderPassword = () => <p className="password">{userPasswordInput}</p>

  const renderStars = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-img"
    />
  )

  const onDelete = () => deletePassword(id)

  return (
    <li className="passwordDetails-cont">
      <p className={`websiteInitial ${color}`}>{websiteInput[0]}</p>
      <div className="password-info">
        <p className="website">{websiteInput}</p>
        <p className="username">{usernameInput}</p>
        {showPassword ? renderPassword() : renderStars()}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default SavedPassword
