import './index.css'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import News from './components/News'
import Footer from './components/Footer'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCategory: 'homepage',
      searchQuery: '',
      theme: localStorage.getItem('genz-news-theme') || 'dark'
    }
  }

  componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme)
  }

  handleSelectCategory = (category) => {
    this.setState({ activeCategory: category, searchQuery: '' })

    if (window.innerWidth < 1024) {
      const drawerToggle = document.getElementById('my-drawer-4')
      if (drawerToggle) drawerToggle.checked = false
    }
  }

  handleSearch = (query) => {
    const trimmed = query.trim()
    if (!trimmed) {
      this.handleClearSearch()
      return
    }

    this.setState({
      searchQuery: trimmed,
      activeCategory: ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  handleClearSearch = () => {
    this.setState({
      searchQuery: '',
      activeCategory: 'homepage'
    })
  }

  handleThemeChange = (newTheme) => {
    this.setState({ theme: newTheme })
    localStorage.setItem('genz-news-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  renderMainContent() {
    const { activeCategory, searchQuery, theme } = this.state

    if (!searchQuery && activeCategory === 'about') {
      return (
        <div className="max-w-3xl mx-auto my-6 card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">About GenZ News</h2>
            <p className="text-base-content/80 leading-relaxed mt-2">
              GenZ News is a real-time news aggregator built with React, Tailwind CSS, and DaisyUI.
              Stay updated across Trending News, Sports, Current Affairs, Geo-politics, and Weather
              with live feeds powered by NewsData.io.
            </p>
            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => this.handleSelectCategory('homepage')}
                className="btn btn-primary btn-sm"
              >
                Back to Headlines
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (!searchQuery && activeCategory === 'settings') {
      return (
        <div className="max-w-3xl mx-auto my-6 card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Settings</h2>
            <div className="form-control mt-4">
              <label className="label cursor-pointer justify-between">
                <span className="label-text text-base font-medium">Appearance Theme</span>
                <div className="join">
                  <button
                    onClick={() => this.handleThemeChange('light')}
                    className={`btn btn-sm join-item ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => this.handleThemeChange('dark')}
                    className={`btn btn-sm join-item ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Dark
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      )
    }

    return (
      <News
        category={activeCategory || 'homepage'}
        searchQuery={searchQuery}
        onClearSearch={this.handleClearSearch}
      />
    )
  }

  render() {
    const { activeCategory, searchQuery, theme } = this.state

    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />

        <div className="drawer-content flex flex-col min-h-screen">
          <Navbar
            theme={theme}
            searchQuery={searchQuery}
            onSearch={this.handleSearch}
            onClearSearch={this.handleClearSearch}
            onGoHome={() => {
              this.handleSelectCategory('homepage')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
          <main className="p-6 grow">
            {this.renderMainContent()}
          </main>
          <Footer theme={theme} />
        </div>

        <Sidebar
          theme={theme}
          activeCategory={activeCategory}
          onSelectCategory={this.handleSelectCategory}
        />
      </div>
    )
  }
}

export default App