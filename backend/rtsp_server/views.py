from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import ffmpeg

class StreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, 'process'):
            self.process.terminate()

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            rtsp_url = data['url']
            
            self.process = (
                ffmpeg
                .input(rtsp_url)
                .output('pipe:', format='webm', vcodec='vp8', acodec='vorbis')
                .overwrite_output()
                .run_async(pipe_stdout=True)
            )
            
            while True:
                chunk = await asyncio.get_event_loop().run_in_executor(
                    None, self.process.stdout.read, 1024
                )
                if not chunk:
                    break
                await self.send(bytes_data=chunk)
                
        except Exception as e:
            await self.send(text_data=json.dumps({
                'error': str(e)
            }))
            if hasattr(self, 'process'):
                self.process.terminate()