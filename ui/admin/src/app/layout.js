import { Providers } from '@/lib/providers'
// import 'fomantic-ui-css/semantic.css'
import 'semantic-ui-css/semantic.min.css'

export const metadata = {
  title: 'Admin URL Shortener',
  description: 'Admin URL Shortener',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  )
}
