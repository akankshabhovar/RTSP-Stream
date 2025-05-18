import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Card } from '@material-ui/core';
import StreamPlayer from './components/StreamPlayer';

function App() {
  const [streams, setStreams] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');

  const addStream = () => {
    if (streamUrl) {
      setStreams([...streams, { id: Date.now(), url: streamUrl }]);
      setStreamUrl('');
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="RTSP Stream URL"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addStream}>
            Add Stream
          </Button>
        </Grid>
        {streams.map(stream => (
          <Grid item xs={12} md={6} key={stream.id}>
            <Card>
              <StreamPlayer url={stream.url} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;