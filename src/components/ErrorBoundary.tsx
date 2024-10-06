import React, { useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import { Center, Text, Button, Stack, Box } from '@asuikit/core';
import api from '@/services/api';
import { isProd } from '@/constants';
import axios from 'axios';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, trackId: uuidv4(), error: null };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // console.log({ error, errorInfo });
    this.setState({ hasError: true, error });
    // console.info(`[Track Error]`, this.state.trackId, errorInfo, error.stack);
    console.error(error);
    // Sentry.withScope((scope) => {
    //   scope.setTag('track-id', this.state.trackId);
    //   scope.setExtras(errorInfo);
    //   Sentry.captureException(error);
    // });
    // api.BF.logger({
    //   trackId: this.state.trackId,
    //   errorInfo: {
    //     stack: error.stack,
    //   },
    //   error: error.message,
    //   url: window.location.href,
    // });
    axios.post('https://alienxchain.io/api/logger', {
      trackId: this.state.trackId,
      errorInfo: {
        stack: error.stack,
      },
      error: error.message,
      url: window.location.href,
    });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center
          sx={{
            height: '100vh',
          }}
        >
          <Stack align="center">
            <p>
              <Trans
                i18nKey="network_error"
                t={i18next.t}
                values={{
                  code: this.state.trackId,
                }}
                components={{
                  a: (
                    <Text
                      style={{
                        color: '#1971c2',
                      }}
                      variant="link"
                      component="a"
                      mx={4}
                      href="https://discord.com/invite/6SzkW9hNRa"
                      target="_blank"
                    />
                  ),
                }}
              />
            </p>
            <Box mb={20} sx={{ opacity: '.5' }}>
              <div>
                <pre>{this.state.error?.message}</pre>
              </div>
              {!isProd && (
                <div>
                  <pre>{this.state.error?.stack}</pre>
                </div>
              )}
            </Box>
            <Button onClick={() => this.setState({ hasError: false })}>
              Try again?
            </Button>
          </Stack>
        </Center>
      );
    }

    // Return children components in case of no error

    return <>{this.props.children}</>;
  }
}

/* const ErrorBoundary = ({ children }) => {
  const [trackId] = useState(() => uuidv4());
  // const boundaryRef = useRef<SentryErrorBoundary | null>(null);

  return (
    <SentryErrorBoundary
      // ref={(r) => {
      //   boundaryRef.current = r;
      // }}
      beforeCapture={(scope) => {
        scope.setTag('track-id', trackId);
      }}
      fallback={({ error, resetError }) => (
        <Center
          sx={{
            height: '100vh',
          }}
        >
          <Stack align="center">
            <p>
              <Trans
                i18nKey="network_error"
                t={i18next.t}
                values={{
                  code: trackId,
                }}
                components={{
                  a: (
                    <Text
                      style={{
                        color: '#1971c2',
                      }}
                      variant="link"
                      component="a"
                      mx={4}
                      href="https://discord.com/invite/6SzkW9hNRa"
                      target="_blank"
                    />
                  ),
                }}
              />
            </p>
            <p>{error}</p>
            <Button onClick={() => resetError()}>Try again?</Button>
          </Stack>
        </Center>
      )}
    >
      <>{children}</>
    </SentryErrorBoundary>
  );
}; */

export default ErrorBoundary;
