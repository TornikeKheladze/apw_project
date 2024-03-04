const { useState, useEffect } = require("react");
const { default: UpArrowIcon } = require("./UpArrowIcon");

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-12 right-1 z-20 btn btn-icon btn_outlined btn_secondary ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <UpArrowIcon className={"w-10"} />
    </button>
  );
};

export default ScrollToTop;
