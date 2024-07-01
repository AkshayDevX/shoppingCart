const Footer = () => {
  return (
    <footer className="footer footer-center absolute bottom-0 bg-base-100 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by E-Shop
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
