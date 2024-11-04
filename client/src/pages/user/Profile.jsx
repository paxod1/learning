import React from "react";
import { useFetch } from "../../hooks/UseFetch";



export const Profile = () => {

    const [userProfile,isLoading]=useFetch('/user/profile')
    console.log('userProfile====',userProfile);
    

  return <div>Profile</div>;
};