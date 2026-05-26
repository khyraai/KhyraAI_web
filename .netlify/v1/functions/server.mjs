import serverEntrypoint from "../../../dist/server/server.js";

if (typeof serverEntrypoint?.fetch !== "function") {
<<<<<<< HEAD
  console.error(
    "The server entry point must have a default export with a property `fetch: (req: Request) => Promise<Response>`",
  );
=======
console.error("The server entry point must have a default export with a property `fetch: (req: Request) => Promise<Response>`");
>>>>>>> 458c061e9639a794006496a5037ed59933d0917a
}

export default serverEntrypoint.fetch;

export const config = {
<<<<<<< HEAD
  name: "@netlify/vite-plugin server handler",
  generator: "@netlify/vite-plugin@2.12.6",
  path: "/*",
  preferStatic: true,
};
=======
name: "@netlify/vite-plugin server handler",
generator: "@netlify/vite-plugin@2.12.6",
path: "/*",
preferStatic: true,
};
>>>>>>> 458c061e9639a794006496a5037ed59933d0917a
