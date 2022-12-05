import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/navbar/Navbar'
import PostsContainer from '../components/layout/posts/PostsContainer'

export default function Home() {
  return (
    <div className="h-screen mt-[71px] custom-scrollbar overflow-y-auto flex flex-col gap-6 items-center scroll-pt-6 pt-6 md:snap-proximity md:snap-y">
      <Navbar isAnimate />

      <PostsContainer />
    </div>
  )
}
