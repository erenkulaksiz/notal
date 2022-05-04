<img src="./design/notal_logo_banner.png" alt="logo" width="320"/>
<br/>

## PR's and code reviews are welcome!

<p align="center">
    <img src="https://storage.googleapis.com/notal-1df19.appspot.com/cardImages/card_6272972538ca31cd0cf5cd1d?GoogleAccessId=firebase-adminsdk-yyjek%40notal-1df19.iam.gserviceaccount.com&Expires=16447006800&Signature=dgXQmWFHUxBj1G%2BsnGFjmOBog5VYkvX3vwH253rYLD4n58dmY%2BMj78ShTmsPPJmkDW5F3QMKRg0zgRjNCCHzYfwtzjVzkCoCxQqfu%2BzmIrK6vU4zdP4fkdo4SftM7tunRpH9yuJ7PD771qsJXDOKip42MjMejeWlgNYp4KuD7XLanGoXeqYTp40566butmLSjR%2FU5L5gMqzA95Qr2hkWdyLaggLBDaIjIYrvW7B9DGnuO7t8%2Bhj0iuOVjN0XlJO9x5SsDqsTa6CJd0jET3hMz3%2BuXcp%2FzzyR%2F9Z8k92cnvwm%2BT7RKq9RFzzN1Kx7QNmEgjItoltWD1%2BnR0oqyZboKw%3D%3D" width="290">
    <img src="https://storage.googleapis.com/notal-1df19.appspot.com/cardImages/card_627299f338ca31cd0cf5cd27?GoogleAccessId=firebase-adminsdk-yyjek%40notal-1df19.iam.gserviceaccount.com&Expires=16447006800&Signature=VPT%2BEpwr6J3F8TmeDkzov0iNofq0F6AA1iKoRbpIUX6PJ8JBIjgnNG%2BMLI9M2GPkPMlypXqh5Tw6BQvGG3l6pLXBNhVLRn2R7uY8FRpi1kqRvBJt7zIFUE%2Fey2FXucCuBVa9WLL3zr4EiCJylOsT9Ep6Dc2k7ZA0E%2FVMpJeP4uXE%2BoXAXzfrLZ8HIsO0cniyc39rgXGxJ2tpKtpMHh6L501EPVTVven64%2FmXOoC0Tl16HxsoW7X1ilebjUXra98id%2FtwvNOmg8Xn7YgPTGcgVRGcJ%2F4K%2FATu3LT0UsmY5qu7P9HeFjkOlgogLMXDP2Wounij3v0hfuSJDK1E1SkJeg%3D%3D" width="256">
</p>
<p align="center">
    <img src="https://storage.googleapis.com/notal-1df19.appspot.com/cardImages/card_62729a0038ca31cd0cf5cd28?GoogleAccessId=firebase-adminsdk-yyjek%40notal-1df19.iam.gserviceaccount.com&Expires=16447006800&Signature=RawPKsitJ%2Fm%2FsFiZc%2BekWyqjZUtJMQFmPYtyNpuHvfXSFcoBIzphPkwkVHiHHmA%2FePCPoohlmVyLCobKDg0Mq1FpyOofXJH5%2FKmhvWfZ%2FCYYnGKhVUZemp6oSXy%2F5HsAtDlEZk13ekFEJJ0sQwmN3jNqaEPFaTHiBbPc3%2B3mBk5it487RIbMjt90O5frgaehyaqAkpeVOkBqYKiyyjzz0rKKKm51DfbJdE7yjnLgjnGpIhP0mHJvALRpTnrCsXtm8ZvH0rU%2BBXbQV%2FI74jDuxQIIEYbrDOa%2F2Nm91j%2BDjv86ozQ8qPc1ui038W0HdS6eqPJtGKlq2YcL8wC3Cs4L7g%3D%3D" width="256">
    <img src="https://storage.googleapis.com/notal-1df19.appspot.com/cardImages/card_62729a3a38ca31cd0cf5cd2b?GoogleAccessId=firebase-adminsdk-yyjek%40notal-1df19.iam.gserviceaccount.com&Expires=16447006800&Signature=L%2FgCCnXc%2FDBnZ8vzdm8iGTkMV6pBkBS31uEa%2BE88M4wLDpT9g7wrcERinYLHqraxN%2FxsZiaWT4wSqy6HHjW%2Bncsbks%2BDL4N9bReLeMWuuvhu1utCoL7Mfyx17XOUEDE%2FpNuEG949%2FkFcNkyHFBAw%2FIzyuYeoPM9NmZaKzp5wwM81AHhUPTEuFS83nQYcDLHfzgA3F9DDDLtM%2FBH8ylN6Iom7qTls8BXdVLrvLXllaldDuXkSL5FVT08eaz%2FxgG1ExquxIgCZNEymPVSolAhWRimCquq%2FgFyFP46sApM9UE3SCZzrn7K3MkL%2F6AMJ9gkNtk6XttSDj9yQLviNvYc5Zw%3D%3D" width="256">
