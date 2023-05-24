const Header = () => {
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid py-2">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <a className={`nav-link ${window.location.pathname.split('/')[1] == 'dashboard' ?  'active' : ''}`}
                                   href="dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item px-2">
                                <a className={`nav-link ${window.location.pathname.split('/')[1] == 'user' ?  'active' : ''}`}
                                   href="user">User</a>
                            </li>
                            <li className="nav-item px-2">
                                <a className={`nav-link ${window.location.pathname.split('/')[1] == 'game' ?  'active' : ''}`}
                                   href="game">Game</a>
                            </li>
                            <li className="nav-item px-2">
                                <a className={`nav-link ${window.location.pathname.split('/')[1] == 'redeem' ?  'active' : ''}`}
                                   href="redeem">Redeem</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;
