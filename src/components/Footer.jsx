import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    const isLight = this.props.theme === 'light'

    const footerClass = isLight
      ? 'footer sm:footer-horizontal bg-sky-400 text-slate-900 border-t border-sky-500/60 p-10'
      : 'footer sm:footer-horizontal bg-neutral text-neutral-content p-10'

    const socialLinkClass = isLight
      ? 'text-slate-900 hover:text-sky-900 transition-colors'
      : 'text-neutral-content hover:text-primary transition-colors'

    return (
      <footer className={footerClass}>
        <aside>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-10 mb-1"
            aria-hidden="true"
          >
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </svg>
          <p className="font-bold text-base">
            GenZ News
            <br />
            <span className="font-normal text-sm opacity-80">
              Real-time headlines &amp; global updates
            </span>
          </p>
          <p className="text-xs opacity-70 mt-1">
            © {new Date().getFullYear()} GenZ News. All rights reserved.
          </p>
        </aside>

        <nav>
          <h6 className={`footer-title ${isLight ? 'text-slate-900 opacity-80' : ''}`}>
            Social
          </h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className={socialLinkClass}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className={socialLinkClass}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100086163083676"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className={socialLinkClass}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    )
  }
}

export default Footer