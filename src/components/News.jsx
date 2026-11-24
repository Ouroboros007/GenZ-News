import React, { Component } from 'react'
import NewsItem from './NewsItem'
import TopHeadlines from './TopHeadlines'

const TRENDING_COUNT = 6 // Number of unique slides in Trending News
const ITEMS_PER_PAGE = 12 // 3 rows x 4 columns in Top Headlines

const CATEGORY_CONFIG = {
  homepage: {
    heading: 'Trending News',
    query: ''
  },
  sports: {
    heading: 'GenZ News - Sports',
    query: '&category=sports'
  },
  'current-affairs': {
    heading: 'GenZ News - Current Affairs',
    query: '&category=top,domestic'
  },
  'geo-politics': {
    heading: 'GenZ News - Geo-politics',
    query: '&category=world,politics'
  },
  weather: {
    heading: 'GenZ News - Weather',
    query: '&q=weather'
  }
}

export class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trendingArticles: [],
      currentIndex: 0,
      headlinePages: [],
      headlineBuffer: [],
      headlinePageIndex: 0,
      nextPageToken: null,
      loading: true,
      loadingMore: false,
      error: null
    }
    this.timer = null
    this.seenIds = new Set()
    this.seenTitles = new Set()
    this.requestId = 0
  }

  async componentDidMount() {
    await this.fetchInitialNews()
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.stopTimer()
      await this.fetchInitialNews()
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  getBaseUrl = () => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY
    const searchQuery = (this.props.searchQuery || '').trim()

    if (searchQuery) {
      return `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en&q=${encodeURIComponent(searchQuery)}`
    }

    const categoryKey = this.props.category || 'homepage'
    const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.homepage
    return `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en${config.query}`
  }

  fetchBatch = async (pageToken = null) => {
    const baseUrl = this.getBaseUrl()
    const url = pageToken ? `${baseUrl}&page=${encodeURIComponent(pageToken)}` : baseUrl
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'error') {
      throw new Error(data.results?.message || data.message || 'Failed to fetch news')
    }

    const uniqueArticles = (data.results || []).filter((article) => {
      if (!article.title) return false
      const idKey = article.article_id || article.link
      const titleKey = article.title.trim().toLowerCase()

      if ((idKey && this.seenIds.has(idKey)) || this.seenTitles.has(titleKey)) {
        return false
      }

      if (idKey) this.seenIds.add(idKey)
      this.seenTitles.add(titleKey)
      return true
    })

    return {
      articles: uniqueArticles,
      nextPage: data.nextPage || null
    }
  }

  fetchInitialNews = async () => {
    const currentRequest = ++this.requestId
    this.seenIds = new Set()
    this.seenTitles = new Set()

    try {
      this.setState({
        loading: true,
        loadingMore: false,
        error: null,
        trendingArticles: [],
        headlinePages: [],
        headlineBuffer: [],
        currentIndex: 0,
        headlinePageIndex: 0,
        nextPageToken: null
      })

      const targetCount = TRENDING_COUNT + ITEMS_PER_PAGE
      let collected = []
      let nextToken = null
      let attempts = 0

      // Fetch enough unique articles to fill Trending + first 3x4 Top Headlines page without overlap
      while (collected.length < targetCount && attempts < 3) {
        if (attempts > 0 && !nextToken) break

        try {
          const batch = await this.fetchBatch(nextToken)
          if (currentRequest !== this.requestId) return
          collected = [...collected, ...batch.articles]
          nextToken = batch.nextPage
          attempts += 1
        } catch (err) {
          if (attempts === 0) throw err
          break
        }
      }

      // Split cleanly so Trending News and Top Headlines never share the same articles
      const trendingCount =
        collected.length > TRENDING_COUNT
          ? TRENDING_COUNT
          : Math.max(1, Math.ceil(collected.length / 2))

      const trendingArticles = collected.slice(0, trendingCount)
      const headlinesPool = collected.slice(trendingCount)
      const firstHeadlinePage = headlinesPool.slice(0, ITEMS_PER_PAGE)
      const remainingBuffer = headlinesPool.slice(ITEMS_PER_PAGE)

      this.setState({
        trendingArticles,
        headlinePages: firstHeadlinePage.length > 0 ? [firstHeadlinePage] : [],
        headlineBuffer: remainingBuffer,
        nextPageToken: nextToken,
        loading: false,
        currentIndex: 0,
        headlinePageIndex: 0
      })

      if (trendingArticles.length > 1) {
        this.startTimer()
      }
    } catch (err) {
      if (currentRequest !== this.requestId) return
      this.setState({
        error: err.message,
        loading: false
      })
    }
  }

  startTimer = () => {
    this.stopTimer()
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.trendingArticles.length === 0) return null
        return {
          currentIndex: (prevState.currentIndex + 1) % prevState.trendingArticles.length
        }
      })
    }, 5000)
  }

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  handlePrev = () => {
    this.setState((prevState) => {
      const total = prevState.trendingArticles.length
      if (total === 0) return null
      return {
        currentIndex: prevState.currentIndex === 0 ? total - 1 : prevState.currentIndex - 1
      }
    })
    this.startTimer()
  }

  handleNext = () => {
    this.setState((prevState) => {
      const total = prevState.trendingArticles.length
      if (total === 0) return null
      return {
        currentIndex: (prevState.currentIndex + 1) % total
      }
    })
    this.startTimer()
  }

  handleGoTo = (index) => {
    this.setState({ currentIndex: index })
    this.startTimer()
  }

  handlePrevHeadlinePage = () => {
    this.setState((prevState) => {
      if (prevState.headlinePageIndex === 0) return null
      return { headlinePageIndex: prevState.headlinePageIndex - 1 }
    })
  }

  handleNextHeadlinePage = async () => {
    const {
      headlinePages,
      headlinePageIndex,
      headlineBuffer,
      nextPageToken,
      loadingMore
    } = this.state

    if (loadingMore) return

    if (headlinePageIndex + 1 < headlinePages.length) {
      this.setState({ headlinePageIndex: headlinePageIndex + 1 })
      return
    }

    if (headlineBuffer.length === 0 && !nextPageToken) return

    const currentRequest = this.requestId
    this.setState({ loadingMore: true })

    try {
      let pool = [...headlineBuffer]
      let token = nextPageToken
      let attempts = 0

      while (pool.length < ITEMS_PER_PAGE && token && attempts < 2) {
        const batch = await this.fetchBatch(token)
        if (currentRequest !== this.requestId) return
        pool = [...pool, ...batch.articles]
        token = batch.nextPage
        attempts += 1
      }

      if (pool.length === 0) {
        this.setState({ loadingMore: false, nextPageToken: null })
        return
      }

      const newPage = pool.slice(0, ITEMS_PER_PAGE)
      const leftover = pool.slice(ITEMS_PER_PAGE)

      this.setState((prevState) => ({
        headlinePages: [...prevState.headlinePages, newPage],
        headlineBuffer: leftover,
        headlinePageIndex: prevState.headlinePages.length,
        nextPageToken: token,
        loadingMore: false
      }))
    } catch {
      if (currentRequest !== this.requestId) return
      this.setState({ loadingMore: false })
    }
  }

  render() {
    const {
      trendingArticles,
      currentIndex,
      headlinePages,
      headlineBuffer,
      headlinePageIndex,
      nextPageToken,
      loading,
      loadingMore,
      error
    } = this.state

    const categoryKey = this.props.category || 'homepage'
    const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.homepage
    const searchQuery = (this.props.searchQuery || '').trim()
    const isSearching = Boolean(searchQuery)

    const hasNextHeadlinePage =
      headlinePageIndex + 1 < headlinePages.length ||
      headlineBuffer.length > 0 ||
      Boolean(nextPageToken)

    if (loading) {
      return (
        <div className="flex justify-center items-center h-80">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )
    }

    if (error) {
      return (
        <div className="max-w-7xl mx-auto my-6 space-y-4">
          <div role="alert" className="alert alert-error">
            <span>Error loading news: {error}</span>
          </div>
          {isSearching && this.props.onClearSearch && (
            <button onClick={this.props.onClearSearch} className="btn btn-primary btn-sm">
              Back to Trending News
            </button>
          )}
        </div>
      )
    }

    if (trendingArticles.length === 0) {
      return (
        <div className="max-w-7xl mx-auto my-10 text-center space-y-4">
          <p className="text-base-content/70 text-lg">
            {isSearching
              ? `No news articles found for "${searchQuery}".`
              : 'No news articles found for this category.'}
          </p>
          {isSearching && this.props.onClearSearch && (
            <button onClick={this.props.onClearSearch} className="btn btn-primary btn-sm">
              Back to Trending News
            </button>
          )}
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto my-4 space-y-12">
        {/* Trending News / Search Results Section */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span>{isSearching ? `Search Results: "${searchQuery}"` : config.heading}</span>
                {!isSearching && categoryKey === 'homepage' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 text-orange-500"
                    aria-hidden="true"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                )}
              </h2>

              {isSearching && this.props.onClearSearch && (
                <button
                  onClick={this.props.onClearSearch}
                  className="btn btn-outline btn-xs"
                >
                  Clear Search
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/60 mr-2">
                {currentIndex + 1} / {trendingArticles.length}
              </span>
              <button
                onClick={this.handlePrev}
                className="btn btn-circle btn-sm btn-outline"
                aria-label="Previous news"
              >
                ❮
              </button>
              <button
                onClick={this.handleNext}
                className="btn btn-circle btn-sm btn-outline"
                aria-label="Next news"
              >
                ❯
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={this.stopTimer}
            onMouseLeave={this.startTimer}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {trendingArticles.map((article, index) => (
                <div key={article.article_id || article.link || index} className="w-full shrink-0">
                  <NewsItem
                    title={article.title}
                    description={article.description || 'Click Read Full Story for details.'}
                    imageUrl={article.image_url}
                    newsUrl={article.link}
                    category={
                      article.category?.[0]
                        ? article.category[0].toUpperCase()
                        : categoryKey.toUpperCase()
                    }
                    source={article.source_name || article.source_id || 'GenZ News'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {trendingArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => this.handleGoTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? 'w-8 bg-primary'
                    : 'w-2.5 bg-base-content/30 hover:bg-base-content/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Separate Top Headlines Component */}
        <TopHeadlines
          pages={headlinePages}
          pageIndex={headlinePageIndex}
          hasNextPage={hasNextHeadlinePage}
          loadingMore={loadingMore}
          categoryKey={categoryKey}
          onPrevPage={this.handlePrevHeadlinePage}
          onNextPage={this.handleNextHeadlinePage}
        />
      </div>
    )
  }
}

export default News