import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { normalizeRole, type BackendUserRole } from "@/lib/auth-routes";

type BackendLoginResponse = {
  Status?: string;
  status?: string;
  Message?: string;
  message?: string;
  Role?: BackendUserRole;
  role?: BackendUserRole;
  Token?: string;
  token?: string;
  accessToken?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

async function parseBackendLoginResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as BackendLoginResponse;
  } catch {
    return null;
  }
}

async function requestBackendLogin(email: string, password: string) {
  const endpoint =
    "https://talent-lens-be-production.up.railway.app/api/auth/login";

  const urlEncoded = new URLSearchParams({
    username: email,
    password,
  });

  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const queryParams = new URLSearchParams({
    username: email,
    password,
  });

  const attempts: RequestInit[] = [
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncoded,
    },
    {
      method: "POST",
      body: formData,
    },
    {
      method: "POST",
    },
  ];

  const urls = [endpoint, endpoint, `${endpoint}?${queryParams.toString()}`];

  for (let index = 0; index < attempts.length; index += 1) {
    const response = await fetch(urls[index], attempts[index]);
    const user = await parseBackendLoginResponse(response);

    if (!response.ok || !user) {
      continue;
    }

    const accessToken = user.Token || user.token || user.accessToken;
    const role = normalizeRole(user.Role || user.role);

    if (accessToken && role) {
      return {
        user,
        accessToken,
        role,
      };
    }
  }

  return null;
}

export const { handlers, auth, signIn, signOut } =
  NextAuth({
    providers: [
      Credentials({
        name: "credentials",

        credentials: {
          email: {},
          password: {},
        },

        async authorize(credentials) {
          try {
            const login = await requestBackendLogin(
              credentials.email as string,
              credentials.password as string
            );

            if (!login) {
              return null;
            }

            return {
              id:
                (credentials.email as string) ||
                login.user.email ||
                "user",
              email:
                login.user.email ||
                (credentials.email as string),
              name:
                login.user.firstName && login.user.lastName
                  ? `${login.user.firstName} ${login.user.lastName}`
                  : login.user.email || (credentials.email as string),
              accessToken: login.accessToken,
              role: login.role,
            };
          } catch {
            return null;
          }
        },
      }),
    ],

    session: {
      strategy: "jwt",
    },

    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken =
            (user as any).accessToken;
          token.role = (user as any).role;
        }

        return token;
      },

      async session({ session, token }) {
        session.accessToken =
          token.accessToken as string;
        session.user.role = normalizeRole(token.role as string) ?? undefined;

        return session;
      },
    },

    pages: {
      signIn: "/login",
    },

    secret: process.env.AUTH_SECRET,
  });
