import React, { Component } from 'react'

const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#1e242b"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="32" font-weight="600">GenZ News</text>
    </svg>`
  )

export class NewsItem extends Component {
  handleImageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = FALLBACK_IMG
  }

  render() {
    const {
      title = 'News Headline',
      description = 'Click Read More for details.',
      imageUrl,
      newsUrl = '/',
      category = 'GENERAL',
      source = 'GenZ News',
      compact = false
    } = this.props

    const safeImage = imageUrl && imageUrl.trim() ? imageUrl : FALLBACK_IMG

    // Compact vertical card for the 3x4 Top Headlines grid
    if (compact) {
      return (
        <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col overflow-hidden rounded-xl">
          <figure className="relative h-44 w-full bg-base-300 overflow-hidden shrink-0">
            <img
              src={safeImage}
              alt={title}
              loading="lazy"
              onError={this.handleImageError}
              className="w-full h-full object-cover"
            />
            <span className="badge badge-primary badge-sm absolute top-3 left-3 shadow-sm font-medium">
              {category}
            </span>
          </figure>

          <div className="card-body p-4 flex flex-col grow min-w-0 gap-2">
            <h3
              className="font-bold text-base leading-snug line-clamp-2 wrap-break-word text-base-content"
              title={title}
            >
              {title}
            </h3>

            <p className="text-xs text-base-content/70 line-clamp-3 leading-relaxed wrap-break-word">
              {description}
            </p>

            <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-base-300/80 gap-2">
              <span
                className="text-xs font-medium text-base-content/60 truncate min-w-0 flex-1"
                title={source}
              >
                {source}
              </span>
              <a
                href={newsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-xs shrink-0"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      )
    }

    // Large horizontal hero card for Trending News
    return (
      <div className="card lg:card-side bg-base-100 shadow-xl w-full overflow-hidden border border-base-300 rounded-2xl">
        <figure className="lg:w-1/2 h-64 lg:h-96 bg-base-300 overflow-hidden shrink-0">
          <img
            src={safeImage}
            alt={title}
            onError={this.handleImageError}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body lg:w-1/2 justify-between p-6 lg:p-8 min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="badge badge-primary">{category}</span>
              <span className="badge badge-secondary badge-outline">NEW</span>
            </div>
            <h2 className="card-title text-2xl lg:text-3xl font-bold mb-3 line-clamp-3 wrap-break-word">
              {title}
            </h2>
            <p className="text-base text-base-content/80 leading-relaxed line-clamp-4 wrap-break-word">
              {description}
            </p>
          </div>

          <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-base-300 gap-3">
            <span className="text-sm font-medium text-base-content/60 truncate min-w-0">
              Source: {source}
            </span>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary shrink-0"
            >
              Read Full Story
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem