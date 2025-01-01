import { FaBars, FaTimes } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { menuOpenState } from "../../recoil/atoms";

const MenuBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="xl:hidden cursor-pointer" onClick={toggleMenu}>
      {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    </div>
  );
};

export default MenuBar;
