import { GithubUser } from "./types";

export async function UserImg({
  token,
}: {
  token: string;
}) {
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!userRes.ok) {
    throw new Error("Failed to fetch GitHub user");
  }

  const user = (await userRes.json()) as GithubUser;

  return (
   {user}
  );
}