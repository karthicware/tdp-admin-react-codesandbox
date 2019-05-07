import React from 'react';
import firebase from 'firebase';

import fire from '../../fire';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',

        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => {
                this.props.history.push("/masters/gallery");
            }
        }
    };

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false // Local signed-in state.
        };
       this.uiConfig = {
                // Popup signin flow rather than redirect flow.
                signInFlow: 'popup',

                // We will display Google and Facebook as auth providers.
                signInOptions: [
                    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    // Avoid redirects after sign-in.
                    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                        //console.log(`authResult=${JSON.stringify(authResult)}`);
                        this.props.onLogin(authResult.user);
                        this.props.history.push("/feed/gallery");
                    }
                }
            };
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({ isSignedIn: !!user, user })
        );
    }
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        return (
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={fire.auth()} />
        );
    }
}