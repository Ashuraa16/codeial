import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Settings = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };
  const updateProfile = async () => {
    setSavingForm(true);
    console.log('updateprofile ', name, password, confirmPassword);
    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error("Please fill all the fields'", {
        // Toast configuration
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      error = true;
    }
    if (password !== confirmPassword) {
      toast.error('Password and confirm password does not match', {
        // Toast configuration
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    if (response.success) {
      setEditing(false);
      setSavingForm(false);
      clearForm();

      return toast.success('User updated successfully', {
        // Toast configuration
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      toast.error(response.message, {
        // Toast configuration
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    setSavingForm(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      {!isEditing ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          </div>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.editBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Form....' : 'Save Profile'}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditing(false)}
            >
              Go Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