</p>

### Discover more screenshots on [https://notal.app/workspace/screenshots](https://notal.app/workspace/screenshots)

### TODO: Switch Tooltip to Popper.js

# Notal

Notal is a simple platform to keep your project management simple, as well as making it easy to work with multiple users on a workspace together. Currently a workspace consists from 4 main components: Board, Roadmap, Bookmarks and Changelog.

- Use board to keep your to-do lists organized
- Use roadmap to build a simple roadmap for your product. If you share this link with other users, they can upvote roadmaps so you can see which feature your users most wanted (Building - WIP)
- Use bookmarks to link board cards with bookmarks which you can add images and links (Building - WIP)
- Use changelog to view and edit your project's version notes (Building - WIP)

## Project features

- NextJS as primary framework, Vercel as primary host
- Authentication via Google and GitHub
- SWR, PWA, SSR & Workbox ready (see ./notal-root/worker/index.js for workbox development logs)
- SEO is correctly managed, used Workbox for superfast caching
- Uses Tailwind on frontend, `framer-motion` for cool animations, `next-themes` for Dark mode theme and `react-beautiful-dnd` for beatiful drag drop experience
- MongoDB on backend
- Secure session management using Firebase Auth
- Custom components made for Notal, each of them has different purpose and different styles with fully customisation option
- Comes with Google Material Icons
- Google Analytics for analytics, page views and page view times: LCP, TTFB and FCP

You can see a live demo at **https://notal.app**

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run devp` inside `notal-root` file:

    git clone https://github.com/erenkulaksiz/notal.git
    cd notal/notal-root
    npm install
    npm run devp

Opens development server on [https://localhost:3000](https://localhost:1111) with hot reload activated

Note: You can use `npm run dev` to start on port 3000. Make sure you have right port on .env.local aswell

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm run start`:

    cd notal-root
    npm install
    npm run build
    npm run start

You should run `npm run build` again any time you make changes to the site

## Configuring

If you configure a .env.local file (just copy [.env.local.template](https://github.com/erenkulaksiz/notal/blob/master/notal-root/.env.local.template) over to '.env.local' and fill in the options) you can configure a range of options

Make sure you have done oAuth options from Firebase console to get auth start to work

## Analyze bundle

Run `npm run analyze` to view bundle sizes for client and server

## notal-old

This file contains old version of notal which uses [NextUI](https://nextui.org/) as frontend library. Since NextUI is new and it didnt fit my needs, i switched to Tailwind later
You can use same .env.local file for notal-root to notal-old, they use same API's

## Mobile Application

Mobile App of Notal is being built under notal/app folder, with React Native

## Devnote

I've seen lately, many projects like:

- [anytype.io](https://anytype.io)
- [discourse.org](https://www.discourse.org)
- [linear.app](https://linear.app)
- [reflect.app](https://reflect.app)
- [height.app](https://height.app)

While first creating this project, i didn't yet know these projects. When i was this far, i found out about them. I suggest you to use them instead of Notal since this project is still being built.
Even while buying the domain, i didnt knew about them. It was a bit unlucky but now i have some competition going :)

## Questions & Contact

You can ask whatever you want from erenkulaksz@gmail.com email or you can just contact me
