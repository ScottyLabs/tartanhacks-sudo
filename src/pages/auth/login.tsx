import { type GetServerSideProps, type NextPage } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";

interface Props {
  csrfToken?: string;
}

const Login: NextPage<Props> = ({ csrfToken }) => {
  const router = useRouter();
  const signInError = router.query.error;
  return (
    <div className="flex min-h-screen flex-col">
      <Header hideAuth />
      <main className="flex flex-grow flex-col items-center justify-center gap-5 py-5 px-2 md:px-10">
        <div className="text-3xl">Welcome</div>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="w-80"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-6">
            <input
              type="text"
              id="username"
              name="username"
              className="form-control placeholder:text-purple/25 focus:border-purple focus:text-purple m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:bg-white focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control placeholder:text-purple/25 focus:border-purple focus:text-purple m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:bg-white focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-th-secondary px-3 py-2 text-white drop-shadow-2xl transition-transform hover:translate-y-[-3px]"
          >
            LOGIN
          </button>
          {signInError === "CredentialsSignin" && (
            <div
              className="mt-6 w-full rounded-lg bg-red-100 py-2 text-center text-base text-red-700"
              role="alert"
            >
              Incorrect email or password.
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default Login;
