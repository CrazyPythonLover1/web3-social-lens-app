import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Web3 Social',
  description: 'Web3 social media',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
         {/* App body */}
         <div className="app__body flex justify-between">
              {/* Sidebar */}
              <Sidebar></Sidebar>
              {children}
              {/* Feed */}
              {/* <Feed /> */}
              {/* widgets */}
              {/* <Widgets /> */}
              <div className='right-sidebar'></div>
          </div>
        
      </body>
    </html>
  )
}
