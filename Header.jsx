import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";


import { logout } from "../api/user";

 const Header = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const handleLogout = async (e) => {
		e.preventDefault();
        logout().then((res) => {
            toast.success(res.message);
			setUser(null);
            navigate("/login");
        })
        .catch((err) => console.log(err));
	};
     return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
		<h1>
					{user && <span >{user}'s</span>}{" "}
					Home
				</h1>
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ml-auto">
					{!user ? (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/signup">
									Sign Up
								</Link>
							</li>
							<li class="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						</>
					) : (
						<li class="nav-item">
							<span
								className="nav-link"
								style={{ cursor: "pointer" }}
								onClick={handleLogout}
							>
								Logout
							</span>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};
export default Header;
