IMNNT FOURTHWALL MERCH INTEGRATION
=================================

FOURTHWALL STORE
https://imnntmusic-shop.fourthwall.com

WHAT THIS VERSION ADDS
----------------------
- SHOP in the existing IMNNT primary navigation.
- NEVER STOP / 001 apparel preview on the existing homepage.
- Four premium placeholder product cards.
- SHOP THE COLLECTION links to Fourthwall.
- WEAR THE RELEASE callout on /never-stop/.
- SHOP THE DROP links to Fourthwall.
- Existing music, EPK, booking, Never Stop content and footer are retained.
- Nothing new was added below the existing footer.

WHERE TO UPDATE PRICES / PRODUCT LINKS
--------------------------------------
assets/merch.config.js

Each product has:
name:
price:
image:
releaseImage:
url:

When individual Fourthwall product URLs are available, replace the current main
storefront URL in each product's url field.

WHERE TO ADD REAL PRODUCT IMAGES
--------------------------------
assets/merch/

Replace the placeholder files or add the real product images and update the image
paths in assets/merch.config.js and never-stop/release.config.js.

FUTURE CUSTOM DOMAIN
--------------------
If you configure:
https://shop.imnntmusic.com

with Fourthwall, replace the storeUrl in:
assets/merch.config.js

and update the matching URLs in:
never-stop/release.config.js

FOURTHWALL ROLE
---------------
Fourthwall handles ecommerce checkout, payment, fulfillment and orders.
imnntmusic.com remains the main IMNNT artist / brand website.
