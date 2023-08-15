import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { searchUsers } from "../api";
const Navbar = () => {
  const [results,setResults]=useState([]);
  const [searchText,setSearchText]=useState('');
  const auth = useAuth();

  useEffect(()=>{
    const fetchUser=async ()=>{
      const response=await searchUsers(searchText);
      if(response.success){
        setResults(response.data.users);

      }
    };
    if(searchText.length>2){
      fetchUser();
    }else{
      setResults([]);
    }
  },[searchText])


  return (
    //Navbar Start
    <div className={styles.nav}>
      {/*Left part for navbar showing the logo */}
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt="CODEIAL"
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`} onClick={()=>setResults([])}>
                    <img
                      src="https://www.pngitem.com/pimgs/m/537-5372558_flat-man-icon-png-transparent-png.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="User"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <Link onClick={auth.logout}>Log Out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/Login">Log In</Link>
                </li>

                <li>
                  <Link to="/Signup">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
