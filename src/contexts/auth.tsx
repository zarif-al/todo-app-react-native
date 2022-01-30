import React, { createContext, useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/App';
import CreateUser from 'src/api/mutation/create-user.mutation.graphql';
import CurrentUser from 'src/api/query/current-user.query.graphql';
import { useMutation, ApolloError, useLazyQuery } from '@apollo/client';
import { IUser } from 'src/utils/types/schema';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface onCreateUserInput {
  firstName: string;
  lastName: string;
  userName: string;
}

interface Props {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationState: any;
}

export const AuthContext = createContext({
  initializing: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createFirebaseUser: (email: string, password: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: (email: string, password: string): void => {},
  signOut: () => {},
  error: {} as string | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError: (error: string | null) => {},
  user: {} as IUser,
  apiLoading: false,
  apiError: {} as ApolloError | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreateUser: (input: onCreateUserInput) => {},
  currentUserRefetch: () => {},
});

export default function AuthContextProvider({
  children,
  navigationState,
}: Props): JSX.Element {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const [initializing, setInitializing] = useState(true);
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>();
  const [error, setError] = useState<string | null>(null);
  const routeName = navigationState?.routes[navigationState.index].name;

  const [createUser, { loading: apiLoading, error: apiError }] =
    useMutation(CreateUser);

  const [
    getCurrentUser,
    {
      data: currentUser,
      loading: currentUserLoading,
      error: currentUserError,
      client,
      refetch: currentUserRefetch,
    },
  ] = useLazyQuery(CurrentUser, {
    fetchPolicy: 'network-only',
  });

  async function onCreateUser(input: onCreateUserInput): Promise<void> {
    createUser({
      variables: {
        input: {
          ...input,
          email: firebaseUser?.email,
          fireId: firebaseUser?.uid,
        },
      },
      refetchQueries: [{ query: CurrentUser }],
      onCompleted: () => {
        auth()
          .currentUser?.updateProfile({ displayName: input.userName })
          .then(() => {
            navigation.navigate('Splash');
          });
      },
    });
  }

  function createFirebaseUser(email: string, password: string): void {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setError(null);
      })
      .catch(createUserError => {
        if (createUserError.code === 'auth/email-already-in-use') {
          setError('This email address is already registered.');
        } else if (createUserError.code === 'auth/invalid-email') {
          setError('This email address is invalid.');
        } else if (createUserError.code === 'auth/operation-not-allowed') {
          setError('Operation not allowed. Please contact support.');
        } else {
          setError('Please use a stronger password');
        }
      });
  }

  async function signIn(email: string, password: string): Promise<void> {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        client.resetStore();
        setError(null);
      })
      .catch(signInError => {
        if (
          signInError.code === 'auth/firebaseUser-not-found' ||
          signInError.code === 'auth/user-not-found'
        ) {
          setError('Provided email address is not registered.');
        } else if (signInError.code === 'auth/wrong-password') {
          setError('Provided email address/password does not match.');
        } else if (signInError.code === 'auth/invalid-email') {
          setError('Provided email address is invalid.');
        } else {
          setError('Your account is disabled. Please contact support.');
        }
      });
  }

  function signOut(): void {
    auth()
      .signOut()
      .then(() => {
        client.resetStore();
      })
      .catch(signOutError => {
        setError(signOutError.code);
      });
  }

  function onAuthStateChanged(authUser: FirebaseAuthTypes.User | null) {
    setFirebaseUser(authUser);
    setError(null);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    setError(null);
    getCurrentUser();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeName]);

  useEffect(() => {
    if (!initializing && !currentUserLoading) {
      if (!firebaseUser) {
        if (routeName !== 'Register' && routeName !== 'Login') {
          navigation.navigate('Login');
        }
      } else {
        if (currentUserError) {
          navigation.navigate('Error');
        } else {
          if (!firebaseUser?.displayName) {
            navigation.navigate('CompleteRegistration');
          } else {
            if (
              routeName === 'Register' ||
              routeName === 'Login' ||
              routeName === 'CompleteRegistration' ||
              routeName === 'Splash' ||
              routeName === undefined
            ) {
              navigation.navigate('Home');
            }
          }
        }
      }
    }
  }, [
    firebaseUser,
    initializing,
    navigation,
    routeName,
    currentUser,
    currentUserLoading,
    currentUserError,
  ]);

  return (
    <AuthContext.Provider
      value={{
        initializing,
        createFirebaseUser,
        signIn,
        signOut,
        error,
        setError,
        user: currentUser?.currentUser,
        apiLoading,
        apiError,
        onCreateUser,
        currentUserRefetch,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
