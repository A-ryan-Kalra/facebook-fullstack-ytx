<h3>Website is live and running at  <a href="https://myhub-fullstack-ytx-git-main-a-ryan-kalra.vercel.app/">myhub</a>
</h3>

<h2>About</h2>
<ul>
<li>This project is specifically crafted to build a social media website, akin to others, enabling users to engage with one another through commenting, liking, and sharing posts with the help of Next.js with Prisma as the ORM, and MongoDB as the database.</li>
<li>With the assistance of Cloudinary, user can seamlessly store images in the database.</li>
</ul>

<h2>Authors</h2>
<ul>
<li><a href="https://github.com/A-ryan-Kalra">Aryan Kalra</a></li>
</ul>
</br>

<h1>Features</h1>

<h3>Note</h3>
<ul>
<li>Dashboard is not accessible to everyone. Users need to sign in with random email in order to create an account and connect with people. </li>
<li>Feel free to visit.</li>
</ul>
</br>

 <h2>User Panel</h2>
  <ul>
  <li>User can freely visit each other's profile. ✔</li>
  <li>Unauthorized users <strong>can not</strong> comment and like on any post. ✔</li>
  <li>Users with authorization can interact with each other's post by <strong>commenting </strong>and <strong>liking</strong>. ✔</li>
  <li>Users can <strong>follow</strong> each other along with <strong>unfollow feature</strong>.  ✔</li>
  <li>Users also get <strong>notification</strong> updates regarding their posts,likes and comments.  ✔</li>
  <li>Users can upload their favorite <strong>images</strong> to display on their profile, along with a <strong>cover photo</strong> for the wall. ✔</li>
  <li>It also comes with a search functionality, allowing users to visit each other's profiles by searching. ✔</li>
  <li>Many more to come. ✔</li>
  </ul>
</br>

<h1>Tech</h1>
<ul>
<li>Nextjs 14</li>
<li>Typescript</li>
<li>Tailwind CSS</li>
<li>Jotai</li>
<li>Prisma</li>
<li>Mongodb</li>
<li>Cloudinary for Image database</li>
<li>useSWR for data revalidation and fetching</li>
<li>NextAuth.js for authentication along with JWT (JSON Web Tokens) for session management mechanism</li>
</ul>

</br>
<h2>Enviroment Variables</h2>
<h3>To run this project, you will need to add the following enviroment variables to your .env file</h3>

<code>DATABASE_URL</code>=Your Mongodb database url, It could be achieved by creating a database in mongodb in order to run this project
</br>
<code>NEXTAUTH_JWT_SECRET</code>=It could be any secrey key
</br>
<code>NEXTAUTH_SECRET</code>=It could be any key
</br>
<code>CLOUD_NAME</code>=Your Cloud Name key
</br>
<code>CLOUD_API_KEY</code>=Your Cloud Api Key
</br>
<code>CLOUD_API_SECRET</code>=Your Cloud Secret key

In order to generate the above keys, you will have to create an account in Cloudinary before proceeding further with image integration in your project.

</br>

<h2>Installation</h2>
<h3>Install my project with npm<h3>

```bash
  npm install
  npm run dev (for development server)
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  npm run build (for Production)
  npm run preview (To View Production Server )

```

Open <a href='http://localhost:3000'>http://localhost:3000</a> with your browser to see the result.

<div align="center">

Thank you\
Made with ❤️ and 💻\
By Aryan Kalra

</div>
