import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class TopHeadlines extends Component {
  constructor(props) {
    super(props)
    this.sectionRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    // Smooth-scroll back to Top Headlines only when the user flips pages (not on category switch)
    if (
      prevProps.categoryKey === this.props.categoryKey &&
      prevProps.pageIndex !== this.props.pageIndex &&
      this.sectionRef.current
    ) {
      this.sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  render() {
    const {
      pages = [],
      pageIndex = 0,
      hasNextPage = false,
      loadingMore = false,
      categoryKey = 'homepage',
      onPrevPage,
      onNextPage
    } = this.props

    if (pages.length === 0) return null

    return (
      <section ref={this.sectionRef} className="pt-4 border-t border-base-300 scroll-mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top Headlines</h2>
          <span className="badge badge-outline">Page {pageIndex + 1}</span>
        </div>

        {/* Manual-Only Sliding Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${pageIndex * 100}%)` }}
          >
            {pages.map((pageArticles, pageIdx) => (
              <div key={pageIdx} className="w-full shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {pageArticles.map((article, idx) => (
                    <NewsItem
                      key={article.article_id || article.link || `${pageIdx}-${idx}`}
                      compact={true}
                      title={article.title}
                      description={article.description || 'Click Read More for details.'}
                      imageUrl={article.image_url || 'https://picsum.photos/seed/genznews/800/500'}
                      newsUrl={article.link}
                      category={
                        article.category?.[0]
                          ? article.category[0].toUpperCase()
                          : categoryKey.toUpperCase()
                      }
                      source={article.source_name || article.source_id || 'GenZ News'}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Page Controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onPrevPage}
            disabled={pageIndex === 0 || loadingMore}
            className="btn btn-outline"
          >
            ❮ Previous Page
          </button>

          <span className="text-sm font-medium text-base-content/70">
            Page {pageIndex + 1}
          </span>

          <button
            onClick={onNextPage}
            disabled={!hasNextPage || loadingMore}
            className="btn btn-primary"
          >
            {loadingMore ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Loading...
              </>
            ) : (
              'Next Page ❯'
            )}
          </button>
        </div>
      </section>
    )
  }
}

export default TopHeadlines