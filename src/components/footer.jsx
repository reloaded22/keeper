
function Footer() {
    return (
        <footer className="footer">
          <div className="container text-center">
            <span className="text-muted">
              Keeper App © {new Date().getFullYear()}
            </span>
          </div>
        </footer>
    )
}

export default Footer;