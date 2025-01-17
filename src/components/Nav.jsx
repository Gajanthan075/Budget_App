import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import logomark from "../assets/logomark.svg";
const Nav = ({ userName }) => {
  return (
    <div>
      <nav>
        <NavLink to="/" aria-label="Go to home">
          <img src={logomark} alt="" height={30} />
          <span>HomeBudget</span>
        </NavLink>
        {userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={(event) => {
              if (!confirm("Delete user and all data?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )}
      </nav>
    </div>
  );
};

export default Nav;
