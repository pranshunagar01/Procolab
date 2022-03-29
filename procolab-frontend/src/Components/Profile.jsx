import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img style={{width: '70px', height: '70px', borderRadius: '50%'}} src={user.picture} alt={user.name} />
        <h2 style={{fontSize: '1.2rem', display: 'inline-block', position: 'relative', bottom: '25px', marginLeft: '15px'}}>{(user.name.split(' ').length === 1)?user.nickname:user.name}</h2>
      </div>
    )
  );
};
export default Profile;