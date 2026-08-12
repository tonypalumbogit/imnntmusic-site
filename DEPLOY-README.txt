IMNNT MUSIC WEBSITE — LAUNCH CHECKLIST

1) FORM FIRST
- Create a Formspree form.
- Set booking@imnntmusic.com as the notification email.
- Copy the form ID from your endpoint (example: https://formspree.io/f/abcdwxyz -> abcdwxyz).
- Open index.html and replace YOUR_FORM_ID with that ID.
- Submit one test booking and confirm it reaches booking@imnntmusic.com.

2) GITHUB PAGES
- Create a GitHub repository, e.g. imnntmusic-site.
- Upload EVERYTHING inside this folder so index.html is at the repository root.
- Repository Settings > Pages > Deploy from a branch > main / root.
- Wait for the temporary github.io site to publish and test it.

3) CUSTOM DOMAIN
- In GitHub repository Settings > Pages > Custom domain, enter imnntmusic.com and save.
- At your DNS provider, add GitHub Pages A records for @ and a www CNAME as instructed by GitHub.
- IMPORTANT: DO NOT delete or change your Google Workspace MX/TXT records. Those are for booking@imnntmusic.com email.
- After DNS validates, turn on Enforce HTTPS in GitHub Pages.

4) TEST
- Test imnntmusic.com on desktop and phone.
- Play all 3 Mixcloud embeds.
- Open /epk.html.
- Test the booking form.
- Test booking@imnntmusic.com receiving and replying.
- Test Linktree and Mixcloud links.

5) NEXT BOOKING ASSET
- Add a strong 20–30+ minute performance video and several vertical clips as soon as you record them.
