<script>
  import 'artplayer';
  import 'artplayer-plugin-hls-quality';
  import Hls from 'hls.js';
  import { onMount, onDestroy } from 'svelte';

  export let url_hls;

  let art;

  const initializeArtPlayer = async () => {
    try {
      if (url_hls && typeof url_hls === 'string' && url_hls.trim() !== '') {
        // Your original JavaScript code here
        art = new Artplayer({
          container: '.artplayer-app',
          url: url_hls,
          pip: true,
          setting: false,
          aspectRatio: true,
          fullscreen: true,
          // fullscreenWeb: true,
          plugins: [
            artplayerPluginHlsQuality({
              control: true,
              setting: true,
              getResolution: (level) => level.height + 'P',
              title: 'Quality',
              auto: 'Auto',
            }),
          ],
          customType: {
            m3u8: function playM3u8(video, url, art) {
              if (Hls.isSupported()) {
                if (art.hls) art.hls.destroy();
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                art.hls = hls;
                art.on('destroy', () => hls.destroy());
              } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
              } else {
                art.notice.show = 'Unsupported playback format: m3u8';
              }
            },
          },
        });
      } else {
        console.error('Invalid or missing URL for ArtPlayer');
      }
    } catch (error) {
      console.error('Error initializing ArtPlayer:', error);
    }
  };

  onMount(initializeArtPlayer);

  onDestroy(() => {
    // Cleanup operations if needed
    if (art) {
      // Destroy the ArtPlayer instance
      art.destroy();
    }
  });
</script>

<div class="artplayer-app"></div>
