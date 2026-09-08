IMNNT — NEVER STOP RELEASE PAGE
================================
ROUTE
https://www.imnntmusic.com/never-stop/

FILES CREATED
- never-stop/index.html
- never-stop/release.config.js
- assets/release.css
- assets/release.js
- assets/releases/never-stop/cover-placeholder.svg
- assets/releases/never-stop/social-share-placeholder.svg
- assets/releases/never-stop/merch-never-stop-placeholder.svg
- assets/releases/never-stop/merch-logo-placeholder.svg
- NEVER-STOP-README.txt

EXISTING FILE MODIFIED
- sitemap.xml (added /never-stop/ only)

1) FINAL NEVER STOP ARTWORK
Put the final square cover here:
assets/releases/never-stop/cover.webp
Recommended: WebP, 1200x1200 or larger, optimized for web.
Then open never-stop/release.config.js and change:
coverArt: "../assets/releases/never-stop/cover.webp"

For social sharing, export a 1200x630 social image to:
assets/releases/never-stop/social-share.webp
Then update BOTH:
- release.config.js -> socialArtwork
- never-stop/index.html -> og:image and twitter:image

2) PRE-SAVE URL
never-stop/release.config.js:
preSaveUrl: "PASTE_REAL_URL_HERE"

3) FINAL STREAMING URLS
never-stop/release.config.js:
spotifyUrl
spotifyEmbedUrl
appleMusicUrl
beatportUrl
soundcloudUrl
youtubeUrl

4) RELEASE DATE
never-stop/release.config.js:
releaseDate: "YYYY-MM-DD"
The field is centralized for future use; no date is invented in the visible page until you choose to display it.

5) SWITCH COMING SOON -> OUT NOW
never-stop/release.config.js:
status: "coming-soon"
becomes:
status: "released"
The page automatically changes COMING SOON -> OUT NOW and PRE-SAVE -> LISTEN NOW.

6) VIDEO
never-stop/release.config.js:
videoUrl: "PASTE_YOUTUBE_VIMEO_OR_DIRECT_VIDEO_URL"
The page does not autoplay. YouTube/Vimeo/direct video are supported.

7) MERCH
Put product images in:
assets/releases/never-stop/
Then edit each item in release.config.js:
name
price
image
url
Duplicate an item block to add more products.

8) EMAIL CAPTURE
In never-stop/index.html replace:
EMAIL_PROVIDER_ENDPOINT_HERE
with the POST endpoint from your email marketing provider.
Until then, the form intentionally does not submit anywhere.

9) TRACKING
In never-stop/index.html, the <head> contains clearly marked placeholders for:
GA4
Meta Pixel
TikTok Pixel
Do not enable them until you have real IDs.
Event tracking hooks are already wired in assets/release.js.

10) FUTURE RELEASES
Duplicate /never-stop/ to /future-release-name/ and change release.config.js.
Reuse assets/release.css and assets/release.js.
Create a release-specific artwork folder under assets/releases/.

DEPLOYMENT — SAME AS CURRENT SITE
- Upload/commit all files to the existing GitHub Pages repository.
- index.html remains at repository root; do not replace the existing homepage.
- Commit to main.
- GitHub Pages will publish /never-stop/ automatically because never-stop/index.html exists.
- Test https://www.imnntmusic.com/never-stop/ on iPhone and desktop after deploy.
