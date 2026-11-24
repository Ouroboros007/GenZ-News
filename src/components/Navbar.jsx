import React, { Component } from 'react'

export class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchOpen: false,
      inputValue: props.searchQuery || ''
    }
    this.searchInputRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery && !this.props.searchQuery) {
      this.setState({ inputValue: '', isSearchOpen: false })
    }
  }

  toggleSearch = () => {
    this.setState(
      (prevState) => ({ isSearchOpen: !prevState.isSearchOpen }),
      () => {
        if (this.state.isSearchOpen && this.searchInputRef.current) {
          this.searchInputRef.current.focus()
        }
      }
    )
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = this.state.inputValue.trim()
    if (!trimmed) return
    this.props.onSearch(trimmed)
  }

  handleClear = () => {
    this.setState({ inputValue: '' })
    if (this.props.searchQuery) {
      this.props.onClearSearch()
    } else if (this.searchInputRef.current) {
      this.searchInputRef.current.focus()
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.setState({ isSearchOpen: false })
    }
  }

  render() {
    const isLight = this.props.theme === 'light'
    const { isSearchOpen, inputValue } = this.state

    const navClass = isLight
      ? 'navbar w-full bg-sky-400 text-slate-900 border-b border-sky-500/60 shadow-sm'
      : 'navbar w-full bg-neutral text-neutral-content'

    const iconBtnClass = isLight
      ? 'text-slate-900 hover:bg-sky-500/40'
      : 'text-neutral-content hover:bg-neutral-content/10'

    const searchBarWrapClass = isLight
      ? 'w-full bg-sky-300 border-b border-sky-500/50 px-4 py-3'
      : 'w-full bg-base-200 border-b border-base-300 px-4 py-3'

    const searchInputClass = isLight
      ? 'input input-sm sm:input-md w-full bg-white text-slate-900 placeholder:text-slate-500 border-sky-500/60 focus:border-sky-700'
      : 'input input-sm sm:input-md w-full bg-base-100 text-base-content border-base-300'

    const searchSubmitClass = isLight
      ? 'btn btn-sm sm:btn-md bg-sky-700 hover:bg-sky-800 text-white border-none'
      : 'btn btn-sm sm:btn-md btn-primary'

    return (
      <header className="w-full">
        <nav className={navClass}>
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className={`btn btn-square btn-ghost drawer-button ${iconBtnClass}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>

          <div className="navbar-center">
            <button
              type="button"
              onClick={this.props.onGoHome}
              className={`btn btn-ghost text-xl font-bold ${iconBtnClass}`}
            >
              GenZ News
            </button>
          </div>

          <div className="navbar-end">
            <button
              type="button"
              onClick={this.toggleSearch}
              aria-label="Toggle search"
              aria-expanded={isSearchOpen}
              className={`btn btn-ghost btn-circle ${iconBtnClass} ${
                isSearchOpen ? (isLight ? 'bg-sky-500/40' : 'bg-neutral-content/15') : ''
              }`}
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button type="button" className={`btn btn-ghost btn-circle ${iconBtnClass}`} aria-label="Notifications">
              <div className="indicator">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
        </nav>

        {isSearchOpen && (
          <div className={searchBarWrapClass}>
            <form
              onSubmit={this.handleSubmit}
              className="max-w-2xl mx-auto flex items-center gap-2"
            >
              <div className="relative grow">
                <input
                  ref={this.searchInputRef}
                  type="text"
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Search news (e.g., AI, Cricket, F1, Economy)..."
                  maxLength={100}
                  className={`${searchInputClass} pr-9`}
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={this.handleClear}
                    aria-label="Clear search text"
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-sm font-bold cursor-pointer ${
                      isLight ? 'text-slate-500 hover:text-slate-900' : 'text-base-content/60 hover:text-base-content'
                    }`}
                  >
                    ✕
                  </button>
                )}
              </div>

              <button type="submit" className={searchSubmitClass}>
                Search
              </button>

              <button
                type="button"
                onClick={() => this.setState({ isSearchOpen: false })}
                aria-label="Close search bar"
                className={`btn btn-ghost btn-sm btn-circle ${iconBtnClass}`}
              >
                ✕
              </button>
            </form>
          </div>
        )}
      </header>
    )
  }
}

export default Navbar