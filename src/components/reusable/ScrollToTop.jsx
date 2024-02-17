"use client";

const ScrollToTop = () => {
      function scrollToTop() {
            window.scrollTo({
                  top: 0,
                  behavior: "smooth"
            })
      }
      return (
            <button onClick={scrollToTop} className='w-[52px] h-[52px] bg-primary grid place-items-center rounded-full hover:brightness-110 active:scale-95 common_transition'>
                  <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 2L7 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 8L7.40964 1.1978C7.35845 1.13563 7.2955 1.08584 7.22497 1.05174C7.15443 1.01764 7.07793 1 7.00055 1C6.92316 1 6.84666 1.01764 6.77612 1.05174C6.70559 1.08584 6.64264 1.13563 6.59145 1.1978L0.999999 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
            </button>
      );
};

export default ScrollToTop;