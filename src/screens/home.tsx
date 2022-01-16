import React from 'react';
import UserContextProvider from 'src/contexts/user';
import HomeScreenComponent from 'src/components/home';

const HomeScreen = () => {
  return (
    <UserContextProvider>
      <HomeScreenComponent />
    </UserContextProvider>
  );
};

export default HomeScreen;
