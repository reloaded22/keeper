
function Header() {
    return (
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-warning">
          <div class="container-fluid">
            <h2 class="navbar-brand fw-bold">
              Keeper
            </h2>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="http://localhost:3000/mongo"
                  >
                    MongoDB
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="http://localhost:3000/dynamo">
                    DynamoDB
                  </a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-dark" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    );
}

export default Header;