IMNNT FOURTHWALL MERCH INTEGRATION — V14
=======================================

Store:
https://imnntmusic-shop.fourthwall.com

WHY V14 EXISTS
--------------
The prior upload could display updated HTML while a browser/GitHub Pages cache
continued serving an older assets/styles.css file. That made the merchandise
appear as giant vertically stacked images even though the new card markup was present.

V14 fixes that two ways:
1. The stylesheet has a NEW filename:
   assets/styles-v14.css?v=14
2. The final four-card apparel layout is also enforced directly in index.html.

DESKTOP
-------
Four merchandise cards remain in ONE horizontal row on screens wider than 1100px.

TABLET
------
Two cards per row.

PHONE
-----
Two cards per row, falling to one only on very narrow screens under 390px.

The product cards use the actual corresponding merchandise images and include:
- product name
- brief description
- SHOP / VIEW PRODUCT link
- SHOP THE COLLECTION CTA

Existing music, EPK, booking, Never Stop release page and footer remain intact.
Nothing is added below the footer.
