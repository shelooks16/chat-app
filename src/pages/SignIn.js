import React from 'react';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite';
import { ref, serverTimestamp, set } from 'firebase/database';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const credential = await signInWithPopup(auth, provider);
      const userMeta = getAdditionalUserInfo(credential);

      if (userMeta.isNewUser) {
        await set(ref(database, `/profiles/${credential.user.uid}`), {
          name: credential.user.displayName,
          createdAt: serverTimestamp(),
        });
      }

      Alert.success('Signed in', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>

              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>

                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
