import { useEffect, useState } from "react";
/**
 * 监听界面滚动了多少
 * handleScroll
 */
function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [pageYOffset, setPageYOffset] = useState(0);
  // 页面加载完成之后，做个监听。
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setPageYOffset(window.pageYOffset)
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return {
    scrollY,
    pageYOffset
  };
}

export default useScroll;