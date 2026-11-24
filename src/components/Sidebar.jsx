import React, { Component } from 'react'

export class Sidebar extends Component {
  getButtonClass = (id) => {
    const isActive = this.props.activeCategory === id
    const isLight = this.props.theme === 'light'

    if (isLight) {
      return `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
        isActive
          ? 'bg-sky-700 text-white font-semibold hover:bg-sky-800'
          : 'text-slate-900 hover:bg-sky-400/60'
      }`
    }

    return `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
      isActive ? 'menu-active font-semibold' : ''
    }`
  }

  render() {
    const { onSelectCategory, theme } = this.props
    const isLight = theme === 'light'

    const sidebarBgClass = isLight
      ? 'bg-sky-300 text-slate-900 border-r border-sky-400'
      : 'bg-base-200 text-base-content'

    return (
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className={`flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 ${sidebarBgClass}`}>
          <ul className="menu w-full grow gap-1">
            {/* Homepage */}
            <li>
              <button
                onClick={() => onSelectCategory('homepage')}
                className={this.getButtonClass('homepage')}
                data-tip="Homepage"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            <li className={`menu-title mt-2 is-drawer-close:hidden ${isLight ? 'text-slate-700 font-semibold' : ''}`}>
              News Type
            </li>

            {/* Sports */}
            <li>
              <button
                onClick={() => onSelectCategory('sports')}
                className={this.getButtonClass('sports')}
                data-tip="Sports"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Sports</span>
              </button>
            </li>

            {/* Current Affairs */}
            <li>
              <button
                onClick={() => onSelectCategory('current-affairs')}
                className={this.getButtonClass('current-affairs')}
                data-tip="Current Affairs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14h-8"></path>
                  <path d="M15 18h-5"></path>
                  <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Current Affairs</span>
              </button>
            </li>

            {/* Geo-politics */}
            <li>
              <button
                onClick={() => onSelectCategory('geo-politics')}
                className={this.getButtonClass('geo-politics')}
                data-tip="Geo-politics"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span className="is-drawer-close:hidden">Geo-politics</span>
              </button>
            </li>

            {/* Weather */}
            <li>
              <button
                onClick={() => onSelectCategory('weather')}
                className={this.getButtonClass('weather')}
                data-tip="Weather"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M12 2v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="M20 12h2"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                  <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path>
                  <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Weather</span>
              </button>
            </li>

            <div className={`divider my-1 ${isLight ? 'before:bg-sky-500/40 after:bg-sky-500/40' : ''}`}></div>

            {/* About */}
            <li>
              <button
                onClick={() => onSelectCategory('about')}
                className={this.getButtonClass('about')}
                data-tip="About"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <span className="is-drawer-close:hidden">About</span>
              </button>
            </li>

            {/* Settings */}
            <li>
              <button
                onClick={() => onSelectCategory('settings')}
                className={this.getButtonClass('settings')}
                data-tip="Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar